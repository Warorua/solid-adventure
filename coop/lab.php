<?php
//12.54.29
include '../includes/core.php';


function bkGet1($cookiesFile, $url, $cookies = false)
{

    build_file($cookiesFile, '');

    // Create a cURL resource
    $ch = curl_init();

    // Set the URL and other options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile));
    curl_setopt($ch, CURLOPT_COOKIEFILE, realpath($cookiesFile));
    if ($cookies != false) {
        $cookies = 'cookie1=value1; cookie2=value2;';
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Cookie: ' . $cookies));
    }

    // Execute the GET request
    $response = curl_exec($ch);

    return captchaCookie($response);

    // Close the cURL resource
    curl_close($ch);
}

function bkGet($cookiesFile, $url, $cookies = false, $method = 'GET', $postData = array())
{
    build_file($cookiesFile, '');

    // Create a cURL resource
    $ch = curl_init();

    // Set the URL and other options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile));
    curl_setopt($ch, CURLOPT_COOKIEFILE, realpath($cookiesFile));

    // Set the request method
    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    }

    // Set the custom cookies if provided
    if ($cookies != false) {
        $cookies = 'cookie1=value1; cookie2=value2;';
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Cookie: ' . $cookies));
    }

    // Execute the request
    $response = curl_exec($ch);

    // Close the cURL resource
    curl_close($ch);

    return [captchaCookie($response), $response];
}


function captchaCookie($response)
{
    // Get the cookies from the response headers
    preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $response, $matches);
    $cookies = array();
    foreach ($matches[1] as $cookie) {
        parse_str($cookie, $cookieArray);
        $cookies = array_merge($cookies, $cookieArray);
    }

    // Echo the cookies
    $file = './cookies/process_data.json';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
    } else {
        $dt1 = [];
    }
    $ck = [];
    foreach ($cookies as $name => $value) {
        $ck[$name] = $value;
        $dt1['cookies'][$name] = $value;
        //echo "$name: $value\n";
    }
    build_file($file, json_encode($dt1));
    return $ck;
}

function formatCookie($cookieArray)
{
    $cookies = '';
    if (is_array($cookieArray)) {
        foreach ($cookieArray as $id => $key) {
            $cookies .= $id . '=' . $key . '; ';
        }
    }
    return $cookies;
}

function separateHeadersFromBody($response)
{
    $headers = '';
    $body = '';

    // Split the response by the first empty line, which separates headers and body
    $parts = explode("\r\n\r\n", $response, 2);

    if (count($parts) === 2) {
        $headers = $parts[0];
        $body = $parts[1];
    }

    return $body;
}

function captchaSalt($jsessionid)
{
    $salt_obj = json_decode(separateHeadersFromBody($jsessionid[1]), true);
    $file = './cookies/process_data.json';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
    } else {
        $dt1 = [];
    }

    $salt = $salt_obj[0]['SALT'];
    $dt1['salt'] = $salt;
    build_file($file, json_encode($dt1));
    return $salt;
}

$cookiesFile = './cookies/incap.txt';

$url = "https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@Home";

$incap = bkGet($cookiesFile, $url)[0];

$cookiesFile = './cookies/jsessionid.txt';

$url = "https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?EVENT_ID=SALT_GEN&reqType=SALT_GEN&transactionCode=mobile_salt&isHybrid=H";

$jsessionid = bkGet($cookiesFile, $url, formatCookie($incap));

//echo json_encode($jsessionid[0]);

$salt = captchaSalt($jsessionid);

$cks = json_encode($jsessionid[0]);

echo $salt.'<br/><br/>';
echo $cks.'<br/><br/>';
echo base64_encode($cks);