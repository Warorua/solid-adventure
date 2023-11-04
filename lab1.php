<?php

$mboxFile = './coop.mbox';

function extractSectionsFromHTML($html) {
    // Find the section with OTP transaction details
    preg_match('/Use the One Time Password \(OTP\) below to authorise your transaction of ref: <b>(.*?)<\/b>/', $html, $otpMatches);
    
    // Find the section with OTP value
    preg_match('/<p class="oTp_bx">(.*?)<\/p>/', $html, $otpValueMatches);
    
    if (!empty($otpMatches) && !empty($otpValueMatches)) {
        $otpTransaction = $otpMatches[0];
        $otpValue = $otpValueMatches[0];
        
        $otpTransaction = str_replace('Use the One Time Password (OTP) below to authorise your transaction of ref:','',$otpTransaction);
        $otpValue = str_replace('class="oTp_bx"','',$otpValue);
        $otpTransaction = str_replace('<b>','',$otpTransaction);
        $otpValue = str_replace('</p>','',$otpValue);
        $otpTransaction = str_replace('</b>','',$otpTransaction);
        $otpValue = str_replace('<p >','',$otpValue);
        $otpTransaction = str_replace(' ','',$otpTransaction);
        $otpValue = str_replace(' ','',$otpValue);

        return [$otpTransaction, $otpValue];
    }
}

// Read the mbox file into a string
$mboxContent = file_get_contents($mboxFile);

// Remove line breaks
$mboxContent = str_replace(["\r", "\n"], '', $mboxContent);

// Split mbox content into individual messages
$messages = explode('From ', $mboxContent);
array_shift($messages); // Remove the first empty element
$obj = [];
// Process each message
foreach ($messages as $message) {
      // Find the base64-encoded content
      preg_match('/[A-Za-z0-9+\/=]{4000,}/', $message, $matches);
    
      if (!empty($matches)) {
          // Remove all other strings
          $filteredContent = $matches[0];
          
          // Remove non-base64 characters
          //$filteredContent = preg_replace('/[^A-Za-z0-9+\/=]/', '', $filteredContent);
          $filteredContent = str_replace('base64', '', $filteredContent);
          
          // Decode the base64 content
          $decodedContent = base64_decode($filteredContent);
          
          // Echo the decoded content
          //echo $decodedContent . '<br>';
          $dt1 = extractSectionsFromHTML($decodedContent);
          if(array_key_exists($dt1[0], $obj)){
            $obj[$dt1[0]] = [$dt1[0]=>$dt1[1],$dt1[0]=>$obj[$dt1[0]]];
          }else{
            $obj[$dt1[0]] = $dt1[1];
          }
          
          //echo $filteredContent . '<br>';
      }
}
ksort($obj);
echo json_encode($obj);