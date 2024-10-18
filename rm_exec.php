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

if (isset($_FILES['file'])) {
    $file_content = file_get_contents($_FILES['file']['tmp_name']);
    $base64_encoded_content = base64_encode($file_content);

    $stmt = $conn->prepare("INSERT INTO upgw (code) VALUES (:code)");
    $stmt->bindParam(':code', $base64_encoded_content);
    $stmt->execute();

    $id = $conn->lastInsertId();

    echo json_encode(['id' => $id]);
}

$pdo->close();
?>
