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

if (isset($_POST['idNumber'])) {
    $idNo = $_POST['idNumber'];

    if ($idNo == '' || $idNo == null || !ctype_digit($idNo)) {
        $output['error'] = 'Invalid parameters set!';
        $output['status'] = false;
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    }

    $stmt = $conn4->prepare('SELECT * FROM owner_data WHERE `ID_NUMBER` LIKE :id_number');
    $stmt->execute(['id_number' => '%' . $idNo . '%']);
    $fetch = $stmt->fetchAll();
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);
    if ($output['count'] < 1) {
        echo json_encode($output, JSON_PRETTY_PRINT);
        $output['status'] = false;
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
    $output['data']['asset'] = $fetch;
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
    
} else {
    $output['error'] = 'Required parameters not set!';
    $output['DATA_POST'] = $_SERVER;
    echo json_encode($output, JSON_PRETTY_PRINT);
}
