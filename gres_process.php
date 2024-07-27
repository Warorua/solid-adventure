<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

function universal_dab($command, $head, $ip, $db)
{
    $cmd = urlencode($command);
    if ($ip == 1) {
        $url = 'http://192.168.2.142:8080/aggregate/gres.jsp?dbHost=192.168.100.122&dbName='.$db.'&dbUser=postgres&dbPassword=postgres&dbPort=5432&sqlCommand=' . $cmd;
    } else {
        $url = 'http://192.168.2.142:8080/aggregate/gres.jsp?dbHost=192.168.102.22&dbName='.$db.'&dbUser=postgres&dbPassword=postgres&dbPort=5432&sqlCommand=' . $cmd;
    }
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}

$cmd = "SELECT * FROM payments_paymentlog ORDER BY id DESC LIMIT 200 OFFSET 0;";
//$cmd = "SELECT * FROM apis WHERE billreference='BL-UBP-164702' OR billreference='BL-UBP-064249' ORDER BY id DESC LIMIT 200";

echo universal_dab($cmd, 'head', 2, 'bill_master_db');
