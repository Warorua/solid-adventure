<?php
include './sqlite/connect.php';

//$dbFile = 'nationPersons.db';
$start = date('Y-m-d H:i:s');
//*

$sqliteDB = new SQLiteDatabase();

// Specify the table name
$tableName = 'nationIdentity';

for ($i = 0; $i <= 80; $i++) {
    $store = 'store_2';
    $fnm = 'master_' . $i . '_db.json';
    $file = $store . '/' . $fnm;
    $data = json_decode(file_get_contents($file), true);
    //echo count($data['data']).' <br/>'.PHP_EOL;
    foreach ($data['data'] as $row) {
        if (isset($row['error'])) {
            // Data to insert
            $dataToInsert = array(
                "idno" => $row['idno'],
                "error" => $row['error']
                // Add more columns and values as needed
            );
        } else {
            // Data to insert
            $dataToInsert = array(
                "idno" => $row['idno'],
                "full_name" => $row['full_name'],
                "phone" => $row['phone'],
                "kra" => $row['kra']
                // Add more columns and values as needed
            );
        }
        // Call the insert method
        if ($sqliteDB->insert($tableName, $dataToInsert)) {
            echo "Data inserted successfully. - " . $i . PHP_EOL;
        } else {
            echo "Failed to insert data. - " . $i . PHP_EOL;
        }
        //*/
    }
}

echo 'Process ended' . PHP_EOL . PHP_EOL;
echo $start . PHP_EOL;
echo date('Y-m-d H:i:s') . PHP_EOL;
//*
