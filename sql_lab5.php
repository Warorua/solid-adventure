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
    // $logEntry = date("[Y-m-d H:i:s]") . " " . $text . PHP_EOL;
    // file_put_contents($logFile, $logEntry, FILE_APPEND);
    return $text;
}

include $path . "includes/sql_conn.php";

//$table = 1;
//$table = rand(1, 95);
$dones = '';
$dones1 = 0;
$donenotfinished = '';
$donenotfinished1 = 0;
$tablenottouched = '';
$tablenottouched1 = 0;
$columnnottouched = '';
$columnnottouched1 = 0;
for ($i = 1; $i <= 95; $i++) {
    $table = $i;
    $dfile = $path . "pftb/data/" . $table . "_ColumnNames.json";
    if (!file_exists($dfile)) {

        echo '<b style="color: red">File' . $dfile . ' not found</b> <br/>';
    } else {
        $verif = json_decode(file_get_contents($dfile), true);


        $vrfil = $path . "pftb/tableColumns.json";
        $vrfil_data = json_decode(file_get_contents($vrfil), true);

        for ($s = 1; $s <= $tableDataMod[$table]["length"]; $s++) {
            if (isset($verif[$table])) {
                //$column = rand(1, $tableDataMod[$table]["length"]);
                $column = $s;
                if (!isset($vrfil_data[$table][$column])) {
                    echo '<b style="color: red">Column ' . $column . ' of table ' . $table . ' not found</b> <br/>';
                } else {
                    $length = $vrfil_data[$table][$column];
                    if (isset($verif[$table][$column])) {
                        end($verif[$table][$column]); // Move the internal pointer to the last element of the array
                        $lastKey = key($verif[$table][$column]); // Get the key of the current element
                        $remainingKeys = $length - $lastKey;
                        if (count($verif[$table][$column]) == $length || $remainingKeys == 0) {
                            //exit(logStatement($path . "pftb/tableAutom.txt", "Table " . $table . ", column " . $column . " complete ######################
                            //"));
                            $dones .= logStatement($path . "pftb/tableAutom.txt", "Table " . $table . ", column " . $column . " complete ###################### <br/>");
                            $dones1 += 1;
                        } else {

                            $donenotfinished .=  logStatement($path . "pftb/tableAutom.txt", "Quering table " . $table . ", column " . $column . ". Processed to character " . $lastKey . ", remaing " . $remainingKeys . " unprocessed. |||||||||||||||||||||||||| <br/>");
                            $donenotfinished1 += 1;
                        }
                    } else {
                        $columnnottouched .= logStatement($path . "pftb/tableAutom.txt", "Table " . $table . " available, but column " . $column . " not queried **************************<br/>");
                        $columnnottouched1 += 1;
                    }
                }
            } else {
                // $column = rand(1, $tableDataMod[$table]["length"]);
                $column = $s;
                $tablenottouched .= logStatement($path . "pftb/tableAutom.txt", "Table " . $table . "and column " . $column . " not queried at all +++++++++++++++++++++++++++++++++++++++++<br/>");
                $tablenottouched1 += 1;
            }
        }
    }
}

$total = $dones1 + $donenotfinished1 + $columnnottouched1 + $tablenottouched1;
echo '<h1>Finished: ' . $dones1 . ' of ' . $total . '</h1>
' . $dones . '
<br/>
<br/>
<br/>
<h1>Half Finished: ' . $donenotfinished1 . ' of ' . $total . '</h1>
' . $donenotfinished . '
<br/>
<br/>
<br/>
<h1>Table is there but column not Done at all: ' . $columnnottouched1 . ' of ' . $total . '</h1>
' . $columnnottouched . '
<br/>
<br/>
<br/>
<h1>Table not there at all: ' . $tablenottouched1 . ' of ' . $total . '</h1>
' . $tablenottouched . '
<br/>
<br/>
<br/>
';
