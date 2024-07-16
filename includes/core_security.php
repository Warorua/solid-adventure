<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;

function generateJWT($userId) {
    $key = "your_secret_key"; // Replace with your secret key
    $payload = [
        'iss' => "your_domain.com", // Issuer
        'iat' => time(), // Issued at
        'exp' => time() + 3600, // Expiration time (e.g., 1 hour)
        'userId' => $userId // Custom data
    ];
    $algorithm = 'HS256'; // Specify the algorithm

    return JWT::encode($payload, $key, $algorithm);
}

