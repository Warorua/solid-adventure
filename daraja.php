<?php
 
 $ch = curl_init('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
 curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Basic ' . base64_encode('SHaEdhp9nBD9wCO4xcLdFWwAfcFdGCAn:GXMAxZoDGAV9kGqU')
 ]);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
 $response = curl_exec($ch);
 echo json_decode($response);

 //I helped the institution create an online platform that facilitated online learning and translated the institution's customer requirements into technical site concepts for bidding and initial planning purposes. I oversaw numerous social media campaigns, including creating and deploying content, engaging with target audiences, and boosting reach with strategic ad placements.