---
title: Linux Shell and Bash
author: mortensen
description: A Tech Talk on Linux and the Bash shell.
toc: True
comments: True
categories: ['5.A', 'C4.1']
courses: {'csse': {'week': 1}, 'csp': {'week': 1, 'categories': ['6.B']}, 'csa': {'week': 1}}
week: 0
type: devops
---

## Bash Tutorial
> A brief overview of Bash, on your way to becoming a Linux expert.  <mark>When a computer boots up, a kernel (MacOS, Windows, Linux) is started</mark>.  This kernel provides a shell, or <mark>terminal</mark>, that allows user to interact with a most basic set of commands.  Typically, the casual user will not interact with the shell/terminal as a Desktop User Interface is started by the computer boot up process.  To activate a shell directly, users will run a "terminal" through the Desktop. <mark>VS Code provides ability to activate "terminal"</mark> while in the IDE.

## Variable Prerequisites
> Setup bash shell dependency variables for this page.  Variables are one of the first aspects of programming.  <mark>Variables have "name" and a "value"</mark>.

- Hack Note: Change variables to match your student project.

### Define variable
The following code cell <mark>defines 3 variables and assigns each a value</mark>.  There are some extra command, called a HERE document, that write these variables to a file.  This is so we can use these variables over and over below.


```python
%%script bash

# Dependency Variables, set to match your project directories

cat <<EOF > /tmp/variables.sh
export project_dir=$HOME/APCSA  # change vscode to different name to test git clone
export project=\$project_dir/YLU_blog  # change teacher to name of project from git clone
export project_repo="https://github.com/YLu-1258/YLU_blog.git"  # change to project of choice
EOF
```

### Output the value of a variable
The following code cell <mark>outputs the value of the variables</mark>, using the echo command.  For visual understanding in the output, each echo command provide a title before the $variable 


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

# Output shown title and value variables
echo "Project dir: $project_dir"
echo "Project: $project"
echo "Repo: $project_repo"
```

    Project dir: /home/eris29/APCSA
    Project: /home/eris29/APCSA/YLU_blog
    Repo: https://github.com/YLu-1258/YLU_blog.git


## Project Setup and Analysis with Bash Scripts
The bash scripts that follow automate what was done in the setup procedures.  The purpose of this is to show that many of the commands we performed can be added to a script, then performed automatically.

### Pull Code
> Pull code from GitHub to your machine. This is a <mark>bash script</mark>, a sequence of commands, that will create a project directory and add the "project" from GitHub to the vscode directory.  There is conditional logic to make sure that clone only happen if it does not (!) exist.   Here are some key elements in this code...

- cd command (change directory), remember this from terminal session
- if statements (conditional statement, called selection statement by College Board), code inside only happens if condition is met


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Using conditional statement to create a project directory and project"

cd ~    # start in home directory

# Conditional block to make a project directory
if [ ! -d $project_dir ]
then 
    echo "Directory $project_dir does not exists... makinng directory $project_dir"
    mkdir -p $project_dir
fi
echo "Directory $project_dir exists." 

# Conditional block to git clone a project from project_repo
if [ ! -d $project ]
then
    echo "Directory $project does not exists... cloning $project_repo"
    cd $project_dir
    git clone $project_repo
    cd ~
fi
echo "Directory $project exists." 
```

    Using conditional statement to create a project directory and project
    Directory /home/eris29/APCSA exists.
    Directory /home/eris29/APCSA/YLU_blog exists.


### Look at files Github project
> All computers contain files and directories.  The clone brought more files from cloud to your machine.  Review the bash shell script, observe the commands that show and interact with files and directories.  These were used during setup.

- "ls" lists computer files in Unix and Unix-like operating systems
- "cd" offers way to navigate and change working directory
- "pwd" print working directory
- "echo" used to display line of text/string that are passed as an argument


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Navigate to project, then navigate to area wwhere files were cloned"
cd $project
pwd

echo ""
echo "list top level or root of files with project pulled from github"
ls

```

    Navigate to project, then navigate to area wwhere files were cloned
    /home/eris29/APCSA/YLU_blog
    
    list top level or root of files with project pulled from github
    CHANGELOG.md
    Gemfile
    Gemfile.lock
    LICENSE
    README.md
    _config.yml
    _data
    _includes
    _javascript
    _layouts
    _notebooks
    _plugins
    _posts
    _sass
    _site
    _tabs
    assets
    docs
    index.html
    jekyll-theme-chirpy.gemspec
    package.json
    rollup.config.js
    scripts
    server.sh
    test.py
    tools


### Look at file list with hidden and long attributes
> Most linux commands have options to enhance behavior.  The enhanced listing below shows permission bits, owner of file, size and date.

[ls reference](https://www.rapidtables.com/code/linux/ls.html)


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Navigate to project, then navigate to area wwhere files were cloned"
cd $project
pwd

echo ""
echo "list all files in long format"
ls -al   # all files -a (hidden) in -l long listing
```

    Navigate to project, then navigate to area wwhere files were cloned
    /home/eris29/APCSA/YLU_blog
    
    list all files in long format
    total 160
    drwxr-xr-x 19 eris29 eris29  4096 Aug 22 07:41 .
    drwxr-xr-x  4 eris29 eris29  4096 Aug 22 07:27 ..
    drwxr-xr-x  8 eris29 eris29  4096 Aug 22 07:27 .git
    drwxr-xr-x  3 eris29 eris29  4096 Aug 22 07:27 .github
    -rw-r--r--  1 eris29 eris29   230 Aug 22 07:27 .gitignore
    drwxr-xr-x  3 eris29 eris29  4096 Aug 22 07:27 .jekyll-cache
    -rw-r--r--  1 eris29 eris29    12 Aug 22 07:27 .python-version
    -rw-r--r--  1 eris29 eris29 26856 Aug 22 07:27 CHANGELOG.md
    -rw-r--r--  1 eris29 eris29   767 Aug 22 07:27 Gemfile
    -rw-r--r--  1 eris29 eris29  2857 Aug 22 07:27 Gemfile.lock
    -rw-r--r--  1 eris29 eris29  1078 Aug 22 07:27 LICENSE
    -rw-r--r--  1 eris29 eris29  3768 Aug 22 07:27 README.md
    -rw-r--r--  1 eris29 eris29  5585 Aug 22 07:27 _config.yml
    drwxr-xr-x  4 eris29 eris29  4096 Aug 22 07:27 _data
    drwxr-xr-x  4 eris29 eris29  4096 Aug 22 07:27 _includes
    drwxr-xr-x  3 eris29 eris29  4096 Aug 22 07:27 _javascript
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 _layouts
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 _notebooks
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 _plugins
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 _posts
    drwxr-xr-x  5 eris29 eris29  4096 Aug 22 07:27 _sass
    drwxr-xr-x 11 eris29 eris29  4096 Aug 22 07:43 _site
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 _tabs
    drwxr-xr-x  5 eris29 eris29  4096 Aug 22 07:27 assets
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 docs
    -rw-r--r--  1 eris29 eris29    34 Aug 22 07:27 index.html
    -rw-r--r--  1 eris29 eris29  1500 Aug 22 07:27 jekyll-theme-chirpy.gemspec
    -rw-r--r--  1 eris29 eris29  1174 Aug 22 07:27 package.json
    -rw-r--r--  1 eris29 eris29  1036 Aug 22 07:27 rollup.config.js
    drwxr-xr-x  3 eris29 eris29  4096 Aug 22 07:27 scripts
    -rwxr-xr-x  1 eris29 eris29  1854 Aug 22 07:27 server.sh
    -rw-r--r--  1 eris29 eris29    20 Aug 22 07:27 test.py
    drwxr-xr-x  2 eris29 eris29  4096 Aug 22 07:27 tools



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Look for posts"
export posts=$project/_posts  # _posts inside project
cd $posts  # this should exist per fastpages
pwd  # present working directory
ls -l  # list posts
```

    Look for posts
    /home/eris29/APCSA/YLU_blog/_posts
    total 52
    -rw-r--r-- 1 eris29 eris29  5491 Aug 22 07:27 2019-08-08-text-and-typography.md
    -rw-r--r-- 1 eris29 eris29 11347 Aug 22 07:27 2019-08-08-write-a-new-post.md
    -rw-r--r-- 1 eris29 eris29  6676 Aug 22 07:27 2019-08-09-getting-started.md
    -rw-r--r-- 1 eris29 eris29  1930 Aug 22 07:27 2019-08-11-customize-the-favicon.md
    -rw-r--r-- 1 eris29 eris29 11175 Aug 22 07:43 2023-08-16-linux_shell.md
    -rw-r--r-- 1 eris29 eris29  7175 Aug 22 07:43 2023-08-20-JavaDS-linked-list.md



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Look for notebooks"
export notebooks=$project/_notebooks  # _notebooks is inside project
cd $notebooks   # this should exist per fastpages
pwd  # present working directory
ls -l  # list notebooks
```

    Look for notebooks
    /home/eris29/APCSA/YLU_blog/_notebooks
    total 36
    -rw-r--r-- 1 eris29 eris29 20737 Aug 22 07:58 2023-08-16-linux_shell.ipynb
    -rw-r--r-- 1 eris29 eris29 10888 Aug 22 07:42 2023-08-20-JavaDS-linked-list.ipynb



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Look for images in notebooks, print working directory, list files"
cd $notebooks/images  # this should exist per fastpages
pwd
ls -l
```

    Look for images in notebooks, print working directory, list files
    /home/eris29/APCSA/YLU_blog/_notebooks
    total 36
    -rw-r--r-- 1 eris29 eris29 21104 Aug 22 07:59 2023-08-16-linux_shell.ipynb
    -rw-r--r-- 1 eris29 eris29 10888 Aug 22 07:42 2023-08-20-JavaDS-linked-list.ipynb


    bash: line 6: cd: /images: No such file or directory


### Look inside a Markdown File
> "cat" reads data from the file and gives its content as output


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Navigate to project, then navigate to area wwhere files were cloned"

cd $project
echo "show the contents of README.md"
echo ""

cat README.md  # show contents of file, in this case markdown
echo ""
echo "end of README.md"

```

    Navigate to project, then navigate to area wwhere files were cloned
    show the contents of README.md
    
    <div align="center">
    
      # Chirpy Jekyll Theme
    
      A minimal, responsive and feature-rich Jekyll theme for technical writing.
    
      [![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy?color=brightgreen)][gem]&nbsp;
      [![CI](https://github.com/cotes2020/jekyll-theme-chirpy/actions/workflows/ci.yml/badge.svg?branch=master&event=push)][ci]&nbsp;
      [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4e556876a3c54d5e8f2d2857c4f43894)][codacy]&nbsp;
      [![GitHub license](https://img.shields.io/github/license/cotes2020/jekyll-theme-chirpy.svg)][license]&nbsp;
      [![996.icu](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg)](https://996.icu)
    
      [**Live Demo →**][demo]
    
      [![Devices Mockup](https://chirpy-img.netlify.app/commons/devices-mockup.png)][demo]
    
    </div>
    
    ## Features
    
    <details>
      <summary>
        <i>Click to view features</i>
      </summary>
      <p>
    
      - Dark / Light Theme Mode
      - Localized UI language
      - Pinned Posts on Home Page
      - Hierarchical Categories
      - Trending Tags
      - Table of Contents
      - Last Modified Date
      - Syntax Highlighting
      - Mathematical Expressions
      - Mermaid Diagrams & Flowcharts
      - Dark / Light Mode Images
      - Embed Videos
      - Disqus / Utterances / Giscus Comments
      - Built-in Search
      - Atom Feeds
      - Google Analytics
      - SEO & Performance Optimization
    
      </p>
    </details>
    
    ## Documentation
    
    To explore usage, development, and upgrade guide of the project, please refer to the [**Wiki**][wiki].
    
    ## Contributing
    
    Contributions (Issues/PRs/Discussions) are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. For details, see the "[Contributing Guidelines][contribute-guide]".
    
    ## Credits
    
    This theme is mainly built with [Jekyll][jekyllrb] ecosystem,
    [Bootstrap][bootstrap], [Font Awesome][icons] and some other [wonderful tools][lib].
    The avatar and favicon design come from [Clipart Max][image].
    
    Many thanks to the [contributors][contributors] who participated in the development
    and to the folks who reported bugs or shared ideas.
    
    Last but not least, thanks to [JetBrains][jetbrains] for providing the _Open Source License_.
    
    ## Sponsoring
    
    If you'd like to sponsor this project, the following options are available.
    
    [![Ko-fi](https://img.shields.io/badge/Support_Me_on_Ko--fi-ff5e5b?logo=ko-fi&logoColor=white)][ko-fi]&nbsp;
    [![Wechat Pay](https://img.shields.io/badge/Tip_Me_on_WeChat-brightgreen?logo=wechat&logoColor=white)][donation]&nbsp;
    [![Alipay](https://img.shields.io/badge/Tip_Me_on_Alipay-blue?logo=alipay&logoColor=white)][donation]
    
    ## License
    
    This work is published under [MIT License][license].
    
    [gem]: https://rubygems.org/gems/jekyll-theme-chirpy
    [ci]: https://github.com/cotes2020/jekyll-theme-chirpy/actions/workflows/ci.yml?query=event%3Apush+branch%3Amaster
    [codacy]: https://app.codacy.com/gh/cotes2020/jekyll-theme-chirpy/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade
    [license]: https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/LICENSE
    [jekyllrb]: https://jekyllrb.com/
    [bootstrap]: https://getbootstrap.com/
    [icons]: https://fontawesome.com/
    [image]: https://www.clipartmax.com/middle/m2i8b1m2K9Z5m2K9_ant-clipart-childrens-ant-cute/
    [demo]: https://cotes2020.github.io/chirpy-demo/
    [wiki]: https://github.com/cotes2020/jekyll-theme-chirpy/wiki
    [contribute-guide]: https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/docs/CONTRIBUTING.md
    [contributors]: https://github.com/cotes2020/jekyll-theme-chirpy/graphs/contributors
    [lib]: https://github.com/cotes2020/chirpy-static-assets
    [jetbrains]: https://www.jetbrains.com/?from=jekyll-theme-chirpy
    [ko-fi]: https://ko-fi.com/coteschung/
    [donation]: https://sponsor.cotes.page/
    
    end of README.md


## Env, Git and GitHub
> Env(ironment) is used to capture things like path to Code or Home directory.  Git and GitHub is NOT Only used to exchange code between individuals, it is often used to exchange code through servers, in our case deployment for Website.   All tools we use have a behind the scenes relationships with the system they run on (MacOS, Windows, Linus) or a relationship with servers which they are connected to (ie GitHub).  There is an "env" command in bash.  There are environment files and setting files (.git/config) for Git.  They both use a key/value concept.

- "env" show setting for your shell
- "git clone" sets up a director of files
- "cd $project" allows user to move inside that directory of files
- ".git" is a hidden directory that is used by git to establish relationship between machine and the git server on GitHub.  


```python
%%script bash

# This command has no dependencies

echo "Show the shell environment variables, key on left of equal value on right"
echo ""

env
```

    Show the shell environment variables, key on left of equal value on right
    
    SHELL=/bin/bash
    PYTHONUNBUFFERED=1
    WSL2_GUI_APPS_ENABLED=1
    rvm_prefix=/home/eris29
    WSL_DISTRO_NAME=Ubuntu-20.04
    rvm_stored_umask=0022
    ELECTRON_RUN_AS_NODE=1
    MY_RUBY_HOME=/home/eris29/.rvm/rubies/ruby-3.0.0
    RBENV_SHELL=bash
    VSCODE_AMD_ENTRYPOINT=vs/workbench/api/node/extensionHostProcess
    RUBY_VERSION=ruby-3.0.0
    NAME=Code
    PWD=/home/eris29/APCSA/YLU_blog/_notebooks
    LOGNAME=eris29
    rvm_version=1.29.12 (latest)
    rvm_user_install_flag=1
    PYDEVD_IPYTHON_COMPATIBLE_DEBUGGING=1
    MOTD_SHOWN=update-motd
    HOME=/home/eris29
    LANG=C.UTF-8
    WSL_INTEROP=/run/WSL/468301_interop
    LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:
    WAYLAND_DISPLAY=wayland-0
    CLICOLOR=1
    VSCODE_L10N_BUNDLE_LOCATION=
    rvm_bin_path=/home/eris29/.rvm/bin
    GEM_PATH=/home/eris29/.rvm/gems/ruby-3.0.0:/home/eris29/.rvm/gems/ruby-3.0.0@global
    GEM_HOME=/home/eris29/.rvm/gems/ruby-3.0.0
    LESSCLOSE=/usr/bin/lesspipe %s %s
    VSCODE_HANDLES_SIGPIPE=true
    TERM=xterm-color
    LESSOPEN=| /usr/bin/lesspipe %s
    USER=eris29
    GIT_PAGER=cat
    PYTHONIOENCODING=utf-8
    rvm_loaded_flag=1
    DISPLAY=:0
    SHLVL=2
    PAGER=cat
    VSCODE_CWD=/mnt/c/Users/maodo/AppData/Local/Programs/Microsoft VS Code
    MPLBACKEND=module://ipykernel.pylab.backend_inline
    XDG_RUNTIME_DIR=/run/user/1000/
    WSLENV=ELECTRON_RUN_AS_NODE/w:
    
    VSCODE_WSL_EXT_LOCATION=/mnt/c/Users/maodo/.vscode/extensions/ms-vscode-remote.remote-wsl-0.81.0
    XDG_DATA_DIRS=/usr/local/share:/usr/share:/var/lib/snapd/desktop
    PATH=/bin:/home/eris29/.local/bin:/home/eris29/.vscode-server/bin/6c3e3dba23e8fadc360aed75ce363ba185c49794/bin/remote-cli:/home/eris29/.rvm/gems/ruby-3.0.0/bin:/home/eris29/.rvm/gems/ruby-3.0.0@global/bin:/home/eris29/.rvm/rubies/ruby-3.0.0/bin:/home/eris29/.local/bin:/home/eris29/.rbenv/shims:/home/eris29/.rbenv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files/WindowsApps/MicrosoftCorporationII.WindowsSubsystemForLinux_1.2.5.0_x64__8wekyb3d8bbwe:/mnt/c/Program Files (x86)/VMware/VMware Player/bin/:/mnt/c/Windows/system32:/mnt/c/Windows:/mnt/c/Windows/System32/Wbem:/mnt/c/Windows/System32/WindowsPowerShell/v1.0/:/mnt/c/Windows/System32/OpenSSH/:/mnt/c/Users/maodo/AppData/Local/Microsoft/WindowsApps:/mnt/c/Users/maodo/AppData/Local/Programs/Microsoft VS Code/bin:/snap/bin:/home/eris29/.rvm/bin:/home/eris29/.rvm/bin:/home/eris29/.vscode-server/bin/6c3e3dba23e8fadc360aed75ce363ba185c49794/bin/remote-cli:/home/eris29/.rvm/gems/ruby-3.0.0/bin:/home/eris29/.rvm/gems/ruby-3.0.0@global/bin:/home/eris29/.rvm/rubies/ruby-3.0.0/bin:/home/eris29/.local/bin:/home/eris29/.rbenv/shims:/home/eris29/.rbenv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files/WindowsApps/MicrosoftCorporationII.WindowsSubsystemForLinux_1.2.5.0_x64__8wekyb3d8bbwe:/mnt/c/Program Files (x86)/VMware/VMware Player/bin/:/mnt/c/Windows/system32:/mnt/c/Windows:/mnt/c/Windows/System32/Wbem:/mnt/c/Windows/System32/WindowsPowerShell/v1.0/:/mnt/c/Windows/System32/OpenSSH/:/mnt/c/Users/maodo/AppData/Local/Microsoft/WindowsApps:/mnt/c/Users/maodo/AppData/Local/Programs/Microsoft VS Code/bin:/snap/bin:/home/eris29/.rvm/bin:/home/eris29/.rvm/bin
    DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
    VSCODE_NLS_CONFIG={"locale":"en","osLocale":"en","availableLanguages":{}}
    HOSTTYPE=x86_64
    IRBRC=/home/eris29/.rvm/rubies/ruby-3.0.0/.irbrc
    PULSE_SERVER=unix:/mnt/wslg/PulseServer
    VSCODE_HANDLES_UNCAUGHT_ERRORS=true
    rvm_path=/home/eris29/.rvm
    VSCODE_IPC_HOOK_CLI=/run/user/1000/vscode-ipc-867fe60f-6873-4b31-a8f6-3213fa0f18a3.sock
    _=/bin/env



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

cd $project

echo ""
echo "show the secrets of .git"
cd .git
ls -l

echo ""
echo "look at config file"
cat config
```

    
    show the secrets of .git
    total 72
    -rw-r--r--   1 eris29 eris29    16 Aug 22 07:27 COMMIT_EDITMSG
    -rw-r--r--   1 eris29 eris29    96 Aug 22 07:57 FETCH_HEAD
    -rw-r--r--   1 eris29 eris29    21 Aug 22 07:27 HEAD
    -rw-r--r--   1 eris29 eris29    41 Aug 22 07:27 ORIG_HEAD
    drwxr-xr-x   2 eris29 eris29  4096 Aug 22 07:27 branches
    -rw-r--r--   1 eris29 eris29   290 Aug 22 07:27 config
    -rw-r--r--   1 eris29 eris29    73 Aug 22 07:27 description
    drwxr-xr-x   2 eris29 eris29  4096 Aug 22 07:27 hooks
    -rw-r--r--   1 eris29 eris29 16778 Aug 22 07:27 index
    drwxr-xr-x   2 eris29 eris29  4096 Aug 22 07:27 info
    drwxr-xr-x   3 eris29 eris29  4096 Aug 22 07:27 logs
    drwxr-xr-x 120 eris29 eris29  4096 Aug 22 07:27 objects
    -rw-r--r--   1 eris29 eris29   112 Aug 22 07:27 packed-refs
    drwxr-xr-x   5 eris29 eris29  4096 Aug 22 07:27 refs
    
    look at config file
    [core]
    	repositoryformatversion = 0
    	filemode = true
    	bare = false
    	logallrefupdates = true
    [remote "origin"]
    	url = https://github.com/YLu-1258/YLU_blog.git
    	fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "main"]
    	remote = origin
    	merge = refs/heads/main
    [credential]
    	helper = store


## Advanced Student Request - Make a file in Bash
> This example was requested by a student (Jun Lim, CSA). The request was to make jupyer file using bash, I adapted the request to markdown.  This type of thought will have great extrapolation to coding and possibilities of using List, Arrays, or APIs to build user interfaces.  JavaScript is a language where building HTML is very common.

> To get more interesting output from terminal, this will require using something like mdless (https://github.com/ttscoff/mdless).  This enables see markdown in rendered format.
- On Desktop [Install PKG from MacPorts](https://www.macports.org/install.php)
- In Terminal on MacOS
    - [Install ncurses](https://ports.macports.org/port/ncurses/)
    - ```gem install mdless```
    
> Output of the example is much nicer in "jupyter"


```python
%%script bash

# This example has error in VSCode, it run best on Jupyter
cd /tmp

file="sample.md"
if [ -f "$file" ]; then
    rm $file
fi

tee -a $file >/dev/null <<EOF
# Show Generated Markdown
This introductory paragraph and this line and the title above are generated using tee with the standard input (<<) redirection operator.
- This bulleted element is still part of the tee body.
EOF

echo "- This bulleted element and lines below are generated using echo with standard output (>>) redirection operator." >> $file
echo "- The list definition, as is, is using space to seperate lines.  Thus the use of commas and hyphens in output." >> $file
actions=("ls,list-directory" "cd,change-directory" "pwd,present-working-directory" "if-then-fi,test-condition" "env,bash-environment-variables" "cat,view-file-contents" "tee,write-to-output" "echo,display-content-of-string" "echo_text_>\$file,write-content-to-file" "echo_text_>>\$file,append-content-to-file")
for action in ${actions[@]}; do  # for loop is very similar to other language, though [@], semi-colon, do are new
  action=${action//-/ }  # convert dash to space
  action=${action//,/: } # convert comma to colon
  action=${action//_text_/ \"sample text\" } # convert _text_ to sample text, note escape character \ to avoid "" having meaning
  echo "    - ${action//-/ }" >> $file  # echo is redirected to file with >>
done

echo ""
echo "File listing and status"
ls -l $file # list file
wc $file   # show words
mdless $file  # this requires installation, but renders markown from terminal

rm $file  # clean up termporary file
```

## Hack Preparation.
> Review Tool Setup Procedures and think about some thing you could verify through a Shell notebook.
- Come up with your own student view of this procedure to show your tools are installed.  It is best that you keep the few things you understand, add things later as you start to understand them.
- Name and create blog notes on some Linux commands you will use frequently.
- Is there anything we use to verify tools we installed? Review versions?
- How would you update a repository?  Use the git command line? 



```python
%%script bash

## Verify tool versions
echo "============================================="
echo "Verifying Tool versions"
echo "============================================="
python_version=$(python --version)
jupyter_version=$(jupyter --version | grep "notebook" | cut -d' ' -f3)
ruby_version=$(ruby -v | cut -d' ' -f2)
echo "Python version: $python_version"
echo "Jupyter Notebook version: $jupyter_version"
echo "Ruby version: $ruby_version"

## Verify Jupyter Kernel installation
echo "==============================================="
echo "Verifying Jupyter Kernels"
echo "==============================================="
if [[ $(jupyter kernelspec list | grep java) ]]; then
    java_kernel=$(jupyter kernelspec list | grep java | cut -d' ' -f14)
    echo "Java kernel installed at $java_kernel"
else 
    read -p "Java kernel not found, install? (Yy/Nn)" yn
    if (( yn == 'Y' || yn == 'y' )); then
        wget https://github.com/SpencerPark/IJava/releases/download/v1.3.0/ijava-1.3.0.zip -O ijava.zip
        unzip ./ijava.zip
        python3 ./install.py --sys-prefix
    fi
fi
if [[ $(jupyter kernelspec list | grep python) ]]; then
    python_kernel=$(jupyter kernelspec list | grep python | cut -d' ' -f11)
    echo "Python kernel installed at $python_kernel"
else 
    echo "Python kernel not installed, maybe dl through vscode and run sudo apt-get install python3 -y?"
fi
```

    =============================================
    Verifying Tool versions
    =============================================
    Python version: Python 3.8.10
    Jupyter Notebook version: 6.0.3
    Ruby version: 2.7.0p0
    ===============================================
    Verifying Jupyter Kernels
    ===============================================
    Java kernel installed at /usr/share/jupyter/kernels/java
    Python kernel installed at /usr/share/jupyter/kernels/python3

