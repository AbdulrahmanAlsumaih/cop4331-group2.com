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
		// grab all of the users contacts
		/*if ($inData['search']){
			error_log("searching time");
			$sql = "select num,firstname,lastname,email,phone,date from contacts where id = " . $_SESSION['id'] . "AND firstname  like '" . $inData["search"] . "%' or lastname  like '" . $inData["search"] . "%' or email  like '" . $inData["search"] . "%' or phone  like '" . $inData["search"] . ";";
		}
		else{
			$sql = "select num,firstname,lastname,email,phone,date from contacts where id = " . $_SESSION['id'] . ";";
		}
		*/
		$sql = "select num,firstname,lastname,email,phone,date from contacts where id = " . $_SESSION['id'] . ";";
		
		$result = $conn->query($sql);
		
		if( $result == NULL )
		{
			returnWithError($conn->error, -1 );
			die();
		}
		
		// Count the amount of retrieved contacts
		$num = $result->num_rows;
		
		// Return with the data
		returnWithNumber($num);
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
	
	function returnWithError( $err, $num )
	{
		$retValue = '{"num":"' . $num . '", "error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithNumber($num)
	{
		$retValue = '{"num":"' . $num . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>