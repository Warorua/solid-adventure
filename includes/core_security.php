<?php
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function generateJWT($userId)
{
    $key = "VyX2RvbWFpbi5jb20iLCJpYXQiOjE3MjExODM3MTksImV4cCI6MTcyMTE4NzMxOSwidX"; // Replace with your secret key
    $payload = [
        //'iss' => "your_domain.com", // Issuer
        'iat' => time(), // Issued at
        'exp' => time() + 3600, // Expiration time (e.g., 1 hour)
        'userId' => $userId // Custom data
    ];
    $algorithm = 'HS256'; // Specify the algorithm

    return JWT::encode($payload, $key, $algorithm);
}

function verifyJWT($token) {
    $key = "VyX2RvbWFpbi5jb20iLCJpYXQiOjE3MjExODM3MTksImV4cCI6MTcyMTE4NzMxOSwidX"; // Replace with your secret key
    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return null;
    }
}
function calculateSimilarity($str1, $str2)
{
    similar_text($str1, $str2, $percent);

    return $percent;
}

function calculateAge($dob, $format)
{
    // Convert the date of birth string to a DateTime object
    $dob = DateTime::createFromFormat($format, $dob);

    // Get the current date
    $today = new DateTime();

    // Calculate the difference between the current date and the date of birth
    $age = $today->diff($dob);

    // Return the age in years
    return $age->y;
}

function calculateAge2($dob)
{
    // Convert the date of birth string to a DateTime object
    $dob = new DateTime($dob);

    // Get the current date
    $today = new DateTime();

    // Calculate the difference between the current date and the date of birth
    $age = $today->diff($dob);

    // Return the age in years
    return $age->y;
}

function convertDateFormat($isoDate)
{
    // Create a DateTime object from the ISO 8601 date string
    $date = new DateTime($isoDate);

    // Format the date into the desired format: dd/mm/yyyy
    return $date->format('d/m/Y');
}

function obscureMobileNumber($mobileNumber)
{
    // Ensure the mobile number is a string
    $mobileNumber = (string) $mobileNumber;

    // Get the length of the mobile number
    $length = strlen($mobileNumber);

    // Define how many digits to leave visible
    $visibleDigits = 4;

    // Calculate how many digits to obscure
    $obscureLength = $length - $visibleDigits;

    // Generate the obscured part
    $obscuredPart = str_repeat('*', $obscureLength);

    // Get the visible part
    $visiblePart = substr($mobileNumber, -$visibleDigits);

    // Combine the obscured part with the visible part
    return $obscuredPart . $visiblePart;
}

function obscureEmail($email)
{
    // Split the email into the local part and the domain
    list($localPart, $domain) = explode('@', $email);

    // Determine the length of the local part
    $length = strlen($localPart);

    // Ensure there are enough characters to obscure
    if ($length <= 4) {
        // If the local part is too short, just obscure the middle part
        $visiblePart1 = substr($localPart, 0, 1);
        $visiblePart2 = substr($localPart, -1);
        $obscuredPart = str_repeat('*', $length - 2);
    } else {
        // Otherwise, keep the first two and last two characters visible
        $visiblePart1 = substr($localPart, 0, 2);
        $visiblePart2 = substr($localPart, -2);
        $obscuredPart = str_repeat('*', $length - 4);
    }

    // Combine the parts
    return $visiblePart1 . $obscuredPart . $visiblePart2 . '@' . $domain;
}

function generateRandomNumber($min, $max)
{
    // Ensure the minimum and maximum values are integers
    $min = (int) $min;
    $max = (int) $max;

    // Generate a random number within the specified range
    return rand($min, $max);
}

function separateNames($name)
{
    // Check if the name contains a space
    if (strpos($name, ' ') !== false) {
        // Split the name into first and second name
        list($firstName, $secondName) = explode(' ', $name, 2);
        return ['firstName' => $firstName, 'secondName' => $secondName];
    }

    // Return the name unchanged if there is no space
    return ['firstName' => $name, 'secondName' => ''];
}


function verificationModule($idNo)
{
    $url = 'https://kever.io/finder_2.php?type=json';
    $data = ['idno' => $idNo];
    $ver = json_decode(httpPost($url, $data), true);
    if (is_array($ver)) {
        $qna = [];
        if (isset($ver['fullname']) && isset($ver['dateBirth'])) {
            /////////////////////////////DOB
            if (isset($ver['dob_2'])) {
                $qna['dob']['p1']['qs'] = 'What is your date of birth? format:DD/MM/YYYY';
                $qna['dob']['p1']['an'] = $ver['dob_2'];

                $qna['dob']['p2']['qs'] = 'What is your age?';
                $qna['dob']['p2']['an'] = calculateAge($ver['dob_2'], 'd/m/Y');
            } elseif (isset($ver['dob_1'])) {
                $qna['dob']['p1']['qs'] = 'What is your date of birth? format:DD/MM/YYYY';
                $qna['dob']['p1']['an'] = $ver['dob_1'];

                $qna['dob']['p2']['qs'] = 'What is your age?';
                $qna['dob']['p2']['an'] = calculateAge($ver['dob_1'], 'd/m/Y');
            } else {
                $qna['dob']['p1']['qs'] = 'What is your date of birth? format:DD/MM/YYYY';
                $qna['dob']['p1']['an'] = convertDateFormat($ver['dateBirth']);

                $qna['dob']['p2']['qs'] = 'What is your age?';
                $qna['dob']['p2']['an'] = calculateAge2($ver['dateBirth']);
            }

            /////////////////////////////FATHER
            if (isset($ver['fathersFirstName'])) {
                $qna['father']['p1']['qs'] = "What is your father's first name?";
                $qna['father']['p1']['an'] = str_replace(' ', '', $ver['fathersFirstName']);
            }

            if (isset($ver['fatherMiddleName'])) {
                $qna['father']['p2']['qs'] = "What is your father's middle name?";
                $qna['father']['p2']['an'] = str_replace(' ', '', $ver['fatherMiddleName']);
            }

            if (isset($ver['fatherLastName'])) {
                $qna['father']['p3']['qs'] = "What is your father's last name?";
                $qna['father']['p3']['an'] = str_replace(' ', '', $ver['fatherLastName']);
            }

            ////////////////////////////MOTHER
            if (isset($ver['mothersFirstName'])) {
                $qna['mother']['p1']['qs'] = "What is your mother's first name?";
                $qna['mother']['p1']['an'] = str_replace(' ', '', $ver['mothersFirstName']);
            }

            if (isset($ver['motherMiddleName'])) {
                $qna['mother']['p2']['qs'] = "What is your mother's middle name?";
                $qna['mother']['p2']['an'] = str_replace(' ', '', $ver['motherMiddleName']);
            }

            if (isset($ver['motherLastName'])) {
                $qna['mother']['p3']['qs'] = "What is your mother's last name?";
                $qna['mother']['p3']['an'] = str_replace(' ', '', $ver['motherLastName']);
            }

            /////////////////////////CONTACT
            if (isset($ver['mobile_number'])) {
                $qna['mobile']['p1']['qs'] = 'Complete this mobile number: '.obscureMobileNumber(str_replace('+', '', $ver['mobile_number']));
                $qna['mobile']['p1']['an'] = str_replace('+', '', $ver['mobile_number']);
                $qna['mobile']['p1']['o1'] = obscureMobileNumber(str_replace('+', '', $ver['mobile_number']));
            }

            if (isset($ver['mobile_number_2'])) {
                $qna['mobile']['p2']['qs'] = 'Complete this mobile number: '.obscureMobileNumber(str_replace('+', '', $ver['mobile_number_2']));
                $qna['mobile']['p2']['an'] = str_replace('+', '', $ver['mobile_number_2']);
                $qna['mobile']['p2']['o1'] = obscureMobileNumber(str_replace('+', '', $ver['mobile_number_2']));
            }

            if (isset($ver['mobile_number_B'])) {
                $qna['mobile']['p3']['qs'] = 'Complete this mobile number: '.obscureMobileNumber(str_replace('+', '', $ver['mobile_number_B']));
                $qna['mobile']['p3']['an'] = str_replace('+', '', $ver['mobile_number_B']);
                $qna['mobile']['p3']['o1'] = obscureMobileNumber(str_replace('+', '', $ver['mobile_number_B']));
            }

            if (isset($ver['nhif']['phone_nhif'])) {
                $qna['mobile']['p4']['qs'] = 'Complete this mobile number: '.obscureMobileNumber(str_replace('+', '', $ver['nhif']['phone_nhif']));
                $qna['mobile']['p4']['an'] = str_replace('+', '', $ver['nhif']['phone_nhif']);
                $qna['mobile']['p4']['o1'] = obscureMobileNumber(str_replace('+', '', $ver['nhif']['phone_nhif']));
            }

            /////////////////////////////EMAIL
            if (isset($ver['main_email_1'])) {
                $qna['email']['p1']['qs'] = 'Complete this email address: '.obscureEmail(str_replace(' ', '', $ver['main_email_1']));
                $qna['email']['p1']['an'] = str_replace(' ', '', $ver['main_email_1']);
                $qna['email']['p1']['o1'] = obscureEmail(str_replace(' ', '', $ver['main_email_1']));
            }

            if (isset($ver['secondary_email_1'])) {
                $qna['email']['p2']['qs'] = 'Complete this email address: '.obscureEmail(str_replace(' ', '', $ver['secondary_email_1']));
                $qna['email']['p2']['an'] = str_replace(' ', '', $ver['secondary_email_1']);
                $qna['email']['p2']['o1'] = obscureEmail(str_replace(' ', '', $ver['secondary_email_1']));
            }

            if (isset($ver['nhif']['email_nhif'])) {
                $qna['email']['p3']['qs'] = 'Complete this email address: '.obscureEmail(str_replace(' ', '', $ver['nhif']['email_nhif']));
                $qna['email']['p3']['an'] = str_replace(' ', '', $ver['nhif']['email_nhif']);
                $qna['email']['p3']['o1'] = obscureEmail(str_replace(' ', '', $ver['nhif']['email_nhif']));
            }

            ///////////////////LOCATION CHECK
            if (isset($ver['issuePlace'])) {
                $qna['location']['p1']['qs'] = 'Which constituecy was your ID issued from?';
                $qna['location']['p1']['an'] = str_replace(' ', '', $ver['issuePlace']);
            }
            if (isset($ver['county_1'])) {
                $qna['location']['p2']['qs'] = 'Which county do you live in?';
                $qna['location']['p2']['an'] = str_replace(' ', '', $ver['county_1']);
            }

            /////////////////////dependents
            if (isset($ver['nhif']['marital_status_nhif'])) {
                if ($ver['nhif']['marital_status_nhif'] != 'Single') {
                    $url = 'https://nhifapi.tilil.co.ke/api_view_dependants';
                    $data = '{"source":"WEB","phone":"","id_number":"' . $idNo . '"}';
                    $dpts = json_decode(httpPost($url, $data), true);
                    //$qna['dpts'] = $dpts;
                    if (isset($dpts['data'])) {
                        $dpts_cnt = count($dpts['data']);
                        if ($dpts_cnt > 0) {
                            $dpts_cnt = $dpts_cnt - 1;
                            $dpts_rand = generateRandomNumber(0, $dpts_cnt);
                            $dpts_name = $dpts['data'][$dpts_rand]['first_name'] . ' ' . $dpts['data'][$dpts_rand]['first_name'];
                            $separatedName = separateNames($dpts['data'][$dpts_rand]['first_name']);
                            if ($separatedName['secondName']) {
                                $qna['dependents']['p1']['qs'] = 'what is ' . $separatedName['firstName'] . ' your ' . $dpts['data'][$dpts_rand]['relationship'] . "'s second name?";
                                $qna['dependents']['p1']['an'] = $separatedName['secondName'];
                            } else {
                                $qna['dependents']['p1']['qs'] = 'what is ' . $separatedName['firstName'] . ' your ' . $dpts['data'][$dpts_rand]['relationship'] . "'s second name?";
                                $qna['dependents']['p1']['an'] = $dpts['data'][$dpts_rand]['last_name'];
                            }
                        }
                    }
                }

                ///////////////////////////
            }
        } elseif (isset($ver['error'])) {
        } else {
        }
    }

    return json_encode($qna, JSON_PRETTY_PRINT);
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
