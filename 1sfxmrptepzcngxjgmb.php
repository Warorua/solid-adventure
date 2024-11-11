<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

$source = 'sec';
$itemLog = 'HeToken Bridge';
$authbypass = TRUE;

include './includes/core2.php';
include './includes/uni_conn.php';

// Initialize variables
$data_obj = $parseKey = null;

// Check if 'data' and 'parseKey' are in URL parameters
if (isset($_GET['data']) && isset($_GET['parseKey'])) {
    // Decode URL-encoded JSON and extract values
    //$outputData = json_decode(urldecode($_GET['data']), true);
    //$data_obj = $outputData['token'] ?? 'Token not found';
    $data_obj = $_GET['data'] ?? 'Token not found';
    $parseKey = $_GET['parseKey'];
} else {
    // Fallback: Check request body if URL parameters are missing
    $requestBody = file_get_contents('php://input');
    if (!empty($requestBody)) {
        $data = json_decode($requestBody, true); // Decode JSON directly if content-type is JSON

        if (isset($data['data']) && isset($data['parseKey'])) {
            //$outputData = json_decode(urldecode($data['data']), true);
            //$data_obj = $outputData['token'] ?? 'Token not found';
            $data_obj = $data['data'] ?? 'Token not found';
            $parseKey = $data['parseKey'];
        } else {
            // Error if required fields are missing in request body
            http_response_code(400);
            $message = "Required fields 'data' or 'parseKey' not found in the request.";
            echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
            log_system($itemLog, $message, true);
            exit;
        }
    } else {
        // Error if neither URL parameters nor request body contains required data
        http_response_code(400);
        $message = "Required parameters not set!";
        echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
        log_system($itemLog, $message, true);
        exit;
    }
}

// If token and parseKey are found, proceed with the database insertion
if ($data_obj && $parseKey) {
    $dt = [
        'token' => $data_obj,
        'parseKey' => $parseKey
    ];

    echo json_encode($dt, JSON_PRETTY_PRINT);

    try {
        // Insert data into the database
        $stmt = $conn4->prepare("INSERT INTO callback (`token`, `key`, `status`) VALUES (:token, :key, :status)");
        $stmt->execute(['token' => $data_obj, 'key' => $parseKey, 'status' => '1']);
        $message = "Data inserted successfully with token: $data_obj and parseKey: $parseKey";
        
    } catch (PDOException $e) {
        // Handle database insertion errors
        http_response_code(500);
        $message = "Database insertion failed: " . $e->getMessage();
        echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
        log_system($itemLog, $message, true);
        exit;
    }
} else {
    // Error if token or parseKey is not found after processing
    http_response_code(400);
    $message = "Token or parseKey not found after processing.";
    echo json_encode(['error' => $message], JSON_PRETTY_PRINT);
    log_system($itemLog, $message, true);
    exit;
}

// Capture any GET parameters for logging
$dt1 = ['get' => $_GET];
log_system($itemLog, $message, true);
