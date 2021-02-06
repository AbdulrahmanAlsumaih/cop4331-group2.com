let urlBase = 'http://www.cop4331-group2.com/api';
let extension = 'php';
let counter = 1;
let contacts_per_page = 3;
let contact = [["1", "Smith", "1-234-567-8910"], ["2", "last", "number"], ["3", "Smith", "1-234-567-8910"], ["4", "last", "number"], ["5", "Smith", "1-234-567-8910"], ["6", "last", "number"], ["7", "Smith", "1-234-567-8910"], ["8", "last", "number"], ["9", "Smith", "1-234-567-8910"], ["10", "last", "number"]];
let num_pages = Math.ceil(contact.length / contacts_per_page);

function createTable() {

  let length = counter * contacts_per_page;
  let tr;
  let td;
  	/*
		The save variable holds the header element (the very top row of the table). The next line "...innerHTML = '' " resets the entirety of the table.
		The final line "...appendChild(save)" adds the header element back to the table. This is done to clear the table elements when the user wants to change pages.
	*/
  let save = document.getElementById("header");
  document.getElementById("create-table").innerHTML = '';
  document.getElementById("create-table").appendChild(save);
  
  	// use the getcontact() function to retrieve the contacts for this page
	contact = getContact(counter);

	/*
		This nested loop dynamically created table elements. 'tr' is a row and 'td' is each colummn (first, last, phone) in the row.
		After creating all of the elements of the row, appendChild() is called to add the element of the end of the table.
  	*/
  for (let i = length - contacts_per_page; i < length; i++) {
    tr = document.createElement('tr');
	
	for (let j = 0; j < contact[i].length; j ++) {
      td = document.createElement('td');
      td.innerHTML = contact[i][j];
      tr.appendChild(td);
	}

    document.getElementById("create-table").appendChild(tr);
  }
}

function changePage(change) {
	if (change == 1) {
		counter++;
		if (counter > num_pages)
			counter = 1;
	} else if (change == -1) {
		counter--;
		if (counter < 1)
			counter = num_pages;
	}
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

function overlayOnUpdate() {
	document.getElementById("update-overlay").style.display = "block";
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

function addContact() {
	let firstName = document.getElementById("a-firstname").value;
	let lastName = document.getElementById("a-lastname").value;
	let email = document.getElementById("a-email").value;
	let phone = document.getElementById("a-phone").value;
	let date = document.getElementById("a-date").value;
	document.getElementById("addContactResult").innerHTML = "";

	if (firstName === "" || lastName === "") {
		document.getElementById("addContactResult").innerHTML = "Please add a full name";
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
function getContact(counter) {
	
	let contacts = [];
	let contact = [];
	
	let jsonPayload = '{"pagenumber" : "' + counter + '}';
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
				let jsonObject = JSON.parse(xhr.responseText );
				
				// For each contact in the response
				for(var i in json_data) {
					// Append the contact information to the singular contact object
					contact.push(i['firstname'];
					contact.push(i['lastname'];
					contact.push(i['phone'];
					contact.push(i['email'];
					contact.push(i['date'];
					contact.push(i['num'];
				}
				
				// Push the contact array into the big contacts array
				contacts.push(contact);
			}
		};
		
	} catch(err) {
		document.getElementById("getContactResult").innerHTML = err.message;
	}
	
	return contacts;
	
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
