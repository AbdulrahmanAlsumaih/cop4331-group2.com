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


function doLogout() {
	userId = 0;
	// document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	
	window.location.href = "index.html";
}

// function searchColor()
// {
// 	let srch = document.getElementById("searchText").value;
// 	document.getElementById("colorSearchResult").innerHTML = "";
	
// 	let colorList = "";
	
// 	let jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
// 	let url = urlBase + '/SearchColors.' + extension;
	
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	try
// 	{
// 		xhr.onreadystatechange = function() 
// 		{
// 			if (this.readyState == 4 && this.status == 200) 
// 			{
// 				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
// 				let jsonObject = JSON.parse( xhr.responseText );
				
// 				for( let i=0; i<jsonObject.results.length; i++ )
// 				{
// 					colorList += jsonObject.results[i];
// 					if( i < jsonObject.results.length - 1 )
// 					{
// 						colorList += "<br />\r\n";
// 					}
// 				}
				
// 				document.getElementsByTagName("p")[0].innerHTML = colorList;
// 			}
// 		};
// 		xhr.send(jsonPayload);
// 	}
// 	catch(err)
// 	{
// 		document.getElementById("colorSearchResult").innerHTML = err.message;
// 	}
	
// }