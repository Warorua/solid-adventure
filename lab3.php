<?php
include './web/security.php';

$params = [
'signed_field_names'=>'profile_id,access_key,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,payment_method,transaction_type,reference_number,auth_trans_ref_no,amount,currency,merchant_descriptor,override_custom_receipt_page',
'profile_id'=>'7FC2B562-010C-445F-BD61-EE47D0F96241',
'access_key'=>'ae80c8fc1a3736baa2ff3e64b8df39bb',
'transaction_uuid'=>'_395',
'unsigned_field_names'=>'device_fingerprint_id,card_type,card_number,card_expiry_date,card_cvn,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_line2,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,customer_ip_address,line_item_count,item_0_code,item_0_sku,item_0_name,item_0_quantity,item_0_unit_price,merchant_defined_data1,merchant_defined_data2,merchant_defined_data3,merchant_defined_data4',
'signed_date_time'=>'2023-05-14T10:33:39Z',
'locale'=>'en-us',
'payment_method'=>'card',
'transaction_type'=>'sale',
'reference_number'=>'',
'auth_trans_ref_no'=>'',
'amount'=>'',
'currency'=>'',
'merchant_descriptor'=>'ECITIZEN',
'override_custom_receipt_page'=>'https://pesaflow.ecitizen.go.ke/PaymentAPI/Wrappers/Cybersource4/ipn.php',
'signature' => 'gMZw32fbei8FHI1ZfDXMeqmPR+Z8ATmHy/8Gafg0OAo=',
];
//$key = SECRET_KEY;
$key = '12';
echo sign2 ($params, $key)."<br/>";

if (verifySignature($params, $key)) {
    echo "<b style='color:green'>Signature verification succeeded!</b><br/>";
} else {
    echo "<b style='color:red'>Signature verification failed!</b><br/>";
}

$secretKey = generateSecretKey();
echo $secretKey.'<br/>';

echo hash_hmac('sha256', $params['profile_id'], $params['access_key'], true);