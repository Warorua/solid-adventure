<?php
ini_set('memory_limit', '1024M');
include './includes/core2.php';
//2020_01092 - SAMUEL KABAGE GITHURA - 0710896680 - 0769879861

$data = json_decode(file_get_contents('./nrs_backup/dpp.json'), true);
//echo count($data);
$lm = 0;
$contact = '710896680';
function generateRandom8DigitNumber()
{
    $min = 10000000; // Smallest 8-digit number
    $max = 99999999; // Largest 8-digit number
    return mt_rand($min, $max);
}
foreach ($data as $row) {
    /*
    if ($lm == 20) {
        die('DONE');
    } else {
        $lm++;
        echo $row['mobile_number'] . '<br/>';
    }
    */

    $position = strpos($row['mobile_number'], $contact);

    if ($position !== false) {
        $randomNumber = '07' . generateRandom8DigitNumber();
        echo $row['customer_id'] . ' - ' . $row['id_number'] . ' - ' . $row['tax_payer_name'] . ' - ' . $row['mobile_number'] . ' - ' . $randomNumber . '<br/>';
        $url = 'https://nairobiservices.go.ke/api/authentication/auth/individual/change_mobile';
        if ($row['id_number'] == '') {
            echo 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH<br/>';
            $idd = $row['id_number'];
        } else {
            $idd = $row['pin_no'];
        }
        $data = [
            'identity' => $idd,
            'mobile_number' => $randomNumber
        ];
        httpPost($url, $data);
        $lm++;
    } else {
    }
}
echo  $lm;
unset($data);
//u8o6[@fyH;1
//u854855859_techkira