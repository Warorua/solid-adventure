<?php
//*
if (file_exists("./sql_lab3.php")) {
    $path = "./";
} elseif (file_exists("../sql_lab3.php")) {
    $path = "../";
} elseif (file_exists("../../sql_lab3.php")) {
    $path = "../../";
}
function logStatement($file, $text)
{
    global $path;
    $logFile = $file; // Path to the log file
    $logEntry = date("[Y-m-d H:i:s]") . " " . $text . PHP_EOL;
    file_put_contents($logFile, $logEntry, FILE_APPEND);
    return $text;
}

include $path . "includes/sql_conn.php";

$table = 7;
//$table = rand(1, 95);

$dfile = $path . "pftb/data/".$table."_ColumnNames.json";
$verif = json_decode(file_get_contents($dfile), true);


$vrfil = $path . "pftb/tableColumns.json";
$vrfil_data = json_decode(file_get_contents($vrfil), true);


if (isset($verif[$table])) {
    $column = rand(1, $tableDataMod[$table]["length"]);
    $length = $vrfil_data[$table][$column];
    if (isset($verif[$table][$column])) {
        if (count($verif[$table][$column]) == $length) {
            exit(logStatement($path . "pftb/tableAutom.txt", "Table " . $table . ", column " . $column . " complete ######################
            "));
        } else {
            end($verif[$table][$column]); // Move the internal pointer to the last element of the array
            $lastKey = key($verif[$table][$column]); // Get the key of the current element
            echo logStatement($path . "pftb/tableAutom.txt", "Quering table " . $table . ", column " . $column . " though is processed to column " . $lastKey . " ||||||||||||||||||||||||||
            ");
        }
    }
} else {
    $column = rand(1, $tableDataMod[$table]["length"]);
}
echo logStatement($path . "pftb/tableAutom.txt", "Quering table " . $table . ", column " . $column . "
");

//*
$url = "http://localhost/kever/sql_lab3.php?table=" . $table . "&column=" . $column;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if ($response === false) {
    // Handle cURL error
    $error = curl_error($ch);
    echo logStatement($path . "pftb/err/table_".$table.".txt", "cURL Error: " . $error."
    
    
    ");
} else {
    // Process the response
    echo logStatement($path . "pftb/res/table_".$table.".txt", $response."
    

    ");
}

curl_close($ch);
//*/

?>