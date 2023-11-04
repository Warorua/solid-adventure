<?php
function extractCallbackData($inputString)
{
    $startTag = "dwr.engine.remote.handleCallback(";
    $endTag = ");";

    $startPos = strpos($inputString, $startTag);
    if ($startPos === false) {
        return false; // Start tag not found
    }

    $startPos += strlen($startTag);
    $endPos = strpos($inputString, $endTag, $startPos);
    if ($endPos === false) {
        return false; // End tag not found
    }

    $extractedData = substr($inputString, $startPos, $endPos - $startPos);
    return $extractedData;
}

function fixJson($json)
{
    // Replace unquoted keys with quoted keys
    $json = str_replace("'", "", $json);
    $json = preg_replace('/(?<!")(\w+)(?!"):/i', '"$1":', $json);

    // Replace 'new Date(...)' with a valid date string
    $json = preg_replace_callback('/"new Date\((\d+)\)"/', function ($matches) {
        $timestamp = intval($matches[1]);
        $date = date('Y-m-d H:i:s', $timestamp / 1000);
        return '"' . $date . '"';
    }, $json);

    // Fix empty arrays
    $json = preg_replace('/(\w+):(\[|\{)(\s*)(\2)/', '"$1":$2$3$4', $json);
        $json = str_replace('"Box"', 'Box', $json);
        $json = str_replace('"Code"', 'Code', $json);
        $json = substr($json, 8);
    // Return the fixed JSON
    return $json;
}

function processJson($json) {
    $pattern = '/(?<!\\\\)":\s*(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|new Date\(-?\d+\))|[^,"}\s]+)(?=[,}\s])/';

    $json = preg_replace_callback($pattern, function ($matches) {
        $value = $matches[1];
        if ($value !== 'null' && $value !== 'false' && $value !== 'true' && !is_numeric($value) && $value !== '[]') {
            $decoded = json_decode($value);
            if ($decoded !== null) {
                // Handle values that are already in valid JSON format
                $value = json_encode($decoded, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
            } else if (preg_match('/^new Date\((-?\d+)\)$/', $value, $dateMatches)) {
                // Convert values in the format 'new Date(<timestamp>)' to valid date and time format
                $timestamp = $dateMatches[1] / 1000; // Assuming the timestamp is in milliseconds
                $formattedDate = date('Y-m-d\TH:i:s\Z', $timestamp);
                $value = '"' . $formattedDate . '"';
            } else {
                // Quote and properly escape the value
                $value = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
            }
        }
        return '": ' . $value;
    }, $json);

    return $json;
}

function generateRandomString() {
    $characters = '0123456789ABCDEF';
    $length = 32;
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}


function getPin($taxpayer_id)
{
    $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchTrpDtls.getPinfromId.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => 'FetchTrpDtls',
        'c0-methodName' => 'getPinfromId',
        'c0-id' => '0',
        'c0-param0' => 'string:' . $taxpayer_id,
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
    ];

    $result = fixJson(extractCallbackData(httpPost($url, $data)));
    $processed = processJson($result);
    $dt1 = json_decode($processed);
    $dt1 = [$taxpayer_id => $dt1];

    return $dt1;
}

function completeKraINDProfile($taxpayer_id, $taxpayer_pin)
{
    $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchRegistrationDtl.fetchRegTxprInfoFrmPinMig.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => 'FetchRegistrationDtl',
        'c0-methodName' => 'fetchRegTxprInfoFrmPinMig',
        'c0-id' => '0',
        'c0-param0' => 'string:' . $taxpayer_pin,
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
    ];

    $result = fixJson(extractCallbackData(httpPost($url, $data)));
    $processed = json_decode(processJson($result), true);
    $dt1 = [];
    $dt1[$taxpayer_id]['id'] = $processed['txprIndDtlsDTO']['nidNo'];
    $dt1[$taxpayer_id]['pin'] = $taxpayer_pin;
    $dt1[$taxpayer_id]['type'] = 'INDI';

    return $dt1;
    //return $processed;
}
function completeKraNONINDProfile($taxpayer_id, $taxpayer_pin)
{
    $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchRegistrationDtl.fetchRegTxprInfoFrmPin.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => 'FetchRegistrationDtl',
        'c0-methodName' => 'fetchRegTxprInfoFrmPin',
        'c0-id' => '0',
        'c0-param0' => 'string:' . $taxpayer_pin,
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
    ];

    $result = fixJson(extractCallbackData(httpPost($url, $data)));
    $processed = json_decode(processJson($result), true);
    $dt1 = [];
    $dt1[$taxpayer_id]['id'] = $processed['txprNonindiDtlDTO']['bussCertRegNum'];
    $dt1[$taxpayer_id]['pin'] = $taxpayer_pin;
    $dt1[$taxpayer_id]['type'] = 'NONINDI';

    return $dt1;
    //return $processed;
}

function KRAProfiler($taxpayer_id)
{
    $pinDt = getPin($taxpayer_id);

    $firstCharacter = substr($pinDt[$taxpayer_id], 0, 1);

    if ($firstCharacter == 'A') {
        $userData = completeKraINDProfile($taxpayer_id, $pinDt[$taxpayer_id]);
    } elseif ($firstCharacter == 'P') {
        $userData = completeKraNONINDProfile($taxpayer_id, $pinDt[$taxpayer_id]);
    } else {
        $dt1 = [];
        $dt1[$taxpayer_id]['id'] = '';
        $dt1[$taxpayer_id]['pin'] = $pinDt[$taxpayer_id];
        $dt1[$taxpayer_id]['type'] = '';
        $userData = $dt1;
    }
    return $userData;
}

function logStatement($file, $text)
{
    global $path;
    $logFile = $file; // Path to the log file
     $logEntry = date("[Y-m-d H:i:s]") . " " . $text . PHP_EOL;
     file_put_contents($logFile, $logEntry, FILE_APPEND);
    return $text;
}