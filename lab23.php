<?php

include './includes/core.php';

$firstString = [


    'trans',
    'Trans',
    'Transaction',
    'transaction',
    'txn',
    'Txn',
    'Bill',
    'bill',
    'invoice',
    'Invoice',
    'Inv',
    'inv'

]; // Possible groups of letters
$secondString = [
    '_',
    '',
    'reference',
    'Reference',
    'ref',
    'Ref',
    'No',
    'no',
    'number',
    'Number',
    'code',
    'Code',
    'id',
    'Id',
    'ID',
    'token',
    'Token',
]; // Possible groups of letters
$thirdString = [
    '_',
    '',
    'reference',
    'Reference',
    'ref',
    'Ref',
    'No',
    'no',
    'number',
    'Number',
    'code',
    'Code',
    'id',
    'Id',
    'ID',
    'token',
    'Token'
]; // Possible groups of letters

$obj = [];

// Iterate over each group of letters in the first string
foreach ($firstString as $group1) {
    // Iterate over each group of letters in the second string
    foreach ($secondString as $group2) {
        // Iterate over each group of letters in the third string
        foreach ($thirdString as $group3) {
            // Concatenate the groups of letters to form a word
            $word = $group1 . $group2 . $group3;
            // Output the generated word
            $obj[$word] = 'TIMS-MVR-10374947';

        }
    }
}

$data = json_encode($obj, JSON_PRETTY_PRINT);

file_put_contents('./lab.json', $data);

echo $data;
/*
$url = 'https://tims.ntsa.go.ke/pay/ecitizen/notify.htm?invoice=PJLFRYT';

$data = array('invoice_number' => 'PJLFRYT', 'invoice' => 'PJLFRYT');

echo httpPost($url, $obj, null, null, false, true);
//*/