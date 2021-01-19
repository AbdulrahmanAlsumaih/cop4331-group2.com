<?php
	$inData = $_GET;
	session_start();
	echo $_SESSION['id'];
	// Check if user is logged in
	if ($_SESSION['id'] == NULL)
	{
		returnWithError('ERROR: User must be logged in');
		exit();
	}
	// Connect to the DB
	$conn = new mysqli("localhost", "db_user", "123", "contact_db"); 
	
	// If there is a connection error return it
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
		$conn->close();
		exit();
	}
	
	else
	{
		$sql = "insert into contacts (id,firstname,lastname,email,phone,date) VALUES (" . $_SESSION['id'] . ",'" . $inData['firstname'] . "','" . $inData['lastname'] . "','" . $inData['email'] . "'," . $inData['phone'] . "," . $inData['date'] . ")";
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
