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
echo 'TRACKER ENGINE ACTIVE -1 ...<br/>';

function tokenizer($cust_no)
{
    global $conn;
    $stmt = $conn->prepare('SELECT * FROM token WHERE purpose=:purpose');
    $stmt->execute(['purpose' => 'cert_monitor']);
    $dtA = $stmt->fetch();
    $url = 'https://nairobiservices.go.ke/api/authentication/profile/';
    $headers = ['Authorization:Bearer ' . $dtA['token']];
    $cnTs = json_decode(httpGet($url, [], $headers), true);
    if (isset($cnTs['error'])) {
        $url = 'https://nairobiservices.go.ke/api/authentication/auth/generate_customer_token';
        $data = ['customer_no' => $cust_no];
        $dt1 = json_decode(httpGet($url, $data), true);
        if (is_array($dt1)) {
            if (isset($dt1['token'])) {
                $time = date(DATE_RFC2822);
                $stmt = $conn->prepare('UPDATE token SET token=:token, timestamp=:time, cid=:cid WHERE id=:id');
                $stmt->execute(['token' => $dt1['token'], 'id' => '1', 'time' => $time, 'cid' => $cust_no]);
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

function get_external_doc($invoice, $token)
{
    //$token = generate_token($customer_id);
    $headers = ['Authorization:Bearer ' . $token];
    $dt12 = httpGet('https://nairobiservices.go.ke/api/authentication/profile/bills', [], $headers);
    $dt121 = json_decode($dt12, true);
    if (isset($dt121['bills_List'])) {
        foreach ($dt121['bills_List'] as $row) {
            if ($row['bill_no'] == $invoice) {
                $external_doc = $row['external_doc'];
            }
        }
        if (isset($external_doc)) {
            return $external_doc;
        } else {
            return 'unset';
        }
    } else {
        return 'unset';
    }
}

//echo json_encode(tokenizer()).'<br/>';

//MASTER TRACK UNPAID
$stmt = $conn->prepare("SELECT * FROM bypass WHERE master_status=:st2 AND invoice_no LIKE '%UBP%' ORDER BY RAND() LIMIT 3");
$stmt->execute(['st2' => 'paid']);
$dtA = $stmt->fetchAll();
foreach ($dtA as $row) {
    $invoice_no = $row['invoice_no'];


    $url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $invoice_no;
    $data = [];
    $headers = ['Authorization:Bearer ' . tokenizer('2020_276753')['token']];
    //echo $invtk;
    $dt12 = json_decode(httpGet($url, $data, $headers), true);
    if (isset($dt12['success'])) {
        if ($dt12['status'] == 'paid') {
            $token = tokenizer($dt12['customerno'])['token'];

            if ($row['extdoc'] == NULL) {
                $external_doc = get_external_doc($invoice_no, $token);
            } else {
                $external_doc = $row['extdoc'];
            }

            $url = 'https://edev.nairobiservices.go.ke/api/sbp/ubp/get_ubp_register';
            $data = [];
            $headers = [
                'Authorization: Bearer ' . $token,
                'Cookie: token=' . $token
            ];

            $dt1 = json_decode(httpGet($url, $data, $headers), true);

            if (isset($dt1['error'])) {
                $dt1 = json_encode($dt1);
            } elseif (isset($dt1['success'])) {
                if (isset($dt1['UBP_Register'])) {
                    foreach ($dt1['UBP_Register'] as $row2) {
                        if ($row2['ubp_no'] == $external_doc) {
                            $cert_status = 'ACTIVE';
                        }
                    }
                }
            }
            // echo dt1($dt1, $head, $mini_head);
        } else {
            $action = NULL;
            $fus = NULL;
        }

        if (!isset($cert_status)) {
            $cert_status = NULL;
        }

        $stmt = $conn->prepare('UPDATE bypass SET extdoc=:extdoc, cert_status=:cert_status WHERE invoice_no=:invNo');
        $stmt->execute(['invNo' => $invoice_no, 'extdoc' => $external_doc, 'cert_status' => $cert_status]);

        echo $invoice_no . ' - MASTER TRACKED - '.$cert_status.'<br/>';
    } elseif (isset($dt12['error'])) {
        $stmt = $conn->prepare('UPDATE bypass SET note=:note WHERE invoice_no=:invNo');
        $stmt->execute(['note' => $dt12['error'], 'invNo' => $invoice_no]);
        echo $invoice_no . ' - MASTER UNTRACKED<br/>';
    }
}
