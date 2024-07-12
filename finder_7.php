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

    if (isset($_POST['limit'])) {
        $limitId = $_POST['limit'];
        if (ctype_digit($limitId)) {
            $limitObj = 'LIMIT ' . $limitId;
        } else {
            $limitObj = '';
        }
    } else {
        $limitObj = '';
    }


    if (isset($_POST['filter'])) {
        $filterId = $_POST['filter'];
        if ($filterId == '' || $filterId == null) {
            $filterObj = $filterId;
        } else {
            $filterObj = '*';
        }
    } else {
        $filterObj = '*';
    }


    $stmt = $conn4->prepare('SELECT '.$filterObj.' FROM kra_data WHERE business_name LIKE :business_name ' . $limitObj);
    $stmt->execute(['business_name' => '%' . $businessName . '%']);
    $fetch = $stmt->fetchAll();
    $output['data'] = $fetch;
    $output['count'] = count($output['data']);
    echo json_encode($output);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output);
}
