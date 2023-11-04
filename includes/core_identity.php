<?php
session_start();

function myToken()
{
    $curl = curl_init();
    $cookiesFile = '../cookies/identity.txt';
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://identity.safaricom.com/graphql?grant_type=client_credentials',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
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

function containsWord($string, $searchTerm)
{
    //$searchTerm = 'safaricom';
    $lowercaseString = strtolower($string);
    $lowercaseSearchTerm = strtolower($searchTerm);

    return strpos($lowercaseString, $lowercaseSearchTerm) !== false;
}


function getUserData($token)
{
    $cookiesFile = '../cookies/identity.txt';
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://www.safaricom.com/graphql',
        CURLOPT_RETURNTRANSFER => true,
        //CURLOPT_ENCODING => '',
        //CURLOPT_MAXREDIRS => 10,
        //CURLOPT_TIMEOUT => 0,
        //CURLOPT_FOLLOWLOCATION => true,
        //CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_COOKIEJAR => realpath($cookiesFile),
        CURLOPT_COOKIEFILE => realpath($cookiesFile),
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{"operationName":"GetCustomerInfo","variables":{},"query":"query GetCustomerInfo {\\n  getCustomerInfo {\\n    status\\n    message\\n    customerType\\n    firstName\\n    lastName\\n     idNumber\\n    blazer\\n    blazeTariff\\n    tariff\\n    blazerId\\n    __typename\\n  }\\n}\\n"}',
        CURLOPT_HTTPHEADER => array(
            //'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'hetoken: '.$token,
            'DNT: 1',
            'sec-ch-ua-mobile: ?0',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.360101',
            'content-type: application/json',
            'accept: */*',
            //'apollo-require-preflight: true',
            //'x-apollo-operation-name: true',
            //'sec-ch-ua-platform: "Windows"',
            //'Sec-Fetch-Site: same-origin',
            //'Sec-Fetch-Mode: cors',
            //'Sec-Fetch-Dest: empty',
            'host: www.safaricom.com',
            //'Cookie: dtCookie=v_4_srv_3_sn_B6E39360438A8600649B2594F18C36E7_perc_100000_ol_0_mul_1_app-3Aef3130cdf2794d94_0_rcs-3Acss_0; incap_ses_1023_2353962=JoCRZQp6CSWJXIJEEm4yDn8comQAAAAAfX5nvFvD7EnoUL1jg8nDMA==; incap_ses_1362_2516540=EduKEp+Xi0a2bXUBmMzmEjoVomQAAAAAsVviR2IGfJL/PiIIjPPPzA==; nlbi_2353962=a16bX4FmxkBlMhr0q+f5rwAAAAAPDkwa60Vlze2zBl3YuZJy; nlbi_2516540=BEv7IMXh0Fbmxei83rmYCAAAAAAJNBb70axOCG7NqKQ63VAq; visid_incap_2353962=VoWSZBAJQ+GNYSZpTeHn67RNk2QAAAAAQUIPAAAAAABVRDcw9+YreklUpZX7PUeK; visid_incap_2516540=Vdj+hce2SV2I4r+FXQSUmJBPk2QAAAAAQUIPAAAAAAAIl3ltvkR1EtiwnXMmtesb; mySafaricomWorldProd=L2HKxhN45dfNdpw%2B0fDpBP3y%2FwCocVhRCaEQCqh71cyfQV9dKzx9z3JFAeY1RNOheU95CpKo8MbFF6reVU7jOpAOlew%2BPXZZezXtByEwQjATDt70Vb81%3BEJYZvtaP%2BIf2XHjJKPK%2FfbUrbzl%2F%2FdS4'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}
