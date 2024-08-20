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

/*
$url = 'http://192.168.100.116/gateway/taifa/nrs/affirm';
$headers = 'Content-Type: application/json';
$payload = '{"apiKey":"","type":null,"billNumber":"BL-UBP-060215","billAmount":"7500.0","phone":"null","transactionDate":"28-07-2024 00:00:00","Field1":null,"Field2":null,"Field3":null,"Field4":null,"Field5":null,"bankdetails":{"accountNumber":"202407281118028514","bankName":"Equity Bank","debitAccount":"BL-UBP-060215","debitCustName":"BL-UBP-060215 UBP APPLICATION NO TLA063429 - 2020_350227","bankReference":"202407281118028514","customerReference":"BL-UBP-060215","paymentMode":"cash"},"mpesadetails":null}';
$method = 'POST';
//*/

/*
$url = 'http://192.168.100.116/gateway/taifa/nrs/validate';
$headers = 'Content-Type: application/json';
$payload = '{ "reference": "BL-UBP-064249", "bankdetails": null, "amount":15000.0, "mpesadetails": { "BillRefNumber": "BL-UBP-064249", "BusinessShortCode": "6060047", "FirstName": "Francis", "LastName": "Nyachienga", "MSISDN": "", "MiddleName": "Omori", "OrgAccountBalance": "0.00", "ThirdPartyTransID": "5627760", "TransAmount": 15000.0, "TransID": "SGQ95TNTG7", "TransTime": "20240726082445", "TransactionType": "Pay Bill" } }';
$method = 'POST';
//*/


//*
//$url = 'http://192.168.0.69:8080/docs/manager-howto.html#Deploy_A_New_Application_Archive_(WAR)_Remotely';
//$url = 'http://192.168.0.79/nrs/';
//$url = 'http://192.168.0.154:8002/';
//$url = 'http://192.168.0.64:6063/upgw/WS/UPGW/Codeunit/UPGW';
$url = 'http://192.168.0.64:59445/tools/APISOURCE/CoopKCBB2BIntegration/.vs/CoopKcbintergation/config/applicationhost.config';
$headers = 'Authorization: Basic QWRtaW5pc3RyYXRvcjokdG4zbXlAcCQ=';
//$headers = '';
$payload = '';
$method = 'GET';
//*/

/*
//$dt = ['username'=>'2547343434343','password'=>'adminpass'];
$dt = [
    'first_name' => 'anon1',
    'last_name' => 'anon2',
    'email' => 'redhatintl@aliens.com',
    'phone_number' => '2547343434343',
    'national_id' => 966969,
    'huduma_no' => null,
    'password1' => 'adminpass',
    'password2' => 'adminpass'
];
$url = 'http://192.168.100.59/api/accounts/register/';
$headers = 'Content-Type: application/json';
//$payload = "'".json_encode($dt)."'";
$payload = json_encode($dt);
$method = 'POST';
//*/

/*
//$dt = ['username'=>'2547343434343','password'=>'adminpass'];
$dt = [
    //'token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInBhc3N3b3JkMSI6IiQyYSQxMCRmbmFUb0ZRNmJVWFlya1MvUEdmLzcuOXJyOGdKVU5rbk13Ykp3c2hFQzJ1RzZnL0pBcS54dSIsImlhdCI6MTcyMTkxNTAyNywiZXhwIjoxNzIxOTUxMDI3fQ.JgqF8jb3nEHWU6BgJlzNPIJ03dt_pK5zFZMa461ZSz4',
    'phone_number' => '+2547123455678',
    'password' => 'adminpass'
];
$url = 'http://192.168.100.59/api/accounts/token/';
$headers = 'Content-Type: application/json';
//$payload = "'".json_encode($dt)."'";
$payload = json_encode($dt);
$method = 'POST';
//*/

echo messenger($url, $headers, $payload, $method);
