<?php
// URL to which the POST request will be sent
$query = 'SELECT * FROM sbp_data';
$url = 'http://192.168.2.142:8080/aggregate/gres.jsp?dbHost=192.168.100.122&dbName=nrs_data&dbUser=postgres&dbPassword=postgres&dbPort=5432&sqlCommand='.urlencode($query);

// Data to be sent in the POST request
$data = [
    'key1' => 'value1',
    'key2' => 'value2'
];

// Initialize a cURL session
$ch = curl_init($url);

$fileName = 'database/sbpData.html';
// Set the cURL options
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BUFFERSIZE, 128000); // Adjust the buffer size as needed
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $str) {
    global $fileName;
    $fp = fopen($fileName, 'a');
    $write = fwrite($fp, $str);
    fclose($fp);
    return $write;
});

// Execute the POST request
$response = curl_exec($ch);

// Check for errors
if ($response === false) {
    $error = 'Curl error: ' . curl_error($ch);
    // Write the error to a file
    file_put_contents($fileName, $error, FILE_APPEND);
}

echo 'Done!!';
// Close the cURL session
curl_close($ch);
