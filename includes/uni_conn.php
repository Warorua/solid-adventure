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
//$dbFile = 'nationPersons.db';
$start = date('Y-m-d H:i:s');
//*

if($source == 'kever'){
    $pdo = new Kever();
}elseif($source == 'pin_data'){
    $pdo = new pinData();
}


$conn4 = $pdo->open();

header('Content-Type: application/json');