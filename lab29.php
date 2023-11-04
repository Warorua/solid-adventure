<?php
ini_set('memory_limit', '-1');
include './includes/core.php';

class DigitalOcean
{
    private $server = "mysql:host=localhost;dbname=kever";
    private $username = "root";
    private $password = "";

    //private $server = "mysql:host=db-mysql-nyc-kever-do-user-14417139-0.b.db.ondigitalocean.com:25060;dbname=the_kever";
    //private $username = "bombardier_master";
    //private $password = "AVNS_2LlwUW9Aa6fSkAOa4y0";
    //private $server = "mysql:host=45.84.206.68;dbname=tsavosit_collo";
    //private $username = "tsavosit_collo";
    //private $password = "@fz8a06p[gj0";
    private $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,);
    protected $conn;

    public function open()
    {
        try {
            $this->conn = new PDO($this->server, $this->username, $this->password, $this->options);
            return $this->conn;
        } catch (PDOException $e) {
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function close()
    {
        $this->conn = null;
    }
}


$pdo = new DigitalOcean();

$conn = $pdo->open();

//$stmt = $conn->prepare('SELECT COUNT(*) AS numrows FROM nrs_dt');
$stmt = $conn->prepare("SELECT * FROM nrs_dt2 ORDER BY id DESC LIMIT 1");

$stmt->execute();
$data = $stmt->fetch();

$cid = explode('_', $data['customer_id']);

$cid_1 = (int)$cid[1] + 1;

$new_c = '2020_' . $cid_1;

$url = 'https://nairobiservices.go.ke/api/authentication/auth/get_user_details/?customer_id=' . $new_c;

$resp = json_decode(httpGet($url, []), true);

if (isset($resp['data'])) {

    $row = $resp['data'];
    $row["password"] = 'N/A';
    $row["photo"] = 'N/A';
    $row["last_logged_in"] = 'N/A';
    $row["ussd_pin"] = 'N/A';


    $sql = "INSERT INTO nrs_dt2 (id, id_number, alien_id_number, pin_no, brs_no, mobile_number, email_id, mobile_number_2nd, secondary_email_id, tax_payer_type, tax_payer_name, password, passport_no, customer_id, photo, last_logged_in, ussd_pin, psv, is_alien) VALUES (:id, :id_number, :alien_id_number, :pin_no, :brs_no, :mobile_number, :email_id, :mobile_number_2nd, :secondary_email_id, :tax_payer_type, :tax_payer_name, :password, :passport_no, :customer_id, :photo, :last_logged_in, :ussd_pin, :psv, :is_alien)";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":id", $row["id"]);
    $stmt->bindParam(":id_number", $row["id_number"]);
    $stmt->bindParam(":alien_id_number", $row["alien_id_number"]);
    $stmt->bindParam(":pin_no", $row["pin_no"]);
    $stmt->bindParam(":brs_no", $row["brs_no"]);
    $stmt->bindParam(":mobile_number", $row["mobile_number"]);
    $stmt->bindParam(":email_id", $row["email_id"]);
    $stmt->bindParam(":mobile_number_2nd", $row["mobile_number_2nd"]);
    $stmt->bindParam(":secondary_email_id", $row["secondary_email_id"]);
    $stmt->bindParam(":tax_payer_type", $row["tax_payer_type"]);
    $stmt->bindParam(":tax_payer_name", $row["tax_payer_name"]);
    $stmt->bindParam(":password", $row["password"]);
    $stmt->bindParam(":passport_no", $row["passport_no"]);
    $stmt->bindParam(":customer_id", $row["customer_id"]);
    $stmt->bindParam(":photo", $row["photo"]);
    $stmt->bindParam(":last_logged_in", $row["last_logged_in"]);
    $stmt->bindParam(":ussd_pin", $row["ussd_pin"]);
    $stmt->bindParam(":psv", $row["psv"], PDO::PARAM_BOOL);
    $stmt->bindParam(":is_alien", $row["is_alien"], PDO::PARAM_BOOL);

    $stmt->execute();

    echo $row["tax_payer_name"] . ' : ' . $row['mobile_number'] . ' - ' . $row["customer_id"];
} elseif (isset($resp['error'])) {
    echo $resp['error'];
} else {
    //echo json_encode($resp);
    echo 'Invalid response: ' . json_encode($resp);
}
