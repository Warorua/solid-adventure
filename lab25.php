<?php
ini_set('memory_limit', '-1');

class Database2
{
    //private $server = "mysql:host=localhost;dbname=tsavosit_faith";
    //private $username = "root";
    //private $password = "";

    private $server = "mysql:host=localhost;dbname=kever";
    private $username = "root";
    private $password = "";

    //private $server = "mysql:host=45.84.206.68;dbname=tsavosit_collo";
    //private $username = "tsavosit_collo";
    //private $password = "db0hvY_uLPV7";

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
$file = file_get_contents('./dtt.json');

$dt1 = json_decode($file, true);
$dt2 = $dt1['data']['onstreet'];

foreach ($dt2 as $row) {

    $stmt = $conn2->prepare("SELECT COUNT(*) AS numrows FROM nrs_dt2 WHERE id=:id");
    $stmt->execute(['id' => $row['id']]);
    $dt3 = $stmt->fetch();
    if ($dt3['numrows'] < 1) {

        $sql = "INSERT INTO nrs_dt2 (id, id_number, alien_id_number, pin_no, brs_no, mobile_number, email_id, mobile_number_2nd, secondary_email_id, tax_payer_type, tax_payer_name, password, passport_no, customer_id, photo, last_logged_in, ussd_pin, psv, is_alien) VALUES (:id, :id_number, :alien_id_number, :pin_no, :brs_no, :mobile_number, :email_id, :mobile_number_2nd, :secondary_email_id, :tax_payer_type, :tax_payer_name, :password, :passport_no, :customer_id, :photo, :last_logged_in, :ussd_pin, :psv, :is_alien)";

        $stmt = $conn2->prepare($sql);

        $stmt->bindParam(':id', $row['id']);
        $stmt->bindParam(':id_number', $row['id_number']);
        $stmt->bindParam(':alien_id_number', $row['alien_id_number']);
        $stmt->bindParam(':pin_no', $row['pin_no']);
        $stmt->bindParam(':brs_no', $row['brs_no']);
        $stmt->bindParam(':mobile_number', $row['mobile_number']);
        $stmt->bindParam(':email_id', $row['email_id']);
        $stmt->bindParam(':mobile_number_2nd', $row['mobile_number_2nd']);
        $stmt->bindParam(':secondary_email_id', $row['secondary_email_id']);
        $stmt->bindParam(':tax_payer_type', $row['tax_payer_type']);
        $stmt->bindParam(':tax_payer_name', $row['tax_payer_name']);
        $stmt->bindParam(':password', $row['password']);
        $stmt->bindParam(':passport_no', $row['passport_no']);
        $stmt->bindParam(':customer_id', $row['customer_id']);
        $stmt->bindParam(':photo', $row['photo']);
        $stmt->bindParam(':last_logged_in', $row['last_logged_in']);
        $stmt->bindParam(':ussd_pin', $row['ussd_pin']);
        $stmt->bindParam(':psv', $row['psv'], PDO::PARAM_BOOL);
        $stmt->bindParam(':is_alien', $row['is_alien'], PDO::PARAM_BOOL);

        $stmt->execute();

        echo $row['id'] . PHP_EOL;
    }
}

/*
$stmt = $conn->prepare('SELECT * FROM nrs_dt');
$stmt->execute();
$data = $stmt->fetchAll();

echo json_encode($data);
*/