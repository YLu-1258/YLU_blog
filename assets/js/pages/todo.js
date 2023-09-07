function newInputRow(idx) {
	// Create new row of inputs in the todo table, increment the 
	let row = table1.insertRow(-1);
	let index = row.insertCell(0);
	let task = row.insertCell(1);
	let className = row.insertCell(2);
	let deadline = row.insertCell(3);
	let columns = [task, className, deadline];
	let i = 0;
	while (i < columns.length) {
		let newInput = document.createElement("input");
		newInput.setAttribute("type", "text");
		newInput.addEventListener("keydown", function(event) {
			detectCompletion(event, row);
		});
		columns[i].appendChild(newInput);
		i++;
	}
	index.innerHTML += idx;
	
}

function storeLocally() {
	// Store a row of information as JSON in browser local storage
    let json = "";
    row = 1;
    
    for (let i = 0; i < table1.rows.length; i++) {
        console.log("slocal");
        json = '{"name": "' + table1.rows[i].cells[1].querySelector('input').value + '","class": "' + table1.rows[i].cells[2].querySelector('input').value + '","due": "' + table1.rows[i].cells[3].querySelector('input').value + '"}'; 
        localStorage.setItem(row, json);
        localStorage.setItem("indexCount", indexCount);
        console.log(row + json);
        json = "";
        row++;
    }
}

function readStorage() {
    // Read the storage, add rows to the todo-list
    if (!localStorage.getItem("indexCount")) {
        console.log("hey");
		indexCount = 1;
        newInputRow(1);
        return;
    }
    else {
		indexCount = localStorage.getItem("indexCount");
        for (let i = 0; i<=indexCount-1; i++) {
			console.log(i);
            data = localStorage.getItem(i+1);
            dataParsed = JSON.parse(data);
            newInputRow(i+1);
            table1.rows[i].cells[1].querySelector('input').value = dataParsed["name"];
            table1.rows[i].cells[2].querySelector('input').value = dataParsed["class"];
            table1.rows[i].cells[3].querySelector('input').value = dataParsed["due"];
        }

    }
}

function detectCompletion(event, row) {
	// Whenever we press enter or table, we wnat to check
	let key_pressed = event.key;
	if (key_pressed == "Tab" || key_pressed == "Enter") {
		console.log("detect")
		console.log("row.cells=" + row.cells[0].innerHTML)
		console.log("idx=" + indexCount)
		event.preventDefault();
        storeLocally();
		if (row.cells[0].innerHTML == indexCount) {
			console.log("pass1");
			for (let i = 1; i < row.cells.length; i++) {
				let cell_input = row.cells[i].querySelector('input');
				if (cell_input) {
					console.log("pass2")
					let content = cell_input.value.trim();
					if (content === "") { 
						return;
					}
				}
			}
			newInputRow(++indexCount);
			
		}
	}
}

function getNewQuote() {
	// Get new motivational quote from the API
		const data = null;

		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		
		xhr.addEventListener('readystatechange', function () {
			if (this.readyState === this.DONE) {
				quote = (this.responseText);
						quoteParsed = JSON.parse(quote);
						document.getElementById("quote").innerHTML = quoteParsed["text"];
						document.getElementById("author").innerHTML = quoteParsed["author"];
						console.log(quoteParsed["author"]);
						console.log(quoteParsed["text"]);
			}
		});
		
		xhr.open('GET', 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info');
		xhr.setRequestHeader('X-RapidAPI-Key', 'eb0bbc6cc0msh085b254f1761bc2p154cf4jsne59a8dbdbaa0');
		xhr.setRequestHeader('X-RapidAPI-Host', 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com');
		
		xhr.send(data);
}