<?php

$firstString = [


    'trans',
    'Trans',
    'Transaction',
    'transaction',
    'txn',
    'Txn',
    'Mobile',
    'mobile',
    'Phone',
    'phone'

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
    'Mobile',
    'mobile',
    'Phone',
    'phone'
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
            if (!isset($obj['mpesadetails'][$word])) {
                if ($word == 'TransID') {
                    //$obj['mpesadetails'][$word] = 'BG71U4CAG2';
                } else {
                    $obj['mpesadetails'][$word] = '254710896680';
                }
            }



            //echo $word . '<br/>';
        }
    }
}

$obj['mpesadetails']['FirstName'] = 'John';
$obj['mpesadetails']['BillRefNumber'] = 'BL-SBP-165862';
$obj['mpesadetails']['TransAmount'] = '5200.0';
$obj['mpesadetails']['BillType'] = 'SBPPermitFee';
$obj['mpesadetails']['TransChannel'] = 'mpesa';
$obj['mpesadetails']['TransID'] = 'BG71U4CAG2';

$data = json_encode($obj, JSON_PRETTY_PRINT);

file_put_contents('./lab.json', $data);
