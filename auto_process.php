<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

$stmt = $conn3->prepare("SELECT * FROM message WHERE status=:status ORDER BY RAND() LIMIT 1");
$stmt->execute(['status' => '0']);
$dt1 = $stmt->fetch();

if(!isset($_POST['invoiceNo']) || !isset($_POST['amount'])){
    echo json_encode(['error'=>'Incomplete request','payload'=>$_POST]);
}

$dt1 = ['invoiceNo' => $_POST['invoiceNo'], 'invoiceAmt' => $_POST['amount'], 'client' => 0, 'id' => '1'];

$stmt2 = $conn3->prepare("SELECT * FROM clients WHERE id=:id");
$stmt2->execute(['id' => $dt1['client']]);
$dtt1 = $stmt2->fetch();
$dtt1['name'] = '0';

//echo json_encode($dt1);
$url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $dt1['invoiceNo'];
$data = [];
$headers = ['Authorization:Bearer ' . tokenizer()['token']];

//echo $invtk;
$validation = json_decode(httpGet($url, $data, $headers), true);

$url2 = 'https://edev.nairobiservices.go.ke/api/gateway/taifa/nrs/validate';
$data2 = array('reference' => $dt1['invoiceNo'], 'bankdetails' => array(''=>''));

$rt_1 = httpPost($url2, json_encode($data2),['Content-Type: application/json']);
$descObj = json_decode($rt_1, true);

if (isset($descObj['validationDetails'])) {
    $validation['description'] = $descObj['validationDetails']['billDescription'];
} else {
    $validation['description'] = '';
}


echo json_encode($validation);
die();

//*/