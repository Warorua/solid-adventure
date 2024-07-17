<?php
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use \Firebase\JWT\ExpiredException;

class pinData
{


    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_pin_data";
    private $username = "u854855859_pin_data";
    private $password = "uK*EFvX/F/?5";
    private $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,);
    protected $conn;

    public function open()
    {
        try {
            $this->conn = new PDO($this->server, $this->username, $this->password, $this->options);
            return $this->conn;
        } catch (PDOException $e) {
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function close()
    {
        $this->conn = null;
    }
}

class Kever
{


    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_kever";
    private $username = "u854855859_kever";
    private $password = "W3v~$9oN0q!";
    private $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,);
    protected $conn;

    public function open()
    {
        try {
            $this->conn = new PDO($this->server, $this->username, $this->password, $this->options);
            return $this->conn;
        } catch (PDOException $e) {
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function close()
    {
        $this->conn = null;
    }
}

class Security
{


    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_security";
    private $username = "u854855859_security";
    private $password = "6w1Gvqg[+sE$";
    private $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,);
    protected $conn;

    public function open()
    {
        try {
            $this->conn = new PDO($this->server, $this->username, $this->password, $this->options);
            return $this->conn;
        } catch (PDOException $e) {
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function close()
    {
        $this->conn = null;
    }
}
//$dbFile = 'nationPersons.db';
$start = date('Y-m-d H:i:s');
//*

header('Content-Type: application/json');
// In your protected endpoint
$headers = apache_request_headers();


function generateJWT($userId)
{
    $key = "VyX2RvbWFpbi5jb20iLCJpYXQiOjE3MjExODM3MTksImV4cCI6MTcyMTE4NzMxOSwidX"; // Replace with your secret key
    $payload = [
        //'iss' => "your_domain.com", // Issuer
        'iat' => time(), // Issued at
        'exp' => time() + 3600, // Expiration time (e.g., 1 hour)
        'userId' => $userId // Custom data
    ];
    $algorithm = 'HS256'; // Specify the algorithm

    return JWT::encode($payload, $key, $algorithm);
}

function verifyJWT($token) {
    $key = "VyX2RvbWFpbi5jb20iLCJpYXQiOjE3MjExODM3MTksImV4cCI6MTcyMTE4NzMxOSwidX"; // Replace with your secret key
    try {
        // Decode the JWT
        $decoded = JWT::decode($token, new Key($key, 'HS256'));

        // Convert the decoded object to an associative array
        $decodedArray = json_decode(json_encode($decoded), true);

        return $decodedArray;
    } catch (ExpiredException $e) {
        // Token has expired
        http_response_code(401);
        echo json_encode(['message' => 'Token has expired'], JSON_PRETTY_PRINT);
       die();
    } catch (Exception $e) {
        // Other errors
        http_response_code(401);
        echo json_encode(['message' => 'Token error!'], JSON_PRETTY_PRINT);
        die();
    }
}


if (!isset($authbypass)) {
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        $arr = explode(" ", $authHeader);
        $jwt = $arr[1];

        $decoded = verifyJWT($jwt);


        if ($decoded) {
            // Token is valid, proceed with your logic
            //echo "Hello, User ID: " . $decoded['userId'];
            $userId = $decoded['userId'];
        } else {
            // Invalid token
            http_response_code(401);
            echo json_encode(['message' => 'Unauthorized'], JSON_PRETTY_PRINT);
            die();
        }
    } elseif (isset($_COOKIE['authToken'])) {
        $jwt = str_replace(' ','',$_COOKIE['authToken']);
        $decoded = verifyJWT($jwt);

       // echo json_encode($decoded);

        if ($decoded) {
            // Token is valid, proceed with your logic
            //echo "Hello, User ID: " . $decoded['userId']
            $userId = $decoded['userId'];
            //echo $userId;
        } else {
            // Invalid token
            http_response_code(401);
            echo json_encode(['message' => 'Unauthorized'], JSON_PRETTY_PRINT);
            die();
        }
    } else {
        // No token provided
        http_response_code(401);
        echo json_encode(['message' => 'Authorization token not found'], JSON_PRETTY_PRINT);
        die();
    }
}


if ($source == 'kever') {
    $pdo = new Kever();
} elseif ($source == 'pin_data') {
    $pdo = new pinData();
} else {
    $pdo = new Security();
}


$conn4 = $pdo->open();
