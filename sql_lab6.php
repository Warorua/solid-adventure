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
                        if (count($verif[$table][$column]) == $length) {
                            //exit(logStatement($path . "pftb/tableAutom.txt", "Table " . $table . ", column " . $column . " complete ######################
                            //"));
                            $tb2 = '';
                            $tb =
                            '
                            <table>
                             <thead>
                            ';
 //$tb .= ' <td rowspan="3">' . json_encode($verif) . '</td>';
                            foreach ($verif as $id => $key) {
                              ksort($key);
                                //$tb .= ' <td rowspan="3">' . json_encode($key) . '</td>';
                               
                                foreach ($key as $id2 => $key2) {
                                   ${$id.$id2} = '';
                                    //$tb .= ' <td rowspan="3">' . json_encode($key2) . '</td>';
                                    foreach ($key2 as $id3 => $key3) {
                                        //${$id.$id2} .= $key3.'|';
                                        ${$id.$id2} .= convertDecimalToCharacter($key3);
                                          $tb .= ' <tr>';
                                          $tb .= ' <td>' . $id . '</td>';
                                          $tb .= ' <td>' . $id2 . '</td>';
                                        $tb .= ' <td>' . $key3 . '</td>';
                                         $tb .= ' </tr>';
                                    }
                                   $tb2 .= 'Table: <b>'.$tableDataMod[$id]['name'].'('.$id.')</b> Column <b>'.$id2.'</b> Values:  <b>'.${$id.$id2}.'</b><br/>';
                                }
                               
                            }
                            


                            $tb .= '
                            </thead>
                            </table>
                            ';
                            $dones .= logStatement($path . "pftb/tableAutom.txt", "Table " . $table . ", column " . $column . " complete ###################### <br/>");
                            $dones1 += 1;
                        } else {
                            end($verif[$table][$column]); // Move the internal pointer to the last element of the array
                            $lastKey = key($verif[$table][$column]); // Get the key of the current element
                            $donenotfinished .=  logStatement($path . "pftb/tableAutom.txt", "Quering table " . $table . ", column " . $column . " though is processed to column " . $lastKey . " |||||||||||||||||||||||||| <br/>");
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
echo '<br/><br/>'.$tb2.'<br/><br/>';
}

$total = $dones1 + $donenotfinished1 + $columnnottouched1 + $tablenottouched1;

//echo $tb;
