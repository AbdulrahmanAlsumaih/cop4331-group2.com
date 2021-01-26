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
		// Use the page number to determine which records to get
		$lastvalue = $inData['pagenumber'] * 5;
		$firstvalue = $lastvalue - 5;
		
		// Retrieve the data from the db
		$sql = "select num,firstname,lastname,email,phone,date from contacts where id = " . $_SESSION['id'] . " limit " . $firstvalue . "," . $lastvalue . ";";
		
		$result = $conn->query($sql);
		
		if( $result == NULL )
		{
			returnWithError($conn->error, -1 );
			die();
		}
		
		// Make sure data was returned
		if ($result->num_rows > 0) {
			
			// Create the big array
			$contacts = "{";
			
			// Simple variable for iteration
			$i = 0;
			
			// Loop through the results
			while($row = $result->fetch_assoc()) {
				
				// Create a contact
				$contact = "{firstname:'" . $row['firstname'] . "', lastname:'" . $row['lastname'] . "', email:'" . $row['email'] . "', phone:" . $row['phone'] . ", date:" . $row['date'] . ", num:" . $row['num'] . "}";
				
				// Add it to the big array
				$contacts = $contacts . "contact" . $i . ":'" . $contact . "'," ;
				
				// Increment the contact number
				$i += 1;
			}
			
			// Remove the trailing comma 
			$contacts = rtrim($contacts, ", ");
			
			// Add the closing bracket
			$contacts = $contacts . "}";
			
			// Return with the data
			sendResultInfoAsJson($contacts);
			$conn->close();
		}
		
		// If nothing found, return an error
		else {
			$conn->close();
			returnWithError("No results found", 0);
		}
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
	
?>