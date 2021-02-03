let urlBase = 'http://www.cop4331-group2.com/api';
let extension = 'php';
let counter = 1;

function createTable() {
  //let email = document.getElementById("email").value;
  //let pass = document.getElementById("pass").value;
  let length = counter * 2;
  let contact = [["1", "Smith", "1-234-567-8910"], ["2", "last", "number"], ["3", "Smith", "1-234-567-8910"], ["4", "last", "number"], ["5", "Smith", "1-234-567-8910"], ["6", "last", "number"], ["7", "Smith", "1-234-567-8910"], ["8", "last", "number"], ["9", "Smith", "1-234-567-8910"], ["10", "last", "number"]];
  let tr;
  let td;
  let save = document.getElementById("header");
  
  document.getElementById("create-table").innerHTML = '';
  document.getElementById("create-table").appendChild(save);
  
  for (let i = length - 2; i < length; i++) {
    tr = document.createElement('tr');
	
	for (let j = 0; j < 3; j ++) {
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
		if (counter > 5)
			counter = 1;
	} else if (change == -1) {
		counter--;
		if (counter < 1)
			counter = 5;
	}
}

function replace() {
	let Image_Id = document.getElementById('magnify');
	Image_Id.style="width:50%; height:50%;";
	Image_Id.type="text";
	Image_Id.placeholder = "Enter contact here";
	document.getElementById("submit-magnify").innerHTML = "<button class=\"submit-mag\">Submit</button>";
}

function overlayOn() {
	document.getElementById("overlay").style.display = "block";
}
  
function overlayOff() {
	document.getElementById("overlay").style.display = "none";
}

function addContact() {
	let firstName = document.getElementById("firstname").value;
	let lastName = document.getElementById("lastname").value;
	let email = document.getElementById("email").value;
	let phone = document.getElementById("phone").value;
	let date = document.getElementById("date").value;
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
function getContact() {
	//document.getElementById("colorSearchResult").innerHTML = "";
	
	let contacts = [];
	
	let jsonPayload = '{"pagenumber" : "' + 1 + '}';
	let url = urlBase + '/getcontacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ ) {
					contacts.push(jsonObject.results[i]);
					if( i < jsonObject.results.length - 1 ) {
						contacts += "<br />\r\n";
					}
				}
				
				createTable(contacts);
			}
		};
		xhr.send(jsonPayload);

	} catch(err) {
		document.getElementById("getContactResult").innerHTML = err.message;
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

function deleteContact() {
	
}