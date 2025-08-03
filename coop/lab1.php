<?php
include '../includes/core.php';
include '../includes/core_coop.php';

if(isset($_GET['idno'])){
    
$id_number = $_GET['idno'];

}else{
$id_number = '16046987';

}

$userDet = userChecker('16046987');
echo $userDet.'<br/>';
//print_r(json_decode($userDet, true));
echo processRegRes($userDet);
