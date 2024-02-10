<?php
include './includes/sql_conn.php';
$time = time();
for ($i = 0; $i <= 1; $i++) {
    $injection = "(select*from(select(sleep(2)))a)";
    $sleep_timer = 20;
    $state = ['id' => 1];
    $i = 90;
    echo nrs($injection, $i, $sleep_timer, $state) . PHP_EOL;
}
$time2 = time();
echo $time2 - $time;