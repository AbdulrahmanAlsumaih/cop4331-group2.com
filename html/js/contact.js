let counter = 1;
let contacts_per_page = 5;
let contact = [];
let header = ["first", "last", "phone", "email", "date"];
let num_pages = 1;
// universal_id is equivalent to contact.num
let universal_id;
let search = '';

// Main function to create the table, grabs the contacts and then creates the table
function createTable(isSearching) {
	
	// change the page but not really
	changePage(0,isSearching);
	
}

function changePage(change, isSearching) {
	
	// Figure out how many contacts there are and then update the counter
	getContactNum(updateCounter, change, isSearching);
	
}

// Reloads the current table page after add, update, or delete
function reloadTablePage() {
	getContacts(drawTable);
}

// Updates the page number
function updateCounter(change, isSearching) {
	
	// Update the counter
	if (change == 1) {
		counter++;
		if (counter > num_pages) {
			counter = 1;
		}
	} else if (change == -1) {
		counter--;
		if (counter < 1) {
			counter = num_pages;
		}
		
		// Grab the contacts from the database and then draw the table again
		// If searching, grab contacts from the search functions
		if(isSearching == 1) {
			getSearchResults(drawTable);
		}
		else {
			getContacts(drawTable);
		}
	}
}
	
function drawTable() {
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
			tr.id = "num" + String(contact[i][5]); 
			for (let j = 0; j < header.length; j ++) { 
				td = document.createElement('td');
				td.innerHTML = contact[i][j];
				td.id = header[j] + String(contact[i][5]);
				tr.appendChild(td);
			}
			td = document.createElement('td');
			
			// This line adds the pencil image and calls overlayOnUpdate() when the image is clicked. "this.id" is the images id 
			// (example: edit32 where 32 is contact.num and becomes universal_id)

			td.innerHTML = "<i id= 'edit"+ String(contact[i][5])+"' onclick=\"overlayOnUpdate(this.id);\" class=\"fa fa-pencil-square-o edit-button\"></i>"
			tr.appendChild(td);
			document.getElementById("create-table").appendChild(tr);
		}
	}
	
}
	
	
function getContactNum(callback, change, isSearching) {
	// See if a search was being performed
	if(isSearching == 1) {
		search = localStorage.getItem("search");
		console.log("search time");
	}
	else {
		search = '';
	}
	
	// Code to get contact num from DB
	let url = urlBase + '/countcontacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	jsonPayload = '';
	
	// add the search if possible
	if(isSearching == 1) {
		jsonPayload = '{"search" : "' + search + '"}';
	}
	console.log("search: " + search + ", jsonPayload: " + jsonPayload);

	try {
		
		xhr.send(jsonPayload);

		// Recieve response
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				// Parse the jsonObject
				let jsonObject = JSON.parse(xhr.responseText );
				
				// Grab the number of contacts and use that to calculate the number of pages
				num_pages = Math.ceil(jsonObject['num'] / contacts_per_page);
				callback(change, isSearching);
		
			}
		};

	} catch(err) {
		console.log(err.message);
		document.getElementById("getContactResult").innerHTML = err.message;
	}
}

function getSearchResults(callback){
	// Code to get contacts from DB
	let jsonPayload = '{"pagenumber":' + counter + ', "search":"' + search + '"}';
	let url = urlBase + '/searchcontacts.' + extension;

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


/*
Similar to drawTable, this function dynamically creates elements
*/
function overlayOnUpdate(id) {
	universal_id = id.substring(4);
	
	// arr[i][0] = id, arr[i][1] = label's innerText (subject to change because I'm not sure why it isn't appearing on the site), arr[i][2] = placeholder
	let arr = [["u-firstname", "First Name", "first name"], ["u-lastname", "Last Name", "last name"], ["u-phone", "Phone Number", "phone"],
	["u-email", "Email Address", "email"], ["u-date", "Date", "date"]];
	let element;
	let lab;
	let inp;
	document.getElementById("updateform").innerHTML = "";
	for (let i = 0; i < header.length; i++)
	{
		element = document.createElement('div');
		element.className = 'form-group';
		/*
		Equivalent to: <label class="login-text" for="u-phone">Phone Number:</label>
		*/
		lab = document.createElement('label');
		lab.className = "update-text"; lab.for = arr[i][0]; lab.innerText = arr[i][1];
		element.appendChild(lab);
		
		/*
		Equivalent to: <input type="tel" class="form-control" id="u-phone" placeholder="Enter phone">
		*/
		inp = document.createElement('input');
		inp.type = "text"; inp.className = "form-control"; inp.id = arr[i][0]; inp.placeholder = "Enter " + arr[i][2];
		inp.value = document.getElementById(header[i] + universal_id).innerHTML;
		element.appendChild(inp);
		document.getElementById("updateform").appendChild(element);
	}
	document.getElementById("update-overlay").style.display = "block";
}

function addContact() {
	// Grabbing all values from the HTML add form
	let firstName = document.getElementById("a-firstname").value;
	let lastName = document.getElementById("a-lastname").value;
	let email = document.getElementById("a-email").value;
	let phone = document.getElementById("a-phone").value;
	document.getElementById("addContactResult").innerHTML = "";
	
	// Error checking that at least the first name was filled
	if (firstName === "") {
		document.getElementById("addContactResult").innerHTML = "Please enter at least a first name.";
		return;
	}
	
	// Error checking for phone number
	if (isNaN(phone)) {
		document.getElementById("addContactResult").innerHTML = "Please enter a valid phone number.";
		return;
	}
	
	if (phone.length > 10) {
		document.getElementById("addContactResult").innerHTML = "Phone number is too long.";
		return;
	}
	
	if (lastName === "") {
		lastName = "-";
	}
	
	if (email === "") {
		email = "-";
	}
	
	if (phone === "") {
		phone = "-";
	}
	
	// Getting the current date and formatting it
	let today = new Date();
	let d = today.getDate();
	let m = today.getMonth() + 1;
	let y = today.getFullYear();
	let date = m + '/' + d + '/' + y;
	
	let jsonPayload = '{"firstname" : "' + firstName + '", "lastname" : "' + lastName + '", "email" : "' + email + '", "phone" : "' + phone + '", "date" : "' + date + '"}';
	console.log(jsonPayload);
	let url = urlBase + '/addcontact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try {
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("addContactResult").innerHTML = "Contact Added!";
				clearAdd();
			}
		};
	} catch(err) {
		document.getElementById("addContactResult").innerHTML = err.message;
	}
	
}

function searchContact() {
	
	// Store the search value
	var search = document.getElementById('search').value;
	localStorage.setItem("search", search);
	
	// Redirect to search result page
	window.location.href = "search.html";
}

// Function obv not complete
function deleteContact() {
	let id = universal_id;
	let jsonPayload = '{"num":"' + id + '"}';
	let url = urlBase + '/deletecontact.' + extension;
	console.log(jsonPayload);
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		// Sending json
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(xhr.responseText);
				let jsonObject = JSON.parse(xhr.responseText);
			}
		};
		
	} catch(err) {
		document.getElementById("updateResult").innerHTML = err.message;
	}
}

// Clears the form upon clicking the close button
function clearAdd() {
	document.getElementById("addform").reset();
}

// This function will be called once the user hits update submit button
function completeUpdate()
{
	let first = document.getElementById("u-firstname").value;
	let last = document.getElementById("u-lastname").value;
	let phone = document.getElementById("u-phone").value;
	let email = document.getElementById("u-email").value;
	let id = universal_id;
	let jsonPayload = '{"firstname":"' + first + '", "lastname":"' + last + '", "email":"' + email + '", "phone":"' + phone + '", "num":"' + id + '"}';
	let url = urlBase + '/update.' + extension;
	console.log(jsonPayload);
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		// Sending json
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(xhr.responseText);
				let jsonObject = JSON.parse(xhr.responseText);
				document.getElementById("updateResult").innerHTML = "Contact Updated!";
			}
		};
		
	} catch(err) {
		document.getElementById("updateResult").innerHTML = err.message;
	}
	document.getElementById("updateform").reset();
}

// All overlay functions
function overlayOnAdd() {
	document.getElementById("add-overlay").style.display = "block";
}

function overlayOffAdd() {
	document.getElementById("add-overlay").style.display = "none";
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

function replace() {
	let Image_Id = document.getElementById('magnify');
	Image_Id.style="width:50%; height:50%;";
	Image_Id.type="text";
	Image_Id.placeholder = "Enter contact here";
	document.getElementById("submit-magnify").innerHTML = "<button class=\"submit-mag\">Submit</button>";
}

function eraseResponse(response) {
	document.getElementById(response).innerHTML = "";
}