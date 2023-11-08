<?php
// IMAP server connection parameters
$hostname = '{kever.io:993/imap/ssl}INBOX.spam';
$username = 'mailer@kever.io';
$password = '6R-=ael8vxS{';

// Open an IMAP stream
$inbox = imap_open($hostname, $username, $password) or die('Cannot connect to the mail server: ' . imap_last_error());

// Get the total number of messages in the spam folder
$totalMessages = imap_num_msg($inbox);

// Loop through each message
for ($i = 1; $i <= $totalMessages; $i++) {
    // Get the headers and body of the message
    $header = imap_headerinfo($inbox, $i);
    //$body = imap_body($inbox, $i);
    // Fetch the text body part (if available)
    $body = imap_fetchbody($inbox, $i, 1); // Attempt to fetch text/plain part (Section 1)
    if (empty($body)) {
        $body = imap_fetchbody($inbox, $i, 2); // Attempt to fetch text/html part (Section 2)
    }

    // Get the sender's email address
    $senderEmail = $header->from[0]->mailbox . "@" . $header->from[0]->host;

    if ($senderEmail == 'donot_reply@ecitizen.go.ke') {
        echo 'Body: ' . $body . '<br>';
    }
    /*
    // Process the email data as per your requirement
    echo 'Subject: ' . $header->subject . '<br>';
    echo 'From: ' . $header->fromaddress . '<br>';
    echo 'Email: ' . $senderEmail . '<br>';
    echo 'Body: ' . $body . '<br>';
    echo '<hr>';
    */
}

// Close the IMAP stream
imap_close($inbox);
