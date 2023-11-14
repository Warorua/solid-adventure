<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core.php';
class Database
{


    private $server = "mysql:host=srv1140.hstgr.io;dbname=u854855859_kever";
    private $username = "u854855859_kever";
    private $password = "J2aI6:rxXl&+";
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

//$dbFile = 'nationPersons.db';
$start = date('Y-m-d H:i:s');
//*


$pdo = new Database();

$conn = $pdo->open();

$dt1 = 'No Processing done!';

$type = $_POST['type'];

$dt1 =  json_encode($_POST);

$mini_head = 'HEAD';
if ($type == 'invoice2') {

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
} elseif ($type == 'authenticate') {

    if (isset($_POST['invoice_number'])) {
        if ($_POST['invoice_number'] != '') {
            $authenticate = $_POST['invoice_number'];
            $head = 'invoice details(master & regular)';
        } else {
            $dt1 = 'Please add an invoice number to proceed!!';
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed!';
    }
} elseif ($type == 'monitor') {
    if (isset($_POST['invoice_number'])) {
        if ($_POST['invoice_number'] != '') {
            $monitor = $_POST['invoice_number'];
            $record = $_POST['record'];
            $head = 'invoice details(master & regular)';
        } else {
            $dt1 = 'Please add an invoice number to proceed!!';
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed!';
    }
} elseif ($type == 'bypassQuery') {
    $record = $_POST['record'];
    $purpose = $_POST['purpose'];
    if ($purpose == 'prod') {
        $byPur = 'visually-hidden';
    } else {
        $byPur = '';
    }
    if ($record == 'all') {
        $qtail = 'ORDER BY track';
    } else {
        $qtail = 'WHERE master_status="' . $record . '"';
    }
    $stmt = $conn->prepare('SELECT COUNT(*) AS numrows FROM bypass ' . $qtail);
    $stmt->execute();
    $dtCount = $stmt->fetch();
    $queryRes = '';
    $queryRes .= '<h2>Total count: <span class="badge bg-primary">' . $dtCount['numrows'] . '</span></h2>';

    $stmt = $conn->prepare('SELECT * FROM bypass ' . $qtail);
    $stmt->execute();
    $byRes = $stmt->fetchAll();
    $hesabu = 0;
    $queryRes .= '
        <table class="table">
     <thead>
     <tr>
      <th scope="col">#</th>
      <th scope="col">Invoice Number</th>
      <th scope="col">Amount</th>
      <th scope="col" class="' . $byPur . '">Master Status</th>
      <th scope="col" class="' . $byPur . '">Regular Status</th>
      <th scope="col" class="' . $byPur . '">Note</th>
      <th scope="col" class="' . $byPur . '">Tracking</th>
      <th scope="col" class="' . $byPur . '">Action</th>
      </tr>
     </thead>
      <tbody>
        ';
    foreach ($byRes as $row) {
        if ($row['amount'] != 'NanN') {
            $blAm = intval($row['amount']);
            $hesabu = $hesabu + $blAm;
        } else {
            $blAm = '<div class="badge text-bg-danger">' . $row['amount'] . '</div>';
        }

        if ($row['master_status'] == 'paid') {
            $byMs = '<div class="badge text-bg-success">PAID</div>';
        } elseif ($row['master_status'] == 'Unpaid') {
            $byMs = '<div class="badge text-bg-warning">UNPAID</div>';
        } else {
            $byMs = '<div class="badge text-bg-danger">ERR</div>';
        }

        if ($row['regular_status'] == 'true') {
            $byRg = '<div class="badge text-bg-info">PAID</div>';
        } elseif ($row['regular_status'] == 'false') {
            $byRg = '<div class="badge text-bg-secondary">INITIATED</div>';
        } else {
            $byRg = '<div class="badge text-bg-dark">UNTOUCHED</div>';
        }

        if ($row['track'] == '') {
            if ($row['master_status'] == 'paid') {
                $trSt = '<div class="badge text-bg-secondary" id="stTrack' . $row['id'] . '">UNTRACKED</div>';
                $trBtn = '';
                $trBtnTxt = 'TRACK';
            } else {
                $trSt = '<div class="badge text-bg-secondary" id="stTrack' . $row['id'] . '">UNTRACKED</div>';
                $trBtn = 'disabled';
                $trBtnTxt = 'TRACK';
            }
        } else {
            $trSt = '<div class="badge text-bg-primary"  id="stTrack' . $row['id'] . '">TRACKED</div>';
            $trBtn = 'disabled';
             $trBtnTxt = 'TRACKED';
        }
        $trckFn = "invTrack('" . $row['id'] . "')";

        $queryRes .= '
        <tr>
          <th scope="row">' . $row['id'] . '</th>
          <td>' . $row['invoice_no'] . '</td>
          <td>' . $row['amount'] . '</td>
          <td class="' . $byPur . '">' . $byMs . '</td>
          <td class="' . $byPur . '">' . $byRg . '</td>
          <td class="' . $byPur . '">' . $row['note'] . '</td>
          <td class="' . $byPur . '">' . $trSt . '</td>
          <td class="' . $byPur . '"><button type="button" class="btn btn-info"  id="trackButton' . $row['id'] . '" onclick="' . $trckFn . '" ' . $trBtn . '>'.$trBtnTxt.'</button></td>
        </tr>
            ';
    }
    $queryRes .= '
      </tbody>
     </table>
        ';
    $totalQ = $hesabu / 2;
    $deal20 = $totalQ * 0.2;
    $batch = $totalQ - $deal20;
    //echo '<h2>Total records: <span class="badge bg-primary">'.$dtCount['numrows'].'</span></h2>';
    echo $queryRes;
    echo '
        <div class="list-group mb-6">
       <a class="list-group-item list-group-item-action active" aria-current="true">
       Batch:
      </a>
      <a class="list-group-item list-group-item-action">Processed: ' . number_format($hesabu, 1) . '</a>
      <a class="list-group-item list-group-item-action">Total: ' . number_format($totalQ, 1) . '</a>
      <a class="list-group-item list-group-item-action">20%: ' . number_format($deal20, 1) . '</a>
      <a class="list-group-item list-group-item-action">Batch: ' . number_format($batch, 1) . '</a>
     </div>
        ';
} elseif ($type == 'bypass') {
    if (isset($_POST['amount']) && isset($_POST['invoice_no'])) {
        if ($_POST['amount'] != '' && $_POST['invoice_no'] != '') {
            $amount = $_POST['amount'] . '.0';
            $invoice_no = str_replace(array(' ', "\n", "\r", "\r\n"), '', $_POST['invoice_no']);
            $bypass = ['amount' => $amount, 'invoice_no' => $invoice_no, 'success' => true, 'route' => $_POST['route'], 'record' => $_POST['record']];
            $dt1 = '200';
            $head = 'bypass details(master)';
            //echo json_encode($bypass);
        } else {
            $dt1 = 'Please add an invoice number to proceed! 1';
            //echo json_encode($_POST);
        }
    } else {
        $dt1 = 'Please add an invoice number to proceed! 2';
        //echo json_encode($_POST);
    }
    //die();
} elseif ($type == 'track') {
    $id = $_POST['id'];
    $stmt = $conn->prepare('SELECT * FROM bypass WHERE id=:id');
    $stmt->execute(['id' => $id]);
    $trckDt = $stmt->fetch();
    if (isset($trckDt['invoice_no'])) {
        $stmt = $conn->prepare('UPDATE bypass SET track=:track WHERE id=:id');
        $stmt->execute(['id' => $id, 'track' => 'tracked']);
    }
    echo json_encode($trckDt);
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

if (isset($authenticate)) {
    $url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $authenticate;
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
    $data = ['invoice_no' => $authenticate];
    $headers = [];

    $dt11 = json_decode(httpPost($url, $data, $headers), true);
    //$dt2 = 'Query proceessed!';
    $htmlData = '<div class="row">
    <div class="col-md-6">' . dt1($dt11, $head, $mini_head) . '</div>
    <div class="col-md-6">' . dt1($dt12, $head, $mini_head) . '</div>
    </div>';
    $output = [];
    $output['htmlData'] = $htmlData;
    $output['masterDb'] = $dt12;
    $output['regularDb'] = $dt11;

    echo json_encode($output);
}

if (isset($monitor)) {
    $url = 'https://nairobiservices.go.ke/api/sbp/applications/get_invoice_details?invoice_no=' . $monitor;
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
    $data = ['invoice_no' => $monitor];
    $headers = [];

    $dt11 = json_decode(httpPost($url, $data, $headers), true);
    $output = [];
    if ($record == 'yes') {
        if (isset($dt11['amount'])) {
            $billAm = $dt11['amount'];
        } elseif (isset($dt12['amount'])) {
            $billAm = $dt12['amount'];
        } else {
            $billAm = 'NaN';
        }

        if (isset($dt12['status'])) {
            $masterSt = $dt12['status'];
        } else {
            $masterSt = 'NaN';
        }

        if (isset($dt11['paid'])) {
            if ($dt11['paid']) {
                $regSt = 'true';
            } else {
                $regSt = 'false';
            }
        } else {
            $regSt = 'NaN';
        }
        $dataToInsert = array(
            "invoice_no" => $monitor,
            "amount" => $billAm,
            "master_status" => $masterSt,
            "regular_status" => $regSt,
            // Add more columns and values as needed
        );
        $stmt = $conn->prepare('SELECT COUNT(*) AS numrows FROM bypass WHERE invoice_no=:invoice_no');
        $stmt->execute(['invoice_no' => $monitor]);
        $dtCount = $stmt->fetch();
        if ($dtCount['numrows'] < 1) {

            // Call the insert method
            $stmt = $conn->prepare('INSERT INTO bypass (invoice_no, amount, master_status, regular_status) VALUES (:invoice_no, :amount, :master_status, :regular_status)');
            $stmt->execute($dataToInsert);
            $output['insert_status'] = "Data inserted successfully recorded.";
        } else {
            $stmt = $conn->prepare('UPDATE bypass SET invoice_no=:invoice_no, amount=:amount, master_status=:master_status, regular_status=:regular_status WHERE invoice_no="' . $monitor . '"');
            $stmt->execute($dataToInsert);
            $output['insert_status'] = "Recorded Existed thus UPDATED!";
        }
    } else {
        $output['insert_status'] = "Data insertion disabled!";
    }

    //$dt2 = 'Query proceessed!';
    $htmlData = '<div class="row">
    <div class="col-md-6">' . dt1($dt11, $head, $mini_head) . '</div>
    <div class="col-md-6">' . dt1($dt12, $head, $mini_head) . '</div>
    </div>';

    $output['htmlData'] = $htmlData;
    $output['masterDb'] = $dt12;
    $output['regularDb'] = $dt11;

    echo json_encode($output);
}

if (isset($invoice)) {
    $url = 'https://nairobiservices.go.ke/api/authentication/bill/transaction/details';
    $data = ['invoice_no' => $invoice];
    $headers = [];

    $dt1 = json_decode(httpPost($url, $data, $headers), true);
    // echo dt1($dt1, $head, $mini_head);
}

if (isset($bypass)) {
    if ($bypass['route'] == 'normal') {
        $url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
    } elseif ($bypass['route'] == 'taifa') {
        $url = 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/confirm';
    } else {
        $url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
    }
    //$url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
    $bty = explode('-', $bypass['invoice_no']);
    $bty[1] = strtoupper($bty[1]);
    if ($bty[1] == 'SBP') {
        $billType = 'SBPPermitFee';
    } elseif ($bty[1] == 'FIC') {
        $billType = 'EssServices';
    } elseif ($bty[1] == 'FHL') {
        $billType = 'FdHygene';
    } elseif ($bty[1] == 'LR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'ADF') {
        $billType = 'AdvertPermitFee';
    } elseif ($bty[1] == 'HR') {
        $billType = 'HouseRent';
    } elseif ($bty[1] == 'GTC') {
        $billType = 'TenancyApp';
    } elseif ($bty[1] == 'FH') {
        $billType = 'FoodHandling';
    } elseif ($bty[1] == 'SE') {
        $billType = 'ParkingFee';
    } elseif ($bty[1] == 'HC') {
        $billType = 'HealthCert';
    } elseif ($bty[1] == 'GRR') {
        $billType = 'RenovationRepair';
    } elseif ($bty[1] == 'SBPC') {
        $billType = 'UnderCharge';
    } elseif ($bty[1] == 'LL') {
        $billType = 'LiquorLicence';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GGRT') {
        $billType = 'GroundRent';
    } elseif ($bty[1] == 'GLV') {
        $billType = 'LValua';
    } elseif ($bty[1] == 'PS') {
        $billType = 'PSVSticker';
    } elseif ($bty[1] == 'GESS') {
        $billType = 'EssServices';
    } elseif ($bty[1] == 'GINS') {
        $billType = 'Instinspect';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } elseif ($bty[1] == 'GLR') {
        $billType = 'LandRate';
    } else {
        $billType = '';
    }
    $code = generateMpesaCode();
    $data = array(
        "mpesadetails" => array(
            "FirstName" => (string) "John",
            "BillRefNumber" => (string) $bypass['invoice_no'],
            "TransAmount" => (string) $bypass['amount'],
            "BillType" => (string) $billType,
            "TransChannel" => (string) "mpesa",
            "TransID" => (string) $code
        )
    );

    $data = json_encode($data);

    $headers = [];

    //$dt0 = httpPost($url, $data, $headers);
    //$dt1 = json_decode($dt0, true);
    $dt0 = bypassCode($bypass, $billType, $code);
    $dt1 = json_decode($dt0, true);

    //$dt1 = [];

    if (is_array($dt1)) {
        if (isset($dt1['success'])) {
            if ($dt1['success']) {
                if ($bypass['record'] == 'yes') {
                    $dataToInsert = array(
                        "invoice_no" => $bypass['invoice_no'],
                        "amount" => $bypass['amount']
                        // Add more columns and values as needed
                    );
                    $tableName = 'bypass';
                    // Call the insert method
                    $stmt = $conn->prepare('INSERT INTO bypass (invoice_no, amount) VALUES (:invoice_no, :amount)');
                    $stmt->execute($dataToInsert);
                    $dt1['insert_status'] = "Data inserted successfully recorded.";
                } else {
                    $dt1['insert_status'] = "Data insertion disabled!";
                }
            }
        }
    }
    //J2aI6:rxXl&+
    if (!isset($dt1['insert_status'])) {
        $dt1['insert_status'] = "Data not recorded!";
    }

    $dt1['code'] = $code;
    $dt1['amount'] = $bypass['amount'];
    $dt1['route'] = $bypass['route'];


    //$dt1 = $data;
    //echo $dt0;
    $htmlData = dt1($dt1, $head, $mini_head);
    $output = [];
    $output['htmlData'] = $htmlData;
    $output['result'] = $dt1;
    //$output['regularDb'] = $dt11;



    echo json_encode($output);
}


/*
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
    // echo $dt2;
}
