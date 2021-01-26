<?php

        $inData = getRequestInfo();

        $id = 0;

        $conn = new mysqli("localhost", "db_user", "123", "contact_db");
        if ($conn->connect_error)
        {
                returnWithError( $conn->connect_error );
        }
        else
        {
                $sql = "SELECT id FROM users where email='" . $inData["email"] . "' and pass='" . $inData["pass"] . "'";
                $result = $conn->query($sql);
                if ($result->num_rows > 0)
                {
                        $row = $result->fetch_assoc();
                        $id = $row["id"];
                        session_start();
                        $_SESSION["id"] = $id;
                        returnWithInfo($id);
                }
                else
                {
                        returnWithError( "User not found" );
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

        function returnWithInfo( $id )
        {
                $retValue = '{"id":' . $id . ',"error":""}';
                sendResultInfoAsJson( $retValue );
        }

?>
