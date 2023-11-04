<?php
include "./includes/conn.php";

$dir_name = 'store_2_b';
$dir_name_2 = 'store_2';
mkdir('./' . $dir_name);

for ($i = 0; $i <= 80; $i++) {

    $script_no = "master_" . $i . "_db";
    $file_name = './' . $dir_name . '/' . $script_no . '.json';

    $file_name_2 = './' . $dir_name_2 . '/' . $script_no . '.json';

    if (file_exists($file_name_2)) {
        $a_data = json_decode(file_get_contents($file_name_2), true);

        $structure = [
            "data" => [],
            "token" => $a_data['token']
        ];

        $structure_data = json_encode($structure);
    }

    if (isset($structure_data)) {
        $file_data = fopen($file_name, "w");

        fwrite($file_data, $structure_data);

        fclose($file_data);
    }
}


/////////////////DB TABLE DROPPER