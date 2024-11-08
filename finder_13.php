<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;
use Sonata\GoogleAuthenticator\GoogleAuthenticator;
use Sonata\GoogleAuthenticator\GoogleQrUrl;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'sec';

include './includes/uni_conn.php';

if (isset($_GET['parsekey'])) {
    $parseKey = $_GET['parsekey'];
    $dt = [];
    $stmt = $conn4->prepare("SELECT * FROM callback WHERE `key` = :key");
    $stmt->execute(['key' => $parseKey]);
    $adm_obj = $stmt->fetch();
    if ($adm_obj['status'] == '1') {

        $dt['status'] = true;
        $dt['key'] = htmlspecialchars($parseKey);
        echo json_encode($dt, JSON_PRETTY_PRINT);
    } else {
        $dt['status'] = false;
        $dt['key'] = htmlspecialchars($parseKey);
        echo json_encode($dt, JSON_PRETTY_PRINT);
    }
} else {
    http_response_code(401);
    echo "Forbidden Request!";
    exit();
}
