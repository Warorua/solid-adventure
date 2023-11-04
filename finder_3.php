<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

include './includes/core.php';
include './includes/core_kra.php';

$type = $_POST['type'];

$docno = $_POST['docno'];
$url = 'https://nairobiservices.go.ke/api/sbp/application/bussiness_details';

if ($type == 'kra') {
    $scriptName = 'FetchRegistrationDtl';
    $methodName = 'fetchRegTxprInfoFrmPin';
    $url1 = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/' . $scriptName . '.' . $methodName . '.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => $scriptName,
        'c0-methodName' => $methodName,
        'c0-id' => '0',
        'c0-param0' => 'string:'.$docno,
        //'c0-param0' => 'string:22340000',
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => generateRandomString()
    ];
    $result = fixJson(extractCallbackData(httpPost($url1, $data)));
    $processed = processJson($result);
    $dt1 = json_decode($processed, true);
    if ($dt1['taxPayerType'] != null) {
        if ($dt1['taxPayerType'] != 'NONINDI') {
            $object_1 = $dt1['txprIndDtlsDTO'];
            foreach ($dt1['txprAddressDtlsDTO'] as $id => $key) {
                $object_1[$id] = $key;
            }
        } else {
            $object_1 = $dt1['txprNonindiDtlDTO'];
            foreach ($dt1['txprAddressDtlsDTO'] as $id => $key) {
                $object_1[$id] = $key;
            }

            $brs_no = $dt1['txprNonindiDtlDTO']['bussCertRegNum'];
        }
    } else {
        $object_1 = '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Error fetching KRA data! PIN not Found!</b>';
    }
} elseif ($type == 'brs') {

    $brs_no = $docno;
} else {
    echo '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">Document type needed to process data</b>';
    die;
}



if (isset($brs_no)) {
    $data = ['brs_no' => $brs_no];
    $dt1 = json_decode(httpPost($url, $data), true);
    if (is_array($dt1)) {
        if ($dt1['data']['count'] == 0) {
            $object_2 = '<br/><b style="color:red;padding:20px;background-color:black;border:none;border-radius:5px">BRS Number not found!</b>';
        } else {
            $object_2 = $dt1['data']['records'][0];
        }
    } else {
        $object_2 = $dt1;
    }
}



if (isset($object_1)) {
    if (is_array($object_1)) {
        $oob = '';
        $oob .= '
        <h1 class="fw-light text-uppercase display-4 text-center text-info">kra data</h1>
    <table class="table table-striped-columns">
    <thead>
    <tr>
      <th scope="col">#1</th>
      <th scope="col">Info</th>
    </tr>
  </thead>
  <tbody>
    ';
        foreach ($object_1 as $id => $row) {
            if (!is_array($row)) {
                $t1 = strtoupper(str_replace('_', ' ', $id));
                $oob .= '<tr>
                <th scope="row">' . $t1 . ' </th>
                <td> ' . $row . '</td>
                </tr>';
            } else {
                $oob .= '<tr>
                <th scope="row">' . $id . ' </th>
                <td>
                <table class="table table-striped-columns">
                <thead>
                <tr>
                  <th scope="col">#2</th>
                  <th scope="col">Info</th>
                </tr>
              </thead>
              <tbody>
                ';
                foreach ($row as $id2 => $row2) {
                    if (!is_array($row2)) {
                        $oob .= '
                        <tr>
                        <th scope="row">' . $id2 . ' </th>
                        <td> ' . $row2 . '</td>
                        </tr>';
                    } else {
                        if ($id2 == 'Shareholder') {
                            if (isset($row2['ShareholderPin'])) {
                                $oob .= '<tr style="font-weight:bold" class="table-primary"><th scope="row"></th><td>SHAREHOLDER</td></tr>';
                                foreach ($row2 as $id3 => $row3) {
                                    $oob .= '
                                    <tr>
                                    <th scope="row">' . $id3 . ' </th>
                                    <td> ' . $row3 . '</td>
                                    </tr>';
                                }
                            } else {
                                foreach ($row2 as $id3 => $row3) {
                                    $oob .= '<tr style="font-weight:bold" class="table-primary"><th scope="row"></th><td>SHAREHOLDER</td></tr>';

                                    foreach ($row3 as $id4 => $row4) {
                                        $oob .= '
                                <tr>
                                <th scope="row">' . $id4 . ' </th>
                                <td> ' . $row4 . '</td>
                                </tr>';
                                    }
                                }
                            }
                        }
                    }
                }
                $oob .= '
                </tbody>
                </table>
                </td>
                </tr>';
            }
        }
        $oob .= ' </tbody></table>';
        echo $oob;
    } else {
        echo $object_1;
    }
}



if (isset($object_2)) {
    if (is_array($object_2)) {
        $oob = '';
        $oob .= '
        <br/><br/><br/><br/><br/><br/>
        <h1 class="fw-light text-uppercase display-4 text-center text-info">business registration data</h1>
    <table class="table table-striped-columns">
    <thead>
    <tr>
      <th scope="col">#3</th>
      <th scope="col">Info</th>
    </tr>
  </thead>
  <tbody>
    ';
        foreach ($object_2 as $id => $row) {
            if (!is_array($row)) {
                $t1 = strtoupper(str_replace('_', ' ', $id));
                $oob .= '<tr><th scope="row">' . $t1 . ' </th><td> ' . $row . '</td></tr>';
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
                if ($id == 'partners') {
                    foreach ($row as $id2 => $row2) {
                        $oob .= '<tr style="font-weight:bold" class="table-primary"><th scope="row"></th><td>PARTNER</td></tr>';
                        foreach ($row2 as $id3 => $row3) {
                            if (!is_array($row3)) {
                                $t2 = strtoupper(str_replace('_', ' ', $id3));
                                $oob .= '
                            <tr>
                            <th scope="row">' . $t2 . ' </th>
                            <td> ' . $row3 . '</td>
                            </tr>';
                            } else {
                                $oob .= '
                                <tr>
                                <th class="text text-primary text-uppercase" scope="row">' . $id3 . ' </th>
                                <td class="table-info">';
                                if (isset($row3[0])) {
                                    foreach ($row3[0] as $id4 => $row4) {
                                        $t3 = strtoupper(str_replace('_', ' ', $id4));
                                        $oob .= '
                                    <table class="table table-striped-columns">
                                    <tr>
                                    <th scope="row">' . $t3 . ' </th>
                                    <td> ' . $row4 . '</td>
                                    </tr>
                                    </table>';
                                    }
                                }

                                $oob .= '
                                </td>
                                </tr>';
                            }
                        }
                    }
                } else {
                    foreach ($row as $id2 => $row2) {
                        if (!is_array($row2)) {
                            $oob .= '
                        <tr>
                        <th scope="row">' . $id2 . ' </th>
                        <td> ' . $row2 . '</td>
                        </tr>';
                        }
                    }
                }

                $oob .= '</tbody></table>
                </td>
                </tr>';
            }
        }
        $oob .= ' </tbody></table>';
        echo $oob;
    } else {
        echo $object_2;
    }
}
