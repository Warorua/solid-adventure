<?php
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
} elseif(isset($_COOKIE['authToken'])){
    $jwt = $_COOKIE['authToken'];
    //echo $jwt;
    $decoded = verifyJWT($jwt);
     echo json_encode($decoded);
    if ($decoded) {
        // Token is valid, proceed with your logic
        //echo "Hello, User ID: " . $decoded['userId'];
        echo 'ok';
        $userId = $decoded['userId'];
        //echo $userId;
    } else {
        // Invalid token
        http_response_code(401);
        echo json_encode(['message' => 'Unauthorized'], JSON_PRETTY_PRINT);
        die();
    }
}else {
    // No token provided
    http_response_code(401);
    echo json_encode(['message' => 'Authorization token not found'], JSON_PRETTY_PRINT);
    die();
}


if($source == 'kever'){
    $pdo = new Kever();
}elseif($source == 'pin_data'){
    $pdo = new pinData();
}else{
    $pdo = new Security();
}


$conn4 = $pdo->open();
