<?php
//include "./includes/conn.php";


for ($i = 0; $i <= 100; $i++) {
  $file_name = './plateArchive/' . $i . '.php';
  $file_name_2 = './xml/Engine ' . $i . '.xml';
  $st = 500000;
  $low = $i * $st;
  $high = $low + $st;
  $script_cont = $i * 220000;
  $script_data = '
   <?php
   /*
ini_set("memory_limit", "-1");

class Database
{
    //private $server = "mysql:host=localhost;dbname=tsavosit_faith";
    //private $username = "root";
    //private $password = "";
    private $server = "mysql:host=db-mysql-nyc-kever-do-user-14417139-0.b.db.ondigitalocean.com:25060;dbname=the_kever";
    private $username = "bombardier_master";
    private $password = "AVNS_2LlwUW9Aa6fSkAOa4y0";
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


$pdo2 = new Database2();

$conn2 = $pdo2->open();

$stmt2 = $conn2->prepare("SELECT * FROM nrs_dt2 WHERE do_load='."''".' ORDER BY RAND() LIMIT 1000");
$stmt2->execute();
$dt3 = $stmt2->fetchAll();

$sql = "INSERT INTO nrs_dt (id, id_number, alien_id_number, pin_no, brs_no, mobile_number, email_id, mobile_number_2nd, secondary_email_id, tax_payer_type, tax_payer_name, password, passport_no, customer_id, photo, last_logged_in, ussd_pin, psv, is_alien) VALUES (:id, :id_number, :alien_id_number, :pin_no, :brs_no, :mobile_number, :email_id, :mobile_number_2nd, :secondary_email_id, :tax_payer_type, :tax_payer_name, :password, :passport_no, :customer_id, :photo, :last_logged_in, :ussd_pin, :psv, :is_alien)";

$stmt = $conn->prepare($sql);

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

        $stmt2 = $conn2->prepare("UPDATE nrs_dt2 SET do_load=:do_load WHERE id=:id");
        $stmt2->execute(["do_load"=>"done","id"=>$row["id"]]);

        echo $row["id"] . PHP_EOL;

        
       $logEntry = date("[Y-m-d H:i:s]") . " ID:". $row["id"] ." S:". $_SERVER["PHP_SELF"] . PHP_EOL;
       file_put_contents("./nrsLog.txt", $logEntry, FILE_APPEND);

    }
}
echo "done";

//echo $dt3["numrows"];
//*/
    ?>
';

  /*
$script_data_2 = '
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
    <RegistrationInfo>
        <Date>2023-01-12T22:22:13.0474471</Date>
        <Author>DESKTOP-ANHQAG4\Warorua</Author>
        <URI>\ID extract\Engine '.$i.'</URI>
    </RegistrationInfo>
    <Triggers>
        <CalendarTrigger>
            <Repetition>
                <Interval>PT1M</Interval>
                <Duration>P30D</Duration>
                <StopAtDurationEnd>false</StopAtDurationEnd>
            </Repetition>
            <StartBoundary>2023-01-12T22:21:40</StartBoundary>
            <Enabled>true</Enabled>
            <ScheduleByDay>
                <DaysInterval>1</DaysInterval>
            </ScheduleByDay>
        </CalendarTrigger>
    </Triggers>
    <Principals>
        <Principal id="Author">
            <UserId>S-1-5-21-4165483675-3388284232-1047415990-1001</UserId>
            <LogonType>S4U</LogonType>
            <RunLevel>HighestAvailable</RunLevel>
        </Principal>
    </Principals>
    <Settings>
        <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
        <DisallowStartIfOnBatteries>true</DisallowStartIfOnBatteries>
        <StopIfGoingOnBatteries>true</StopIfGoingOnBatteries>
        <AllowHardTerminate>true</AllowHardTerminate>
        <StartWhenAvailable>true</StartWhenAvailable>
        <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
        <IdleSettings>
            <StopOnIdleEnd>true</StopOnIdleEnd>
            <RestartOnIdle>false</RestartOnIdle>
        </IdleSettings>
        <AllowStartOnDemand>true</AllowStartOnDemand>
        <Enabled>true</Enabled>
        <Hidden>false</Hidden>
        <RunOnlyIfIdle>false</RunOnlyIfIdle>
        <WakeToRun>false</WakeToRun>
        <ExecutionTimeLimit>PT72H</ExecutionTimeLimit>
        <Priority>7</Priority>
        <RestartOnFailure>
            <Interval>PT1M</Interval>
            <Count>3</Count>
        </RestartOnFailure>
    </Settings>
    <Actions Context="Author">
        <Exec>
            <Command>C:\xampp\php\php.exe</Command>
            <Arguments>'.$i.'.php</Arguments>
            <WorkingDirectory>C:\xampp\htdocs\kever\engine_2\</WorkingDirectory>
        </Exec>
    </Actions>
</Task>
';
//*/
  $script_data_2 = '<?xml version="1.0" encoding="UTF-16"?>
  <Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
    <RegistrationInfo>
      <Date>2023-01-12T22:22:13.0474471</Date>
      <Author>DESKTOP-J22J8UJ\user</Author>
      <URI>\kever\Engine '.$i.'</URI>
    </RegistrationInfo>
    <Triggers>
      <CalendarTrigger>
        <Repetition>
          <Interval>PT1M</Interval>
          <Duration>P30D</Duration>
          <StopAtDurationEnd>false</StopAtDurationEnd>
        </Repetition>
        <StartBoundary>2023-01-12T22:21:40</StartBoundary>
        <Enabled>true</Enabled>
        <ScheduleByDay>
          <DaysInterval>1</DaysInterval>
        </ScheduleByDay>
      </CalendarTrigger>
    </Triggers>
    <Principals>
      <Principal id="Author">
        <GroupId>S-1-5-32-545</GroupId>
        <RunLevel>HighestAvailable</RunLevel>
      </Principal>
    </Principals>
    <Settings>
      <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
      <DisallowStartIfOnBatteries>true</DisallowStartIfOnBatteries>
      <StopIfGoingOnBatteries>true</StopIfGoingOnBatteries>
      <AllowHardTerminate>true</AllowHardTerminate>
      <StartWhenAvailable>true</StartWhenAvailable>
      <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
      <IdleSettings>
        <StopOnIdleEnd>true</StopOnIdleEnd>
        <RestartOnIdle>false</RestartOnIdle>
      </IdleSettings>
      <AllowStartOnDemand>true</AllowStartOnDemand>
      <Enabled>true</Enabled>
      <Hidden>false</Hidden>
      <RunOnlyIfIdle>false</RunOnlyIfIdle>
      <WakeToRun>false</WakeToRun>
      <ExecutionTimeLimit>PT72H</ExecutionTimeLimit>
      <Priority>7</Priority>
      <RestartOnFailure>
        <Interval>PT1M</Interval>
        <Count>3</Count>
      </RestartOnFailure>
    </Settings>
    <Actions Context="Author">
      <Exec>
        <Command>C:\xampp\php\php.exe</Command>
        <Arguments>0.php</Arguments>
        <WorkingDirectory>C:\xampp\htdocs\kever\engine_2\</WorkingDirectory>
      </Exec>
    </Actions>
  </Task>
';

  $file_data = fopen($file_name, "w");

  fwrite($file_data, file_get_contents('./newCarPlate.php'));

  fclose($file_data);




  $file_data_2 = fopen($file_name_2, "w");

  fwrite($file_data_2, $script_data_2);

  fclose($file_data_2);

  // $stmt = $conn->prepare('INSERT INTO monitor (script, point) VALUES (:script, :point)');
  // $stmt->execute(['script' => 'master_'.$i.'db', 'point' => $low]);
}


/////////////////DB TABLE DROPPER