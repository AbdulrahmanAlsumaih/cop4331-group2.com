<?
    $inData = getRequestInfo();
    
    //Connect to the DB
    $conn = new mysqli("localhost", "db_user", "123", "contact_db");

    //checks the connections
    if($conn->connect_error)
    {
        returnWithError($conn->error);
        $conn->close();
        exit();
    }
    else
    {
        $sql = "UPDATE contacts SET firstname = $inData['firstname'], 'lastname' = $inData['lastname'], email = $inData['email'], phone = $inData['phone']";
        if($result = $conn->query($sql) != TRUE)
        {
            returnWithError( $conn->error);
        }
        $conn->close();
    }

    //functions 
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);)
    }
    function returnWithError($err)
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }


?>