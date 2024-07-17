<?php
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$key = "VyX2RvbWFpbi5jb20iLCJpYXQiOjE3MjExODM3MTksImV4cCI6MTcyMTE4NzMxOSwidX"; // Replace with your secret key
$payload = [
    //'iss' => "your_domain.com", // Issuer
    'iat' => time(), // Issued at
    'exp' => time() + 3600, // Expiration time (e.g., 1 hour)
    'userId' => '96_1' // Custom data
];

/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$jwt = JWT::encode($payload, $key, 'HS256');
echo $jwt;
$decoded = JWT::decode($jwt, new Key($key, 'HS256'));

//print_r($decoded);
//echo json_encode($decoded);
