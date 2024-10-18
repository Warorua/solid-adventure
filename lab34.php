<?php
// Read the file content
$file = file_get_contents("./PingTest.class");

// Gzip the file content
//$gzippedFile = gzencode($file, 9); // 9 is the maximum compression level

$gzippedFile = $file;


// Base64 encode the gzipped content
$enc = base64_encode($gzippedFile);

// Write the base64 encoded content to a file
//file_put_contents("PingURLBase64.txt", $enc);
echo $enc;