<?php
ini_set('memory_limit', '-1');

class Database
{
    //private $server = "mysql:host=localhost;dbname=tsavosit_faith";
    //private $username = "root";
    //private $password = "";
    private $server = "mysql:host=db-mysql-nyc-kever-do-user-14417139-0.b.db.ondigitalocean.com:25060;dbname=the_kever";
    private $username = "bombardier_master";
    private $password = "AVNS_2LlwUW9Aa6fSkAOa4y0";
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

class Database2
{
    //private $server = "mysql:host=localhost;dbname=tsavosit_faith";
    //private $username = "root";
    //private $password = "";
    private $server = "mysql:host=localhost;dbname=kever";
    private $username = "root";
    private $password = "";
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


$pdo2 = new Database2();

$conn2 = $pdo2->open();

$stmt = $conn->prepare("SELECT * FROM nrs_dt");
$stmt->execute();
$dt3 = $stmt->fetchAll();

foreach ($dt3 as $row) {
    $stmt2 = $conn2->prepare("UPDATE nrs_dt2 SET do_load='done' WHERE id='".$row['id']."'");
    $stmt2->execute();
    echo $row['id'] . PHP_EOL;
}
echo 'done';
//echo $dt3['numrows'];
