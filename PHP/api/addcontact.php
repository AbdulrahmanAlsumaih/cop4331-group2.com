<?php
	$inData = getRequestInfo();
	session_start();
	$num = 0;
	// Check if user is logged in
	if ($_SESSION['id'] == NULL)
	{
		returnWithError('ERROR: User must be logged in', -1);
		exit();
	}
	// Connect to the DB
	$conn = new mysqli("localhost", "db_user", "123", "contact_db"); 
	
	// If there is a connection error return it
	if ($conn->connect_error) 
	{
		returnWithError( $conn->error, -1 );
		$conn->close();
		exit();
	}
	
	else
	{
		// Find out what the latest contact's number was
		$sql = "SELECT num FROM contacts ORDER BY num DESC LIMIT 1;";
		$result = $conn->query($sql);
		
		// Get the highest num value and add 1. If there isnt a highest num value use 0
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$num = $row["num"];
			$num = $num + 1;
		}
		
		// Insert the new contact record into the database
		$sql = "insert into contacts (num,id,firstname,lastname,email,phone,date) VALUES (" . $num . "," . $_SESSION['id'] . ",'" . $inData['firstname'] . "','" . $inData['lastname'] . "','" . $inData['email'] . "'," . $inData['phone'] . "," . $inData['date'] . ")";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error, -1 );
		}
		$conn->close();
	}
	
	returnWithError("", $num);
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err, $num )
	{
		$retValue = '{"num":"' . $num . '", "error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
