<?php
include './rejuv/conn.php';

$stmt = $conn->prepare("SELECT id, paybillBal FROM mpesaTransactions ORDER BY id DESC LIMIT 1");
$stmt->execute();
$up = $stmt->fetch();
$newId = $up['id']+2;
$newBal = $up['paybillBal']+500;


echo $up['id'].'<br/>';
echo $newId.'<br/>';
echo $up['paybillBal'].'<br/>';
echo $newBal.'<br/>';