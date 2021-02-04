let urlBase = 'http://www.cop4331-group2.com/api';
let extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {
	userId = 0;
	
	// Getting data from the html IDs
	let login = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;
	//let hash = md5(password); // Hashing password
	
	document.getElementById("loginResult").innerHTML = "";

	// Creating the jsonPayload
	let jsonPayload = '{"email" : "' + login + '", "pass" : "' + password + '"}';
	let url = urlBase + '/login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try {
		// Sending json
		xhr.send(jsonPayload);

		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
		
				userId = jsonObject.id;
		
				if( userId < 1 ) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				window.location.href = "home.html";
			}
		};
		
	} catch(err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Function needs to be fixed
function doLogout() {
	userId = 0;
	let url = urlBase + '/logout.' + extension;
	window.location.href = "index.html";
}

