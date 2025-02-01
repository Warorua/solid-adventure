<?php
//header("Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Mzc5OTM1MTMsImV4cCI6MTczNzk5NzExMywidXNlcklkIjoiOTZfMSJ9._OsNB14ZNV7g5tAiaYhj4tJhmcnzQuW79eVRQZfeeqY");

require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'car_data';

include './includes/uni_conn.php';

$output = [];

//$_POST['idNumber'] = '32515522';

if(isset($userId)){
    echo json_encode(['success'=>true,'user_id'=>$userId]);
}else{
    echo json_encode(['success'=>false]);
}
