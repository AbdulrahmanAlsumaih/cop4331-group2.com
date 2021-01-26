<?php

	$inData = getRequestInfo();
	
	$id = 0;
	
	// Make sure the form was not blank	
	if($inData['pass'] == "")
	{
		returnWithError( "Error, password field blank" );
		$conn->close();
	}

	$conn = new mysqli("localhost", "db_user", "123", "contact_db");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT email FROM users where email='" . $inData["email"] . "'";
		$result = $conn->query($sql);
		
		// Check to see if user already exists or not
		if ($result->num_rows == NULL)
		{
			// Find out what the latest user's id number was
			$sql = "SELECT id FROM users ORDER BY id DESC LIMIT 1;";
			$result = $conn->query($sql);
			if ($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();
				$id = $row["id"];
				
				// Increment the ID
				$id = $id + 1;
			}
			
			else
			{
				returnWithError( $conn->connect_error . "yeehaw1");
			}
				
			// Create new user here
			$sql = "insert into users (email,pass, id) VALUES ('" . $inData["email"] . "','" . $inData["pass"] . "'," . $id . ")";
			if( $result = $conn->query($sql) != TRUE )
				{
					returnWithError( $conn->error);
				}
			$conn->close();		
			returnWithInfo($id);
		}
		else
		{
			returnWithError( "ERROR: User already exists or username was blank" );
		}
		$conn->close();
	}
	
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
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($id )
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
