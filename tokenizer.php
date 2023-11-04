<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core.php';

if (isset($_POST['pin'])) {
    $pin = $_POST['pin'];
}
if (isset($_POST['phone'])) {
    $number = $_POST['phone'];
}
if (isset($_POST['cid'])) {
    $cid = $_POST['cid'];
}

$page = $_POST['bill'];

if ($page == 'b2') {
    if (isset($_SESSION['phone_number'])) {
        unset($_SESSION['phone_number']);
    }
    if ($number != '') {
        $url = 'https://nairobiservices.go.ke/api/authentication/auth/login/ussd';
        $data = ['ussd_pin' => $pin, 'mobile_number' => $number];

        $dt1 = json_decode(httpPost($url, $data), true);
        if (is_array($dt1)) {
            if (isset($dt1['token'])) {
                $_SESSION['token'] = $dt1['token'];
                $object_1 =  '<br/><b style="color:white;padding:20px;background-color:blue;border:none;border-radius:5px">Token set successfully</b>';
            } else {
                if (isset($dt1['error'])) {
                    $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Error: ' . $dt1['error'] . '</b>';
                } else {
                    $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Token not set! Unknown error!</b>';
                }
            }
        } else {
            $object_1 = $dt1;
        }
    } else {
        $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Phone Number needed to process data</b>';
    }
} elseif ($page == 'b1') {
    if ($cid != '') {
        $url = 'https://nairobiservices.go.ke/api/authentication/auth/generate_customer_token';
        $data = ['customer_no' => $cid];
        $dt1 = json_decode(httpGet($url, $data), true);
        if (is_array($dt1)) {
            if (isset($dt1['token'])) {
                $_SESSION['token'] = $dt1['token'];
                $_SESSION['phone_number'] = $dt1['phone_number'];
                $_SESSION['is_psv'] = $dt1['is_psv'];
                
                $object_1 =  '<br/><b style="color:white;padding:20px;background-color:blue;border:none;border-radius:5px">Token set successfully</b>';
            } else {
                if (isset($dt1['error'])) {
                    $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Error: ' . $dt1['error'] . '</b>';
                } else {
                    $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Token not set! Unknown error!</b>';
                }
            }
        } else {
            $object_1 = $dt1;
        }

    } else {
        $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Customer ID needed to process token</b>';
    }
} else {
}

if (isset($_SESSION['phone_number'])) {
    $object_1 .= '<div class="alert alert-primary" role="alert">' . $_SESSION['phone_number'] . '</div><br/><br/><br/>';
    echo $object_1;
}else{
   echo $object_1; 
}
