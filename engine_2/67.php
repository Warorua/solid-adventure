
    <?php
    / *
    //include "../includes/conn.php";
    include "../includes/core.php";
    include "../includes/core_kra.php";
    function kenya($script_no, $data, $low, $high)
{
    global $conn;



    for ($i = $low; $i <= $high; $i++) {

        $director = rand(0, 2);
        //$director = 2;
        //$i = "39290974";
        if ($director == 0) {
            echo $director . "<br/>";
            $url1 = "https://nairobiservices.go.ke/api/authentication/auth/id/details/" . $i;
            $fields = [];
            $data_2 = httpGet($url1, $fields);
            $obj = json_decode($data_2, true);
            $obj1 = [];
            $obj1["data"]["name"] = $obj["full_name"];
            $obj1["data"]["phone"] = "";
            $obj1["data"]["email"] = "";
            $obj1["data"]["kra_pin"] = "";

            //echo json_encode($obj1);
        } elseif ($director == 1) {
            echo $director . "<br/>";
            $url1 = "https://appointment.hudumakenya.go.ke/includes/getcitizenregdetails.php?id=6%3A" . $i;
            $fields = [];
            $data_2 = httpGet($url1, $fields);
            $obj = explode(":", $data_2);
            $obj1 = [];
            $obj1["data"]["name"] = $obj[2] . " " . $obj[3] . " " . $obj[4];
            $obj1["data"]["phone"] = "";
            $obj1["data"]["email"] = "";
            $obj1["data"]["kra_pin"] = "";

            //echo json_encode($obj1);
        } elseif ($director == 2) {
            echo $director . "<br/>";
            $url1 = "https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchRegistrationDtl.fetchNatRegDtlsByNIDAmd.dwr";
            $fields = [];
            $data_2 = idSearchKRA($i);
            $obj = json_decode($data_2, true);
            $obj1 = [];
            function removeSpecialCharacters($name)
            {
                // Define a regular expression pattern to match special characters
                $pattern = "/[^a-zA-Z ]/";

                // Use the preg_replace function to remove special characters
                $cleanedName = preg_replace($pattern, "", $name);

                return $cleanedName;
            }
            $obj1["data"]["name"] = removeSpecialCharacters($obj["firstName"]) . " " . removeSpecialCharacters($obj["middleName"]) . " " . removeSpecialCharacters($obj["lastName"]);
            $obj1["data"]["phone"] = "";
            $obj1["data"]["email"] = "";
            $obj1["data"]["kra_pin"] = "";

            //echo json_encode($obj1);
        }

        $obj = $obj1;

        if (isset($obj["data"])) {
            $data["data"][$i]["idno"] = $i;
            $data["data"][$i]["full_name"] = $obj["data"]["name"];
            $data["data"][$i]["phone"] = $obj["data"]["phone"];
            $data["data"][$i]["email"] = $obj["data"]["email"];
            $data["data"][$i]["kra"] = $obj["data"]["kra_pin"];
        } elseif (isset($obj["error"])) {
            if ($obj["error"] == "Kindly try again later" || $obj["error"] == "null") {
                $error_file = "../error/" . $script_no . ".json";
                if (file_exists($error_file)) {
                    $data_error = json_decode(file_get_contents($error_file), true);
                } else {
                    $error_structure = [
                        "data" => []
                    ];

                    $error_structure_data = json_encode($error_structure);

                    $errfile_data = fopen($error_file, "w");

                    fwrite($errfile_data, $error_structure_data);

                    fclose($errfile_data);

                    $data_error = json_decode($error_structure_data, true);
                }

                $data_error["data"][$i]["idno"] = $i;
                $data_error["data"][$i]["error"] = $obj["error"];

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

$script_no = "master_67_db";
$file_name = "../store_2_b/" . $script_no . ".json";

if (file_exists($file_name)) {
    $data = json_decode(file_get_contents($file_name), true);
} else {
    $structure = [
        "data" => [],
        "token" => 33500000
    ];

    $structure_data = json_encode($structure);

    $file_data = fopen($file_name, "w");

    fwrite($file_data, $structure_data);

    fclose($file_data);

    $data = json_decode($structure_data, true);
}

$low = $data["token"];
$high = $low + $mother;

if($low <= 34000000 ){
 $fin_d = kenya($script_no, $data, $low, $high);

$fin_d["token"] = $high + 1;

$file_data = fopen($file_name, "w");

fwrite($file_data, json_encode($fin_d));

fclose($file_data);   
}
//*/
?>
    