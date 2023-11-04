<?php
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = '7e500a9b415326678b77b3c2aa440c8202dc23e6123a842efdef4e39316268ac';
$payload = [
    "data" => [
        "msisdn" => "254716912002",
        "clientIp" => "105.167.127.219",
        "os" => "Windows 10.0",
        "source" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "platform" => "Microsoft Windows",
        "isMobile" => false,
        "isTablet" => false,
        "isDesktop" => true,
        "isIpod" => false,
        "isIphone" => false,
        "isAndroid" => false,
        "isBlackberry" => false,
        "isOpera" => false,
        "isIE" => false,
        "isEdge" => false,
        "isSafari" => false,
        "isFirefox" => false
    ],
    "iat" => 1687383689,
    "exp" => 1687556489

];

/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$jwt = JWT::encode($payload, $key, 'HS256');

//$jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2Ny4xMjcuMjE5Iiwib3MiOiJXaW5kb3dzIDEwLjAiLCJzb3VyY2UiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTE0LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJwbGF0Zm9ybSI6Ik1pY3Jvc29mdCBXaW5kb3dzIiwiaXNNb2JpbGUiOmZhbHNlLCJpc1RhYmxldCI6ZmFsc2UsImlzRGVza3RvcCI6dHJ1ZSwiaXNJcG9kIjpmYWxzZSwiaXNJcGhvbmUiOmZhbHNlLCJpc0FuZHJvaWQiOmZhbHNlLCJpc0JsYWNrYmVycnkiOmZhbHNlLCJpc09wZXJhIjpmYWxzZSwiaXNJRSI6ZmFsc2UsImlzRWRnZSI6ZmFsc2UsImlzU2FmYXJpIjpmYWxzZSwiaXNGaXJlZm94IjpmYWxzZX0sImlhdCI6MTY4NzM4MzY4OSwiZXhwIjoxNjg3NTU2NDg5fQ.5IXLMlSnAaCs9ElvSuNVRJwM8z2vKZwo3gKpdVJUb0o';
//$jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2Ny4xMjcuMjE5Iiwib3MiOiJXaW5kb3dzIDEwLjAiLCJzb3VyY2UiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTE0LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJwbGF0Zm9ybSI6Ik1pY3Jvc29mdCBXaW5kb3dzIiwiaXNNb2JpbGUiOmZhbHNlLCJpc1RhYmxldCI6ZmFsc2UsImlzRGVza3RvcCI6dHJ1ZSwiaXNJcG9kIjpmYWxzZSwiaXNJcGhvbmUiOmZhbHNlLCJpc0FuZHJvaWQiOmZhbHNlLCJpc0JsYWNrYmVycnkiOmZhbHNlLCJpc09wZXJhIjpmYWxzZSwiaXNJRSI6ZmFsc2UsImlzRWRnZSI6ZmFsc2UsImlzU2FmYXJpIjpmYWxzZSwiaXNGaXJlZm94IjpmYWxzZX0sImlhdCI6MTY4NzM4NDI0MCwiZXhwIjoxNjg3NTU3MDQwfQ.AXPrAJLC_LozKK-hVGoIJeNJeX3RDWV_pxAsDqtWsrA';

$key = '7e500a9b415326678b77b3c2aa440c8202dc23e6123a842efdef4e39316268ac';
//$key = base64_decode($key);
//$key = 'N2U1MDBhOWI0MTUzMjY2NzhiNzdiM2MyYWE0NDBjODIwMmRjMjNlNjEyM2E4NDJlZmRlZjRlMzkzMTYyNjhhYw==';

try {
    $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
    print_r($decoded);
    //echo '. good' . ' - KEY: ' . $key . PHP_EOL;
} catch (Exception $e) {

    //echo 'bad signature' . PHP_EOL;
}


//echo $jwt;
function myToken()
{
    $curl = curl_init();
    $customIP = "192.168.0.100";
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://identity.safaricom.com/graphql?grant_type=client_credentials',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HEADER => true,
        //CURLOPT_INTERFACE => $customIP,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
    "query": "\\n            query GenerateToken{\\n                generateToken{\\n                  status\\n                  message\\n                  token \\n                }\\n            }\\n           "
 }',
        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Accept: application/json, text/plain, */*',
            'Content-Type: application/json',
            'DNT: 1',
            'sec-ch-ua-mobile: ?0',
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
            //'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
            'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            'sec-ch-ua-platform: "Windows"',
            'Sec-Fetch-Site: same-site',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'host: identity.safaricom.com',
            //'Cookie: dtCookie=v_4_srv_3_sn_0A9306B63B9E78799A200569C5EF0832_perc_100000_ol_0_mul_1_app-3Aef3130cdf2794d94_0; incap_ses_1020_2516540=4wAdZqSLWjE1G1MGlMUnDo1Zk2QAAAAA9Gsu5BDlZLo/l2bb/I88jg==; incap_ses_1023_2353962=7gEgem6KhxIY84DyD24yDr1Xk2QAAAAAxZI8AEsjqTpz8p4efYdGgw==; incap_ses_1213_2353962=6AuQMWnFTBCbm4PzBHLVEABZk2QAAAAAIIGbR6e3SCqnDWJvncYWtg==; incap_ses_1342_2353962=xp7HF3RSyWaRGDA2rL6fErVNk2QAAAAAs0bdvm4KM2de+Hi2XRnyZQ==; incap_ses_1548_2516540=6qWmWrq+cS2djC8pPJp7FeFXk2QAAAAA03eEKVrqc7V5wPHgBx4Nfg==; incap_ses_777_2353962=wCdAWwcZZQVlfUycVnbICuNOk2QAAAAA+qE8Sf424fVzwryaEwoz6w==; nlbi_2353962=rckiSFq8wRiotdQXq+f5rwAAAAB9OecGhz6gUsLRmYuEKNoG; nlbi_2516540=vDfrW03Fe05F7SCy3rmYCAAAAADLbr0Rfk/O490oKBGJg5hj; visid_incap_2353962=VoWSZBAJQ+GNYSZpTeHn67RNk2QAAAAAQUIPAAAAAABVRDcw9+YreklUpZX7PUeK; visid_incap_2516540=Vdj+hce2SV2I4r+FXQSUmJBPk2QAAAAAQUIPAAAAAAAIl3ltvkR1EtiwnXMmtesb'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

function hashVerif($token)
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://www.safaricom.com/graphql',
        CURLOPT_RETURNTRANSFER => true,
        //CURLOPT_ENCODING => '',
        //CURLOPT_MAXREDIRS => 10,
        //CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{"operationName":"GetToken","variables":{},"query":"query GetToken {\\n  getToken {\\n    status\\n    message\\n    mobileNumber\\n    proceed\\n    hash\\n    __typename\\n  }\\n}\\n"}',
        CURLOPT_HTTPHEADER => array(
            'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'hetoken: ' . $token,
            'DNT: 1',
            'sec-ch-ua-mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'content-type: application/json',
            'accept: */*',
            'apollo-require-preflight: true',
            'x-apollo-operation-name: true',
            'sec-ch-ua-platform: "Windows"',
            'Sec-Fetch-Site: same-origin',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Dest: empty',
            'host: www.safaricom.com',
            'Cookie: dtCookie=v_4_srv_3_sn_0A9306B63B9E78799A200569C5EF0832_perc_100000_ol_0_mul_1_app-3Aef3130cdf2794d94_0; incap_ses_1020_2516540=4wAdZqSLWjE1G1MGlMUnDo1Zk2QAAAAA9Gsu5BDlZLo/l2bb/I88jg==; incap_ses_1023_2353962=NOj/PEKsEzgE7InyD24yDtRkk2QAAAAAgnzqoVsmyCtn9QDMLVS3WQ==; incap_ses_1213_2353962=hMJIBqkXs0ZQZZnzBHLVEARvk2QAAAAAqvhQOfz6yHW01hrS1cmubA==; incap_ses_1342_2353962=xp7HF3RSyWaRGDA2rL6fErVNk2QAAAAAs0bdvm4KM2de+Hi2XRnyZQ==; incap_ses_1548_2516540=JS8YB/UT8FZWQEApPJp7FYhuk2QAAAAAuvrAZ0DH+zOfpwu3Labalg==; incap_ses_777_2353962=wCdAWwcZZQVlfUycVnbICuNOk2QAAAAA+qE8Sf424fVzwryaEwoz6w==; nlbi_2353962=Mo5eU6CWAG9EiSPIq+f5rwAAAAA1DB/xO/Z2sRwLZDehsFiA; nlbi_2516540=vDfrW03Fe05F7SCy3rmYCAAAAADLbr0Rfk/O490oKBGJg5hj; visid_incap_2353962=VoWSZBAJQ+GNYSZpTeHn67RNk2QAAAAAQUIPAAAAAABVRDcw9+YreklUpZX7PUeK; visid_incap_2516540=Vdj+hce2SV2I4r+FXQSUmJBPk2QAAAAAQUIPAAAAAAAIl3ltvkR1EtiwnXMmtesb; adobe_user_id=7e500a9b415326678b77b3c2aa440c8202dc23e6123a842efdef4e39316268ac; adobe_user_id.sig=SWqC6haH1OvonhPy55XniJpHQ4A; mySafaricomWorldProd=CYIVyjqMkx8cUVGd2n0pcyIXyYZoLv2e2f0uPrTdk914md8J0EKKoWf2MtCr7b%2BQguCDVJafroGKJ30C04jvOgfIWXN4O3tX0XNfMnmjIQJdA5kVRM1fGA%3D%3D%3BNjdcjtYUdutyjrakCC0kIMPhlijaKMeb'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

$token = myToken();
//$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2Ny4xMjcuMjE5Iiwib3MiOiJXaW5kb3dzIDEwLjAiLCJzb3VyY2UiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTE0LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJwbGF0Zm9ybSI6Ik1pY3Jvc29mdCBXaW5kb3dzIiwiaXNNb2JpbGUiOmZhbHNlLCJpc1RhYmxldCI6ZmFsc2UsImlzRGVza3RvcCI6dHJ1ZSwiaXNJcG9kIjpmYWxzZSwiaXNJcGhvbmUiOmZhbHNlLCJpc0FuZHJvaWQiOmZhbHNlLCJpc0JsYWNrYmVycnkiOmZhbHNlLCJpc09wZXJhIjpmYWxzZSwiaXNJRSI6ZmFsc2UsImlzRWRnZSI6ZmFsc2UsImlzU2FmYXJpIjpmYWxzZSwiaXNGaXJlZm94IjpmYWxzZX0sImlhdCI6MTY4NzM4NDI0MCwiZXhwIjoxNjg3NTU3MDQwfQ.AXPrAJLC_LozKK-hVGoIJeNJeX3RDWV_pxAsDqtWsrA';
//$token = $jwt;
//echo $token;
//echo hashVerif($token);
//7e500a9b415326678b77b3c2aa440c8202dc23e6123a842efdef4e39316268ac
