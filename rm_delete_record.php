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

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $id = json_decode($id, true);
    $id = $id['id'];

    $stmt = $conn->prepare("DELETE FROM upgw WHERE id = :id");
    $stmt->execute(["id" => $id]);

    if ($stmt->rowCount() > 0) {
        echo 'Record deleted successfully.';
    } else {
        echo 'Record not found or already deleted.';
    }
} else {
    echo 'Invalid request.';
}

$pdo->close();
