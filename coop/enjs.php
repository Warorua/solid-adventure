<?php
include '../includes/core.php';
if (isset($_POST['response'])) {
    $file = './cookies/response.json';
    $data = json_encode(['response' => $_POST['response']]);
    build_file($file, $data);
}
