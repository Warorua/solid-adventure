<?php
include './includes/conn_pure.php';


function httpPost($url, $data, $headers = null)
{
    try {
        $ch = curl_init($url);
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        if (is_array($data)) {
            $format_data = http_build_query($data);
        } else {
            $format_data = $data;
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $format_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        if ($headers != null) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
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

function build_file($file, $data)
{

    $file_data = fopen($file, "w");

    fwrite($file_data, $data);

    fclose($file_data);
}


function randCode($length = 10)
{
    // $length = 10; // desired length of the random string
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}
$stmt = $conn->prepare("SELECT * FROM aftermath ORDER BY RAND()");
$stmt->execute();
$am = $stmt->fetchAll();
echo json_encode($am). '<br/>';
foreach ($am as $row) {
    $url = $row['url'];
    $title = $row['title'];
    $res = httpPost($url, []);
    $size = strlen($res);

    if ($size > 500) {
        $name = str_replace(' ', '', $row['title']);
        $storage = 'aftermath90/' . randCode() . '_' . $name . '.html';
        $stmt = $conn->prepare("UPDATE aftermath SET status=:status, length=:length, storage=:storage WHERE id=:id");
        $stmt->execute(['status' => '1', 'length' => $size, 'storage' => $storage, 'id' => $row['id']]);
        build_file($storage, $res);
        echo  $title . ': ' . $size . '<br/>';
        echo  $res . '<br/><br/><br/><br/>';
    }
}
