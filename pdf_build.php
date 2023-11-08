<?php

require './vendor/autoload.php';
include './includes/core.php';
use Knp\Snappy\Pdf;


if($_SERVER['SERVER_NAME'] == 'localhost'){
$file_name = 'http://localhost/kever/pdf/'.$_SESSION['kra_pin'].'.html';
}else{
$file_name = 'https://kever.io/pdf/'.$_SESSION['kra_pin'].'.html';
}

$file_name2 = './pdf/'.$_SESSION['kra_pin'].'.pdf';
$snappy = new Pdf(__DIR__.'/wkhtmltopdf/bin/wkhtmltopdf');
//$myProjectDirectory = 'C:/xampp/htdocs/kever';

//$snappy = new Pdf($myProjectDirectory . '/vendor/h4cc/wkhtmltopdf-i386/bin/wkhtmltopdf-i386');
//$snappy = new Pdf($myProjectDirectory . '/vendor/h4cc/wkhtmltopdf-amd64/bin/wkhtmltopdf-amd64');

header('Content-Type: application/pdf');
//header('Content-Disposition: attachment; filename="file.pdf"');

echo $snappy->getOutput($file_name);

//$snappy->generateFromHtml(file_get_contents($file_name), $file_name2);

//echo file_get_contents($file_name);

