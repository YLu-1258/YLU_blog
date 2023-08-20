#!/bin/bash

port=4200
repo_name=alexblog
log_file="/tmp/jekyll${port}.log"
# Exceptions will stop make
shell="/bin/bash"
shellflags="-e"



# Set source and target directories
source_directory="_notebooks"
destination_directory="_posts"

# List all .ipynb files in the source directory
notebook_files=("${source_directory}"/*.ipynb)

# Loop through notebook files and construct target Markdown file names
markdown_files=()
for notebook_file in "${notebook_files[@]}"; do
    # Get the base file name without directory and extension
    base_file_name=$(basename "$notebook_file" .ipynb)
    
    # Construct the target Markdown file path
    markdown_file="${destination_directory}/${base_file_name}.md"
    
    # Add the target file path to the array
    markdown_files+=("$markdown_file")
done

function convert () {
    for notebook_file in "${notebook_files[@]}"; do
        # Get the base file name without directory and extension
        base_file_name=$(basename "$notebook_file" .ipynb)
        
        # Construct the target Markdown file path
        markdown_file="${destination_directory}/${base_file_name}.md"
        
        # Perform the conversion (replace this with your actual conversion command)
        echo "Converting source $notebook_file to destination $markdown_file"
        python -c 'import sys; from scripts.convert_notebooks import convert_single_notebook; convert_single_notebook(sys.argv[1])' "$notebook_file"
    done
}

function stop () {
    echo "Stopping server..."
    lsof -ti :$port | xargs kill >/dev/null 2>&1 || true
    echo "Stopping logging process..."
    ps aux | awk -v log_file=$log_file '$$0 ~ "tail -f " log_file { print $$2 }' | xargs kill >/dev/null 2>&1 || true
    rm -f $log_file
}

function server () {
    stop
    convert
    echo "Starting server..."
    bundle exec jekyll serve
}

server