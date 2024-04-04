<?php
$client = new \GuzzleHttp\Client();

function send_message($receiver, $message, $rep = '')
{
    global $client;
    if ($rep != '') {
        $body = '{"replyToMessageId":"' . $rep . '","chatId":"' . $receiver . '@c.us","message":"' . $message . '"}';
    } else {
        $body = '{"chatId":"' . $receiver . '@c.us","message":"' . $message . '"}';
    }
    $response = $client->request('POST', 'https://waapi.app/api/v1/instances/8255/client/action/send-message', [
        'body' => $body,
        'headers' => [
            'accept' => 'application/json',
            'authorization' => 'Bearer 7gDFhcqNmc5WYVwfRqN8hLrpNpCRlUjLsoMoBVMvb832a0df',
            'content-type' => 'application/json',
        ],
    ]);

    return $response->getBody();
}

function fetch_message($from, $limit)
{
    global $client;
    $response = $client->request('POST', 'https://waapi.app/api/v1/instances/8255/client/action/fetch-messages', [
        'body' => '{"fromMe":false,"chatId":"' . $from . '@c.us","limit":' . $limit . '}',
        'headers' => [
            'accept' => 'application/json',
            'authorization' => 'Bearer 7gDFhcqNmc5WYVwfRqN8hLrpNpCRlUjLsoMoBVMvb832a0df',
            'content-type' => 'application/json',
        ],
    ]);

    return $response->getBody();
}

function isValidFormat($string)
{
    // Define the regular expression pattern
    $pattern = '/^(BL|EC)\-[A-Z0-9]+\-[0-9A-Z]+\-[0-9]+$/';

    // Use preg_match to check if the string matches the pattern
    if (preg_match($pattern, $string)) {
        return true; // The string is in the correct format
    } else {
        return false; // The string is not in the correct format
    }
}

function httpPost($url, $data, $headers = null, $cookie_jar = null, $verif = true, $resp = true)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        if (is_array($data)) {
            $format_data = http_build_query($data);
        } else {
            $format_data = $data;
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $format_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if (!$verif) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Disable hostname verification
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        }
        if ($headers != null) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);
        $response = curl_exec($ch);
        if ($response === false) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
    } catch (Exception $e) {

        trigger_error(
            sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(),
                $e->getMessage()
            ),
            E_USER_ERROR
        );
    } finally {
        // Close curl handle unless it failed to initialize
        if (is_resource($ch)) {
            curl_close($ch);
        }
    }

    if ($resp) {
        return $response;
    } else {
        return true;
    }
}

function httpGet($url, $data, $headers = null, $cookie_jar = null)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);
        if ($headers != null) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        $response = curl_exec($ch);
        if ($response === false) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
    } catch (Exception $e) {

        trigger_error(
            sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(),
                $e->getMessage()
            ),
            E_USER_ERROR
        );
    } finally {
        // Close curl handle unless it failed to initialize
        if (is_resource($ch)) {
            curl_close($ch);
        }
    }

    return $response;
}

function tokenizer()
{
    global $conn3;
    $stmt = $conn3->prepare('SELECT * FROM token LIMIT 1');
    $stmt->execute();
    $dtA = $stmt->fetch();
    $url = 'http://192.168.100.116/authentication/profile/';
    $headers = ['Authorization:Bearer ' . $dtA['token']];
    $cnTs = json_decode(httpGet($url, [], $headers), true);
    if (isset($cnTs['error'])) {
        $url = 'http://192.168.100.116/authentication/auth/generate_customer_token';
        $data = ['customer_no' => '2020_276753'];
        $dt1 = json_decode(httpGet($url, $data), true);
        if (is_array($dt1)) {
            if (isset($dt1['token'])) {
                $time = date(DATE_RFC2822);
                $stmt = $conn3->prepare('UPDATE token SET token=:token, timestamp=:time, cid=:cid WHERE id=:id');
                $stmt->execute(['token' => $dt1['token'], 'id' => '1', 'time' => $time, 'cid' => '2020_276753']);
                return ['token' => $dt1['token'], 'status' => 'created'];
            } else {
                tokenizer();
            }
        } else {
            tokenizer();
        }
    } else {
        return ['token' => $dtA['token'], 'status' => 'used'];
    }
}
function generateMpesaCode()
{
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $alphabet1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $alphabet2 = '1234567890';
    $code = '';

    // Year (Q for 2022, R for 2023, etc.)
    $currentYear = date('Y');
    $code .= $alphabet[$currentYear - 2022 + 16];

    // Month (K for November, G for July, etc.)
    $currentMonth = date('n');
    $code .= $alphabet[$currentMonth - 1];

    // Day (1 for 1st, 2 for 2nd, etc.)
    $currentDay = date('j');
    if ($currentDay > 9) {
        $replaceChar = $alphabet[($currentDay - 10) % 26];
        $code .= $replaceChar;
    } else {
        $code .= $currentDay;
    }

    /*
    // Transaction order (A for 10th, B for 11th, etc.)
    $currentTime = date('Hi');
    $transactionOrder = intval($currentTime) + 1;
    $transactionOrder %= 100; // Limit transaction order to two digits
    $transactionOrder = str_pad($transactionOrder, 2, '0', STR_PAD_LEFT); // Pad with zeros
    $code .= $transactionOrder;
    */
    $code .= $alphabet2[rand(0, strlen($alphabet2) - 1)];

    //*
    // Complete the remaining characters to make the code 10 characters long
    while (strlen($code) < 10) {
        $code .= $alphabet1[rand(0, strlen($alphabet1) - 1)];
    }
    //*/

    return $code;
}

function splitName($fullName)
{
    // Trim any extra spaces from the name and split it into an array
    $nameParts = explode(' ', trim($fullName));
    // Initialize an array to hold first, middle, and last names
    $name = ['first' => '', 'middle' => '', 'last' => ''];

    // Depending on the number of parts, assign them accordingly
    switch (count($nameParts)) {
        case 1:
            // Only one part, so it's the first name
            $name['first'] = $nameParts[0];
            break;
        case 2:
            // Two parts, so first and last names
            $name['first'] = $nameParts[0];
            $name['last'] = $nameParts[1];
            break;
        default:
            // Three or more parts, so first, last, and the rest as middle names
            $name['first'] = array_shift($nameParts); // Assign and remove the first item
            $name['last'] = array_pop($nameParts); // Assign and remove the last item
            $name['middle'] = implode(' ', $nameParts); // The rest are middle names
            break;
    }

    return $name;
}

function normalizePhoneNumber($phoneNumber)
{
    // Remove any non-numeric characters (e.g., +, -, spaces)
    $cleanedNumber = preg_replace('/\D/', '', $phoneNumber);

    // Check if number starts with '254'
    if (substr($cleanedNumber, 0, 3) == '254') {
        // Number already starts with '254'
        return $cleanedNumber;
    } elseif (substr($cleanedNumber, 0, 1) == '0') {
        // Number starts with '0', replace '0' with '254'
        return '254' . substr($cleanedNumber, 1);
    } elseif (strlen($cleanedNumber) == 9) {
        // Number is 9 digits long, missing the country code '254'
        return '254' . $cleanedNumber;
    } else {
        // Return the number as is if it doesn't match the above conditions
        // You might want to handle this case differently depending on your needs
        return $cleanedNumber;
    }
}

function getCurrentTimeFormats()
{
    // Format without separators
    $formatWithoutSeparators = date('YmdHis');
    // Format with separators
    $formatWithSeparators = date('Y-m-d H:i:s');

    return [
        'withoutSeparators' => $formatWithoutSeparators,
        'withSeparators' => $formatWithSeparators,
    ];
}
function bypassCode($bypass, $billType, $code)
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $bypass['url'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
            "mpesadetails": {
                "FirstName": "John",
                "BillRefNumber": "' . $bypass['invoice_no'] . '",
                "TransAmount": "' . $bypass['amount'] . '",
                "BillType": "' . $billType . '",
                "TransChannel": "mpesa",
                "TransID": "' . $code . '"
            }
        }',

        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Cookie: csrftoken=VhxuGvVHOORIaTUKOqLGfkaUUuNP8IJ6hSkEUOsMU9NFU92RnfBn4EHWOlJeBekD; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODYzLCJzODIiLCJtb2JpbGVfbnVtYmVyIjoiMjU0NzExNTc2OTA5In0.DagH4XZzzA9tUNrZ3Ykg0zlrCEDXOzDFjes7k91yw4U'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

function updater($id, $desc, $status = '1')
{
    global $conn3;
    $stmt2 = $conn3->prepare("UPDATE message SET description=:description, status=:status WHERE id=:id");
    $stmt2->execute(['description' => $desc, 'status' => $status, 'id' => $id]);
}
