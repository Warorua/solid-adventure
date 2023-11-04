<?php
$total = 0;

$tr = '';
for ($i = 0; $i <= 80; $i++) {
    $data = json_decode(file_get_contents('store_2_b/master_' . $i . '_db.json'), TRUE);
    $total += count($data['data']);
    //*
    $tr .= '<tr>';
    $tr .= '<td> ' . $i . '</td><td> ' . number_format(count($data['data']), 0) . '<td/>';
    $tr .= '<tr>';
    //*/  
}


$tr .= '<tr><td><b style="color:green">ACTIVE STORE:</b></td><td> ' . number_format($total, 0) . '<td/><tr/>';

$tr .= '<tr><td><b style="color:skyblue">STORE 1:</b></td><td> ' . number_format(10852531, 0) . '<td/><tr/>';

$total_1 = 0;
$tr_1 = '';
for ($i = 0; $i <= 80; $i++) {
    if (file_exists('error/master_' . $i . '_db.json')) {
        $data = json_decode(file_get_contents('error/master_' . $i . '_db.json'), TRUE);
        $total_1 += count($data['data']);
    }
    /*
    $tr .= '<tr>';
    $tr .= '<td>'.number_format(count($data['data']),0) . '</td><td>  ' . $i . '<td/>';
    $tr .= '<tr>';
    //*/
}
$tr_1 .= '<tr><td><b style="color:red">TOTAL ERRORS:</b></td><td> ' . number_format($total_1, 0) . '<td/><tr/>';

$tr_1 .= '<tr><td><b style="color:blue">TOTAL REPORT:</b></td><td><b> ' . number_format($total_1 + $total + 10852531, 0) . '</b><td/><tr/>';

$tr_1 .= '<tr><td><b style="color:purple">TIME:</b></td><td> ' . date("d-M-Y h:i:s") . '<td/><tr/>';

echo $tr;

echo $tr_1;
//view_bombadier_bc.php
