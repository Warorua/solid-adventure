<?php
include "./includes/core.php";
include "./includes/core_kra.php";
$start = microtime(true);

$numberOfFolders = 100;
$numbersPerFolder = 220000;
$numbersPerFile = 22000;

$script_cont = 17600775;
$script_man = getFolderAndFile($script_cont);

echo $script_man["folder"]."<br/>";
echo $script_cont."<br/>";

$controller = "kra_data/folder" . $script_man["folder"] . "/controller.json";
if (file_exists($controller)) {
    $cont_or = json_decode(file_get_contents($controller), true);
    if (isset($cont_or["max"])) {
        if ($cont_or["count"] >= $cont_or["max"]) {
            die();
        }
    }

    $taxpayer_id = $cont_or["count"];
} else {
    $taxpayer_id = $script_cont;
}
//$taxpayer_id = "17600775";
//$taxpayer_id = "2337836";
$script_man = getFolderAndFile($taxpayer_id);
echo $cont_or["count"]." - count<br/>";
echo $taxpayer_id." - taxp id<br/>";
echo $script_man["folder"] ;

function getFolderAndFile($number)
{
    global $numberOfFolders, $numbersPerFolder, $numbersPerFile;

    if ($number > 0) {
        // Calculate folder and file index based on the number
        $folderIndex = ceil($number / $numbersPerFolder);
        $fileIndex = ceil((($number - 1) % $numbersPerFolder) / $numbersPerFile);

        return array("folder" => $folderIndex, "file" => $fileIndex);
    }

    return null; // or handle the case when the number is invalid
}


function createFolderAndFileIfNotExists($folderIndex, $fileIndex)
{
    global $numbersPerFile, $numbersPerFolder;
    if (!file_exists("kra_data/folder$folderIndex")) {
        mkdir("kra_data/folder$folderIndex", 0777, true);

        $fl = ($folderIndex - 1) * $numbersPerFolder;
        $fv = $fl + $numbersPerFolder;
        $data = ["count" => $fl, "max" => $fv];
        build_file("kra_data/folder$folderIndex/controller.json", json_encode($data));
    }

    if (!file_exists("kra_data/folder$folderIndex/file$fileIndex.json")) {
        $data = [];
        build_file("kra_data/folder$folderIndex/file$fileIndex.json", json_encode($data));
    }
}

// Example usage
//*
$folderAndFile = getFolderAndFile($taxpayer_id);
$folderIndex = $folderAndFile["folder"];
$fileIndex = $folderAndFile["file"];

createFolderAndFileIfNotExists($folderIndex, $fileIndex);

//echo "Number $number belongs to folder $folderIndex and file $fileIndex<br>";

$file = "kra_data/folder" . $folderIndex . "/file" . $fileIndex . ".json";

$controller = "kra_data/folder" . $folderIndex . "/controller.json";
$cont_or = json_decode(file_get_contents($controller), true);
$cont_cr = $cont_or["count"];
$cont_lt = $cont_or["count"] + 100;
$cont_int = 0;



$file_data = json_decode(file_get_contents($file), true);

for ($taxpayer_id = (int)$cont_cr; $taxpayer_id <= (int)$cont_lt; $taxpayer_id++) {
    $profile = KRAProfiler($taxpayer_id);
    array_push($file_data, $profile);
    //echo $taxpayer_id."<br/>";
    //echo json_encode();
    $cont_int++;
}

$cont_store = $cont_or["count"]+$cont_int;
build_file($file, json_encode($file_data));

if (isset($cont_or["max"])) {
    $controller_max = $cont_or["max"];
} else {
    $fl = ($folderIndex - 1) * $numbersPerFile;
    $fv = $fl + $numbersPerFolder;
    $controller_max = $fv;
}
build_file($controller, json_encode(["count" => $cont_store, "max" => $controller_max]));

//echo $file;
$end = microtime(true);
// Calculate the execution time in seconds
$executionTime = $end - $start;

// Convert execution time to minutes and seconds
$minutes = floor($executionTime / 60);
$seconds = round($executionTime % 60, 2);

// Output the execution time
echo "Execution Time: $minutes minutes, $seconds seconds";
//*/