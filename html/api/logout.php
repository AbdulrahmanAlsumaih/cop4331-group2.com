<?php
    //gets the open session
    session_start();

    if($_SESSION['id'] == NULL)
    {
        returnWithError('ERROR: User must be logged in to logout');
        exit();
    }

    //clear the session variables
    session_unset();

    //destroy session

    session_destroy();

    function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>