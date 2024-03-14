<?php

$firstString = [


    '_',
    '',
    'Number',
    'number',
    'NUMBER',
    'No',
    'no',
    'NO',
    'Id',
    'ID',
    'id',
    'Identity',
    'identity',
    'IDENTITY',
    'Ref',
    'ref',
    'REF',
    'Reference',
    'reference',
    'REFERENCE',
    'Customer',
    'customer',
    'Cust',
    'cust',
    'CUSTOMER',
    'CUST',
    'Bill',
    'bill',
    'BILL',
    'debit',
    'Debit',
    'DEBIT'

]; // Possible groups of letters
$secondString = [
    '_',
    '',
    'Number',
    'number',
    'NUMBER',
    'No',
    'no',
    'NO',
    'Id',
    'ID',
    'id',
    'Identity',
    'identity',
    'IDENTITY',
    'Ref',
    'ref',
    'REF',
    'Reference',
    'reference',
    'REFERENCE',
    'Customer',
    'customer',
    'Cust',
    'cust',
    'CUSTOMER',
    'CUST',
    'Bill',
    'bill',
    'BILL',
    'debit',
    'Debit',
    'DEBIT'
]; // Possible groups of letters
$thirdString = [
    '_',
    '',
    'Number',
    'number',
    'NUMBER',
    'No',
    'no',
    'NO',
    'Id',
    'ID',
    'id',
    'Identity',
    'identity',
    'IDENTITY',
    'Ref',
    'ref',
    'REF',
    'Reference',
    'reference',
    'REFERENCE',
    'Customer',
    'customer',
    'Cust',
    'cust',
    'CUSTOMER',
    'CUST',
    'Bill',
    'bill',
    'BILL',
    'debit',
    'Debit',
    'DEBIT'
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
                    $obj['mpesadetails'][0][$word] = '2020_161504';
                }
            }



            //echo $word . '<br/>';
        }
    }
}

/*
$obj['mpesadetails'][0]['FirstName'] = 'John';
$obj['mpesadetails'][0]['BillRefNumber'] = 'BL-MT-101372';
$obj['mpesadetails'][0]['TransAmount'] = '1000.0';
$obj['mpesadetails'][0]['MSISDN'] = '';
$obj['mpesadetails'][0]['TransChannel'] = 'mpesa';
$obj['mpesadetails'][0]['TransID'] = 'SB5662FDXC';
//*/

$data = json_encode($obj, JSON_PRETTY_PRINT);

file_put_contents('./lab.json', $data);
