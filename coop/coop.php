<?php
include '../includes/core.php';
include '../includes/core_coop.php';
//echo formatCookie(json_decode(base64_decode($_POST['cookies']), true));
//*
if (isset($_POST)) {
    $file = './cookies/process_data.json';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
    } else {
        $dt1 = [];
    }
    if (!isset($_POST['otp']) && !isset($_POST['fpass'])) {

        $rawCookie = json_decode(base64_decode($_POST['cookies']), true);
        $dt1['csrfCks']['prev'] = $rawCookie;

        $cookies = formatCookie($rawCookie);
        $password = $dt1['password'] = $_POST['password'];
        $username = $dt1['username'] = $_POST['username'];
        $salt = $_POST['salt'];
        $userPin = $dt1['userPin'] = $_POST['userPin'];
        build_file($file, json_encode($dt1));

        $csrf = captchaDinsess($cookies, $password, $username, $salt, $userPin);

        //echo $csrf[1];

        $otpref = captchaOtpref($cookies, $password, $username, $salt, $userPin, $csrf[0]);



        echo json_encode($otpref[0]);
    } elseif(isset($_POST['otp'])) {
        //$OTP = intval($_POST['otp']);
        $OTP = $_POST['otp'];
        if (strlen($OTP) != 6) {
            echo 'OTP length invalid';
        } else {
            //echo 'Length Valid';
            $confirmOtp = confirmOtp($OTP);

            echo json_encode($confirmOtp[0]);
        }
    }elseif(isset($_POST['fpass'])){
        $salt = $_POST['salt'];
        $data = $_POST['data'];
        $fpass = fPass($salt, $data);
        echo $fpass;
    }
} else {
    die('No POST data!');
}
//*/
