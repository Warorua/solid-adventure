<?php
function accBalance()
{

    $file = './cookies/process_data.json';
    if (file_exists($file)) {

        $dt1 = json_decode(file_get_contents($file), true);
        $cookies = formatCookie($dt1['cookies']);
        $dinsess = $dt1['_dinsess'];
    } else {
        die('Data File Not Found!');
    }

    //*
    $curl = curl_init();
    $cookiesFile = './cookies/incap.txt';
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://retail-onlinebanking.co-opbank.co.ke/iportalweb/WidgetControllerServlet',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        //CURLOPT_COOKIE => $cookies,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '__LISTVIEW_REQUEST=Y&PAGE_CODE_TYPE=VDF_CODE&INPUT_ACTION=INIT_DATA_ACTION&INPUT_PRODUCT=ACCSVS&PRODUCT_NAME=ACCSVS&INPUT_FUNCTION_CODE=VSBLTY&INPUT_SUB_PRODUCT=ACCINQ&WIDGET_ID=ACCOUNTSUMMARY_CRL&VIEW_ID=ACCOUNTSUMMARY_CRL164&dir=ASC&sort=ACCOUNT_TYPE_CODE&limit=45&start=0&sortDir=ASC&sortClass=flaticon-up-arrow&colID=ACCOUNT_TYPE_CODE&currentPage=1&previousPage=1&nextPage=2&AJAX_REQUEST=Y&_dinsess=' . $dinsess . '&GEO_LOCATION=%7B%22latitude%22%3A-1.224075%2C%22longitude%22%3A36.8756645%7D&LOGINMODE=USER',
        CURLOPT_HTTPHEADER => array(
            'Host: retail-onlinebanking.co-opbank.co.ke',
            //'Cookie: ' . $cookies,
            'Sec-Ch-Ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Dnt: 1',
            'Sec-Ch-Ua-Mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
            'Accept: application/json, text/javascript',
            'X-Requested-With: XMLHttpRequest',
            'Sec-Ch-Ua-Platform: "Windows"',
            'Origin: https://retail-onlinebanking.co-opbank.co.ke',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'Referer: https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@Home',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    //$responseBody = separateHeadersFromBody($response);
    return $response;
}

function outputDialog($text)
{
    echo $text . '<br/>';
}

function processRegRes($res)
{
    $e = json_decode($res, true);
    if ($e == null) {
        outputDialog("Nll. Service is currently unavailable. Please try again later");
    } else if ($e[0]['RESPONSE_CODE'] == "IDEXT") {
        outputDialog("A wallet account already exists with the details you have provided. Please visit your nearest branch to complete registration");
    } else if ($e[0]['RESPONSE_CODE'] == "MOEXT") {
        outputDialog("Mobile number exist in Wallet account");
    } else if ($e[0]['RESPONSE_CODE'] == "EMEXT") {
        outputDialog("Email ID exist in Wallet account");
    } else if ($e[0]['RESPONSE_CODE'] == "USER_EXISTS") {
        if ($e[0]['MIGRATED_FLAG'] == "M") {
            if ($e[0]['CHANNEL'] == "IB") {
                outputDialog("Login Routing, existing user!");
            } else if ($e[0]['CHANNEL'] == "MB") {
                outputDialog("mCoopCash Login Routing");
            }
        } elseif ($e[0]['MIGRATED_FLAG'] == "U") {
            outputDialog("reg/card Routing");
        } else {
            outputDialog("Login Routing, user exists");
        }
    } else {
        if ($e[0]['RESPONSE_CODE'] == "CNM") {
            outputDialog("No ebank account | profile-form Routing");
        }
        if ($e[0]['RESPONSE_CODE'] == "1" || $e[0]['RESPONSE_CODE'] === false) {
            outputDialog(["Can Sign up"]);
        } else if ($e[0]['RESPONSE_CODE'] === true) {
            $t = "";
            if ($e[0]['FIRST_NAME'] && $e[0]['FIRST_NAME'] != "") {
                $t .= "Dear <b>" . $e[0]['FIRST_NAME'] . "</b>, ";
            }
            outputDialog($t . "kindly confirm that the details you provided are correct and try again");
        } else if (isset($e[0]['ERROR_CODE'])) {
            if ($e[0]['ERROR_CODE'] == "SUCCESS") {
                $l = [];
                $l['FIRST_NAME'] = $e[0]['FIRST_NAME'];
                $l['CUST_NAME'] = $e[0]['FIRST_NAME'];
                $l['MIDDLE_NAME'] = $e[0]['MIDDLE_NAME'];
                $l['LAST_NAME'] = $e[0]['LAST_NAME'];
                $l['EMAIL_ID'] = $e[0]['EMAIL_ID'];
                $l['DOB'] = $e[0]['DOB'];


                outputDialog("OTP will be sent, Registration proceeds!");
            }
        } else {
            if ($e[0]['RESPONSE_CODE'] == "0") {
                outputDialog("We are unable to complete your request at the moment. Please try again later or visit the nearest branch for assistance.");
            } else if ($e[0]['RESPONSE_CODE'] == "-1") {
                outputDialog("Hi [USER],The details you provided did not match our records. Please check that the details provided are the ones you used while opening your Co-op bank account. Please call 020-2776000, 0703027000 or visit your nearest branch for assistance");
            }
        }
    }
}

function userChecker($idno)
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?=null',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'personal_details=%5Bobject%20Object%5D&EVENT_ID=REGISTER&MODE=REGISTRATION_V2&INPUT_ACTION=VALIDATE_USER&langCode=en_US&USER_ID=ARMAAL&MIGRATED_USER=true&MOBILE_FLOW=Y&ID_TYPE=1&ID_NO=' . $idno . '&NID_NO=&EMAIL_ID=xxdfcx%40gmail.com&MOBILE_NO=2547000000102',
        CURLOPT_HTTPHEADER => array(
            'Host: retail-onlinebanking.co-opbank.co.ke',
            //'Cookie: visid_incap_2731887=nQqkhX2eRXe6cKhnX3vjtaI2j2QAAAAAQUIPAAAAAABP2HZk4b9xhFJ6W9LJrahs; incap_ses_774_2731887=WbieT9rtBhL7gflDAs69CqM2j2QAAAAAuD+a+J9KJxoCxO++WDa4LQ==; JSESSIONID=aTXPbYoXcMfoblCxP0wJnMi3jICxxeBablNiawIerRYK19S3j8Ji!-1278564459',
            'Sec-Ch-Ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain, */*',
            'Content-Type: application/x-www-form-urlencoded',
            'Dnt: 1',
            'Sec-Ch-Ua-Mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Sec-Ch-Ua-Platform: "Windows"',
            'Origin: https://retail-onlinebanking.co-opbank.co.ke',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'Referer: https://retail-onlinebanking.co-opbank.co.ke/iportalweb/register-form',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    //$responseBody = separateHeadersFromBody($response);
    return $response;
}


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
        //$cookies = 'cookie1=value1; cookie2=value2;';
        //curl_setopt($ch, CURLOPT_HTTPHEADER, array('Cookie: ' . $cookies));
        //curl_setopt($ch, CURLOPT_COOKIE, $cookies);
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
        $ck = [];
        foreach ($cookieArray as $id => $key) {
            if ($id == 'JSESSIONID') {
                $body = $id . '=' . $key . '; path=/; HttpOnly;HttpOnly;Secure';
                array_push($ck, $body);
                $cookies .= $body;
            } elseif ($id == 'visid_incap_2731887') {
                $body = $id . '=' . $key . '; expires=Sat, 15 Jun 2025 15:40:31 GMT; HttpOnly; path=/; Domain=.co-opbank.co.ke';
                array_push($ck, $body);
                $cookies .= $body;
            } else {
                $body = $id . '=' . $key . '; path=/; Domain=.co-opbank.co.ke';
                array_push($ck, $body);
                $cookies .= $body;
            }
        }
        $cookieString = implode('; ', $ck);
    }
    return $cookieString;
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

function captchaDinsess($cookies, $password, $username, $salt, $userPin)
{
    $curl = curl_init();
    $cookiesFile = './cookies/incap.txt';
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?',
        CURLOPT_RETURNTRANSFER => true,
        //CURLOPT_ENCODING => '',
        //CURLOPT_MAXREDIRS => 10,
        //CURLOPT_TIMEOUT => 0,
        //CURLOPT_FOLLOWLOCATION => true,
        //CURLOPT_COOKIE => $cookies,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
        CURLOPT_HEADER => true,
        //CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . $username . '&password=' . $password . '&mpin=null&MODE=&transactionCode=logn&Language=-1&CStyle=blue&isSimulated=blue&langCode=en_US&encrypted=true&EVENT_ID=&USER_ID_FLAG=&userNo=' . $username . '&userPin=' . $userPin . '&SALT=' . $salt . '&deviceType=D',
        //*
        CURLOPT_HTTPHEADER => array(
            'Host: retail-onlinebanking.co-opbank.co.ke',
            //'Cookie: ' . $cookies,
            'Sec-Ch-Ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain',
            'Content-Type: application/x-www-form-urlencoded',
            'Dnt: 1',
            'Sec-Ch-Ua-Mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Sec-Ch-Ua-Platform: "Windows"',
            'Origin: https://retail-onlinebanking.co-opbank.co.ke',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'Referer: https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@1',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
        ),
        //*/
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    $responseBody = separateHeadersFromBody($response);
    $data = json_decode($responseBody, true);

    $file = './cookies/process_data.json';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
    } else {
        $dt1 = [];
    }

    $dt1['_dinsess'] = $data[0]['CSRFID'];

    $dt1['data'] = $data[0];

    $dt1['csrfCks']['new'] = captchaCookie($response);

    build_file($file, json_encode($dt1));

    return [$data, $response];
}


function captchaOtpref($cookies, $password, $username, $salt, $userPin, $data)
{
    $cookiesFile = './cookies/incap.txt';
    $curl = curl_init();
    //$data[0]['CUST_NAME'] = 'ALEX WANGANGA MBARI';
    //$data[0]['MOBILE_NO'] = '254716912002';
    //$data[0]['EMAIL_ID'] = 'bombardier.devs.master@gmail.com';
    //$data[0]['ID_NO'] = '10847647';
    $username = '';
    $password = '';

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?',
        CURLOPT_RETURNTRANSFER => true,
        //CURLOPT_ENCODING => '',
        //CURLOPT_MAXREDIRS => 10,
        //CURLOPT_TIMEOUT => 0,
        //CURLOPT_COOKIE => $cookies,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
        CURLOPT_HEADER => true,
        //CURLOPT_FOLLOWLOCATION => true,
        //CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . $username . '&password=' . $password . '&mpin=null&MODE=INITIATE_OTP&transactionCode=logn&Language=-1&CStyle=blue&isSimulated=blue&langCode=en_US&encrypted=true&EVENT_ID=REGISTER&USER_ID_FLAG=&userNo=' . $username . '&userPin=' . $userPin . '&SALT=' . $salt . '&deviceType=D&MOBILE_NO=' . $data[0]['MOBILE_NO'] . '&USER_ID=' . $data[0]['ID_NO'] . '&CUST_NO=' . $data[0]['ID_NO'] . '&CUST_NAME=' . urlencode($data[0]['CUST_NAME']) . '&EMAIL_ID=' . urlencode($data[0]['EMAIL_ID']) . '&otp1=&otp2=&otp3=&otp4=&otp5=&otp6=',
        //*
        CURLOPT_HTTPHEADER => array(
            'Host: retail-onlinebanking.co-opbank.co.ke',
            //'Cookie: ' . $cookies,
            'Sec-Ch-Ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain',
            'Content-Type: application/x-www-form-urlencoded',
            'Dnt: 1',
            'Sec-Ch-Ua-Mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Sec-Ch-Ua-Platform: "Windows"',
            'Origin: https://retail-onlinebanking.co-opbank.co.ke',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'Referer: https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@1',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
        ),
        //*/
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    $responseBody = separateHeadersFromBody($response);
    $data = json_decode($responseBody, true);
    $file = './cookies/process_data.json';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
    } else {
        $dt1 = [];
    }
    if (isset($data[0]['OTP_REF'])) {
        $dt1['OTP_REF'] = $data[0]['OTP_REF'];
    } else {
        $dt1['OTP_REF'] = null;
    }

    $dt1['otprefCks'] = captchaCookie($response);

    build_file($file, json_encode($dt1));

    return [$data, ''];
}

function confirmOtp($OTP)
{
    $file = './cookies/process_data.json';
    $cookiesFile = './cookies/incap.txt';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
        $cookies = formatCookie($dt1['cookies']);
        $password = $dt1['password'];
        $username = $dt1['username'];
        $salt = $dt1['salt'];
        $userPin = $dt1['userPin'];
        $data = $dt1['data'];
        $otp = $OTP;
        $otpRef = $dt1['OTP_REF'];

        $result = splitNumber($otp);
    } else {
        die('Data File Not Found!');
    }
    //$data[0]['CUST_NAME'] = 'ALEX WANGANGA MBARI';
    //$data[0]['MOBILE_NO'] = '254716912002';
    //$data[0]['EMAIL_ID'] = 'bombardier.devs.master@gmail.com';
    $data[0]['ID_NO'] = '';
    $username = '';
    $password = '';

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        //CURLOPT_COOKIE => $cookies,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
        CURLOPT_HEADER => true,
        //CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . $username . '&password=' . $password . '&mpin=null&MODE=AUTHENTICATE_REGISTER&transactionCode=logn&Language=-1&CStyle=blue&isSimulated=blue&langCode=en_US&encrypted=true&EVENT_ID=REGISTER&USER_ID_FLAG=&userNo=' . $username . '&userPin=' . $userPin . '&SALT=' . $salt . '&deviceType=D&MOBILE_NO=' . $data['MOBILE_NO'] . '&USER_ID=' . $data['ID_NO'] . '&CUST_NO=' . $data['ID_NO'] . '&CUST_NAME=' . urlencode($data['CUST_NAME']) . '&EMAIL_ID=' . urlencode($data['EMAIL_ID']) . '&' . $result[1] . 'OTP_REF=' . $otpRef . '&OTP=' . $otp,
        CURLOPT_HTTPHEADER => array(
            'Host: retail-onlinebanking.co-opbank.co.ke',
            //'Cookie: ' . $cookies,
            'Sec-Ch-Ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain, */*',
            'Content-Type: application/x-www-form-urlencoded',
            'Dnt: 1',
            'Sec-Ch-Ua-Mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Sec-Ch-Ua-Platform: "Windows"',
            'Origin: https://retail-onlinebanking.co-opbank.co.ke',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'Referer: https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@1',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
        ),
    ));

    $response = curl_exec($curl);

    $responseBody = separateHeadersFromBody($response);
    $data = json_decode($responseBody, true);

    $dt1['confirmOtpCks'] = captchaCookie($response);
    build_file($file, json_encode($dt1));
    curl_close($curl);
    return [$data, captchaCookie($response)];
}

function fPass($salt, $data)
{
    $cookiesFile = './cookies/incap.txt';

    //$data[0]['CUST_NAME'] = 'ALEX WANGANGA MBARI';
    //$data[0]['MOBILE_NO'] = '254716912002';
    //$data[0]['EMAIL_ID'] = 'bombardier.devs.master@gmail.com';


    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?data=' . $data . '&SALT=' . $salt,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        //CURLOPT_COOKIE => $cookies,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
        CURLOPT_HEADER => true,
        //CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        //CURLOPT_POSTFIELDS => 'username=' . $username . '&password=' . $password . '&mpin=null&MODE=AUTHENTICATE_REGISTER&transactionCode=logn&Language=-1&CStyle=blue&isSimulated=blue&langCode=en_US&encrypted=true&EVENT_ID=REGISTER&USER_ID_FLAG=&userNo=' . $username . '&userPin=' . $userPin . '&SALT=' . $salt . '&deviceType=D&MOBILE_NO=' . $data['MOBILE_NO'] . '&USER_ID=' . $data['ID_NO'] . '&CUST_NO=' . $data['ID_NO'] . '&CUST_NAME=' . urlencode($data['CUST_NAME']) . '&EMAIL_ID=' . urlencode($data['EMAIL_ID']) . '&' . $result[1] . 'OTP_REF=' . $otpRef . '&OTP=' . $otp,
        CURLOPT_HTTPHEADER => array(
            'Host: retail-onlinebanking.co-opbank.co.ke',
            //'Cookie: ' . $cookies,
            'Sec-Ch-Ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain, */*',
            'Content-Type: application/x-www-form-urlencoded',
            'Dnt: 1',
            'Sec-Ch-Ua-Mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Sec-Ch-Ua-Platform: "Windows"',
            'Origin: https://retail-onlinebanking.co-opbank.co.ke',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'Referer: https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@1',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
        ),
    ));

    $response = curl_exec($curl);
    $responseBody = separateHeadersFromBody($response);
    /*
    
    $data = json_decode($responseBody, true);

    $dt1['confirmOtpCks'] = captchaCookie($response);
    build_file($file, json_encode($dt1));
    curl_close($curl);
    return [$data, captchaCookie($response)];
    */
    return $responseBody;
}

function splitNumber($number)
{
    $numberStr = (string) $number; // Convert the number to a string
    $characters = str_split($numberStr); // Split the string into an array of characters
    $otpString = '';
    for ($i = 0; $i <= 5; $i++) {
        $val = $i + 1;
        $otpString .= 'otp' . $val . '=' . $characters[$i] . '&';
    }
    return [$characters, $otpString];
}
