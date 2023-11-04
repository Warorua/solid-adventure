<?php
include './includes/conn.php';

if(isset($_GET['query'])){
    $cm = " WHERE region='".$_GET['query']."'";
}else{
    $cm = '';
}

$stmt = $conn->prepare("SELECT * FROM country".$cm);
$stmt->execute();
$dt1 = $stmt->fetchAll();

if(count($dt1) > 1){
foreach($dt1 as $row){
    echo $row['common_name']." -- ".$row['capital']." -- ".$row['region']."<br/>";
}
}else{
    echo 'No country found';
}