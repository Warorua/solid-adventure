<?php

define ('HMAC_SHA256', 'sha256');
define ('SECRET_KEY', 'e300b439d275436ba7fd73d62c93a9f363328467247e490899d4a84b8172559b73227db6499b4691bb734a1cdf867dee007bfaa00879424a991dd3bced953bf4b3f74ed938a841af8a2f41b55dce87754a2a56c32b7448fabdaf56e4b81fc53add22462a46404ed4b769a3c1b143dcc674b1d6f310504300aee3ce31740f2b1b');

function sign2 ($params, $key) {
  return signData(buildDataToSign($params), $key);
}

function sign ($params) {
  return signData(buildDataToSign($params), SECRET_KEY);
}

function signData($data, $secretKey) {
    return base64_encode(hash_hmac('sha256', $data, $secretKey, true));
}

function buildDataToSign($params) {
        $signedFieldNames = explode(",",$params["signed_field_names"]);
        foreach ($signedFieldNames as $field) {
           $dataToSign[] = $field . "=" . $params[$field];
        }
        return commaSeparate($dataToSign);
}

function commaSeparate ($dataToSign) {
    return implode(",",$dataToSign);
}

function verifySignature($params, $secretKey) {
  // Extract the expected MAC from the input data
  $expectedMac = $params["signature"];

  // Compute the actual MAC using the same secret key
  $dataToSign = buildDataToSign($params);
  $actualMac = signData($dataToSign, $secretKey);

  // Compare the expected and actual MACs
  return hash_equals($expectedMac, $actualMac);
}

function generateSecretKey() {
  $key = bin2hex(random_bytes(64));
  return substr($key, 0, 128);
}


?>
