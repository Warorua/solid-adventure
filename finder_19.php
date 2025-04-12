<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';
include './includes/core_kra.php';
////////CAR PLATE SEARCH
$source = 'pin_data';

include './includes/uni_conn.php';

$output = [];

if (isset($_POST['kraPin'])) {
    $kraPin = $_POST['kraPin'];

    if ($kraPin == '' || $kraPin == null) {
        $output['error'] = 'Invalid parameters set!';
        echo json_encode($output, JSON_PRETTY_PRINT);
        die();
    }

  


  


    $stmt = $conn4->prepare('SELECT '.$filterObj.' FROM kra_data WHERE business_name LIKE :business_name ' . $limitObj);
    $stmt->execute(['business_name' => '%' . $kraPin . '%']);
    $fetch = $stmt->fetchAll();
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output, JSON_PRETTY_PRINT);
}
