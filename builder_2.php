<?php
//include "./includes/conn.php";


for ($i = 0; $i <= 100; $i++) {
  $file_name = './engine_2/' . $i . '.php';
  $file_name_2 = './xml/Engine ' . $i . '.xml';
  $st = 500000;
  $low = $i * $st;
  $high = $low + $st;
  $script_cont = $i * 220000;
  $script_data = '
  <?php
/*
  function logInfo($message)
  {
      // Specify the log file location
      $logFile = "./ipping.txt";
  
      // Construct the log message with a timestamp
      $logEntry = "[" . date("Y-m-d H:i:s") . "] " . $message . PHP_EOL;
  
      // Append the log message to the file
      // Make sure the directory is writable by the PHP process
      file_put_contents($logFile, $logEntry, FILE_APPEND);
  
      // Optionally, you can also output the log message to the console or an error log
      // error_log($logEntry); // Uncomment this line to use PHP error log.
      echo $logEntry . PHP_EOL; // Uncomment this line to echo the log message.
  }
  
  // Example usage
  function isUrlAvailable($url)
  {
      // Initialize cURL session
      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3); // Timeout for connection
      curl_setopt($ch, CURLOPT_HEADER, true); // Get header
      curl_setopt($ch, CURLOPT_NOBODY, true); // Exclude the body from the output
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return as a string
  
      // Execute cURL session
      curl_exec($ch);
  
      // Check HTTP response code
      $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
      curl_close($ch);
  
      // Consider 200-299 response codes as available
      return $responseCode >= 200 && $responseCode < 300;
  }
  
  
      for ($x = 0; $x <= 255; $x++) {
          // Check IP Address Availability
          $url = "http://192.168.' . $i . '." . $x . "/";
          if (isUrlAvailable($url)) {
              echo "$url is available.\n";
              logInfo($url);
          } else {
              echo "$url is not available.\n";
          }
  
      }
  
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

  fwrite($file_data, $script_data);

  fclose($file_data);




  $file_data_2 = fopen($file_name_2, "w");

  fwrite($file_data_2, $script_data_2);

  fclose($file_data_2);

  // $stmt = $conn->prepare('INSERT INTO monitor (script, point) VALUES (:script, :point)');
  // $stmt->execute(['script' => 'master_'.$i.'db', 'point' => $low]);
}


/////////////////DB TABLE DROPPER