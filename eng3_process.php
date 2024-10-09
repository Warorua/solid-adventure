<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';
function messenger($url, $headers = '', $payload = '', $method = 'GET')
{
    $url = 'http://192.168.2.142:8080/aggregate/messenger.jsp?url=' . urlencode($url) . '&headers=' . urlencode($headers) . '&payload=' . urlencode($payload) . '&method=' . urlencode($method);
    $data = httpGet($url, []);
    return $data;
}
$data2 = '{"apiKey":"","type":null,"billNumber":"BL-HR-059540","billAmount":"2200.0","phone":"null","transactionDate":"31-07-2024 00:00:00","Field1":null,"Field2":null,"Field3":null,"Field4":null,"Field5":null,"bankdetails":{"accountNumber":"2024073111411047","bankName":"Equity Bank","debitAccount":"BL-HR-059540","debitCustName":"BL-HR-059540 JERICHO \/ LUMUMBA CATEGORY 2 (HOUSE 4748)","bankReference":"2024073111411047","customerReference":"BL-HR-059540","paymentMode":"cash"},"mpesadetails":null}';
//*
$url = 'http://192.168.100.116/gateway/taifa/nrs/affirm';
$headers = 'Content-Type: application/json';
$payload = $data2;
$method = 'POST'; 
echo messenger($url, $headers, $payload, $method) . '<br/><br/>';
  //*/

  //ssh super@192.168.2.156