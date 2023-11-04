<?php
include './includes/conn.php';

if(isset($_GET['query'])){
    $cm = " WHERE region='".$_GET['query']."'";
}else{
    $cm = '';
}
$apiClientID = $_POST['apiClientID'];
$billDesc = $_POST['billDesc'];
$billRefNumber = $_POST['billRefNumber'];
$serviceID = $_POST['serviceID'];
$clientMSISDN = $_POST['clientMSISDN'];
$clientName = $_POST['clientName'];
$clientEmail = $_POST['clientEmail'];
$clientIDNumber = $_POST['clientIDNumber'];
$amountExpected = $_POST['amountExpected'];
$status = $_POST['status'];
$currency = $_POST['currency'];
$commission = $_POST['commission'];
$net = $_POST['net'];
$notificationURL = $_POST['notificationURL'];

$stmt = $conn->prepare("INSERT INTO bills(apiClientID,billDesc,billRefNumber,serviceID,clientMSISDN,clientName,clientEmail,clientIDNumber,amountExpected,status,currency,commission,net,notificationURL,dateCreated) VALUES ('".$apiClientID."','".$billDesc."','".$billRefNumber."','".$serviceID."','".$clientMSISDN."','".$clientName."','".$clientEmail."','".$clientIDNumber."','".$amountExpected."','".$status."','".$currency."','".$commission."','".$net."','".$notificationURL."', CURRENT_DATE())");
$stmt->execute();
//$dt1 = $stmt->fetchAll();

