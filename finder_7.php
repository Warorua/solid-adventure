<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'pin_data';

include './includes/uni_conn.php';

$output = [];

if (isset($_POST['businessName'])) {
    $businessName = $_POST['businessName'];

    if ($businessName == '' || $businessName == null) {
        $output['error'] = 'Invalid parameters set!';
        echo json_encode($output);
        die();
    }

    $stmt = $conn4->prepare('SELECT * FROM kra_data WHERE business_name LIKE :business_name');
    $stmt->execute(['business_name' => '%' . $businessName . '%']);
    $fetch = $stmt->fetchAll();
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);
    echo json_encode($output);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output);
}
