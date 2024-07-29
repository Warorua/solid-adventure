<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

function universal_dab($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/my.jsp?dbHost=192.168.0.65&dbName=upgw&dbUser=root&dbPassword=happycoding&dbPort=3306&sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}

function master_dab($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/dab.jsp?sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}

function extractId($html) {
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

//$cmd = "SELECT * FROM `transactions` ORDER BY id DESC LIMIT 200 OFFSET 0";
//$cmd = "SELECT * FROM mpesaTransactionsView LIMIT 200";
//$cmd = "SELECT * FROM `transactionsNewV1` WHERE clientRefNo LIKE '%BL-UBP-164702%' OR clientRefNo LIKE '%BL-UBP-064249%' OR clientRefNo LIKE '%BL-UBP-165138%' OR clientRefNo LIKE '%BL-UBP-165277%' OR clientRefNo LIKE '%BL-UBP-164997%' OR clientRefNo LIKE '%BL-UBP-060215%' ORDER BY id";
//$cmd = "SELECT * FROM mpesaTransactions_audit WHERE clientRefNo ='BL-UBP-164702' OR clientRefNo = 'BL-UBP-064249' ORDER BY id";
//$cmd = "SELECT * FROM bankTransactions_1 WHERE clientRefNo ='BL-UBP-164702' OR clientRefNo = 'BL-UBP-064249' OR clientRefNo = 'BL-UBP-165138' OR clientRefNo = 'BL-UBP-165277' OR clientRefNo = 'BL-UBP-164997' OR clientRefNo = 'BL-UBP-060215' ORDER BY id";

//$cmd = "SELECT id FROM bankTransactions WHERE billNumber='BL-UBP-064249'";

//echo extractId(universal_dab($cmd, 'head'));
if (!isset($_POST['invoiceNo'])) {
    echo json_encode(['error' => 'incomplete request', 'payload' => $_POST]);
    die();
}
$cmd = "SELECT * FROM transactions WHERE clientRefNo='".$_POST['invoiceNo']."'" ;
echo universal_dab($cmd, 'head'). '<br/><br/>';

$cmd = "SELECT * FROM bankTransactions WHERE billNumber='".$_POST['invoiceNo']."'" ;
echo universal_dab($cmd, 'head'). '<br/><br/>';

/*
$cmd = "DELETE FROM transactions WHERE clientRefNo='BL-UBP-140770'";
echo master_dab($cmd, 'head'). '<br/><br/>';
//*/

//SUCCESS >>>>>>SWIFT DAIRIES LTD-----UBP Application No TLA169631 - 2020_400614
$validation_response = "SUCCESS >>>>>>Francis Omori Nyachieng\'a-----UBP Application No TLA066921 - 2020_48393";
$mpesaTransactionsUpt = "UPDATE mpesaTransactions SET `validation Response` = '".$validation_response."', `Confirmation Response`=NULL WHERE receiptNo='SGQ95TNTG7'";

//BL-UBP-165277