<?php
include './includes/core.php';
echo date("d-M-Y h:i:s") . '<br/>' . PHP_EOL;
//echo nrs_data() . PHP_EOL;
//
echo vipList() . PHP_EOL;
echo seasonalParkingData() . PHP_EOL;
echo dailyParkingData() . PHP_EOL;
//
//echo murangaMother() . PHP_EOL;

if (isset($_GET['all'])) {
    echo seasonalParkingData() . PHP_EOL;
    echo dailyParkingData() . PHP_EOL;
}

echo date("d-M-Y h:i:s") . '<br/>' . PHP_EOL;


//$data = json_decode(file_get_contents('./dailyParking.json'), true);
//$data = json_decode(file_get_contents(nrs_data()), true);

//echo count($data['data']['onstreet']);
/*/
$total = 0;
foreach ($data['data']['onstreet'] as $row) {
    if ($row['paid'] == true) {
        $total += $row['amount'];
    }
}
echo number_format($total,0);
//*/

//echo $data;
