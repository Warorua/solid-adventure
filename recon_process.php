<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

if (isset($_POST['payload'])) {
    $payload = $_POST['payload'];
    $payload = base64_decode($payload);

    $url = 'https://edev.nairobiservices.go.ke/api/gateway/taifa/nrs/affirm';
    $headers = 'Content-Type: application/json';
    $method = 'POST';
    //echo messenger($url, $headers, $payload, $method) . '<br/><br/>';
    $recon = httpPost($url, $payload, $headers);
    echo $recon;
}else{
    echo 'Incomplete request!';
}
