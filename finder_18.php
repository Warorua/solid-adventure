<?php
require 'vendor/autoload.php';
include './includes/core2.php';
include './includes/uni_conn.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (empty($_POST['auth_token'])) {
        http_response_code(400);
        echo json_encode(['status' => false, 'error' => 'Incomplete request']);
        exit();
    }

    $auth_token = $_POST['auth_token'];

    $stmt = $conn4->prepare("SELECT user_id FROM users WHERE auth_token = :auth_token LIMIT 1");
    $stmt->execute(['auth_token' => $auth_token]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['status' => false, 'error' => 'Invalid token']);
    } else {
        echo json_encode(['status' => true, 'user_id' => $user['user_id']]);
    }

    exit();

} else {
    http_response_code(400);
    echo json_encode(['status' => false, 'error' => 'Required parameters not set']);
}
