<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'pin_data';

include './includes/uni_conn.php';

$output = [];

if (isset($_POST['taxPayerType'])) {
    $taxPayerType = $_POST['taxPayerType'];

    if ($taxPayerType == '' || $taxPayerType == null) {
        $output['error'] = 'Invalid parameters set!';
        echo json_encode($output);
        die();
    }

    if (isset($_POST['dateOfBirthLow'])) {
        $dobLow = $_POST['dateOfBirthLow'];
        if ($dobLow == '' || $dobLow == null) {
            $dobLow = '1800-03-01';
        }
    }else{
        $dobLow = '1800-03-01';
    }

    if (isset($_POST['dateOfBirthHigh'])) {
        $dobHigh = $_POST['dateOfBirthHigh'];
        if ($dobHigh == '' || $dobHigh == null) {
            $dobHigh = '2024-03-01';
        }
    }else{
        $dobHigh = '2024-03-01';
    }

    $dateObj = "AND WHERE STR_TO_DATE(birth_dt, '%d/%m/%Y %H:%i:%s') BETWEEN :dobLow AND :dobHigh ";

    if (isset($_POST['gender'])) {
        $gender = $_POST['gender'];
        if ($gender == '' || $gender == null || $gender != 'M' || $gender != 'F') {
            $gender = 'NA';
            $genderObj = "AND WHERE gender NOT LIKE :gender ";
        } else {
            $genderObj = "AND WHERE gender LIKE :gender ";
        }
    }else{
        $genderObj = '';
    }



    if (isset($_POST['countyId'])) {
        $countyId = $_POST['countyId'];
        if ($countyId == '' || $countyId == null) {
            $countyId = 'NAAN';
            $countyObj = "AND WHERE county_id NOT LIKE :county_id ";
        } else {
            $countyObj = "AND WHERE county_id LIKE :county_id ";
        }
    }else{
        $countyObj = '';
    }


    if (isset($_POST['districtId'])) {
        $districtId = $_POST['districtId'];
        if ($districtId == '' || $districtId == null) {
            $districtId = 'NAAN';
            $districtObj = "AND WHERE district_id NOT LIKE :district_id ";
        } else {

            $districtObj = "AND WHERE district_id LIKE :district_id ";
        }
    }else{
        $districtObj = '';
    }

    if (isset($_POST['orderBy'])) {
        if(isset($_POST['orderType'])){
            $orderTypeId = $_POST['orderType'];
            if($orderTypeId == '' || $orderTypeId == null){
                $orderTypeObj = 'ASC';
            }elseif($orderTypeId == 'desc'){
                $orderTypeObj = 'DESC';
            }else{
                $orderTypeObj = 'ASC';
            }
        }
        $orderById = $_POST['orderBy'];
        if($orderById == 'random'){
            $orderByObj = 'ORDER BY RAND() ';
        }elseif($orderById == 'firstname'){
            $orderByObj = 'ORDER BY first_name '.$orderTypeObj.' ';
        }elseif($orderById == 'middlename'){
            $orderByObj = 'ORDER BY middle_name '.$orderTypeObj.' ';
        }elseif($orderById == 'lastname'){
            $orderByObj = 'ORDER BY sur_name '.$orderTypeObj.' ';
        }elseif($orderById == 'dob'){
            $orderByObj = "ORDER BY STR_TO_DATE(birth_dt, '%d/%m/%Y %H:%i:%s') ".$orderTypeObj." ";
        }elseif($orderById == 'idnumber'){
            $orderByObj = 'ORDER BY nid_no '.$orderTypeObj.' ';
        }else{
            $orderByObj = '';
        }
    }else{
        $orderByObj = '';
    }

    if (isset($_POST['limit'])) {
        $limitId = $_POST['limit'];
        if(ctype_digit($limitId)){
            $limitObj = 'LIMIT '.$limitId;
        }else{
            $limitObj = '';
        }
    }else{
        $limitObj = '';
    }

 echo 'Script';

    $stmt = $conn4->prepare('SELECT * FROM kra_data WHERE tax_payer_type = :taxPayerType ' . $dateObj . ' ' . $genderObj . ' ' . $countyObj . ' ' . $districtObj . ' '.$orderByObj.' '.$limitObj);
    $stmt->execute(['taxPayerType'=>'INDI', 'dobLow' => $dobLow, 'dobHigh' => $dobHigh, 'gender' => '%' . $gender . '%', 'county_id' => '%' . $countyId . '%', 'district_id' => '%' . $districtId . '%']);
    $fetch = $stmt->fetchAll();
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);
   
    echo json_encode($output);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output);
}
