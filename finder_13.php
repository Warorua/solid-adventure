<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'sec';

include './includes/uni_conn.php';

// Get the raw POST data
$requestBody = file_get_contents('php://input');

// Check if the request has a body
if (!empty($requestBody)) {
    // Parse the URL-encoded string into an associative array
    parse_str($requestBody, $data);

    // Check if 'output' and 'parseKey' are present
    if (isset($data['output'])) {
        // Decode the JSON structure inside the 'output' field
        $outputData = json_decode(urldecode($data['output']), true);

        // Extract the 'token' value if it exists
        $token = $outputData['data']['generateToken']['token'] ?? 'Token not found';

        // Extract the 'parseKey' directly if it exists
        $parseKey = $data['parseKey'] ?? 'Parse Key not found';
        $dt = [];
        $dt['token'] = $token;
        $dt['parseKey'] = $parseKey;

        echo  json_encode($dt, JSON_PRETTY_PRINT);
        // Output the extracted values
        //echo "Token: " . $token . PHP_EOL;
        //echo "Parse Key: " . $parseKey . PHP_EOL;

        $stmt = $conn4->prepare("INSERT INTO callback (token, key, status) VALUES (:token, :key, :status)");
        $stmt->execute(['token' => $token, 'key' => $parseKey, 'status' => '1']);
    } else {
        echo "Required fields 'output' or 'parseKey' not found in the request." . PHP_EOL;
    }
} else {
    http_response_code(400);
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output, JSON_PRETTY_PRINT);
}
