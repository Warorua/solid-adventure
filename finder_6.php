<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'pin_data';

include './includes/uni_conn.php';

$output = [];

if (isset($_POST['idNumber'])) {
    $idNo = $_POST['idNumber'];

    if ($idNo == '' || $idNo == null || !ctype_digit($idNo)) {
        $output['error'] = 'Invalid parameters set!';
        echo json_encode($output);
        die();
    }

    $stmt = $conn4->prepare('SELECT * FROM vehiclePlate WHERE id_number LIKE :id_number');
    $stmt->execute(['id_number' => '%' . $idNo . '%']);
    $output = $stmt->fetchAll();
    $output['data'] = $output;
    $output['count'] = count($output['data']);
    echo json_encode($output);
} else {
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output);
}
