<?php
include './includes/core.php';
include './includes/core_kra.php';



$scriptName = 'FetchRegistrationDtl';
$methodName = 'fetchRegTxprInfoFrmPin';
$url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/'.$scriptName.'.'.$methodName.'.dwr';
$data = [
    'callCount' => '1',
    'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
    'c0-scriptName' => $scriptName,
    'c0-methodName' => $methodName,
    'c0-id' => '0',
    'c0-param0' => 'string:P051387348N',
    //'c0-param0' => 'string:22340000',
    'batchId' => '1',
    'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
    'httpSessionId' => '',
    'scriptSessionId' => generateRandomString()
];

$result = fixJson(extractCallbackData(httpPost($url, $data)));
$processed = processJson($result);
//$processed = generateRandomString();
//file_put_contents('./lab.json', $processed);

echo $processed;
