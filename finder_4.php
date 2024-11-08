<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core.php';

$dt1 = 'No Processing done!';

$type = $_POST['type'];

$dt1 =  json_encode($_POST);

$mini_head = 'HEAD';

if ($type == 'bills') {
    $bills = '';
    $head = 'bill details';
}elseif($type == 'transactions') {
    $transactions = '';
    $head = 'bill details';
}elseif($type == 'ubp_cert') {
    $ubp_cert = '';
    $head = 'ubp cert details';
} elseif ($type == 'invoice') {

    if (isset($_POST['invoice'])) {
        if ($_POST['invoice'] != '') {
            $invoice = $_POST['invoice'];
            $head = 'invoice details(regular)';
        } else {
            $dt1 = 'Please add an invoice number to proceed!';
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed!';
    }
} elseif ($type == 'token') {
    $token = '';
    $head = 'active user token';
} elseif ($type == 'trp') {
    $trp = '';
    $head = 'trp record findings';
} elseif ($type == 'psv_list') {
    if (isset($_SESSION['is_psv'])) {
        if ($_SESSION['is_psv']) {
            $psv_list = '';
            $head = 'PSV Vehicles List';
        } else {
            $dt1 = 'User is not a PSV company!';
        }
    } else {
        $dt1 = 'Incomplete request! Try again';
    }
} elseif ($type == 'psv_activation') {
    if (isset($_SESSION['is_psv'])) {
        if ($_SESSION['is_psv']) {
            $psv_activation = '';
            $head = 'PSV Sacco Activation Details';
        } else {
            $dt1 = 'User is not a PSV company!';
        }
    } else {
        $dt1 = 'Incomplete request! Try again';
    }
} elseif ($type == 'number_plate') {
    if (isset($_POST['number_plate'])) {


        if ($_POST['number_plate'] != '') {
            $number_p = strtoupper(str_replace(' ', '', $_POST['number_plate']));
            $plate_len = strlen($number_p);
            if ($plate_len > 7 || $plate_len < 6) {
                $dt1 = 'Invalid Number Plate Length!';
            } else {
                if (substr($number_p, 0, 1) === "K") {

                    $_SESSION['plate'] = $number_plate = $number_p;

                    $head = 'Number Plate details';
                } else {
                    $dt1 = "The Number Plate does not start with 'K'";
                }
            }
        } else {
            $dt1 = 'Please add a Number Plate to proceed 1!';
        }
    } else {
        $dt1 = 'Please add a Number Plate to proceed 2!';
    }
} elseif ($type == 'invoice2') {

    if (isset($_POST['invoice2'])) {
        if ($_POST['invoice2'] != '') {
            $invoice2 = $_POST['invoice2'];
            $head = 'invoice details(master)';
        } else {
            $dt1 = 'Please add an invoice number to proceed!';
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed!';
    }
} elseif ($type == 'invoice3') {

    if (isset($_POST['invoice3'])) {
        if ($_POST['invoice3'] != '') {
            $invoice3 = $_POST['invoice3'];
            $head = 'invoice details(master & regular)';
        } else {
            $dt1 = 'Please add an invoice number to proceed!!';
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed!';
    }
} elseif ($type == 'bypass') {
    if (isset($_POST['amount']) && isset($_POST['invoice_no'])) {
        if ($_POST['amount'] != '' && $_POST['invoice_no'] != '') {
            $amount = $_POST['amount'] . '.0';
            $invoice_no = str_replace(array(' ', "\n", "\r", "\r\n"), '', $_POST['invoice_no']);
            $bypass = ['amount' => $amount, 'invoice_no' => $invoice_no, 'success' => true];
            $dt1 = '200';
            $head = 'bypass details(master)';
        } else {
            $dt1 = 'Please add an invoice number to proceed! 1';
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed! 2';
    }
} elseif ($type == 'land') {
    if (isset($_POST['stype']) && isset($_POST['doc_no'])) {
        if ($_POST['stype'] != '' && $_POST['doc_no'] != '') {
            $doc_no = $_POST['doc_no'];
            $stype = $_POST['stype'];
            $dt1 = '200';
            $head = 'nairobi land search';
        } else {
            $dt1 = 'Please add an document number to proceed! 1';
        }
    } else {
        $dt1 = 'Please add an document number to proceed! 2';
    }
}




if (isset($bills)) {
    $mini_head = 'BILL';
    $url = 'https://nairobiservices.go.ke/api/authentication/profile/bills';
    $data = [];
    $headers = [
        'Authorization: Bearer ' . $_SESSION['token'],
        'Cookie: token=' . $_SESSION['token']
    ];

    $dt1 = json_decode(httpGet($url, $data, $headers), true);
    if (isset($dt1['error'])) {
        if ($dt1['error'] == 'Cannot get bills at the moment') {
            $url = 'https://nairobiservices.go.ke/api/parking/parking/transactions';
            $dt1 = json_decode(httpGet($url, $data, $headers), true);
        }
    }
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($transactions)) {
    $mini_head = 'BILL';
    $url = 'https://nairobiservices.go.ke/api/parking/parking/transactions';
    $data = [];
    $headers = [
        'Authorization: Bearer ' . $_SESSION['token'],
        'Cookie: token=' . $_SESSION['token']
    ];

    $dt1 = json_decode(httpGet($url, $data, $headers), true);

    if (isset($dt1['error'])) {
        $dt1 = json_encode($dt1);
    }
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($ubp_cert)) {
    $mini_head = 'CERTS';
    $url = 'https://edev.nairobiservices.go.ke/api/sbp/ubp/get_ubp_register';
    $data = [];
    $headers = [
        'Authorization: Bearer ' . $_SESSION['token'],
        'Cookie: token=' . $_SESSION['token']
    ];

    $dt1 = json_decode(httpGet($url, $data, $headers), true);

    if (isset($dt1['error'])) {
        $dt1 = json_encode($dt1);
    }
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($invoice2)) {
    $url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $invoice2;
    $data = [];
    if (isset($_SESSION['token'])) {
        $invtk = $_SESSION['token'];
    } else {
        $invtk = 'null';
    }
    $headers = ['Authorization:Bearer ' . $invtk];
    //echo $invtk;
    $dt1 = json_decode(httpGet($url, $data, $headers), true);
    // echo dt1($dt1, $head, $mini_head);
}
if (isset($invoice3)) {
    $url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $invoice3;
    $data = [];
    if (isset($_SESSION['token'])) {
        $invtk = $_SESSION['token'];
    } else {
        $invtk = 'null';
    }
    $headers = ['Authorization:Bearer ' . $invtk];
    //echo $invtk;
    $dt12 = json_decode(httpGet($url, $data, $headers), true);

    //// echo dt1($dt1, $head, $mini_head);
    $url = 'https://nairobiservices.go.ke/api/authentication/bill/transaction/details';
    $data = ['invoice_no' => $invoice3];
    $headers = [];

    $dt11 = json_decode(httpPost($url, $data, $headers), true);
    //$dt2 = 'Query proceessed!';
    echo '<div class="row">
    <div class="col-md-6">' . dt1($dt11, $head, $mini_head) . '</div>
    <div class="col-md-6">' . dt1($dt12, $head, $mini_head) . '</div>
    </div>';
}

if (isset($invoice)) {
    $url = 'https://nairobiservices.go.ke/api/authentication/bill/transaction/details';
    $data = ['invoice_no' => $invoice];
    $headers = [];

    $dt1 = json_decode(httpPost($url, $data, $headers), true);
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($bypass)) {
    include './rejuv/conn.php';

    $stmt2 = $conn2->prepare("SELECT id, paybillBal FROM mpesaTransactions ORDER BY id DESC LIMIT 1");
    $stmt2->execute();
    $up = $stmt2->fetch();

    $newId = $up['id'] + 2;
    $newBal = $up['paybillBal'] + 500;
    $custname = splitName($bypass['custname']);
    $custcont = normalizePhoneNumber($bypass['custcont']);
    $timeFormats = getCurrentTimeFormats();

    $bypass['url'] = 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/affirm';

    //die(json_encode($url));

    //$url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
    $bty = explode('-', $bypass['invoice_no']);
    $bty[1] = strtoupper($bty[1]);
    $code = generateMpesaCode();
    $data = array(
        "apiKey" => "",
        "type" => "mpesa",
        "billNumber" => (string) $bypass['invoice_no'],
        "billAmount" => $bypass['amount'],
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
            "FirstName" => (string)str_replace("'",'',$custname['first']),
            "LastName" => (string)str_replace("'",'',$custname['last']),
            "MSISDN" => "",
            "MiddleName" => (string)str_replace("'",'',$custname['middle']),
            "OrgAccountBalance" => "0.00",
            "ThirdPartyTransID" => "5627760",
            "TransAmount" => $bypass['amount'],
            "TransID" => (string) $code,
            "TransTime" => (string)$timeFormats['withoutSeparators'],
            "TransactionType" => "Pay Bill"
        )
    );

    $data = json_encode($data);
    $sqldata = json_encode($data);
   

    $headers = [];

    //$dt0 = httpPost($url, $data, $headers);
    //$dt1 = json_decode($dt0, true);
    //unset($bypass['success']);
    //$dt1 = $bypass;

    $stmt2 = $conn2->prepare("insert into `mpesaTransactions` (`Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `id`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`) values (NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Success', NULL, " . $newId . ", '" . $timeFormats['withSeparators'] . "', '" . $custcont . "', '" . str_replace("'",'',$bypass['custname']) . "', " . $newBal . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 1, '" . $timeFormats['withoutSeparators'] . "', 'SUCCESS >>>>>>STK PUSH ENTRY-----Validated during stk push transaction')");
    $stmt2->execute();

    $billType = "";
    $dt0 = bypassCode($bypass, $billType, $code);
    $dt1 = json_decode($dt0, true);
    //$dt1 = $data;
    //echo $dt0;
     echo dt1($dt1, $head, $mini_head);
}

if (isset($number_plate)) {
    $url1 = 'https://nairobiservices.go.ke/api/external/parking/ntsa/vehicle/local/' . $number_plate;

    $dt3 = json_decode(httpGet($url1, []), true);

    if (isset($dt3['data'])) {
        $dt1 = $dt3;
        // $dt1 = httpPost($url, $data);
    } elseif (isset($dt3['error'])) {
        $dt1 = $dt3['error'];
    } else {
        $dt1 = json_encode($dt3);
    }
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($doc_no)) {
    if($stype == 'parcel'){
        $dsc = "parcel_number ILIKE '".$doc_no."' OR lr_number ILIKE ''";
    }elseif($stype == 'lr'){
        $dsc = "parcel_number ILIKE '' OR lr_number ILIKE '".$doc_no."'";
    }else{
        $dsc = "parcel_number ILIKE '' OR lr_number ILIKE ''";
    }
    $dsc = urlencode($dsc);

    function landSearch($dsc)
    {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://edev.nairobiservices.go.ke/api/maps/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=KNSDI%3Acp_cadastral_parcel&CQL_FILTER='.$dsc.'&outputFormat=application%2Fjson&propertyName=objectid%2Cfr_number%2Crim_name%2Clr_number%2Cparcel_number%2Csheet_number%2Cstated_area%2Carea_type%2Ccomments%2Cnull_comment%2Creg_block%2Cblock_name%2Cbound_type%2Cfeature_type%2Cdeed_plan_%2Ccounty%2Csub_county%2Csub_location%2Cdmp_number%2Coriginal_number%2Ctransaction%2Cold_parcel%2Cowner%2Ccurrent_status%2Cshape_leng%2Cshape_area%2Cdp_number%2Cgeom',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5NDMzNzUxLCJpYXQiOjE2OTkyNjA5NTEsImp0aSI6IjlhOWYxMjVkNjlhZDRiMGQ5MjQzMWM5MzhhYzM1YTE4IiwidXNlcl9pZCI6ImU2Y2EyYjFjLWY2ODktNDBmYy04OTMyLWE3NGVmMWU5Mzg4ZSJ9.0m0W3huDeYWlMuP7WNyBNCRZYKwdQiTQHR2in3U4nz0'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }
    $ls = landSearch($dsc);
    //echo $ls;
    $dt1 = json_decode($ls, true);
}

if (isset($token)) {
    if (isset($_SESSION['token'])) {
        $dt1 = ['user_token' => $_SESSION['token']];
    } else {
        $dt1 = ['user_token' => 'User Token Not Set!'];
    }
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($trp)) {
    unset($dt1);
    if (isset($_POST['trp'])) {
        if ($_POST['trp'] != '' && is_numeric($_POST['trp'])) {
            $cookie = [
                "Cookie: BIGipServeriTAX-Portal-POOL=772251658.37663.0000",
                "Cookie: JSESSIONID=6EB556398A73E8DF58441AAEDF2D475B",
                "Cookie: TS00000000076=08d3496641ab280010f1d3cfd0e63a9a9718796a48c14f1bdd47b833c85f64949836a4b98ea6632f5b0cf397f2587b63085b131d8f09d000b252230ea3fe49a0e6a3be8803a8e8de86ebc450193e93ca559d322ec092d9d85d11c497c7d68d5b183c681ec12f748da49b210d7275533f5a47f4b23a365a1e1337700144e424c9dc4588ae0ee77fc036aabc6a6c914a33c3a63d9267ad9a6a7acb299dfb687278393a2b92c8f7e1bbcacbc4b20ef44f20bcbde65bd57a31d28a1938c5fa9b51b34afad96a3f8fcde07d778998e0adff68955a116a136f8a184adb8919500f1efb12b2b7202990d51e824ac4bc6c1f8dfe4f56aa9eeebaf009102b47cc311b4a68c9bd826660433c3e",
                "Cookie: TS0158d659=01463256c11c81e978931b0d7f7b92c87b05c725d01ed45074f42a631f47e464876bef951eb7cf5483afed610ec068bdd462cd83d1aadb3b36a259ebee664763cb035b1df1dc81cee23aa4bcf1c5f904f59d34d2f5",
                "Cookie: TS01a37fed=01463256c13000676e6f0d03a055de795c22e96cd31d73bbe704b38e19ed645db2fdc27530b0b65351eb71edbb40e9befa5fc1286a1593ae553dade292ad3e24ca162623fa2e0c96871fe80d1b04dc8485b4a269df",
                "Cookie: TS4cb80a3b027=08d3496641ab20000cb37859106d288dd55c348221c6ef8bb5c84692955e650f05dc2e3c5aeb23bc08cfc119ac113000f4d45f486f7421d370e208851809c2d8b4b2c13b4b1afc311af83be8b43f57376bef172514db82db97a51887f9d8dded",
                "Cookie: TSPD_101_DID=08d3496641ab28008c1eaaa76d42fdc1d0120fcd24120d6d89ea49f97a4a4fc03f9001ffe808a840b303ae91d7425f7c080aaae0fe063800b30a5d372771da3427f81afe692e1201d2a8631003e2b7d544151e37fc13d2edaac314bef7c4100bdfa5789fe1af4461aff71b6448aef6a2",
            ];
            $dt2 = httpGet('https://itax.kra.go.ke/KRA-Portal/eReturnsView.htm?ACTION_TYPE=viewForm&trpId=' . $_POST['trp'] . '&obligationId=2', [], $cookie);
        } else {
            $dt2 = 'Request is empty or is not intergers!';
        }
    } else {
        $dt2 = 'Request incomplete!';
    }

    // echo dt1($dt1, $head, $mini_head);
}

if (isset($psv_list)) {
    $mini_head = 'VEHICLE';
    $url = 'https://nairobiservices.go.ke/api/parking/psv/vehicles';
    $data = [];
    $headers = [
        'Authorization: Bearer ' . $_SESSION['token'],
        'Cookie: token=' . $_SESSION['token']
    ];

    $dt1 = json_decode(httpGet($url, $data, $headers), true);
    $matatu_count = count($dt1['matatu_list']);
    $dt1['activated'] = $dt1['activated'] . ' and number of vehicle is ' . number_format($matatu_count, 0);


    if (isset($dt1['error'])) {
        if ($dt1['error'] == 'Cannot get bills at the moment') {
            // $url = 'https://nairobiservices.go.ke/api/parking/parking/transactions';
            // $dt1 = json_decode(httpGet($url, $data, $headers), true);
        }
    }
    // echo dt1($dt1, $head, $mini_head);
}


if (isset($psv_activation)) {
    $mini_head = 'REGISTER ENTRY';
    $url = 'https://nairobiservices.go.ke/api/parking/psv/activation/details';
    $data = [];
    $headers = [
        'Authorization: Bearer ' . $_SESSION['token'],
        'Cookie: token=' . $_SESSION['token']
    ];

    $dt1 = json_decode(httpGet($url, $data, $headers), true);


    if (isset($dt1['error'])) {
        if ($dt1['error'] == 'Cannot get bills at the moment') {
            // $url = 'https://nairobiservices.go.ke/api/parking/parking/transactions';
            // $dt1 = json_decode(httpGet($url, $data, $headers), true);
        }
    }
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($cpsb)) {
    $url = 'https://cpsb.nairobi.go.ke:8081/api/auth/user-details/' . $_POST['email'];
    $data = [];
    $headers = [
        //'Authorization: Bearer '.$_SESSION['token'],
        // 'Cookie: token='.$_SESSION['token']
    ];

    $dt1 = json_decode(httpGet($url, $data, $headers), true);
    //$dt1 = $_POST['email'];
    // echo dt1($dt1, $head, $mini_head);
}


//*
if (isset($dt1)) {
    if (is_array($dt1)) {
        if (isset($dt1['success']) || isset($dt1['customer_id']) || isset($dt1['user_token']) || isset($dt1['data']) || isset($dt1['email']) || isset($dt1['type'])) {
            if (isset($dt1['status'])) {
                if ($dt1['status'] == 'Unpaid') {
                    $head = $head . '<b style="color: white; background-color: red">UNPAID</b>';
                } elseif ($dt1['status'] == 'paid') {
                    $head = $head . ' <b style="color: white; background-color: green">PAID</b>';
                }
            }
            $oob = '';
            $oob .= '
            <br/><br/><br/><br/><br/><br/>
            <h1 class="fw-light text-uppercase display-4 text-center text-info">' . $head . '</h1>
        <table class="table table-striped-columns">
        <thead>
        <tr>
          <th scope="col">#3</th>
          <th scope="col">Info</th>
        </tr>
      </thead>
      <tbody>
        ';
            foreach ($dt1 as $id => $row) {
                if (!is_array($row)) {


                    $t1 = strtoupper(str_replace('_', ' ', $id));

                    if ($id == 'paid' && $row == true) {
                        $row = '<b style="color:white;padding:10px;background-color:green;border:none;border-radius:5px">PAID</b>';
                    } elseif ($id == 'paid' && $row != true) {
                        $row = '<b style="color:red;padding:10px;background-color:black;border:none;border-radius:5px">UNPAID</b>';
                    }

                    if ($id == 'user_token') {
                        $lng = ' class="text-break text-wrap"';
                    } else {
                        $lng = '';
                    }
                    if (isset($token)) {
                        $clickMsg = "'Token Copied'";
                        $attachBtn = '
                        <button class="tokenCopy btn btn-primary" onclick="alert(' . $clickMsg . ')" data-clipboard-text="' . $row . '"> Copy Token to clipboard </button>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.js" integrity="sha512-ePtegHW811NTnZd0Er1UxtBb8dizKEdSzANYy/UhxM40FC2yCWwb1CQrj03BPbrs6XdUkcHuyVn9Xq9q0Lm34g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                        <script>new ClipboardJS(".tokenCopy");</script>
                        ';
                    } else {
                        $tkcpy = "";
                    }
                    $oob .= '<tr><th scope="row">' . $t1 . ' </th><td ' . $lng . '> ' . $row . '</td></tr>';
                } else {

                    $oob .= '<tr>
                            <th scope="row">' . $id . ' </th>
                            <td>
                            <table class="table table-striped-columns">
                            <thead>
                              <tr>
                             <th scope="col">#4</th>
                            <th scope="col">Info</th>
                            </tr>
                           </thead>
                           <tbody>
                   ';
                    foreach ($row as $id2 => $row2) {
                        if (is_array($row2)) {
                            $oob .= '<tr style="font-weight:bold" class="table-primary"><th scope="row"></th><td>' . $mini_head . '</td></tr>';
                            foreach ($row2 as $id3 => $row3) {
                                if (!is_array($row3)) {
                                    if ($row3 == 'unpaid') {
                                        $row3 = '<b style="color:red;padding:10px;background-color:black;border:none;border-radius:5px">UNPAID</b>';
                                    } elseif ($row3 == 'paid') {
                                        $row3 = '<b style="color:white;padding:10px;background-color:green;border:none;border-radius:5px">PAID</b>';
                                    }
                                    $oob .= '
                                   <tr>
                                   <th scope="row">' . $id3 . ' </th>
                                   <td > ' . $row3 . '</td>
                                   </tr>';
                                } else {
                                    $oob .= '';
                                    foreach ($row3 as $id4 => $row4) {
                                        $oob .= '<tr style="border-top:solid 8px red">';
                                        if (is_array($row4)) {
                                            foreach ($row4 as $id5 => $row5) {
                                                if (is_array($row5)) {
                                                    foreach($row5 as $id6 => $row6){
                                                        if (is_array($row6)) {
                                                            foreach($row6 as $id7 => $row7){
                                                                if (is_array($row5)) {
                                                                    foreach ($row7 as $id8 => $row8) {
                                                                        if ($id8 == 0) {
                                                                            $row8 = '<b class="badge text-bg-success">' . $row8 . '</b>';
                                                                            $id8 = 'Latitude';
                                                                        }else{
                                                                            $row8 = '<b class="badge text-bg-info">' . $row8 . '</b>';
                                                                            $id8 = 'Longitude';
                                                                        }
                                                                        $oob .= '<tr>
                                                                        <td>
                                                                          <th>' . $id8. ' </th>
                                                                          <td> ' . $row8 . '</td>
                                                                        </td>
                                                                     </tr>';
                                                                    }
                                                                }else{
                                                                  
                                                                     $oob .= '<tr>
                                                                       <td>
                                                                         <th>' . $id7 . ' </th>
                                                                         <td> ' . $row7 . '</td>
                                                                       </td>
                                                                    </tr>';
                                                                } 
                                                            }
                                                        }else{
                                                             $oob .= '<tr>
                                                               <td>
                                                                 <th>' . $id6 . ' </th>
                                                                 <td> ' . $row6 . '</td>
                                                               </td>
                                                            </tr>';
                                                        } 
                                                    }
                                                }else{
                                                     $oob .= '<tr>
                                                       <td>
                                                         <th>' . $id5 . ' </th>
                                                         <td> ' . $row5 . '</td>
                                                       </td>
                                                    </tr>';
                                                }                                                

                                               
                                            }
                                        } else {
                                            $oob .= '<tr>
                                            <td>
                                              <th>' . $id4 . ' </th>
                                              <td> ' . $row4 . '</td>
                                            </td>
                                         </tr>';
                                        }

                                        $oob .= '</tr>';
                                    }
                                    $oob .= '';
                                }
                            }
                        } else {
                            $oob .= '<tr>
                            <td>
                              <th>' . $id2 . ' </th>
                              <td> ' . $row2 . '</td>
                            </td>
                         </tr>';
                        }
                    }
                    $oob .= '</tbody></table>
                </td>
                </tr>';
                }
            }
            $oob .= ' </tbody></table>';
            if (isset($attachBtn)) {
                echo $oob . $attachBtn;
            } else {
                echo $oob;
            }
        } else {
            if (isset($dt1['error'])) {
                $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Error: ' . $dt1['error'] . '</b>';
            } else {
                $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">' . json_encode($dt1) . '</b>';
            }
            echo $object_1;
        }
    } else {
        $object_1 = '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">' . $dt1 . '</b>';
        echo $object_1;
    }
}
//*/

function dt1($dt1, $head, $mini_head)
{
    if (is_array($dt1)) {
        if (isset($dt1['success']) || isset($dt1['customer_id']) || isset($dt1['user_token']) || isset($dt1['data']) || isset($dt1['email']) || isset($dt1['code'])) {
            if (isset($dt1['status'])) {
                if ($dt1['status'] == 'Unpaid') {
                    $head = $head . '<b style="color: white; background-color: red">UNPAID</b>';
                } elseif ($dt1['status'] == 'paid') {
                    $head = $head . ' <b style="color: white; background-color: green">PAID</b>';
                }
            }
            $oob = '';
            $oob .= '
            <br/><br/><br/><br/><br/><br/>
            <h1 class="fw-light text-uppercase display-4 text-center text-info">' . $head . '</h1>
        <table class="table table-striped-columns">
        <thead>
        <tr>
          <th scope="col">#3</th>
          <th scope="col">Info</th>
        </tr>
      </thead>
      <tbody>
        ';
            foreach ($dt1 as $id => $row) {
                if (!is_array($row)) {


                    $t1 = strtoupper(str_replace('_', ' ', $id));

                    if ($id == 'paid' && $row == true) {
                        $row = '<b style="color:white;padding:10px;background-color:green;border:none;border-radius:5px">PAID</b>';
                    } elseif ($id == 'paid' && $row != true) {
                        $row = '<b style="color:red;padding:10px;background-color:black;border:none;border-radius:5px">UNPAID</b>';
                    }

                    if ($id == 'user_token') {
                        $lng = ' class="text-break text-wrap"';
                    } else {
                        $lng = '';
                    }
                    if (isset($token)) {
                        $clickMsg = "'Token Copied'";
                        $attachBtn = '
                        <button class="tokenCopy btn btn-primary" onclick="alert(' . $clickMsg . ')" data-clipboard-text="' . $row . '"> Copy Token to clipboard </button>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.js" integrity="sha512-ePtegHW811NTnZd0Er1UxtBb8dizKEdSzANYy/UhxM40FC2yCWwb1CQrj03BPbrs6XdUkcHuyVn9Xq9q0Lm34g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                        <script>new ClipboardJS(".tokenCopy");</script>
                        ';
                    } else {
                        $tkcpy = "";
                    }
                    $oob .= '<tr><th scope="row">' . $t1 . ' </th><td ' . $lng . '> ' . $row . '</td></tr>';
                } else {

                    $oob .= '<tr>
                            <th scope="row">' . $id . ' </th>
                            <td>
                            <table class="table table-striped-columns">
                            <thead>
                              <tr>
                             <th scope="col">#4</th>
                            <th scope="col">Info</th>
                            </tr>
                           </thead>
                           <tbody>
                   ';
                    foreach ($row as $id2 => $row2) {
                        if (is_array($row2)) {
                            $oob .= '<tr style="font-weight:bold" class="table-primary"><th scope="row"></th><td>' . $mini_head . '</td></tr>';
                            foreach ($row2 as $id3 => $row3) {
                                if (!is_array($row3)) {
                                    if ($row3 == 'unpaid') {
                                        $row3 = '<b style="color:red;padding:10px;background-color:black;border:none;border-radius:5px">UNPAID</b>';
                                    } elseif ($row3 == 'paid') {
                                        $row3 = '<b style="color:white;padding:10px;background-color:green;border:none;border-radius:5px">PAID</b>';
                                    }
                                    $oob .= '
                                   <tr>
                                   <th scope="row">' . $id3 . ' </th>
                                   <td > ' . $row3 . '</td>
                                   </tr>';
                                } else {
                                    $oob .= '';
                                    foreach ($row3 as $id4 => $row4) {
                                        $oob .= '<tr style="border-top:solid 8px red">';
                                        if (is_array($row4)) {
                                            foreach ($row4 as $id5 => $row5) {

                                                $oob .= '<tr>
                                                       <td>
                                                         <th>' . $id5 . ' </th>
                                                         <td> ' . $row5 . '</td>
                                                       </td>
                                                    </tr>';
                                            }
                                        } else {
                                            $oob .= '<tr>
                                            <td>
                                              <th>' . $id4 . ' </th>
                                              <td> ' . $row4 . '</td>
                                            </td>
                                         </tr>';
                                        }

                                        $oob .= '</tr>';
                                    }
                                    $oob .= '';
                                }
                            }
                        } else {
                            $oob .= '<tr>
                            <td>
                              <th>' . $id2 . ' </th>
                              <td> ' . $row2 . '</td>
                            </td>
                         </tr>';
                        }
                    }
                    $oob .= '</tbody></table>
                </td>
                </tr>';
                }
            }
            $oob .= ' </tbody></table>';
            if (isset($attachBtn)) {
                return $oob . $attachBtn;
            } else {
                return $oob;
            }
        } else {
            if (isset($dt1['error'])) {
                $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Error: ' . $dt1['error'] . '</b>';
            } else {
                $object_1 =  '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">' . json_encode($dt1) . '</b>';
            }
            return $object_1;
        }
    } else {
        $object_1 = '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">' . $dt1 . '</b>';
        return $object_1;
    }
}




if (isset($dt2)) {
    echo $dt2;
}
