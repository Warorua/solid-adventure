<?php
require 'vendor/autoload.php';
include './includes/core_auto.php';
include './includes/conn_auto.php';

class Database
{
    private $server = "mysql:host=srv677.hstgr.io;dbname=u117204720_deepwoods";
    private $username = "u117204720_deepwoods";
    private $password = 'Wj9|10g0oN';
    private $options  = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_PERSISTENT => true,  // Use persistent connections
    );

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

if ($conn === null) {
    // Connection failed, stop further processing
    exit('Unable to connect to the database.');
}
if (isset($_GET['bypid'])) {
    $_POST['id'] = json_encode(['id' => $_GET['bypid']]);
}

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $id = json_decode($id, true);
    $id = $id['id'];

    $stmt = $conn->prepare("SELECT * FROM upgw WHERE id = :id");
    $stmt->execute(["id" => $id]);
    $row = $stmt->fetch();

    if (array_key_exists('result', $row)) {
        if ($row['result'] !== NULL) {
            $decodedResult = base64_decode($row['result'], true);  // Use true to suppress errors

            if ($decodedResult === false) {
                echo 'Decoding Failed';  // If decoding fails, output this
            } else {
                echo $decodedResult;  // Output the decoded result
            }
        } else {
            echo 'EMPTY';  // Handle null result case
        }
    } else {
        echo 'Result field does not exist in the array! -- ID: ' . $id . '<br/>' . json_encode($row);  // Debug output if result is not set at all
    }
} else {
    echo 'Script Error!';  // Handle case where 'id' is not set
}

$pdo->close();
