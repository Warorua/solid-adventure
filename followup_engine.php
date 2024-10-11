<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

function httpPost($url, $data, $headers = null, $cookie_jar = null, $verif = true, $resp = true)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        if (is_array($data)) {
            $format_data = http_build_query($data);
        } else {
            $format_data = $data;
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $format_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIE, "visitorId=bombardierMaster");

        if (!$verif) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Disable hostname verification
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        }
        if ($headers != null) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);
        $response = curl_exec($ch);
        if ($response === false) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
    } catch (Exception $e) {

        trigger_error(
            sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(),
                $e->getMessage()
            ),
            E_USER_ERROR
        );
    } finally {
        // Close curl handle unless it failed to initialize
        if (is_resource($ch)) {
            curl_close($ch);
        }
    }

    if ($resp) {
        return $response;
    } else {
        return true;
    }
}

function httpGet($url, $data, $headers = null, $cookie_jar = null)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);
        curl_setopt($ch, CURLOPT_COOKIE, "visitorId=bombardierMaster");
        if ($headers != null) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        $response = curl_exec($ch);
        if ($response === false) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
    } catch (Exception $e) {

        trigger_error(
            sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(),
                $e->getMessage()
            ),
            E_USER_ERROR
        );
    } finally {
        // Close curl handle unless it failed to initialize
        if (is_resource($ch)) {
            curl_close($ch);
        }
    }

    return $response;
}

class Database
{


    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_redHat";
    private $username = "u854855859_redHat";
    private $password = "ccu*4HhD4^Cm";
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

class Database_2
{
    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_upgw";
    private $username = "u854855859_upgw";
    private $password = 'KH9pl$Tx3*M';
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

$pdo2 = new Database_2();
$conn2 = $pdo2->open();

echo 'FOLLOW UP ENGINE ACTIVE -1 ...';

function checkDeletionMessage($sentence)
{
    // Define the regular expression pattern to match the desired sentence format
    $pattern = "/^Successfully deleted records with billNumber='\w+' and clientRefNo='\w+'\.$/";

    // Use preg_match to check if the sentence matches the pattern
    if (preg_match($pattern, $sentence)) {
        return true;
    } else {
        return false;
    }
}

$stmt = $conn->prepare("SELECT * FROM bypass WHERE followup_status=:fus");
$stmt->execute(['fus' => '1']);
$data = $stmt->fetchAll();
foreach ($data as $row) {
    $stmt = $conn2->prepare("SELECT * FROM upgw WHERE id=:id");
    $stmt->execute(['id' => $row['followup_id']]);
    $dt1 = $stmt->fetch();
    echo json_encode($row);
    if ($dt1['status'] == '1') {
        $result = $dt1['result'];
        $res1 = base64_decode($result, true);
        $isMatch = checkDeletionMessage($res1);
        if ($isMatch) {
            $stmt = $conn->prepare("UPDATE bypass SET (ref=:ref,route=:route) WHERE id=:id");
            $stmt->execute(['ref' => '1', 'route'=>'1', 'id'=>$row['id']]);
            echo 'UPDATED: '.$row['id'];
        }
    }
    $stmt = $conn2->prepare("DELETE FROM upgw WHERE id=:id");
    $stmt->execute(['id' => $row['followup_id']]);
}
