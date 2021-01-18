<?php
	$inData = getRequestInfo();
	
	$ID = $inData["id"];
	$pass = $inData["pass"];
	$FirstName = $inData["firstName"];
	$LastName = $inData["lastName"];
	$Email = $inData["email"];
	$Phone = $inData["phone"];
	$Date = $inData["date"];

	// Connect to the DB
	$conn = new mysqli("localhost", "db_user", "123", "contacts_db"); 
	
	// If there is a connection error return it
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	}
	
	// If it works, check to make sure no one is being a hacker
	else 
		{
		$sql = "SELECT ID,email FROM users where email='" . $inData["email"] . "' and pass='" . $inData["pass"] . "'";
		$result = $conn->query($sql);
		
		// If there are no rows that match they need to log in again
		if ($result->num_rows = 0)
		{
			returnWithError( "AUTH Error, please log in again");
			$conn->close();
		}
	
	else
	{
		$sql = "insert into contacts (id,firstname,lastname,email,phone,date) VALUES (" . $id . ",'" . $FirstName . "','" . $LastName . "','" . $Email . "'," . $Phone . "," . $date . ")";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>