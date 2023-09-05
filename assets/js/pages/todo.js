function new_input_row() {
	index_count++;
	var row = table1.insertRow(-1);
	var index = row.insertCell(0);
	var task = row.insertCell(1);
	var class_name = row.insertCell(2);
	var deadline = row.insertCell(3);
	let columns = [task, class_name, deadline];
	let i = 0;
	while (i < columns.length) {
		let new_input = document.createElement("input");
		new_input.setAttribute("type", "text");
		new_input.addEventListener("keydown", function(event) {
			detect_completion(event, row);
		});
		columns[i].appendChild(new_input);
		i++;
	}
	index.innerHTML += index_count;
}

function storeLocally() {
    var json = "";
    row = 1;
    
    for (var i = 0; i < table1.rows.length; i++) {
        console.log("slocal");
        json == '{"name": "' + table1.rows[i].cells[1].querySelector('input').value + ""," + table1.rows[i].cells[2].querySelector('input').value + " " + table1.rows[i].cells[3].querySelector('input').value; + "}" 
        localStorage.setItem(row, JSON.stringify(json));
        localStorage.setItem("index_count", index_count);
        console.log(row + json);
        json = "";
        row++;
    }
}

function detect_completion(event, row) {
	let key_pressed = event.key;
	if (key_pressed == "Tab" || key_pressed == "Enter") {
		console.log("detect")
		console.log("row.cells=" + row.cells[0].innerHTML)
		console.log("idx=" + index_count)
		event.preventDefault();
		if (row.cells[0].innerHTML == index_count) {
			console.log("pass1")
			for (var i = 1; i < row.cells.length; i++) {
				let cell_input = row.cells[i].querySelector('input');
				if (cell_input) {
					console.log("pass2")
                    storeLocally();
					let content = cell_input.value.trim();
					if (content === "") {
						return;
					}
				}
			}
			new_input_row();
		}
	}
}

function getNewQuote() {
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