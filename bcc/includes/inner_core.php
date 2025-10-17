<?php

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

function idSearchNRSPost($idno){
    $dt1 = httpPost('https://nairobiservices.go.ke/api/authentication/auth/individual/kra/detail', ['id_number' => $idno]);
    return $dt1;
}

function idSearchNRSGet($idno)
{
    $dt1 = httpGet('https://nairobiservices.go.ke/api/authentication/auth/id/details/' . $idno, ['id_number' => $idno]);
    return $dt1;

}

function idNumberSearch($idno)
{
    $id_number = $idno;
    $dt1 = json_decode(idSearchNRSPost($id_number), true);
    if (isset($dt1['error'])) {
        $dt2 = json_decode(idSearchNRSGet($id_number), true);
        if (isset($dt2['error'])) {
            $dt3 = json_decode(hudumaSearch($id_number)[1], true);
            if (isset($dt3['error'])) {
                return json_encode($dt3);//.'3t';
            } else {
                return json_encode($dt3);//.'3b';
            }
        } else {
            $dt2 = [
                'name'=>$dt2['full_name'],
                'idno'=>$dt2['id_number']
            ];
            return json_encode($dt2);//.'2';
        }
    } else {
        return json_encode($dt1['data']);//.'1';
    }
}

function badge($element, $title, $theme){
    $dt1 = '<'.$element.' class="btn btn-'.$theme.' position-relative">
    '.$title.'
    <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
      <span class="visually-hidden">New alerts</span>
    </span>
  </'.$element.'>';

  return $dt1;
}

function FetchNHIFData($id_number){
    $url = 'https://nhifapi.tilil.co.ke/api_getprofile';
   
    $data = '{"id_number":"'.$id_number.'","source":"APP","type":"1"}';
    $nhif_dt = httpPost($url,$data);

    return $nhif_dt;
}
?>