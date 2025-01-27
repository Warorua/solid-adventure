<?php
//header("Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Mzc5OTM1MTMsImV4cCI6MTczNzk5NzExMywidXNlcklkIjoiOTZfMSJ9._OsNB14ZNV7g5tAiaYhj4tJhmcnzQuW79eVRQZfeeqY");

require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'car_data';

include './includes/uni_conn.php';

$output = [];

$_POST['idNumber'] = '32515522';

if (isset($_POST['idNumber'])) {
    $idNo = $_POST['idNumber'];

    if ($idNo == '' || $idNo == null || !ctype_digit($idNo)) {
        $output['error'] = 'Invalid parameters set!';
        $output['status'] = false;
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    }

    $stmt = $conn4->prepare('SELECT * FROM carDataOwner WHERE `ID_Number` LIKE :id_number');
    $stmt->execute(['id_number' => '%' . $idNo . '%']);
    $fetch = $stmt->fetchAll();

    // unset($fetch[0]['id']);
    // unset($fetch[0]['vehicle_no']);
    // unset($fetch[0]['vehicle_model']);
    // unset($fetch[0]['Use']);
    // unset($fetch[0]['purpose']);
    // unset($fetch[0]['capacity']);

    //$output['data'] = $fetch[0];
    $output['count'] = count($fetch);
    //$output['POST'] = $_POST;
    if ($output['count'] < 1) {
        $output['status'] = false;
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    } elseif ($output['count'] > 1) {
        $output['data']['ntsa_id'] = [];
        foreach ($fetch as $row) {
            array_push($output['data']['ntsa_id'], $row['ntsa_id']);
        }
    } else {
        $output['data']['ntsa_id'] = $fetch['ntsa_id'];
    }
    $output['status'] = true;




    $stmt = $conn4->prepare('SELECT * FROM carDataOwner WHERE `ID_Number` LIKE :id_number');
    $stmt->execute(['id_number' => '%' . $idNo . '%']);
    $fetch = $stmt->fetchAll();
    //$output['data']['asset'] = $fetch;
    $asset_obj = [];
    foreach ($fetch as $row) {
        $row['mechanical_data'] = [];

        $regNo = str_replace(' ', '', $row['vehicle_no']);
        $stmt2 = $conn4->prepare('SELECT * FROM vehicle_data WHERE `regNo` LIKE :regNo');
        $stmt2->execute(['regNo' => '%' . $regNo . '%']);
        $fetch2 = $stmt2->fetchAll();
        foreach($fetch2 as $id => $row2){
            $row['mechanical_data'][$id] = $row2;
        }


        array_push($asset_obj, $row);
    }
   
    array_push($output['data']['asset'], $asset_obj);


    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    $output['error'] = 'Required parameters not set!';
    $output['DATA_POST'] = $_SERVER;
    $output['POST'] = $_POST;
    echo json_encode($output, JSON_PRETTY_PRINT);
}
