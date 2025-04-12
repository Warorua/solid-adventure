<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';
include './includes/core_kra.php';
////////CAR PLATE SEARCH
$source = 'pin_data';

include './includes/uni_conn.php';

$output = [];

if (isset($_POST['kraPin'])) {
    $kraPin = $_POST['kraPin'];

    if ($kraPin == '' || $kraPin == null) {
        $output['error'] = 'Invalid parameters set!';
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    }


    $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchTrpDtls.getIdfromPin.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => 'FetchTrpDtls',
        'c0-methodName' => 'getIdfromPin',
        'c0-id' => '0',
        'c0-param0' => 'string:' . $kraPin,
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
    ];

    $result = fixJson(extractCallbackData(httpPost($url, $data)));
    $processed = json_decode(processJson($result), true);

    echo json_encode($processed, JSON_PRETTY_PRINT);
    exit;
  
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output, JSON_PRETTY_PRINT);
}
