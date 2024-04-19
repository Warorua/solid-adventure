<?php
$timestamp = date('YmdHis');
$password = base64_encode('60600479b27856079184f31b9a95356e816be2e8f3583946299b370cc93e4a513f84079' . $timestamp);
$phone_no = "254703115553";
$curl = curl_init();



$obj = [
    "BusinessShortCode" => "6060047",
    "Password" => $password,
    "Timestamp" => $timestamp,
    "TransactionType" => "CustomerPayBillOnline",
    "Amount" => "5",
    "PartyA" => $phone_no,
    "PartyB" => "6060047",
    "PhoneNumber" => $phone_no,
    "CallBackURL" => "https://edev.nairobiservices.go.ke/api/gateway/taifa/nrs/affirm",
    "AccountReference" => "BL-SE-A1DB6A6D",
    "TransactionDesc" => "- 0"
];

$final_obj = json_encode($obj);
echo $final_obj . '<br/><br/>';

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $final_obj,
    CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer aAluOLTnJ5W5JihwHnIJIrO9zLV7',
        'Content-Type: application/json',
        //'Cookie: incap_ses_1776_2742146=IDmxI+3x3gTQ8RG6t56lGJWtEmYAAAAAVPEE60CB4UPuGUoZGaKJog==; incap_ses_268_2742146=KtIVEtWf+FzMuj5m/SC4A8FTEmYAAAAAnejEpL15T/eJEvruZr47RA==; visid_incap_2320573=9Dgp2fUORriaIyddT4b85pOqCWYAAAAAQUIPAAAAAADTYqpO7b5ZTxzDCICBQ3tB; visid_incap_2742146=u2YWliwNR1mnsWuGQcZJi9OxCWYAAAAAQUIPAAAAAABFrXfFV4VRCEEvVkjhzMd0'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
