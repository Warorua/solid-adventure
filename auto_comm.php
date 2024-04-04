<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';

$stmt = $conn3->prepare("SELECT * FROM clients");
$stmt->execute();
$mems = $stmt->fetchAll();
foreach ($mems as $mem) {
    $messages = json_decode(fetch_message($mem['contact'], '50'), true);
    if (isset($messages['data']['data'])) {
        foreach ($messages['data']['data'] as $mes) {
            $mesId = $mes['message']['id']['_serialized'];
            $stmt = $conn3->prepare("SELECT COUNT(*) AS numrows FROM message WHERE messageId=:id");
            $stmt->execute(['id' => $mesId]);
            $msCt = $stmt->fetch();

            if ($msCt['numrows'] < 1) {
                if ($mes['message']['type'] == 'chat') {
                    echo $mes['message']['body'] . '<br/>';
                    $text = $mes['message']['body'];

                    // Normalize newlines (replace "\r\n" with "\n", and then explode by "\n")
                    $lines = explode("\n", str_replace("\r\n", "\n", $text));

                    // Now you can access each line individually
                    foreach ($lines as $index => $line) {
                        $line = str_replace(' ', '', $line);
                        $lines[$index] = strtoupper($line);
                        //echo $line . "<br/>";
                    }

                    //echo json_encode($lines);
                    foreach ($lines as $testString) {
                        if (isValidFormat($testString)) {
                            $parts = explode('-', $testString); // Split the string by hyphen

                            // Reconstruct the string with the first 3 parts and the remaining parts separately
                            $firstPart = implode('-', array_slice($parts, 0, 3));
                            $secondPart = implode('-', array_slice($parts, 3));
                            $invNo = $firstPart;
                            $invAmt = $secondPart;

                            $stmt = $conn3->prepare("INSERT INTO message (client, invoiceNo, invoiceAmt, messageId) VALUES (:client, :inv, :amt, :mes)");
                            $stmt->execute(['client' => $mem['id'], 'inv' => $invNo, 'amt' => $invAmt, 'mes' => $mesId]);

                            echo "First part: $firstPart, Second part: $secondPart <br/>";
                            //echo "Valid: $testString <br/>";
                        } else {
                            //echo "Invalid: $testString <br/>";
                        }
                    }
                }
            }
        }
    }
}

//echo json_encode($messages);
//messageId
//client
//invoiceNo
//invoiceAmt
//status