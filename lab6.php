<?php
include './includes/core.php';
include './includes/core_kra.php';

$scriptName = 'FetchTaxPayerDetailForAccount';
$methodName = 'fetchTaxPayerDetail';
$url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/'.$scriptName.'.'.$methodName.'.dwr';
$data = [
    'callCount' => '1',
    'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
    'c0-scriptName' => $scriptName,
    'c0-methodName' => $methodName,
    'c0-id' => '0',
    'c0-param0' => 'string:A002642213D',
    'c0-param1' => 'string:A002642213D',
    'batchId' => '1',
    'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
    'httpSessionId' => '',
    'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
];

$result = fixJson(extractCallbackData(httpPost($url, $data)));
$processed = processJson($result);
file_put_contents('./lab.json', $processed);
echo $processed;
