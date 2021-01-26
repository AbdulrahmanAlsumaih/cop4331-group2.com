<?php
	$inData = getRequestInfo();
	session_start();
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
		// This query checks for id as well to make sure no one is being a hacker.
		$sql = "delete from contacts where num = ". $inData['num'] . " and id = " . $_SESSION['id'];
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
