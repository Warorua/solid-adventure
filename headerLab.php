<?php

/*
if (isset($_SERVER['GEOIP_ADDR'])) {


    echo json_encode(apache_request_headers()) . ' - HEADER<br/><br/><br/>';
    echo json_encode($_POST) . ' - POST <br/><br/><br/>';
    echo json_encode($_SERVER) . ' - SERVER<br/><br/><br/>';
} else {
    echo myToken();
    //echo json_encode($_SERVER). ' - SERVER<br/><br/><br/>';
    echo json_encode(dns_get_record('105.161.173.77'));
}
*/
function myToken()
{
    $curl = curl_init();
    $customIP = "192.168.0.100";
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://master.kotnova.com/headerLab.php',
        CURLOPT_RETURNTRANSFER => true,
        //CURLOPT_INTERFACE => $customIP,
        //CURLOPT_DNS_LOCAL_IP4 => $customIP,
        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain, */*',
            'Content-Type: application/json',
            'DNT: 1',
            'sec-ch-ua-mobile: ?0',
            /*
            'X-MSISDN: 254710860361',
            'X_MSISDN: 254710860361',
            'HTTP-X-MSISDN: 254710860361',
            'X-UP-CALLING-LINE-ID: 254710860361',
            'X_UP_CALLING_LINE_ID: 254710860361',
            'HTTP_X_UP_CALLING_LINE_ID: 254710860361',
            'X_WAP_NETWORK_CLIENT_MSISDN: 254710860361',
            'X-Forwarded-For: 254710860361',
            'Proxy-Client-IP: 254710860361',
            'WL-Proxy-Client-IP: 254710860361',
            'HTTP_CLIENT_IP: 254710860361',
            'HTTP_X_FORWARDED_FOR: 254710860361',
            'x-real-ip: 254710860361',
            'HTTP_X_UP_CALLING_LINE_ID: 254710860361',
            'HTTP_MSISDN: 254710860361',
            'MSISDN: 254710860361',
            'User-Identity-Forward-msisdn: 254710860361',
            'HTTP_X_MSISDN: 254710860361',
            'HTTP_X_NOKIA_MSISDN: 254710860361',
            'HTTP_X_UP_SUBNO: 254710860361',
            //'X-Forwarded-For: 101.161.000.70',
            //'Client-IP: 101.161.000.70',
            //'X-Real-IP: 101.161.000.70',
            //*/
            //'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
            'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            'sec-ch-ua-platform: "Windows"',
            'Sec-Fetch-Site: same-site',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'host: master.kotnova.com',
            //'Cookie: dtCookie=v_4_srv_3_sn_0A9306B63B9E78799A200569C5EF0832_perc_100000_ol_0_mul_1_app-3Aef3130cdf2794d94_0; incap_ses_1020_2516540=4wAdZqSLWjE1G1MGlMUnDo1Zk2QAAAAA9Gsu5BDlZLo/l2bb/I88jg==; incap_ses_1023_2353962=7gEgem6KhxIY84DyD24yDr1Xk2QAAAAAxZI8AEsjqTpz8p4efYdGgw==; incap_ses_1213_2353962=6AuQMWnFTBCbm4PzBHLVEABZk2QAAAAAIIGbR6e3SCqnDWJvncYWtg==; incap_ses_1342_2353962=xp7HF3RSyWaRGDA2rL6fErVNk2QAAAAAs0bdvm4KM2de+Hi2XRnyZQ==; incap_ses_1548_2516540=6qWmWrq+cS2djC8pPJp7FeFXk2QAAAAA03eEKVrqc7V5wPHgBx4Nfg==; incap_ses_777_2353962=wCdAWwcZZQVlfUycVnbICuNOk2QAAAAA+qE8Sf424fVzwryaEwoz6w==; nlbi_2353962=rckiSFq8wRiotdQXq+f5rwAAAAB9OecGhz6gUsLRmYuEKNoG; nlbi_2516540=vDfrW03Fe05F7SCy3rmYCAAAAADLbr0Rfk/O490oKBGJg5hj; visid_incap_2353962=VoWSZBAJQ+GNYSZpTeHn67RNk2QAAAAAQUIPAAAAAABVRDcw9+YreklUpZX7PUeK; visid_incap_2516540=Vdj+hce2SV2I4r+FXQSUmJBPk2QAAAAAQUIPAAAAAAAIl3ltvkR1EtiwnXMmtesb'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

function hashValidate($pass, $hash)
{
    $password = $pass; // The password entered by the user
    $hashedPassword = $hash;

    if (password_verify($password, $hashedPassword)) {
        return "Password is valid!";
    } else {
        return "Invalid password!";
    }
}
/*
$password = '123qwe'; // The password entered by the user
$hashedPassword = '$2a$08$aidMWQyUNf5tosE0DFY7l.UwJXm.O/yHM96gR3j2CevTWNLmlnuvW';

//echo hashValidate($password, $hashedPassword);

$string = '254716912002';

// Hash with SHA-256
$sha256Hash = hash('sha256', $string);
echo "SHA-256 Hash: " . $sha256Hash . "<br/>";

// Hash with SHA-384
$sha384Hash = hash('sha384', $string);
echo "SHA-384 Hash: " . $sha384Hash . "<br/>";

// Hash with Keccak-256
$keccak256Hash = hash('sha3-256', $string);
echo "Keccak-256 Hash: " . $keccak256Hash . "<br/>";

// Hash with MD5
$md5Hash = md5($string);
echo "MD5 Hash: " . $md5Hash . "<br/>";

// Hash with MD5
$sha256md5Hash = hash('sha256',md5($string));
echo "sha256(md5()) Hash: " . $sha256md5Hash . "<br/>";
*/

// Function to generate a random string
function generateRandomString($length = 32) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = '';
    
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    
    return $randomString;
}

// Generate 10,000 random strings and save them to a file
$numberOfStrings = 10000000;
$filename = 'pass_file.txt';
$file = fopen($filename, 'w');

if ($file) {
    for ($i = 0; $i < $numberOfStrings; $i++) {
        $randomString = generateRandomString();
        fwrite($file, $randomString . "\n");
    }
    
    fclose($file);
    echo "Random strings saved to $filename.";
} else {
    echo "Failed to open file for writing.";
}
?>

