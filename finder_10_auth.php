<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core2.php';

$source = 'sec';

include './includes/uni_conn.php';
include './includes/core_security.php';
// Assuming the user credentials are valid and $userId is obtained
//session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $err = [];
    // Validate input
    if (empty($username) || empty($password)) {
        $err['error'] = "Please fill all fields.";
        echo json_encode($err, JSON_PRETTY_PRINT);
    } else {
        // Check if username exists
        $stmt = $conn4->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];


            $userId = $user['user_id'];
            $jwt = generateJWT($userId);

            setcookie("authToken", $jwt, time() + (3600 * 24), "/");

            header('Content-Type: application/json');
            echo json_encode(['token' => $jwt], JSON_PRETTY_PRINT);
        } else {
            $err['error'] = "Invalid username or password.";
            echo json_encode($err, JSON_PRETTY_PRINT);
        }
    }
}else{
    http_response_code(405); // Method Not Allowed
    echo "Method Not Allowed";
    exit();
}
