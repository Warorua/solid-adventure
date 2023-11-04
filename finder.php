<?php

use simplehtmldom\HtmlDocument;


function httpPost($url, $data)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if ($response === false) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
    } catch (Exception $e) {

        trigger_error(
            sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(),
                $e->getMessage()
            ),
            E_USER_ERROR
        );
    } finally {
        // Close curl handle unless it failed to initialize
        if (is_resource($ch)) {
            curl_close($ch);
        }
    }

    return $response;
}

function myErrorHandler($errno, $errstr, $errfile, $errline)
{
    echo "<b>Custom error:</b> [$errno] $errstr<br>";
    echo " Error on line $errline in $errfile<br>";
}

set_error_handler("myErrorHandler");

error_reporting(0);
require 'vendor/autoload.php';



$object1 = '';
if ($_POST['idno'] != '') {
    if ($_POST['yob'] != '' && $_POST['fname'] == '') {

        $url1 = 'https://verify.iebc.or.ke/index.php/webapi/submit_voter';
        $year = date("Y", strtotime($_POST['yob']));
        $month = date("m", strtotime($_POST['yob']));
        $day = date("d", strtotime($_POST['yob']));
        //$object = scrape($data);
        //  do {
        $object = '';
        $object .= 'month = ' . $month . '<br/>';
        $object .= 'day = ' . $day . '<br/>';
        $fields = array('idno' => $_POST['idno'], 'yob' => $year);

        $data = httpPost($url1, $fields);
        $obj = scrape($data);

        if ($obj == 'NotFound') {
            $object .= "Year: " . $year . " <b style='color:red'>NOT IN PHASE 1</b> <br>";
            $obj2 = kra($_POST['idno'], $day, $month, $year);
            foreach ($obj2 as $id => $row) {
                $object .= $id . ' = ' . $row . '<br/>';
            }
        } else {
            $object .= "Year: " . $year . " <b style='color:green'>ACCEPTED</b> <br>";
            foreach ($obj as $id => $row) {
                $object .= $id . ' = ' . $row . '<br/>';
            }
            $object .= '<br/><br/>';
            $dte = str_replace('/', '-', $obj['dob']);
            $year = date("Y", strtotime($dte));
            $month = date("m", strtotime($dte));
            $day = date("d", strtotime($dte));

            //*
            $obj2 = kra($_POST['idno'], $day, $month, $year);

            if (is_array($obj2)) {
                foreach ($obj2 as $id => $row) {
                    if ($id == 'firstName') {
                        $ff_name = $row;
                    }
                    if ($id == 'dateBirth') {
                        $mdt = number_format(($row / 1000), 0, '', '');
                        $row = date("l dS M Y", $mdt);
                    } elseif ($id == 'issueDate') {
                        $mdt = number_format(($row / 1000), 0, '', '');
                        $row = date("l jS M Y", $mdt);
                    }
                    if ($id == 'isAlreadyRegistered' && $row == 1) {
                        $row = "<b style='color:green'>HAS KRA PIN</b>";
                    } elseif ($id == 'isAlreadyRegistered' && $row != 1) {
                        $row = "<b style='color:red'>NO KRA PIN</b>";
                    }
                    $object .= $id . ' = ' . $row . '<br/>';
                }
            } else {
                $object .= $obj2 . '<br/>';
            }


            //*/

            //*
            if (isset($ff_name)) {
                if ($ff_name != '') {
                    $nme = str_replace(' ', '', $ff_name);
                    $object .= 'DDDDDD 1 = ' . json_encode($nme) . '<br/>';
                }
            }

            if (!isset($nme)) {
                $nme1 = preg_replace("/[^a-zA-Z0-9]+/", '', $obj['firstname']);


                $nme2 = substr($nme1, 0, strpos($nme1, " "));
                if (strlen($nme2) < 1) {
                    $nme = $nme1;
                } else {
                    $nme = $nme2;
                }
                $object .= 'DDDDDD 2 = ' . json_encode($nme) . '<br/>';
            }


            $dt1 = ctGet((int)$_POST['idno'], $nme);

            //  $dt1 = ctGet(10847647, 'salome');
            $dt2 = json_decode($dt1, TRUE);
            if (isset($dt2['profile']['kra_pin'])) {
                if ($dt2['profile']['kra_pin'] != '') {
                    $url = 'https://itax.kra.go.ke/KRA-Portal/eTreAmendment.htm?actionCode=loadViewProfile&taxPayerPin=' . $dt2['profile']['kra_pin'];
                    if ($dt2['profile']['first_name'] == '') {
                        $full_nme = str_replace("'", "", $dt2['profile']['other_names'] . ' ' . $dt2['profile']['last_name']);
                    } elseif ($dt2['profile']['other_names'] == '') {
                        $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' '  . $dt2['profile']['last_name']);
                    } elseif ($dt2['profile']['last_name'] == '') {
                        $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' ' . $dt2['profile']['other_names']);
                    } else {
                        $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' ' . $dt2['profile']['other_names'] . ' ' . $dt2['profile']['last_name']);
                    }
                    $fields = array(
                        'applicantType' => 'taxpayer',
                        'cmbTaxpayerType' => 'INDI',
                        'fieldsToSkip' => 'representativeName,taxPayerName',
                        'representativeName' => '',
                        'representativePin' => '',
                        'taxPayerName' => $full_nme,
                        'taxPayerPin' => $dt2['profile']['kra_pin'],
                        'viewProfileFlag' => 'Y',
                    );


                    $dt3 = httpPost($url, $fields);
                    //   $data = $dt3;
                    $object1 = scrape_2($dt3);
                    $object .= 'KRA = ' . $dt2['profile']['kra_pin'] . '<br/>';
                } else {
                    $object1 = 'User has no kra';
                }
            } else {
                $object .= $dt1;
            }
            //*/

            //$object .= json_encode(str_replace(' ','',$obj['firstname']));

        }
        //$x++;
        // } while ($object != 'NotFound');
        // $object = $data;
        // $object = $fields;

    } elseif ($_POST['yob'] == '' && $_POST['fname'] == '') {
        //*
        $object = '';
        $url1 = 'https://verify.iebc.or.ke/index.php/webapi/submit_voter';
        for ($x = 1920; $x <= 2004; $x++) {
            $fields = array('idno' => $_POST['idno'], 'yob' => $x);

            $data = httpPost($url1, $fields);
            $obj = scrape($data);
            if ($obj == 'NotFound') {
                // $object .= "Year: " . $x . " <b style='color:red'>FAILED</b> <br>";
            } else {
                $object .= "Year: " . $x . " <b style='color:green'>ACCEPTED</b> <br>";
                foreach ($obj as $id => $row) {
                    $object .= $id . ' = ' . $row . '<br/>';
                }
                $object .= '<br/><br/>';
                $dte = str_replace('/', '-', $obj['dob']);
                $year = date("Y", strtotime($dte));
                $month = date("m", strtotime($dte));
                $day = date("d", strtotime($dte));

                //*
                $obj2 = kra($_POST['idno'], $day, $month, $year);
                if (is_array($obj2)) {
                    foreach ($obj2 as $id => $row) {
                        if ($id == 'firstName') {
                            $ff_name = $row;
                        }
                        if ($id == 'dateBirth') {
                            $mdt = number_format(($row / 1000), 0, '', '');
                            $row = date("l dS M Y", $mdt);
                        } elseif ($id == 'issueDate') {
                            $mdt = number_format(($row / 1000), 0, '', '');
                            $row = date("l jS M Y", $mdt);
                        }
                        if ($id == 'isAlreadyRegistered' && $row == 1) {
                            $row = "<b style='color:green'>HAS KRA PIN</b>";
                        } elseif ($id == 'isAlreadyRegistered' && $row != 1) {
                            $row = "<b style='color:red'>NO KRA PIN</b>";
                        }
                        $object .= $id . ' = ' . $row . '<br/>';
                    }
                } else {
                    $object .= $obj2 . '<br/>';
                }
                //*/
                if (isset($ff_name)) {
                    if ($ff_name != '') {
                        $nme = str_replace(' ', '', $ff_name);
                        $object .= 'DDDDDD 1 = ' . json_encode($nme) . '<br/>';
                    }
                }

                if (!isset($nme)) {
                    $nme1 = preg_replace("/[^a-zA-Z0-9]+/", '', $obj['firstname']);


                    $nme2 = substr($nme1, 0, strpos($nme1, " "));
                    if (strlen($nme2) < 1) {
                        $nme = $nme1;
                    } else {
                        $nme = $nme2;
                    }
                    $object .= 'DDDDDD 2 = ' . json_encode($nme) . '<br/>';
                }



                $dt1 = ctGet($_POST['idno'], $nme);
                $dt2 = json_decode($dt1, TRUE);
                if (isset($dt2['profile']['kra_pin'])) {
                    if ($dt2['profile']['kra_pin'] != '') {
                        $url = 'https://itax.kra.go.ke/KRA-Portal/eTreAmendment.htm?actionCode=loadViewProfile&taxPayerPin=' . $dt2['profile']['kra_pin'];

                        if ($dt2['profile']['first_name'] == '') {
                            $full_nme = str_replace("'", "", $dt2['profile']['other_names'] . ' ' . $dt2['profile']['last_name']);
                        } elseif ($dt2['profile']['other_names'] == '') {
                            $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' '  . $dt2['profile']['last_name']);
                        } elseif ($dt2['profile']['last_name'] == '') {
                            $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' ' . $dt2['profile']['other_names']);
                        } else {
                            $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' ' . $dt2['profile']['other_names'] . ' ' . $dt2['profile']['last_name']);
                        }
                        $fields = array(
                            'applicantType' => 'taxpayer',
                            'cmbTaxpayerType' => 'INDI',
                            'fieldsToSkip' => 'representativeName,taxPayerName',
                            'representativeName' => '',
                            'representativePin' => '',
                            'taxPayerName' => $full_nme,
                            'taxPayerPin' => $dt2['profile']['kra_pin'],
                            'viewProfileFlag' => 'Y',
                        );


                        $dt3 = httpPost($url, $fields);
                        //   $data = $dt3;
                        $object1 = scrape_2($dt3);
                        $object .= 'KRA = ' . $dt2['profile']['kra_pin'] . '<br/>';
                    } else {
                        $object1 = 'User has no kra';
                    }
                } else {
                    $object .= $dt1;
                }
            }
        }
        //*/
    } elseif ($_POST['fname'] != '') {
        $object = '';

        $dt1 = ctGet($_POST['idno'], $_POST['fname']);
        $dt2 = json_decode($dt1, TRUE);
        if (isset($dt2['profile']['kra_pin'])) {
            if ($dt2['profile']['kra_pin'] != '') {
                $url = 'https://itax.kra.go.ke/KRA-Portal/eTreAmendment.htm?actionCode=loadViewProfile&taxPayerPin=' . $dt2['profile']['kra_pin'];

                if ($dt2['profile']['first_name'] == '') {
                    $full_nme = str_replace("'", "", $dt2['profile']['other_names'] . ' ' . $dt2['profile']['last_name']);
                } elseif ($dt2['profile']['other_names'] == '') {
                    $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' '  . $dt2['profile']['last_name']);
                } elseif ($dt2['profile']['last_name'] == '') {
                    $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' ' . $dt2['profile']['other_names']);
                } else {
                    $full_nme = str_replace("'", "", $dt2['profile']['first_name'] . ' ' . $dt2['profile']['other_names'] . ' ' . $dt2['profile']['last_name']);
                }
                $fields = array(
                    'applicantType' => 'taxpayer',
                    'cmbTaxpayerType' => 'INDI',
                    'fieldsToSkip' => 'representativeName,taxPayerName',
                    'representativeName' => '',
                    'representativePin' => '',
                    'taxPayerName' => $full_nme,
                    'taxPayerPin' => $dt2['profile']['kra_pin'],
                    'viewProfileFlag' => 'Y',
                );


                $dt3 = httpPost($url, $fields);
                //   $data = $dt3;
                $object1 = scrape_2($dt3);
                $object .= 'KRA = ' . $dt2['profile']['kra_pin'] . '<br/>';
            } else {
                $object1 = 'User has no kra';
            }
        } else {
            $object .= $dt1;
        }
    }
} else {
    $object = 'ID number needed for processing!';
}/*
foreach($output['media'] as $row) {
    echo $row;
}*/
//$object .= '<br/>'.$_POST['yob'];
if (is_array($object1)) {
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
    foreach ($object1 as $id => $row) {
        if ($row != '') {
            $t1 = strtoupper(str_replace('_', '', $id));
            $oob .= '<tr><th scope="row">' . $id . ' </th><td> ' . $row . '</td></tr>';
        }
    }
    $oob .= ' </tbody><table>';
    echo $oob;
} else {
    echo $object1;
}

if (is_array(json_decode($object, true))) {
    $oobj = json_decode($object, true);
    if (isset($oobj['errors'])) {
        foreach ($oobj['errors'] as $id => $dts) {
            $ttt = str_replace('_', ' ', strtoupper($id));
            $obj_f = $ttt . ' ERR  : ' . $dts.'<br/>';
        }
    }
} else {
    $obj_f = $object;
}


echo '
<div class="row">
<div class="col-md-2"></div>
<div class="col-md-8">
<svg>
<symbol id="info-fill" viewBox="0 0 16 16">
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</symbol>
</svg>

<div class="alert alert-warning d-flex align-items-center" role="alert">
<svg class="fs-3 flex-shrink-0 me-2" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
<div>
  '.$obj_f.'
</div>
</div>

</div>
<div class="col-md-2"></div>
</div>

';
 // echo json_encode($object);
