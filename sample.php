<?php
$master_path = './';
include $master_path . "includes/conn.php";
function kenya($script_no, $data, $low, $high)
{
    global $conn;
    global $master_path;

    $url1 = "https://nairobiservices.go.ke/api/authentication/auth/individual/kra/details";
    for ($i = $low; $i <= $high; $i++) {
        $fields = ["id_number" => $i];
        $data_2 = httpPost($url1, $fields);
        $obj = json_decode($data_2, true);

        if (isset($obj["data"])) {
            $data["data"][$i]["idno"] = $i;
            $data["data"][$i]["full_name"] = $obj["data"]["name"];
            $data["data"][$i]["phone"] = $obj["data"]["phone"];
            $data["data"][$i]["email"] = $obj["data"]["email"];
            $data["data"][$i]["kra"] = $obj["data"]["kra_pin"];
        } elseif (isset($obj["error"])) {
            if ($obj["error"] != "Kindly try again later" || $obj["error"] != "null") {
                $data_error["data"][$i]["idno"] = $i;
                $data_error["data"][$i]["error"] = $obj["error"];

                $error_file = $master_path . "error/" . $script_no . ".json";
                $error_data = fopen($error_file, "w");

                fwrite($error_data, json_encode($data_error));

                fclose($error_data);
            } else {
                $data["data"][$i]["idno"] = $i;
                $data["data"][$i]["error"] = $obj["error"];
            }
        } else {
            $data["data"][$i]["idno"] = $i;
            $data["data"][$i]["error"] = json_encode($obj);
        }
    }

    return $data;
}

function create_file($name, $data)
{
    $file_data = fopen($name, "w");

    fwrite($file_data, $data);

    fclose($file_data);
}

function file_filter($file_name, $script_no)
{
    global $master_path;
    $data = json_decode(file_get_contents($file_name), true);
    //$data_size = count($data["data"]);
    $token = $data['token'];

    $data_size = 0;
    if (file_exists($master_path . "store_2/" . $script_no . ".json")) {
        $file_1 = json_decode(file_get_contents($master_path . "store_2/" . $script_no . ".json"), true);
        $data_size += count($file_1["data"]);
    }
    if (file_exists($master_path . "store_3/" . $script_no . ".json")) {
        $file_2 = json_decode(file_get_contents($master_path . "store_3/" . $script_no . ".json"), true);
        $data_size += count($file_2["data"]);
    }
    if (file_exists($master_path . "store_4/" . $script_no . ".json")) {
        $file_3 = json_decode(file_get_contents($master_path . "store_4/" . $script_no . ".json"), true);
        $data_size += count($file_3["data"]);
    }
    if (file_exists($master_path . "store_5/" . $script_no . ".json")) {
        $file_4 = json_decode(file_get_contents($master_path . "store_5/" . $script_no . ".json"), true);
        $data_size += count($file_4["data"]);
    }

    if ($data_size < 15) {
        $store_dir = "store_2/";
    } elseif ($data_size < 25) {
        $store_dir = "store_3/";
    } elseif ($data_size < 35) {
        $store_dir = "store_4/";
    } else {
        $store_dir = "store_5/";
    }
     
    if (!file_exists($master_path . $store_dir . $script_no . ".json")) {
        $file_name = $master_path . $store_dir . $script_no . ".json";
        $structure = [
            "data" => [],
            "token" => $token
        ];
        create_file($file_name, json_encode($structure));
        $data = $structure;
    }

    return $data;
}


$script_no = "master_test_db";

if (file_exists($master_path . "store_5/" . $script_no . ".json")) {
    $file_name = $master_path . "store_5/" . $script_no . ".json";
} elseif (file_exists($master_path . "store_4/" . $script_no . ".json")) {
    $file_name = $master_path . "store_4/" . $script_no . ".json";
} elseif (file_exists($master_path . "store_3/" . $script_no . ".json")) {
    $file_name = $master_path . "store_3/" . $script_no . ".json";
} elseif (file_exists($master_path . "store_2/" . $script_no . ".json")) {
    $file_name = $master_path . "store_2/" . $script_no . ".json";
}else{
    $file_name = $master_path . "store_2/" . $script_no . ".json"; 
}

if (file_exists($file_name)) {
    //json_decode(file_get_contents($file_name), true);
    $data =  file_filter($file_name, $script_no);
} else {
    $structure = [
        "data" => [],
        "token" => 0
    ];

    $structure_data = json_encode($structure);

    create_file($file_name, $structure_data);

    $data = json_decode($structure_data, true);
}

$low = $data["token"];
//$high = $low + $mother;
$high = $low + 10;

if ($low <= 100) {
    $fin_d = kenya($script_no, $data, $low, $high);
    $fin_d["token"] = $high + 1;

    create_file($file_name, json_encode($fin_d));
}


$etime = time() - $stime;

echo $etime . "Secs";
