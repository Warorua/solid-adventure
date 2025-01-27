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

//$_POST['idNumber'] = '32515522';

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

    unset($fetch[0]['id']);
    unset($fetch[0]['vehicle_no']);
    unset($fetch[0]['vehicle_model']);
    unset($fetch[0]['Use']);
    unset($fetch[0]['purpose']);
    unset($fetch[0]['capacity']);

    $output['data'] = $fetch[0];
    $outputcount = count($fetch);
    //$output['POST'] = $_POST;
    if ($outputcount < 1) {
        $output['status'] = false;
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    } elseif ($outputcount > 1) {
        $output['ntsa_id'] = [];
        foreach ($fetch as $row) {
            if (!empty($row['ntsa_id']) || $row['ntsa_id'] != '') {
                array_push($output['ntsa_id'], $row['ntsa_id']);
            }
        }
    } else {
        $output['ntsa_id'] = $fetch['ntsa_id'];
    }


    //echo json_encode($output, JSON_PRETTY_PRINT);
    //die();


    $stmt = $conn4->prepare('SELECT * FROM carDataOwner WHERE `ID_Number` LIKE :id_number');
    $stmt->execute(['id_number' => '%' . $idNo . '%']);
    $fetch = $stmt->fetchAll();
    //$output['data']['asset'] = $fetch;
    $output['assets'] = [];
    //$asset_obj = [];
    foreach ($fetch as $row) {
        $row['mechanical_data'] = [];

        unset($row['ID_Number']);
        unset($row['Owner_Name']);
        unset($row['passport_no']);
        unset($row['Pin']);
        unset($row['email_id']);
        unset($row['mobile_number']);


        $regNo = str_replace(' ', '', $row['vehicle_no']);
        $stmt2 = $conn4->prepare('SELECT * FROM vehicle_data WHERE `regNo` LIKE :regNo');
        $stmt2->execute(['regNo' => '%' . $regNo . '%']);
        $fetch2 = $stmt2->fetchAll();

        foreach ($fetch2 as $rowIndex => $row2) { // Renamed $key to $rowIndex for clarity

            $row['mechanical_data'] = $row2; // Copy the row as it is
            
            if (isset($row2['logbookNumber'])) { // Check if the column exists in the row
                $log_book = json_decode($row2['logbookNumber'], true); // Decode the value in 'logbookNumber'
                if (is_array($log_book)) {
                    if (isset($log_book['LOGBOOK_SERIAL'])) {
                        $row['mechanical_data']['logbookSerial'] = $log_book['LOGBOOK_SERIAL'];
                    }
                    if (isset($log_book['LOGBOOK_NUMBER'])) {
                        $row['mechanical_data']['logbookNumber'] = $log_book['LOGBOOK_NUMBER'];
                    }
                    if (!isset($log_book['LOGBOOK_SERIAL']) && !isset($log_book['LOGBOOK_NUMBER'])) {
                        $row['mechanical_data']['logbookNumber'] = $row2['logbookNumber'] . ' -1';
                    }
                } else {
                    $row['mechanical_data']['logbookNumber'] = $row2['logbookNumber'] . ' -2';
                }
            }

            

        }



        array_push($output['assets'], $row);
    }

    //array_push($output['assets'], $asset_obj);

    $output['status'] = true;
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    $output['error'] = 'Required parameters not set!';
    $output['DATA_POST'] = $_SERVER;
    $output['POST'] = $_POST;
    echo json_encode($output, JSON_PRETTY_PRINT);
}
