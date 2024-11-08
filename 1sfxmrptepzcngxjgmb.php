<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

$source = 'sec';
$itemLog = 'HeToken Bridge';
$authbypass = TRUE;

include './includes/core2.php';
include './includes/uni_conn.php';


// Initialize variables
$token = $parseKey = null;

// Check for 'output' and 'parseKey' in URL parameters first
if (isset($_GET['output']) && isset($_GET['parseKey'])) {
    $outputData = json_decode(urldecode($_GET['output']), true);
    $token = $outputData['data']['generateToken']['token'] ?? 'Token not found';
    $parseKey = $_GET['parseKey'];
} else {
    // Fallback to checking the request body
    $requestBody = file_get_contents('php://input');
    if (!empty($requestBody)) {
        parse_str($requestBody, $data);

        if (isset($data['output'])) {
            $outputData = json_decode(urldecode($data['output']), true);
            $token = $outputData['data']['generateToken']['token'] ?? 'Token not found';
            $parseKey = $data['parseKey'] ?? 'Parse Key not found';
        } else {
            http_response_code(400);
            $message = "Required fields 'output' or 'parseKey' not found in the request.";
            echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
            exit;
        }
    } else {
        http_response_code(400);
        $message = "Required parameters not set!";
        echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
        exit;
    }
}

// If token and parseKey are found, proceed with the database insertion
if ($token && $parseKey) {
    $dt = [
        'token' => $token,
        'parseKey' => $parseKey
    ];

    echo json_encode($dt, JSON_PRETTY_PRINT);

    try {
        // Insert data into the database
        $stmt = $conn4->prepare("INSERT INTO callback (`token`, `key`, `status`) VALUES (:token, :key, :status)");
        $stmt->execute(['token' => $token, 'key' => $parseKey, 'status' => '1']);
        $message = "Data inserted successfully with token: $token and parseKey: $parseKey";
        
    } catch (PDOException $e) {
        http_response_code(500);
        $message = "Database insertion failed: " . $e->getMessage();
        echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
    }
} else {
    http_response_code(400);
    $message = "Token or parseKey not found after processing.";
    echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
}

// Capture any GET parameters and include in the log
$dt1 = ['get' => $_GET];

// Log the system action
log_system($itemLog, $message);

