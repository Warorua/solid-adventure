<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'pin_data';

include './includes/uni_conn.php';



$output = [];
// if (isset($_GET['kraPin'])) {
//     $_POST['kraPin'] = $_GET['kraPin'];
// }

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

    if($processed == null){
        echo json_encode('KRA PIN Data Unavailable!', JSON_PRETTY_PRINT);
        exit;
    }


    $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/ChkPndBusiness.checkPendingBusiness.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-8D755A8591B0B9299ECFA62D63A2616C',
        'c0-scriptName' => 'ChkPndBusiness',
        'c0-methodName' => 'checkPendingBusiness',
        'c0-id' => '0',
        'c0-param0' => 'string:' . $processed,
        'c0-param1' => 'number:2',
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
    ];

    $result = fixJson(extractCallbackData(httpPost($url, $data)));
    $processed = json_decode(processJson($result), true);
    if(empty($processed)){
        $output['duration'] = null;
    }else{
        $output['duration'] = $processed[0];
    }

    
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    $output['error'] = 'Required parameters not set! - '.json_encode($_POST);
    echo json_encode($output, JSON_PRETTY_PRINT);
}
