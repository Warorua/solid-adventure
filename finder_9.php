<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'kever';

include './includes/uni_conn.php';

$output = [];

if (isset($_POST['photo'])) {
    $photo = $_POST['photo'];

    if ($photo == '' || $photo == null) {
        $output['error'] = 'Invalid parameters set!';
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    }

    if (isset($_POST['dateOfBirthLow'])) {
        $dobLow = $_POST['dateOfBirthLow'];
        if ($dobLow == '' || $dobLow == null) {
            $dobLow = '1800-03-01';
        }
    } else {
        $dobLow = '1800-03-01';
    }

    if (isset($_POST['dateOfBirthHigh'])) {
        $dobHigh = $_POST['dateOfBirthHigh'];
        if ($dobHigh == '' || $dobHigh == null) {
            $dobHigh = '2024-03-01';
        }
    } else {
        $dobHigh = '2024-03-01';
    }

    $dateObj = "AND STR_TO_DATE(date_birth, '%d-%b-%y %H:%i:%s') BETWEEN :dobLow AND :dobHigh ";

    if (isset($_POST['sex'])) {
        $sex = $_POST['sex'];
        if ($sex == '' || $sex == null || ($sex != 'M' && $sex != 'F')) {
            $sex = 'NA';
            $sexObj = "AND sex NOT LIKE :sex ";
        } else {
            $sexObj = "AND sex LIKE :sex ";
        }
    } else {
        $sex = 'NA';
        $sexObj = "AND sex NOT LIKE :sex ";
    }



    if (isset($_POST['firstnameId'])) {
        $firstnameId = $_POST['firstnameId'];
        if ($firstnameId == '' || $firstnameId == null) {
            $firstnameId = 'NAAN';
            $firstnameObj = "AND first_name NOT LIKE :firstname_id ";
        } else {
            $firstnameObj = "AND first_name LIKE :firstname_id ";
        }
    } else {
        $firstnameId = 'NAAN';
        $firstnameObj = "AND first_name NOT LIKE :firstname_id ";
    }


    if (isset($_POST['middlenameId'])) {
        $middlenameId = $_POST['middlenameId'];
        if ($middlenameId == '' || $middlenameId == null) {
            $middlenameId = 'NAAN';
            $middlenameObj = "AND middle_name NOT LIKE :middlename_id ";
        } else {

            $middlenameObj = "AND middle_name LIKE :middlename_id ";
        }
    } else {
        $middlenameId = 'NAAN';
        $middlenameObj = "AND middle_name NOT LIKE :middlename_id ";
    }


    if (isset($_POST['lastnameId'])) {
        $lastnameId = $_POST['lastnameId'];
        if ($lastnameId == '' || $lastnameId == null) {
            $lastnameId = 'NAAN';
            $lastnameObj = "AND last_name NOT LIKE :lastname_id ";
        } else {

            $lastnameObj = "AND last_name LIKE :lastname_id ";
        }
    } else {
        $lastnameId = 'NAAN';
        $lastnameObj = "AND last_name NOT LIKE :lastname_id ";
    }



    if (isset($_POST['orderBy'])) {
        if (isset($_POST['orderType'])) {
            $orderTypeId = $_POST['orderType'];
            if ($orderTypeId == '' || $orderTypeId == null) {
                $orderTypeObj = 'ASC';
            } elseif ($orderTypeId == 'desc') {
                $orderTypeObj = 'DESC';
            } else {
                $orderTypeObj = 'ASC';
            }
        }else{
            $orderTypeObj = 'ASC';
        }
        $orderById = $_POST['orderBy'];
        if ($orderById == 'random') {
            $orderByObj = 'ORDER BY RAND() ';
        } elseif ($orderById == 'firstname') {
            $orderByObj = 'ORDER BY first_name ' . $orderTypeObj . ' ';
        } elseif ($orderById == 'middlename') {
            $orderByObj = 'ORDER BY middle_name ' . $orderTypeObj . ' ';
        } elseif ($orderById == 'lastname') {
            $orderByObj = 'ORDER BY last_name ' . $orderTypeObj . ' ';
        } elseif ($orderById == 'dob') {
            $orderByObj = "ORDER BY STR_TO_DATE(date_birth, '%d-%b-%y %H:%i:%s') " . $orderTypeObj . " ";
        } elseif ($orderById == 'idnumber') {
            $orderByObj = 'ORDER BY nat_reg_id ' . $orderTypeObj . ' ';
        } else {
            $orderByObj = '';
        }
    } else {
        $orderByObj = '';
    }

    if (isset($_POST['limit'])) {
        $limitId = $_POST['limit'];
        if (ctype_digit($limitId)) {
            $limitObj = 'LIMIT ' . $limitId;
        } else {
            $limitObj = '';
        }
    } else {
        $limitObj = '';
    }

    //echo 'Script';
    //echo 'SELECT * FROM kra_data WHERE tax_payer_type = :photo ' . $dateObj . ' ' . $sexObj . ' ' . $firstnameObj . ' ' . $middlenameObj . ' '.$orderByObj.' '.$limitObj;

    $stmt = $conn4->prepare('SELECT * FROM citizen_records WHERE photo IS NULL ' . $dateObj . ' ' . $sexObj . ' ' . $firstnameObj . ' ' . $middlenameObj . ' ' . $lastnameObj . ' ' . $orderByObj . ' ' . $limitObj);
    $stmt->execute(['dobLow' => $dobLow, 'dobHigh' => $dobHigh, 'sex' => '%' . $sex . '%', 'firstname_id' => '%' . $firstnameId . '%', 'middlename_id' => '%' . $middlenameId . '%', 'lastname_id' => '%' . $lastnameId . '%']);
    $fetch = $stmt->fetchAll();
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);

    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output, JSON_PRETTY_PRINT);
}
