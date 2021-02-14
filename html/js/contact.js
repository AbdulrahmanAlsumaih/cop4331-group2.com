
let counter = 1;
let contacts_per_page = 5;
let contact = [["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"],["a", "b", "a@gmail", "123-456-7890", "02/12/2021"]];
let num_pages = 1;
let universal_id;
// Main function to create the table, grabs the contacts and then creates the table
function createTable() {

  // Find the number of pages
	drawTable();
	//getContactNum(updateCounter, 0);
	
}

function getContacts(callback){
	// Code to get contacts from DB
	let jsonPayload = '{"pagenumber":' + counter + '}';
	let url = urlBase + '/getcontacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		// Send JSON
		xhr.send(jsonPayload);

		// Recieve response
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				// Parse the jsonObject
				let jsonObject = JSON.parse(xhr.responseText);
				
				// Reset the contact object
				contact = [];
				
				// Check for an error
				if(jsonObject["error"] == "No results found"){
					callback();
					return;
				}
					
				// Convert the jsonObject to an array
				values = Object.values(jsonObject);

				// For each contact in the response
				for(i=0; i < values.length; i++) {

					// Append the contact information to the contacts object (ugly line time)
					contact.push(new Array(values[i]['firstname'],values[i]['lastname'],values[i]['phone'],values[i]['email'],values[i]['date'],values[i]['num']));
				}
				
				// Call the callback function that draws the table
				callback();
		
			}
		};

	} catch(err) {
	document.getElementById("getContactResult").innerHTML = err.message;
	}
	
}

function drawTable(){
	let tr;
	let td;
	
	/*
	The save variable holds the header element (the very top row of the table). The next line "...innerHTML = '' " resets the entirety of the table.
	The final line "...appendChild(save)" adds the header element back to the table. This is done to clear the table elements when the user wants to change pages.
	*/
  let save = document.getElementById("header");
  document.getElementById("create-table").innerHTML = '';
  document.getElementById("create-table").appendChild(save);
	
	/*
	This nested loop dynamically created table elements. 'tr' is a row and 'td' is each colummn (first, last, phone) in the row.
	After creating all of the elements of the row, appendChild() is called to add the element of the end of the table.
	*/
	
	// If they have no contacts
	if(num_pages == 0)
	{
		// document.getElementById("create-table").innerHTML = "No Contacts Found";
		
		// PUT STUFF HERE
	}
	
	// Otherwise make the contacts table
	else
	{
		for (let i = 0; i < contact.length; i++) {
			tr = document.createElement('tr');
			tr.id = "num" + String(((counter - 1) * contacts_per_page) + i + 1);
			for (let j = 0; j < contact[i].length; j ++) { 
			  td = document.createElement('td');
			  td.innerHTML = contact[i][j];
			  tr.appendChild(td);
			}
			td = document.createElement('td');
			td.innerHTML = "<img id= 'edit"+ String(((counter - 1) * contacts_per_page) + i + 1)+"' src=\"img/edit.png\" onclick=\"overlayOnUpdate(this.id);\" class=\"edit-button\">"
			tr.appendChild(td);
			console.log(tr.id);
			document.getElementById("create-table").appendChild(tr);
		}
	}
	
}

function changePage(change) {
	
	// Figure out how many contacts there are and then update the counter
	getContactNum(updateCounter, change);

}

function getContactNum(callback, change)
{
	// Code to get contact num from DB
	let url = urlBase + '/countcontacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	

	try {
		
		xhr.send("");

		// Recieve response
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				// Parse the jsonObject
				let jsonObject = JSON.parse(xhr.responseText );
				
				// Grab the number of contacts and use that to calculate the number of pages
				num_pages = Math.ceil(jsonObject['num'] / contacts_per_page);
				callback(change);
		
			}
		};

	} catch(err) {
	console.log("error!");
	document.getElementById("getContactResult").innerHTML = err.message;
	}
}

function updateCounter(change) {
	
	// Update the counter
	if (change == 1) {
		counter++;
		if (counter > num_pages)
			counter = 1;
	} else if (change == -1) {
		counter--;
		if (counter < 1)
			counter = num_pages;
	}
	
	// Grab the contacts from the database and then draw the table again
	getContacts(drawTable);
}

function replace() {
	let Image_Id = document.getElementById('magnify');
	Image_Id.style="width:50%; height:50%;";
	Image_Id.type="text";
	Image_Id.placeholder = "Enter contact here";
	document.getElementById("submit-magnify").innerHTML = "<button class=\"submit-mag\">Submit</button>";
}

function overlayOnAdd() {
	document.getElementById("add-overlay").style.display = "block";
}
  
function overlayOffAdd() {
	document.getElementById("add-overlay").style.display = "none";
}

function overlayOnUpdate(id) {
	document.getElementById("update-overlay").style.display = "block";
	universal_id = id.substring(4);
}

function completeUpdate()
{
	let arr = [	document.getElementById("u-firstname"), document.getElementById("u-lastname"), document.getElementById("u-email"), 
				document.getElementById("u-phone"), document.getElementById("u-date")];
	document.getElementById("num"+universal_id).innerHTML = '';
	tr = document.getElementById("num"+universal_id);
	for (let i = 0; i < arr.length; i++) {
		td = document.createElement('td');
		td.innerHTML = arr[i].value;
		tr.appendChild(td);
	}
	td = document.createElement('td');
	td.innerHTML = "<img id= 'edit"+ String(universal_id)+"' src=\"img/edit.png\" onclick=\"overlayOnUpdate(this.id);\" class=\"edit-button\">";
	tr.appendChild(td);
	overlayOffUpdate();
}
  
function overlayOffUpdate() {
	document.getElementById("update-overlay").style.display = "none";
}

function overlayOnDelete() {
	document.getElementById("delete-overlay").style.display = "block";
}
  
function overlayOffDelete() {
	document.getElementById("delete-overlay").style.display = "none";
}

function overlayOnSign() {
	document.getElementById("signup-overlay").style.display = "block";
}
  
function overlayOffSign() {
	document.getElementById("signup-overlay").style.display = "none";
}

function addContact() {
	let firstName = document.getElementById("a-firstname").value;
	let lastName = document.getElementById("a-lastname").value;
	let email = document.getElementById("a-email").value;
	let phone = document.getElementById("a-phone").value;
	let date = document.getElementById("a-date").value;
	document.getElementById("addContactResult").innerHTML = "";

	if (firstName === "" || lastName === "") {
		document.getElementById("addContactResult").innerHTML = "Please add a full name.";
		return;
	}

	if (isNaN(phone)) {
		document.getElementById("addContactResult").innerHTML = "Please enter a valid phone number.";
		return;
	}
	
	let jsonPayload = '{"firstname" : "' + firstName + '", "lastname" : "' + lastName + '", "email" : "' + email + '", "phone" : "' + phone + '", "date" : "' + date + '"}';
	let url = urlBase + '/addcontact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("addContactResult").innerHTML = "Contact Added!";
			}
		};
	} catch(err) {
		document.getElementById("addContactResult").innerHTML = err.message;
	}
	
}




// Function not complete
function searchContact() {
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";
	
	let jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("searchContactResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ ) {
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 ) {
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);

	} catch(err) {
		document.getElementById("searchContactResult").innerHTML = err.message;
	}
	
}

// Function obv not complete
function deleteContact() {
	
}