<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

//$idno = '1075921';
//$type = 'd';
$idno = $_POST['idno'];
$type = $_POST['type'];
if (isset($_POST['fname'])) {
    if ($_POST['fname'] != '') {
        $fname = $_POST['fname'];
    } else {
        if ($type == 'resident') {
            echo '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">First Name needed to process Alien ID</b>';
            die;
        }
    }
}

$object = '';
if ($idno != '') {
    if (!isset($fname)) {
        // $dt1 = httpPost('https://nairobiservices.go.ke/api/authentication/auth/individual/kra/detail', ['id_number' => $idno]);
        $dt1 = idNumberSearch($idno);
        $obj = json_decode($dt1, true);
    } else {
        $obj = [];
    }


    if (is_array($obj)) {

        if (isset($obj['error'])) {
            if ($obj["error"] == "Kindly try again later" || $obj["error"] == "null") {
                $object .= 'Could not process ID at the moment. Error: ' . $obj['error'];
            } elseif ($obj["error"] == 'Record with id number ' . $idno . ' not found') {
                $object .= '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">ID Number not found</b>';
            } else {
                $object .= '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">' . $obj['error'] . '</b>';
            }
        } else {
            if (!isset($obj['identityId'])) {
                if (!isset($fname)) {
                    //$object .= $obj['data']['name'];
                    $object_1 = [];
                    $object_1['fullname'] = $fullname = $fullname = $obj['name'];

                    $object_1['firstname'] = $firstname = substr($fullname, 0, strpos($fullname, " "));
                    $object .= $firstname;
                } else {
                    $object_1['firstname'] = $firstname = $fname;
                    $object .= $firstname;
                }
            } else {
                $object_1 = [];
                $object_1['fullname'] = $fullname = $fullname = $obj['firstName'] . ' ' . $obj['middleName'] . ' ' . $obj['lastName'];

                $object_1['firstname'] = $firstname = $obj['firstName'];
                $object .= $firstname;

                foreach ($obj as $id => $key) {
                    $object_1[$id] = $key;
                }
            }

            $obj22 = idSearchPesaflow($idno, $firstname);
            //echo $obj22;

            $obj_2 = json_decode($obj22, true);


            if (isset($obj_2['customer_data'])) {
                foreach ($obj_2['customer_data'] as $id => $key) {
                    $object_1[$id] = $key;
                }
            }



            $fields = [
                //'_csrf_token' => authCookie(),

                'first_name' => $firstname,
                'id_number' => $idno,
                'id_type' => $type,

                // 'first_name'=>'jackson',
                //  'id_number'=>682640,
                //'id_type'=>'resident',
            ];

            $url = 'https://accounts.ecitizen.go.ke/lookup';

            //httpPost($url, $fields);
            //$dt2 = citizen_a($url, $fields);
            //$obj_2 = json_decode($dt2, true);

            if ($type == 'resident') {
                if (isset($obj_2['errors'])) {
                    foreach ($obj_2['errors'] as $id => $rsed) {
                        $object_1[$id . '_ERROR'] = $rsed;
                    }
                } else {
                    foreach ($obj_2 as $id => $rsed) {
                        $object_1[$id] = $rsed;
                    }
                }
            } else {
                $dob = $object_1['dob'];
                $object_1['year_ob'] = date("Y", strtotime($dob));
                if (isset($obj_2['serial_no'])) {
                    $object_1['serial_no'] = $obj_2['serial_no'];
                }

                /*
                //OLD PIN Fetching
                $gt1 = json_decode(httpPost('https://nairobiservices.go.ke/api/authentication/auth/user_info', ['id_number' => $idno]), true);
                if (isset($gt1['data']['pin_no'])) {
                    $brs_pin = $gt1['data']['pin_no'];
                } else {
                    //$dt3 = ctGet($idno, $firstname);
                    //$obj_3 = json_decode($dt3, TRUE);



                    //$brs_pin = 'A013405880X';
                    /////
                    $ddt1 = KraNrsFetch($idno);
                    if ($ddt1['status'] && $ddt1['kra'] != 'null') {
                        $brs_pin = $ddt1['kra'];
                    } else {
                        $obj_3 = innerFetch($idno);
                        /////
                        if (isset($obj_3['profile']['kra_pin'])) {
                            $brs_pin = $obj_3['profile']['kra_pin'];
                        } elseif (isset($obj_3['result']['data']['pin'])) {
                            $brs_pin = $obj_3['result']['data']['pin'];
                        } else {
                            $object_1['kra'] = 'KRA Not retrieved. Result:';
                            if (isset($gt1['data'])) {
                                foreach ($gt1['data'] as $gtid => $gt1r) {
                                    $object_1[$gtid] = $gt1r;
                                }
                            }
                        }
                    }
                }
                //*/

                //*
                $gt1 = json_decode(httpGet('https://nairobiservices.go.ke/api/iprs/user/kra/id/'.$idno,[]), true);
                if(is_array($gt1)){
                    if(isset($gt1['error'])){
                        $object_1['kra'] = 'KRA Not retrieved. Result: '.$gt1['error'];
                    }elseif(isset($gt1['type'])){
                        foreach ($gt1 as $gtid => $gt1r) {
                            $object_1[$gtid] = $gt1r;
                        }
                        if(isset($gt1['pin_no'])){
                            $brs_pin = $gt1['pin_no'];
                        }elseif(isset($gt1['tax_payer_id'])){
                            $fri = getPin($gt1['tax_payer_id']);
                            $brs_pin = $fri[$gt1['tax_payer_id']];
                            //echo json_encode(getPin($gt1['tax_payer_id']));
                        }else{
                            $object_1['kra'] = 'KRA PIN Not available for Identity Provided!';
                        }
                        
                    }else{
                        $object_1['kra'] = 'KRA Fetching error. Result: '.json_encode($gt1);
                    }
                }else{
                    $object_1['kra'] = 'KRA Fetching error. Result: '.json_encode($gt1);
                }
//*/



                if (isset($brs_pin)) {
                    $doc_active = TRUE;
                    $kra = $object_1['kra'] = $brs_pin;
                    if ($kra != '' && strlen($kra) > 4) {
                        $url = 'https://itax.kra.go.ke/KRA-Portal/eTreAmendment.htm?actionCode=loadViewProfile&taxPayerPin=' . $kra;

                        $fields = array(
                            'applicantType' => 'taxpayer',
                            'cmbTaxpayerType' => 'INDI',
                            'fieldsToSkip' => 'representativeName,taxPayerName',
                            'representativeName' => '',
                            'representativePin' => '',
                            //'taxPayerName' => $fullname,
                            'taxPayerPin' => $kra,
                            'viewProfileFlag' => 'Y',
                        );


                        $dt3 = httpPost($url, $fields);
                        //   $data = $dt3;
                        $object_101 = scrape_2($dt3);
                        if (is_array($object_101)) {
                            foreach ($object_101 as $id => $object_102) {
                                $object_1[$id] = $object_102;
                            }
                        }
                        //$object_1 = $dt3;
                        //$object .= 'KRA = ' . $dt2['profile']['kra_pin'] . '<br/>';
                    }
                }
                //*
                //$dt4 = httpPost('https://verify.iebc.or.ke/index.php/webapi/submit_voter', array('idno' => $idno, 'yob' => $object_1['year_ob']));
                //$obj_4 = scrape($dt4);
                $obj_4 = 'NotFound';

                if ($obj_4 == 'NotFound') {
                    $object .= " <b style='color:red'>DID NOT VOTE</b> <br>";
                } else {
                    $object .= " <b style='color:green'>VOTED</b> <br>";
                    foreach ($obj_4 as $id => $row) {
                        $object_1[$id]  = $row;
                    }
                }
                //*/
            }


            if ($type != 'resident') {
                $dt5 = httpPost('https://nairobiservices.go.ke/api/authentication/auth/user_info', ['id_number' => $idno]);
                $obj_5 = json_decode($dt5, true);
                if (isset($obj_5['data'])) {
                    foreach ($obj_5['data'] as $id => $obj5) {
                        $object_1[$id . '_B'] = $obj5;
                    }
                    if (isset($obj_5['data']['RESULT'])) {
                        foreach ($obj_5['data']['RESULT'] as $id => $obj5) {
                            $object_1[$id . '_B'] = $obj5;
                        }
                    }
                }

                //*
                if (isset($object_1['serial_no'])) {
                    if ($object_1['serial_no'] != '') {
                        $dt6 = httpGet('https://tims.ntsa.go.ke/rbac/user/getIsIDRegistered.htm?idNo=' . $object_1['serial_no'], ['id_number' => $object_1['serial_no']]);
                        $obj_6 = json_decode($dt6, true);
                        if (isset($obj_6['userInfo'])) {
                            foreach ($obj_6['userInfo'] as $id => $obj6) {
                                if ($id != 'DATE_OF_ISSUE') {
                                    $object_1[$id . '_C'] = $obj6;
                                } else {
                                    $object_1['ID_DATE_OF_ISSUE'] = date('d-M-Y h:i:s', $obj6['time'] / 1000);
                                }
                            }
                        }
                    }
                }
                //*/

                if (!isset($brs_pin)) {
                    $year = date("Y", strtotime($dob));
                    $month = date("m", strtotime($dob));
                    $day = date("d", strtotime($dob));

                    $obj2 = kra($idno, $day, $month, $year);

                    if (is_array($obj2)) {
                        //  $f_names = preg_replace('/\s*/m', '', $obj2['firstName']);
                        foreach ($obj2 as $id => $row) {
                            if ($row != null) {
                                $pattern = '/\s*/m';
                                $replace = '';
                                //$row = preg_replace($pattern, $replace, $row);
                            }


                            if ($id == 'isAlreadyRegistered' && $row == 1) {
                                $object_1['KRA_STATUS'] = "<b style='color:green'>" . $firstname . " HAS A KRA PIN</b>";
                            } elseif ($id == 'isAlreadyRegistered' && $row != 1) {
                                $object_1['KRA_STATUS'] = "<b style='color:red'>" . $firstname . " HAS NO KRA PIN</b>";
                            }
                            if ($id == 'issuePlace') {
                                $object_1['ID_ISSUE_PLACE'] = $row;
                            }
                            if ($id == 'birthDistrict') {
                                $object_1['BIRTH_DISTRICT'] = $row;
                            }
                            $object_1['KRA_STATUS_OWNER'] = $obj2['firstName'] . ' ' . $obj2['lastName'];
                        }
                    } else {
                        $object_1['NO_KRA_ERROR'] = $obj2;
                    }
                }
            }

            /*
            if (isset($idno)) {
                $dldt =  DLFetch($idno);
                $dldt_1 = json_decode($dldt, true);
                if (is_array($dldt_1)) {
                    if (isset($dldt_1['result']['data'])) {
                        $object_1['title_ntsa']  = badge('h2', 'NTSA DATA', 'success');
                        foreach ($dldt_1['result']['data'] as $id => $row) {
                            $object_1[$id . '_ntsa']  = $row;
                        }
                    }
                }
            }
            //*/

            //*
            if (isset($idno)) {
                $nhif_dt = json_decode(FetchNHIFData($idno), true);
                if (is_array($nhif_dt)) {
                    if (isset($nhif_dt['status_code'])) {
                        if ($nhif_dt['status_code'] == '1000') {
                            $object_1['title_nhif']  = badge('h2', 'NHIF DATA', 'primary');
                            foreach ($nhif_dt['data'] as $id => $row) {
                                $object_1[$id . '_nhif']  = $row;
                            }
                        } elseif ($nhif_dt['status_code'] == '1002') {
                            $object_1['nhif_status']  = '<div class="font-monospace text-primary">' . $firstname . ' IS NOT REGISTERED FOR NHIF!</div>';
                        }
                    }
                }
            }
            //*/

        }
    } else {
        $object .= $dt1;
    }
} else {
    $object .= 'id no needed';
}
if (isset($object_1)) {
    if (is_array($object_1)) {
        $oob = '';
        $oob .= '
    <table class="table table-striped-columns">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Info</th>
    </tr>
  </thead>
  <tbody>
    ';
        $cert_data = '';
        foreach ($object_1 as $id => $row) {
            if ($row != '') {
                //if (1 ==1) {
                if (endsWith($id, 'ntsa')) {
                    if ($id == 'title_ntsa') {
                        $oob .= '<tr><td class="text-center font-monospace">' . $row . '</td></tr>';
                    } else {
                        $t1 = strtoupper(str_replace('_', ' ', $id));
                        $oob .= '<tr><th scope="row" style="color:green" class="font-monospace">' . $t1 . ' </th><td> ' . $row . '</td></tr>';
                    }
                }
                //*
                elseif (endsWith($id, 'nhif')) {
                    if ($id == 'title_nhif') {
                        $oob .= '<tr><td class="text-center font-monospace">' . $row . '</td></tr>';
                    } else {
                        $t1 = strtoupper(str_replace('_', ' ', $id));
                        $oob .= '<tr><th scope="row" style="color:blue" class="font-monospace">' . $t1 . ' </th><td> ' . $row . '</td></tr>';
                    }
                }
                //*/
                else {
                    $t1 = strtoupper(str_replace('_', ' ', $id));
                    $oob .= '<tr><th scope="row">' . $t1 . ' </th><td> ' . $row . '</td></tr>';
                }
            }

            if (1 == 1) {
                $t1 = strtoupper(str_replace('_', ' ', $id));
                if ($t1 == 'KRA') {
                    $cert_data .= 'pin=' . $row . '&';
                }
                if ($t1 == 'TAX REG DATE') {
                    $cert_data .= 'regi_date=' . $row . '&';
                }
                if ($t1 == 'FULLNAME') {
                    $cert_data .= 'name=' . $row . '&';
                }
                if ($t1 == 'MAIN EMAIL 1') {
                    $cert_data .= 'email=' . $row . '&';
                }
                if ($t1 == 'BUILDING 1') {
                    $cert_data .= 'building=' . $row . '&';
                }
                if ($t1 == 'STREET ROAD 1') {
                    $cert_data .= 'road=' . $row . '&';
                }
                if ($t1 == 'CITY TOWN 1') {
                    $cert_data .= 'town=' . $row . '&';
                }
                if ($t1 == 'COUNTY 1') {
                    $cert_data .= 'county=' . $row . '&';
                }
                if ($t1 == 'DISTRICT 1') {
                    $cert_data .= 'district=' . $row . '&';
                }
                if ($t1 == 'AREA LOCALITY 1') {
                    $cert_data .= 'locality=' . $row . '&';
                }
                if ($t1 == 'POSTAL TOWN') {
                    $cert_data .= 'postal_town=' . $row . '&';
                }
                if ($t1 == 'PO BOX 1') {
                    $cert_data .= 'box=' . $row . '&';
                }
                if ($t1 == 'POSTAL CODE 1') {
                    $cert_data .= 'postal_code=' . $row . '&';
                }
                if ($t1 == 'TAX OBLIGATION') {
                    $cert_data .= 'obligation=' . $row . '&';
                }
                if ($t1 == 'LR NO 1') {
                    $cert_data .= 'lr=' . $row . '&';
                }
                if ($t1 == 'KRA') {
                    $cert_data .= 'pin1=' . $row . '&';
                }
                if ($t1 == 'KRA') {
                    $cert_data .= 'pin2=' . $row . '&';
                }
            }
        }
        if (isset($doc_active)) {
            if ($doc_active) {
                $oob .= '<tr><th scope="row"> </th><td> <a class="btn btn-success" target="_blank" href="./receipt.php?' . $cert_data . '">DOWNLOAD PIN CERT</a></td></tr>';
            }
        }

        $oob .= ' </tbody><table>';
        echo $oob;
    } else {
        echo $object_1;
    }
}


echo $object;

//echo json_encode($obj_3).'<br/><br/>';

//echo $dt3.'<br/><br/>';