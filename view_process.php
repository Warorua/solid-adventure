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

$cmd = "SELECT * FROM lipaNaMpesa ORDER BY id DESC LIMIT 200";
//$cmd = "SELECT * FROM mpesaTransactionsView LIMIT 200";
//$cmd = "SELECT * FROM mm_menu WHERE transactionRef LIKE '%BL-UBP-164702%' OR transactionRef LIKE '%BL-UBP-064249%' ORDER BY id";
//$cmd = "SELECT * FROM mpesaTransactions_audit WHERE transactionRef ='BL-UBP-164702' OR transactionRef = 'BL-UBP-064249' ORDER BY id";
//$cmd = "SELECT * FROM lipaNaMpesa WHERE transactionRef ='BL-UBP-164702' OR transactionRef = 'BL-UBP-064249' OR transactionRef = 'BL-UBP-165138' ORDER BY id";

echo universal_dab($cmd, 'head');

//SUCCESS >>>>>>SWIFT DAIRIES LTD-----UBP Application No TLA169631 - 2020_400614
$validation_response = "SUCCESS >>>>>>Francis Omori Nyachieng\'a-----UBP Application No TLA066921 - 2020_48393";
$mpesaTransactionsUpt = "UPDATE mpesaTransactions SET `validation Response` = '".$validation_response."', `Confirmation Response`=NULL WHERE receiptNo='SGQ95TNTG7'";
