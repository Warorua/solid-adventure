<?php
require 'vendor/autoload.php';
include './includes/core_auto.php';
include './includes/conn_auto.php';

class Database
{
    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_upgw";
    private $username = "u854855859_upgw";
    private $password = "I3@0|Ux?8";
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

$pdo = new Database();
$conn = $pdo->open();

$debug = isset($_GET['debug']) && $_GET['debug'] === 'true';  // Check for debug mode

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $stmt = $conn->prepare("SELECT * FROM upgw WHERE id = :id");
    $stmt->execute(["id" => $id]);
    $row = $stmt->fetch();

    if ($debug) {
        echo "<pre>Fetched Row: " . print_r($row, true) . "</pre>"; // Display fetched row in debug mode
    }

    if ($row && isset($row['result']) && $row['result'] !== NULL) {
        $decodedResult = base64_decode($row['result']);

        if ($debug) {
            echo "<pre>Decoded Result: " . $decodedResult . "</pre>"; // Display decoded result in debug mode
        }

        echo $decodedResult;  // Return the decoded result
    } else {
        if ($debug) {
            echo "<pre>Result is empty or NULL</pre>"; // Display message if result is empty in debug mode
        }
        echo 'EMPTY';  // Return 'EMPTY' if no result is found
    }
} else {
    echo 'Script Error!';  // Handle case where 'id' is not set
}

$pdo->close();
