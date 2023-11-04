<?php
if (file_exists("./tablesData.json")) {
    $path = "./";
} elseif (file_exists("../tablesData.json")) {
    $path = "../";
} elseif (file_exists("../../tablesData.json")) {
    $path = "../../";
}
function validateAndExtractNumbers($inputString)
{
    // Remove non-numeric characters
    $onlyNumbers = preg_replace('/[^0-9]/', '', $inputString);

    // Extract the first 6 numbers
    $firstSixNumbers = substr($onlyNumbers, 0, 6);

    return $firstSixNumbers;
}

function otpVerif($authPass = null)
{
    $storedSecret = base64_decode('A76UblbxbxT6BEbRtYTy');
    if ($authPass != null && $authPass != '') {
        $inputPassword = validateAndExtractNumbers($authPass);
    } else {
        $inputPassword = '000000';
    }
    $totp = PedroSancao\OTP\TOTP::createRaw($storedSecret);
    $otpverif = $totp->verify($inputPassword);
    return [$otpverif, $inputPassword];
}

function hudumaSearch($idno)
{
    $url = 'https://appointment.hudumakenya.go.ke/includes/getcitizenregdetails.php?id=6%3A' . $idno;
    $dt1 = httpGet($url, []);
    $pattern = '/\s*/m';
    $replace = '';
    $dt2 = explode(':', $dt1);
    $dt1 = json_encode($dt2);
    $dt2[0] = preg_replace($pattern, $replace, $dt2[0]);

    if ($dt2['9'] == '200') {
        $obj1 = [
            'idno' => $dt2[0],
            'name' => $dt2[2] . ' ' . $dt2[3] . ' ' . $dt2[4],
            'phone' => '',
            'email' => '',
            'kra_pin' => ''
        ];
        $obj1 = json_encode($obj1);

        return [$dt1, $obj1];
    } else {
        if (isset($dt2[10])) {
            $err = $dt2[11];
        } else {
            $err = 'ID Number Not Found!';
        }
        $obj1 = [
            'idno' => $dt2[0],
            'error' => $err,
        ];
        $obj1 = json_encode($obj1);
        return [$dt1, $obj1];
    }
}

function idSearchNRSPost($idno)
{
    $dt1 = httpPost('https://nairobiservices.go.ke/api/authentication/auth/individual/kra/detail', ['id_number' => $idno]);
    return $dt1;
}

function idSearchNRSGet($idno)
{
    $dt1 = httpGet('https://nairobiservices.go.ke/api/authentication/auth/id/details/' . $idno, ['id_number' => $idno]);
    return $dt1;
}

function idSearchKRA($idno)
{
    $scriptName = 'FetchRegistrationDtl';
    $methodName = 'fetchNatRegDtlsByNIDAmd';
    $url = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/' . $scriptName . '.' . $methodName . '.dwr';
    $data = [
        'callCount' => '1',
        'windowName' => 'DWR-F9740062AC50C0A7919CCE0110C5CE12',
        'c0-scriptName' => $scriptName,
        'c0-methodName' => $methodName,
        'c0-id' => '0',
        'c0-param0' => 'string:' . $idno,
        //'c0-param0' => 'string:22340000',
        'batchId' => '1',
        'page' => '/KRA-Portal/eRegIndi.htm?actionCode=loadIndiOnlineForm',
        'httpSessionId' => '',
        'scriptSessionId' => generateRandomString()
    ];

    $result = fixJson(extractCallbackData(httpPost($url, $data)));
    $processed = processJson($result);
    //$processed = generateRandomString();
    //file_put_contents('./lab.json', $processed);

    return $processed;
}

function idNumberSearch($idno)
{
    $id_number = $idno;
    $kra1 = idSearchKRA($idno);
    $dt1 = json_decode($kra1, true);
    //echo json_encode($kra1).' - 1<br/>';
    echo ' Engine 1<br/>';
    if (!isset($dt1['isValidNID'])) {
        //echo json_encode($dt1).' - 2<br/>';
        echo 'Engine 2<br/>';
        if ($dt1['isValidNID'] == null) {
            //echo json_encode($dt1).' - 3<br/>';
            echo 'Engine 3<br/>';
            if (!$dt1['isValidNID']) {
                //echo json_encode($dt1).' - 4<br/>';
                echo 'Engine 4<br/>';
                $dt1 = json_decode(idSearchNRSPost($id_number), true);
                if (isset($dt1['error'])) {
                    $dt2 = json_decode(idSearchNRSGet($id_number), true);
                    if (isset($dt2['error'])) {
                        $dt3 = json_decode(hudumaSearch($id_number)[1], true);
                        if (isset($dt3['error'])) {
                            return json_encode($dt3); //.'3t';
                        } else {
                            return json_encode($dt3); //.'3b';
                        }
                    } else {
                        $dt2 = [
                            'name' => $dt2['full_name'],
                            'idno' => $dt2['id_number']
                        ];
                        return json_encode($dt2); //.'2';
                    }
                } else {
                    return json_encode($dt1['data']); //.'1';
                }
            } else {
                return json_encode($dt1); //.'1';
            }
        } else {
            return json_encode($dt1); //.'1';
        }
    } else {
        return json_encode($dt1); //.'1';
    }
}

function idSearchPesaflow($idno, $fname)
{
    $url = 'https://payments.ecitizen.go.ke/api/customer/verification/validate';
    $data = [
        'first_name' => $fname,
        'id_number' => $idno,
        'last_name' => 'n/a'
    ];
    $dt1 = httpPost($url, $data);
    return $dt1;
}

function badge($element, $title, $theme)
{
    $dt1 = '<' . $element . ' class="btn btn-' . $theme . ' position-relative">
    ' . $title . '
    <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
      <span class="visually-hidden">New alerts</span>
    </span>
  </' . $element . '>';

    return $dt1;
}

function FetchNHIFData($id_number)
{
    $url = 'https://nhifapi.tilil.co.ke/api_getprofile';

    $data = '{"id_number":"' . $id_number . '","source":"APP","type":"1"}';
    $nhif_dt = httpPost($url, $data);

    return $nhif_dt;
}

function innerFetch($idNo)
{

    $url = 'https://nairobiservices.go.ke/api/authentication/auth/user_info';
    $data = ['id_number' => $idNo];
    $dt1 = json_decode(httpPost($url, $data), true);

    return $dt1;
    if (!$dt1['has_account']) {
        $url1 = 'https://nairobiservices.go.ke/api/authentication/auth/get_user_details/?id_number=' . $idNo;
        $dt2 = json_decode(httpGet($url1, []), true);

        if (isset($dt2['data'])) {
            return $dt2['data'];
        } else {
            if (isset($dt2['error'])) {
                //return null;
                return $dt2['error'];
            } else {
                return $dt2;
            }
        }
    } else {
        if (isset($dt1['data'])) {
            return $dt1['data'];
        } else {
            return $dt1;
        }
    }
}
