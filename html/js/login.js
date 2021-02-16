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
	let hash = md5(password); // Hashing password
	
	document.getElementById("loginResult").innerHTML = "";

	// Creating the jsonPayload
	let jsonPayload = '{"email" : "' + login + '", "pass" : "' + hash + '"}';
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

function doLogout() {
	let url = urlBase + '/logout.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
	window.location.href = "index.html";
}

function doSignUp() {
	
	// Getting data from the html IDs
	let signupEmail = document.getElementById("signupEmail").value;
	let password = document.getElementById("signupPassword").value;
	
    document.getElementById("signupResult").innerHTML = "";
    
    if (signupEmail == "" && password == "") {
		document.getElementById("signupResult").innerHTML = "Please enter an email/password";
        return;
    }
	
    if (signupEmail == "") {
		document.getElementById("signupResult").innerHTML = "Please enter an email address";
        return;
    }
	
    if (password == "") {
		document.getElementById("signupResult").innerHTML = "Please enter a password";
        return;
    }

	let hash = md5(password); // Hashing password
	
	// Creating the jsonPayload
	let jsonPayload = '{"email" : "' + signupEmail + '", "pass" : "' + hash + '"}';
	let url = urlBase + '/newuser.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		// Sending json
		xhr.send(jsonPayload);

		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("signupResult").innerHTML = "Account registered!";
				window.location.href = "home.html";
			}
		};
		
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}

