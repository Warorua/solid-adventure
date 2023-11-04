<?php

use simplehtmldom\HtmlDocument;

require 'vendor/autoload.php';

include './includes/core.php';
//echo date("d-M-Y h:i:s") . PHP_EOL;
echo date("d-M-Y h:i:s") . '<br/>';

$url1 = 'https://appointment.hudumakenya.go.ke/includes/getcitizenregdetails.php?id=6%3A39290974';
$data1 = [
    //"number_plate" => $_SESSION['plate'],
    // "parking_duration" => "daily",
    // "parking_zone" => 3,
    // "vehicle_type" => "S.WAGON",
    // "amount" => 200,
    // "penalty" => 0,
    //"total" => 200,
    // "mobile_number" => "254700000000",
    // "parkingType" => "daily"
    //"csrfmiddlewaretoken" => "FVJOSlxaUCR6suXZvrvw0RpX7DdHjb8qeex9Y6ycnt5LUviMCas78J9QWFtWA8zL"
];
//$id_number = '39290974';

//$dt2 = hudumaSearch('39290974')[1];
//3435696
//$dt2 = FetchNHIFData('10847647');
$dt2 =  json_decode(file_get_contents('./dailyParking.json'), true);

//$dt2 = count($dt2['data']['onstreet']);
//$dt2 = json_encode($dt2['data']['onstreet'][0]);
//*
foreach($dt2['data']['onstreet'] as $row){
    if($row['vehicle'] == 'kdk822t'){
       // echo $row['id'].PHP_EOL; 
       echo json_encode($row).'<br/>';
    }
}
//*/
//$dt3 = murangaLaraveltoken();


//echo json_encode($dt2);
//echo $dt2 . '<br/>';
//echo $dt2 . PHP_EOL;
//echo $nhif_dt . '<br/>';
echo date("d-M-Y h:i:s") . '<br/>';
//echo date("d-M-Y h:i:s") . PHP_EOL;
//unset($_SESSION['plate']);