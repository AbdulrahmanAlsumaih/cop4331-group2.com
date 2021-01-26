let urlBase = 'http://www.cop4331-group2.com/api';
let extension = 'php';

function createTable()
{
  //let email = document.getElementById("email").value;
  //let pass = document.getElementById("pass").value;
  let length = 10;
  let contact = [["John", "Smith", "1-234-567-8910"], ["first", "last", "number"], ["John", "Smith", "1-234-567-8910"], ["first", "last", "number"], ["John", "Smith", "1-234-567-8910"], ["first", "last", "number"], ["John", "Smith", "1-234-567-8910"], ["first", "last", "number"], ["John", "Smith", "1-234-567-8910"], ["first", "last", "number"]];
  let tr;
  let td;
  for (let i = 0; i < length; i++)
  {
    tr = document.createElement('tr');
    for (let j = 0; j < 3; j ++)
    {
      td = document.createElement('td');
      td.innerHTML = contact[i][j];
      tr.appendChild(td);
    }
    document.getElementById("create-table").appendChild(tr);
  }
}

function replace()
{
	let Image_Id = document.getElementById('magnify');
	Image_Id.style="width:40%; height:10%;";
	Image_Id.type="text";
	Image_Id.placeholder = "Enter contact here";
	document.getElementById("submit-magnify").innerHTML = "<button class=\"submit-mag\">Submit</button>";
}

/*
function getContact()
{
	//document.getElementById("colorSearchResult").innerHTML = "";
	
	var contacts = [];
	
	var jsonPayload = '{"pagenumber" : "' + 1 + '}';
	var url = urlBase + '/getcontacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contacts.push(jsonObject.results[i]);
					if( i < jsonObject.results.length - 1 )
					{
						contacts += "<br />\r\n";
					}
				}
				
				createTable(contacts);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
*/