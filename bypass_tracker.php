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
echo 'TRACKER ENGINE ACTIVE -1 ...';

function tokenizer()
{
    global $conn;
    $stmt = $conn->prepare('SELECT * FROM token LIMIT 1');
    $stmt->execute();
    $dtA = $stmt->fetch();
    $url = 'https://nairobiservices.go.ke/api/authentication/profile/';
    $headers = ['Authorization:Bearer ' . $dtA['token']];
    $cnTs = json_decode(httpGet($url, [], $headers), true);
    if (isset($cnTs['error'])) {
        $url = 'https://nairobiservices.go.ke/api/authentication/auth/generate_customer_token';
        $data = ['customer_no' => '2020_276753'];
        $dt1 = json_decode(httpGet($url, $data), true);
        if (is_array($dt1)) {
            if (isset($dt1['token'])) {
                $time = date(DATE_RFC2822);
                $stmt = $conn->prepare('UPDATE token SET token=:token, timestamp=:time, cid=:cid WHERE id=:id');
                $stmt->execute(['token' => $dt1['token'], 'id' => '1', 'time' => $time, 'cid' => '2020_276753']);
                return ['token' => $dt1['token'], 'status' => 'created'];
            } else {
                tokenizer();
            }
        } else {
            tokenizer();
        }
    } else {
        return ['token' => $dtA['token'], 'status' => 'used'];
    }
}
//echo json_encode(tokenizer()).'<br/>';

//MASTER TRACK UNPAID
$stmt = $conn->prepare('SELECT * FROM bypass WHERE master_status=:st1 OR master_status=:st2 ORDER BY RAND()');
$stmt->execute(['st1' => '', 'st2' => 'Unpaid']);
$dtA = $stmt->fetchAll();
foreach ($dtA as $row) {
    $invoice_no = $row['invoice_no'];

    $url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $invoice_no;
    $data = [];
    $headers = ['Authorization:Bearer ' . tokenizer()['token']];
    //echo $invtk;
    $dt12 = json_decode(httpGet($url, $data, $headers), true);
    if (isset($dt12['success'])) {
        $stmt = $conn->prepare('UPDATE bypass SET master_status=:msSt WHERE invoice_no=:invNo');
        $stmt->execute(['msSt' => $dt12['status'], 'invNo' => $invoice_no]);
        echo $invoice_no . ' - MASTER TRACKED<br/>';
    } elseif (isset($dt12['error'])) {
        $stmt = $conn->prepare('UPDATE bypass SET note=:note WHERE invoice_no=:invNo');
        $stmt->execute(['note' => $dt12['error'], 'invNo' => $invoice_no]);
        echo $invoice_no . ' - MASTER UNTRACKED<br/>';
    }
}


//REGULAR TRACK UNPAID
$stmt = $conn->prepare('SELECT * FROM bypass WHERE regular_status=:st1 OR regular_status=:st2 ORDER BY RAND()');
$stmt->execute(['st1' => '', 'st2' => 'Unpaid']);
$dtA = $stmt->fetchAll();
foreach ($dtA as $row) {
    $invoice_no = $row['invoice_no'];

    $url = 'https://nairobiservices.go.ke/api/authentication/bill/transaction/details';
    $data = ['invoice_no' => $invoice_no];
    $headers = [];

    $dt11 = json_decode(httpPost($url, $data, $headers), true);

    if (isset($dt11['invoice_no'])) {
        if (isset($dt11['paid'])) {
            if ($dt11['paid']) {
                $regSt = 'true';
            } else {
                $regSt = 'false';
            }
        } else {
            $regSt = 'NaN';
        }

        $stmt = $conn->prepare('UPDATE bypass SET regular_status=:rgSt WHERE invoice_no=:invNo');
        $stmt->execute(['rgSt' => $regSt, 'invNo' => $invoice_no]);
        echo $invoice_no . ' - REGULAR TRACKED<br/>';
    } elseif (isset($dt11['error'])) {
        $stmt = $conn->prepare('UPDATE bypass SET note=:note WHERE invoice_no=:invNo');
        $stmt->execute(['note' => $dt11['error'], 'invNo' => $invoice_no]);
        echo $invoice_no . ' - REGULAR UNTRACKED<br/>';
    }
}
