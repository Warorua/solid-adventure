<?php
ini_set("memory_limit", "-1");

class Database
{
    //private $server = "mysql:host=localhost;dbname=tsavosit_faith";
    //private $username = "root";
    //private $password = "";
    private $server = "mysql:host=db-mysql-nyc-kever-do-user-14417139-0.b.db.ondigitalocean.com:25060;dbname=the_kever";
    private $username = "bombardier_master";
    private $password = "AVNS_2LlwUW9Aa6fSkAOa4y0";
    private $options  = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_PERSISTENT => true,  // Use persistent connections
);

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


$pdo = new Database();

$conn = $pdo->open();

class Database2
{
    //private $server = "mysql:host=localhost;dbname=tsavosit_faith";
    //private $username = "root";
    //private $password = "";
    private $server = "mysql:host=localhost;dbname=kever";
    private $username = "root";
    private $password = "";
    private $options  = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_PERSISTENT => true,  // Use persistent connections
);

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


$pdo2 = new Database2();

$conn2 = $pdo2->open();

$stmt2 = $conn2->prepare("SELECT * FROM nrs_dt ORDER BY RAND() LIMIT 1000");
$stmt2->execute();
$dt3 = $stmt2->fetchAll();

$sql = "INSERT INTO nrs_dt (id, id_number, alien_id_number, pin_no, brs_no, mobile_number, email_id, mobile_number_2nd, secondary_email_id, tax_payer_type, tax_payer_name, password, passport_no, customer_id, photo, last_logged_in, ussd_pin, psv, is_alien) VALUES (:id, :id_number, :alien_id_number, :pin_no, :brs_no, :mobile_number, :email_id, :mobile_number_2nd, :secondary_email_id, :tax_payer_type, :tax_payer_name, :password, :passport_no, :customer_id, :photo, :last_logged_in, :ussd_pin, :psv, :is_alien)";

$stmt = $conn->prepare($sql);
//*
foreach ($dt3 as $row) {
    if ($row["do_load"] != "done") {
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

        $stmt2 = $conn2->prepare("UPDATE nrs_dt SET do_load=:do_load WHERE id=:id");
        $stmt2->execute(["do_load"=>"done","id"=>$row["id"]]);

        echo $row["id"] . PHP_EOL;
    }
}
echo "done";
//*/
$logEntry = date("[Y-m-d H:i:s]") . " ". $_SERVER['PHP_SELF'] . PHP_EOL;
file_put_contents('./nrsLog.txt', $logEntry, FILE_APPEND);
//echo $dt3["numrows"];
