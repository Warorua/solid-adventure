<?php
include '../includes/core.php';
include '../includes/core_coop.php';


$userDet = userChecker('33182581');
echo $userDet.'<br/>';
//print_r(json_decode($userDet, true));
echo processRegRes($userDet);