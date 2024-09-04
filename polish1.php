<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
class Database
{
    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_upgw";
    private $username = "u854855859_upgw";
    private $password = "I3@0|Ux?8";
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


function modifyPythonScript($base64Script, $oldObj, $newObj)
{
    // Decode the base64 encoded script
    $decodedScript = base64_decode($base64Script);

    // Specify the old and new IP addresses
    //$oldObj = '192.168.100.156';
    //$newObj = '192.168.2.156';

    // Replace the old IP address with the new one
    $modifiedScript = str_replace($oldObj, $newObj, $decodedScript);

    // Encode the modified script back to base64
    $encodedScript = base64_encode($modifiedScript);

    return $encodedScript;
}

if (isset($_POST['rule'])) {
    $rule = $_POST['rule'];
    if ($rule == 'req') {
        $id = '92';
        $stmt = $conn->prepare("SELECT code FROM upgw WHERE id=:id");
        $stmt->execute(['id' => $id]);
        $code = $stmt->fetch();
        // Example usage
        $base64Script = $code['code'];
        $oldObj = '192.168.100.156';
        $newObj = '192.168.2.134';
        $modifiedBase64Script = modifyPythonScript($base64Script, $oldObj, $newObj);

        $stmt = $conn->prepare("INSERT INTO upgw (code) VALUES (:code)");
        $stmt->bindParam(':code', $modifiedBase64Script);
        $stmt->execute();

        $id = $conn->lastInsertId();

        echo json_encode(['id' => $id]);
        //echo $modifiedBase64Script; 
    }

    if($rule == 'del'){
        $id = '96';
        $inv_no = $_POST['invoice_no'];

        $stmt = $conn->prepare("SELECT code FROM upgw WHERE id=:id");
        $stmt->execute(['id' => $id]);
        $code = $stmt->fetch();

        // Example usage
        $base64Script = $code['code'];
        $oldObj = 'BL-UBP-177910';
        $newObj = $inv_no;
        $modifiedBase64Script = modifyPythonScript($base64Script, $oldObj, $newObj);

        $stmt = $conn->prepare("INSERT INTO upgw (code, work, title) VALUES (:code, :work, :title)");
        $stmt->execute(['code' => $modifiedBase64Script, 'work'=>'del', 'title'=>$inv_no]);
        $stmt->execute();

        $id = $conn->lastInsertId();

        echo $id;
        //echo $modifiedBase64Script; 
    }
}
