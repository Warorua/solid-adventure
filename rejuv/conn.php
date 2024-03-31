<?php
class Database
{


    private $server = "mysql:host=192.168.0.65;dbname=upgw";
    private $username = "root";
    private $password = "happycoding";
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


$pdo = new Database();

$conn = $pdo->open();
