<?php
    //gets the open session
    session_start();

    if($_SESSION['id'] == NULL)
    {
        returnWithError('ERROR: User must be logged in to logout');
        exit();
    }

    //get rid of cookie
    setcookie("user", "", time() -3600 );

    //clear the session variables
    session_unset();
    unset($_SESSION['id']);
    //destroy session

    session_destroy();

    function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>