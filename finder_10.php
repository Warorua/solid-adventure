<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'kever';

include './includes/uni_conn.php';
include './includes/core_security.php';
$err = [];
$_POST['idNo'] = '23059672';
if (isset($_POST['idNo'])) {
    $idNo = $_POST['idNo'];
    if (!ctype_digit($idNo)) {
        $err['error'] = 'Invalid characters in the payload!';
        echo  json_encode($err, JSON_PRETTY_PRINT);
        die();
    }
    function kra_module($idNo)
    {
        $url1 = 'https://nairobiservices.go.ke/api/authentication/auth/user_info';
        $data = 
        $url = 'https://nairobiservices.go.ke/api/external/user/kra/id/' . $idNo;
        $data = json_decode(httpGet($url, []), true);
        if (is_array($data)) {
        } else {
            return ['NA', 'Not json returned', $data];
        }
    }
    function innerProfile($taxpayer_pin)
    {
        $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchTaxpayerDetailWithoutValidationSplObl.fetchTaxpayerDetailWithoutValidationSplObl.dwr';
        $data = [
            'callCount' => '1',
            'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
            'c0-scriptName' => 'FetchTaxpayerDetailWithoutValidationSplObl',
            'c0-methodName' => 'fetchTaxpayerDetailWithoutValidationSplObl',
            'c0-id' => '0',
            'c0-param0' => 'string:' . $taxpayer_pin,
            'batchId' => '1',
            'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
            'httpSessionId' => '',
            'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
        ];

        $result = fixJson(extractCallbackData(httpPost($url, $data)));
        $processed = json_decode(processJson($result), true);

        //return $dt1;
        return $processed;
    }
    function extractPIN($sentence)
    {
        // Define the pattern to match the sentence format
        $pattern = '/^User\s([A-Z0-9]+)\sis\salready\sregistered\.$/';

        // Perform the regular expression match
        if (preg_match($pattern, $sentence, $matches)) {
            // If a match is found, return the dynamic word
            return $matches[1];
        } else {
            // If no match is found, return false
            return false;
        }
    }
    function pullKraPin($idno)
    {
        $data = [
            "pin" => $idno,
            "token" => "20e92a436d4bf28e8c08565df22ae2d6dd3d495709a43d0ce52e9ab2847d995b",
            "ishara" => "016086dc439441d36c739223bf356e676e8ff109a9ca885e915719fe4561af61",
            "version" => "3.0",
            "lugha" => "0"
        ];
        $data = json_encode($data);
       // echo $data;
        $object_1 = [];
        $gt1 = json_decode(httpPost('https://api.kra.go.ke/m-service/user/verify', $data, ['Content-Type: application/json']), true);
        // echo  json_encode($gt1, JSON_PRETTY_PRINT);
        if (is_array($gt1)) {
            if (isset($gt1[0]['login'])) {
                foreach ($gt1[0] as $gtid => $gt1r) {
                    $object_1[$gtid] = $gt1r;
                }
                $brs_pin = $gt1[0]['login'];
            } elseif (isset($gt1['M-Service'])) {
                //$object_1['kra'] = 'KRA PIN Not available for Identity Provided!';
                $pin_extract = extractPIN($gt1['M-Service']);
                if ($pin_extract !== false) {
                    $brs_pin = $pin_extract;
                } else {
                    $object_1['kra'] = 'KRA Fetching error. Result: ' . $gt1['M-Service'];
                }
               // $object_1['kra'] = 'KRA Fetching error. Result: ' . $gt1['M-Service'];
               
            } else {
                //$object_1['kra'] = 'KRA PIN Not available for Identity Provided!';
                $object_1['kra'] = 'KRA Fetching error. Result: ' . json_encode($gt1);
            }
        } else {
            $object_1['kra'] = 'KRA Fetching error. Result: ' . json_encode($gt1);
        }
       

        if (isset($object_1['kra'])) {
            return ['NA', $object_1['kra'], $object_1];
        } elseif (isset($brs_pin)) {
            return $brs_pin;
        } else {
            return ['NA', 'Unknown error!', $object_1];
        }
    }

//echo 'right!';
    $pullKraPin = pullKraPin('39290974');
    if (is_array($pullKraPin)) {
        $err['error'] = $pullKraPin[1];
        echo  json_encode($err, JSON_PRETTY_PRINT);
    } else {
        //echo $pullKraPin;
        echo  json_encode(innerProfile($pullKraPin), JSON_PRETTY_PRINT);
    }
    
} else {
    $err['error'] = 'Request Error!';
    echo  json_encode($err, JSON_PRETTY_PRINT);
}
