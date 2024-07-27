<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

$data = '{"success":true,"invoiceNo":"BL-UBP-064249","amount":"15,000.00","pobox":"","postalcode":"","mobilenumber":"0723789314","applicationNo":"","external_doc":"","business_name":"","business_subsidiary_name":"","description":"-0 for ","dategenerated":"02\/20\/24","status":"Unpaid","customerno":"2020_48393","duedate":"02\/20\/24","customername":"Francis Omori Nyachieng\'a"}';

$validation = json_decode($data, true);

$amt1 = floatval(str_replace(',', '', $validation['amount']));

$dt1 = ['invoiceNo' => $validation['invoiceNo'], 'invoiceAmt' => $amt1, 'client' => 0, 'id' => '1'];
$dtt1 = [];
$dtt1['name'] = '0';
function universal_dab($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/dab.jsp?sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}
function convertToISO8601($dateTimeString, $timezoneOffset = '+03:00') {
    // Remove the microseconds part if it exists
    $dateTimeString = preg_replace('/\.\d+/', '', $dateTimeString);

    // Create a DateTime object from the original string
    $dateTime = new DateTime($dateTimeString, new DateTimeZone('UTC'));

    // Set the desired timezone
    $timezone = new DateTimeZone($timezoneOffset);
    $dateTime->setTimezone($timezone);

    // Format the DateTime object to the ISO 8601 format
    $iso8601DateTime = $dateTime->format('Y-m-d\TH:i:sP');

    return $iso8601DateTime;
}

if (isset($validation['success'])) {
    if ($validation['success']) {
        if (isset($validation['status'])) {
            if ($validation['status'] == "Unpaid") {
                $parts = explode('-', $dt1['invoiceNo']); // Split the string by hyphen
                $validationAmt = str_replace(",", "", $validation['amount']);
                if ($parts[0] != 'BL' || $parts[1] == 'LR' || (int)$validationAmt == (int)$dt1['invoiceAmt']) {
                    $billAmt = $dt1['invoiceAmt'];
                    $bypass = ['amount' => $dt1['invoiceAmt'], 'invoice_no' => $dt1['invoiceNo'], 'success' => true, 'route' => 'yes', 'record' => 'yes', 'client' => $dtt1['name'], 'extdoc' => $validation['external_doc'], 'custname' => $validation['customername'], 'custcont' => $validation['mobilenumber']];
                    // echo json_encode($bypass) . '<br/>';

                    if (isset($bypass)) {

                        $newId = 6212481;
                        $newBal = 378760 + 500;
                        $custname = splitName($bypass['custname']);
                        if ($bypass['custcont'] == '' || $bypass['custcont'] == null) {
                            $bypass['custcont'] = '0700000000';
                        }
                        $custcont = normalizePhoneNumber($bypass['custcont']);
                        $timeFormats = getCurrentTimeFormats();
                        $bypassAmt = (float)$bypass['amount'];

                        $bypass['url'] = 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/affirm';

                        //die(json_encode($url));

                        //$url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
                        $bty = explode('-', $bypass['invoice_no']);
                        $bty[1] = strtoupper($bty[1]);
                        $code = generateMpesaCode();
                        $data = array(
                            "apiKey" => "216424b0ce94d4682ef240fd67e30daf600be171",
                            "type" => "mpesa",
                            "billNumber" => (string) $bypass['invoice_no'],
                            "billAmount" => $bypassAmt,
                            "phone" => (string) $custcont,
                            "transactionDate" => "",
                            "Field1" => null,
                            "Field2" => null,
                            "Field3" => null,
                            "Field4" => null,
                            "Field5" => null,
                            "bankdetails" => null,
                            "mpesadetails" => array(
                                "BillRefNumber" => (string) $bypass['invoice_no'],
                                "BusinessShortCode" => "6060047",
                                "FirstName" => (string)str_replace("'", '', $custname['first']),
                                "LastName" => (string)str_replace("'", '', $custname['last']),
                                "MSISDN" => "",
                                "MiddleName" => (string)str_replace("'", '', $custname['middle']),
                                "OrgAccountBalance" => "0.00",
                                "ThirdPartyTransID" => "5627760",
                                "TransAmount" => $bypassAmt,
                                "TransID" => (string) $code,
                                "TransTime" => (string)$timeFormats['withoutSeparators'],
                                "TransactionType" => "Pay Bill"
                            )
                        );


                        $data = json_encode($data, JSON_PRESERVE_ZERO_FRACTION);

                        //echo $data;

                        $sqldata = trim(json_encode($data), '"');

                        $headers = [];

                        $validation_response = "SUCCESS >>>>>>Francis Omori Nyachieng\'a-----UBP Application No TLA066921 - 2020_48393";

                        $mpesaTransactions = "insert into `mpesaTransactions`  ( `Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`, `host_name`, `host_ip`, `remote_id` ) values  ( NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Pending', NULL, '" . $timeFormats['withSeparators'] . "', '" . $custcont . "', '" . str_replace("'", '', $bypass['custname']) . "', " . $newBal . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 0, '" . $timeFormats['withoutSeparators'] . "', 'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction', 'fe80::7054:5e55:9d70:83b3%2',  'fe80::7054:5e55:9d70:83b3%2',  '10.197.136.35' )";
                        $mpesaTransactionsUpt = "UPDATE mpesaTransactions SET `validation Response` = '".$validation_response."', `Confirmation Response`=NULL WHERE receiptNo='SGQ95TNTG7'";
                        //echo $mpesaTransactionsUpt ;
                        //echo universal_dab($mpesaTransactionsUpt,'mpesaTransactions');

                        $mpesaTransactionsView = "INSERT INTO `mpesaTransactionsView` ( `receiptNo`,  `accNo`,  `mpesaName`,  `amount`,  `paybillBal`,  `mobileno`,  `logDate`,  `MpesaValidation`,  `validation Response`,  `apiCode`,  `shortCode`,  `status` ) VALUES ( '" . $code . "',  '" . $bypass['invoice_no'] . "',  '" . str_replace("'", '', $bypass['custname']) . "',  " . $bypass['amount'] . ",  379260,  '" . $custcont . "',  '" . $timeFormats['withSeparators'] . "',  'COMPLETED',  'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction',  '2dce510f562c9ab7ce24c6fe282b4f099e8e49be',  '6060047',  0 ); ";
                        //echo $mpesaTransactionsView;

                        $Pull_Transaction = "INSERT INTO `Pull_Transaction`  ( `Short_Code`, `Update_client`, `transactionId`, `trxDate`,  `msisdn`, `sender`, `transactiontype`, `billreference`, `amount`,  `organizationname`, `customer_name`, `log_date` )  VALUES  ( '6060047', 0, '" . $code . "', '".convertToISO8601($timeFormats['withSeparators'])."',  '" . $custcont . "', 'MPESA', 'c2b-pay-bill-debi', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ",  'KRA NAIROBI COUNTY REVENUE', 'Customer', '".$timeFormats['withSeparators']."' ); ";
                        //echo $Pull_Transaction;
                        //echo universal_dab($Pull_Transaction,'mpesaTransactions');

                        $mpesaTransactions_audit = "UPDATE mpesaTransactions_audit SET `MpesaValidation`='VALIDATED', `resultoutput`=null, `validation Response`=null, `host_name`='taifapay@192.168.0.64', `paybillBal`='0.0' WHERE `accNo`='" . $bypass['invoice_no'] . "'";
                        //echo $mpesaTransactions_audit;
                        //echo universal_dab($mpesaTransactions_audit,'mpesaTransactions');

                        $transactions = "UPDATE transactions SET `inserted_by`='taifapay@192.168.0.64' WHERE `clientRefNo`='" . $bypass['invoice_no'] . "'";
                        //echo $transactions;
                        //echo universal_dab($transactions,'mpesaTransactions');

                    }
                }
            }
        }
    }
}
