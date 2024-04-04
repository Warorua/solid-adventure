<?php
 
 $ch = curl_init('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
 curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Basic ' . base64_encode('SHaEdhp9nBD9wCO4xcLdFWwAfcFdGCAn:GXMAxZoDGAV9kGqU')
 ]);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
 $response = curl_exec($ch);
 echo json_decode($response);