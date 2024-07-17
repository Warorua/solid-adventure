<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core2.php';

$source = 'kever';

include './includes/uni_conn.php';
include './includes/core_security.php';
$err = [];
//$_POST['idNo'] = '39290974';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['idNo'])) {
        $idNo = $_POST['idNo'];

        if (!ctype_digit($idNo)) {
            $err['error'] = 'Invalid characters in the payload!';
            echo  json_encode($err, JSON_PRETTY_PRINT);
            die();
        }

        $verifMod = verificationModule($idNo);

        function selectRandomItems($json)
        {
            // Decode the JSON string into a PHP associative array
            $data = json_decode($json, true);

            // Get all keys from level1
            $level1Keys = array_keys($data);

            // Shuffle the keys and pick the first 3
            shuffle($level1Keys);
            $selectedLevel1Keys = array_slice($level1Keys, 0, 3);

            // Prepare the output array
            $output = [];

            // Loop through the selected level1 keys
            foreach ($selectedLevel1Keys as $level1Key) {
                // Get all keys from level2 for the current level1 item
                $level2Keys = array_keys($data[$level1Key]);

                // Shuffle the level2 keys and pick the first one
                shuffle($level2Keys);
                $selectedLevel2Key = $level2Keys[0];

                // Get the selected level2 item
                $selectedLevel2Item = $data[$level1Key][$selectedLevel2Key];

                // Add the selected item to the output array
                $output[$level1Key][$selectedLevel2Key] = $selectedLevel2Item;
            }

            return $output;
        }

        // Get the output
        $output = selectRandomItems($verifMod);
        echo $output;

        // Print the output
        // echo json_encode($output, JSON_PRETTY_PRINT);
        // echo calculateSimilarity('warorua', 'warurua');
    } else {
        $err['error'] = 'Request Error!';
        echo  json_encode($err, JSON_PRETTY_PRINT);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo "Method Not Allowed";
    exit();
}
