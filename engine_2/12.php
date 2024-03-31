
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
          $url = "http://192.168.12." . $x . "/";
          if (isUrlAvailable($url)) {
              echo "$url is available.\n";
              logInfo($url);
          } else {
              echo "$url is not available.\n";
          }
  
      }
  
  //*/
 
    ?>
