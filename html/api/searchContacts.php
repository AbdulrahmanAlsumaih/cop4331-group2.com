<?php

    $inData = getRequestInfo();

    $searchResults = "";
    $searchCount = 0;
    
    //gets the open session
    session_start();
    //if there is no previous session ERROR
    if($_SESSION['id'] == NULL)
    {
        returnWithError('ERROR: User must be logged in');
        exit();
    }
    // connect to the Database.
    $conn = new mysqli("localhost", "db_user", "123", "contact_db");
    // return error if connection fail to establish.
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
        $conn->close();
        exit();
    }
    else
    {
        $sql = "SELECT * FROM contacts where firstname  like '%" . $inData["search"] . "%' or lastname  like '%" . $inData["search"] . "%' or email  like '%" . $inData["search"] . "%' or phone  like '%" . $inData["search"] . "%'";
        $result = $conn->query($sql);

        if($result->num_rows > 0)
        {
            // output data of each row
            while($row = $result->fetch_assoc()) 
            {
                if($searchCount > 0)
                {
                    $searchResults .= ",";
                }
                $searchCount++;
                $searchResults .= '"' . $row["firstname"] .  '", "' . $row["lastname"] . '", "' . $row["email"] .  '", "' . $row["phone"] .  '"';
            }
        }
        else
        {
            returnWithError("No Records Found");
            $conn->close();
        }
        returnWithInfo($searchResults);
        $conn->close();
    }
    

    function getRequestInfo()
    {
    	return json_decode(file_get_contents('php://input'), true);
    }
    function sendResultInfoAsJson($obj)
    {
    	header('Content-type: application/json');
    	echo $obj;
    }
    function returnWithInfo($searchResults)
    {
	    $retValue = '{"results":[' . $searchResults . '],"error":""}';
	    sendResultInfoAsJson($retValue);
    }
    
    function returnWithError($err)
    {
    	$retValue = '{"firstName":"","lastName":"","error":"' . $err . '"}';
    	sendResultInfoAsJson($retValue);
    }
?>