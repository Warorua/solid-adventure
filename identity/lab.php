<?php
include '../includes/core.php';
include '../includes/core_identity.php';
//echo myToken().'<br/><br/>';

//$userdata = getUserData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1zaXNkbiI6IjI1NDcxNjkxMjAwMiIsImNsaWVudElwIjoiMTA1LjE2MC43NC4yMjQiLCJvcyI6IldpbmRvd3MgMTAuMCIsInNvdXJjZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTQuMC4wLjAgU2FmYXJpLzUzNy4zNjAxMDEiLCJwbGF0Zm9ybSI6Ik1pY3Jvc29mdCBXaW5kb3dzIiwiaXNNb2JpbGUiOmZhbHNlLCJpc1RhYmxldCI6ZmFsc2UsImlzRGVza3RvcCI6dHJ1ZSwiaXNJcG9kIjpmYWxzZSwiaXNJcGhvbmUiOmZhbHNlLCJpc0FuZHJvaWQiOmZhbHNlLCJpc0JsYWNrYmVycnkiOmZhbHNlLCJpc09wZXJhIjpmYWxzZSwiaXNJRSI6ZmFsc2UsImlzRWRnZSI6ZmFsc2UsImlzU2FmYXJpIjpmYWxzZSwiaXNGaXJlZm94IjpmYWxzZX0sImlhdCI6MTY4ODM0ODgwNSwiZXhwIjoxNjg4NTIxNjA1fQ.YTEr3sGo7DOUX6o6o5F6lDooIxvPNUhPUpu2kAhyvl0');

//echo $userdata.'<br/><br/>';

//echo   __DIR__.'/cookies/incap.txt';

//echo json_encode($_SERVER);
function generateMpesaCode() {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $code = '';
  
    // Year (Q for 2022, R for 2023, etc.)
    $currentYear = date('Y');
    $code .= $alphabet[$currentYear - 2022];
  
    // Month (K for November, G for July, etc.)
    $currentMonth = date('n');
    $code .= $alphabet[$currentMonth - 1];
  
    // Day (1 for 1st, 2 for 2nd, etc.)
    $currentDay = date('j');
    $code .= $currentDay;
  
    // Transaction order (A for 10th, B for 11th, etc.)
    $currentTime = date('Hi');
    $transactionOrder = intval($currentTime) + 1;
    $transactionOrder %= 100; // Limit transaction order to two digits
    $transactionOrder = str_pad($transactionOrder, 2, '0', STR_PAD_LEFT); // Pad with zeros
    $code .= $transactionOrder;
  
    // Complete the remaining characters to make the code 10 characters long
    while (strlen($code) < 10) {
      $code .= $alphabet[rand(0, strlen($alphabet) - 1)];
    }
  
    return $code;
  }
  
  // Usage example:
  $generatedCode = generateMpesaCode();
  echo $generatedCode;
  