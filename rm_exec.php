<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';


class Database
{


    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_upgw";
    private $username = "u854855859_upgw";
    private $password = "U!#7KUTZCm5c";
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

// Specify the file path
$file_path = 'pyscrpts/mysql.py';

// Check if the file exists
if (file_exists($file_path)) {
    // Open the file in binary mode
    $file_content = file_get_contents($file_path);

    // Encode the file content to base64
    $base64_encoded_content = base64_encode($file_content);

    // Output or save the base64 encoded content
    echo $base64_encoded_content;
} else {
    echo "File does not exist.";
}
?>
