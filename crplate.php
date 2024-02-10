<?php
$file = "./nrs_backup/kever.vehiclePlate.json";
$dfile = json_decode(file_get_contents($file), true);
$ct = 0;
foreach($dfile as $row){
    if($ct < 10){
        echo $row['plate'].'<br/>';
    }else{
        die(
            'the end'
        );
    }
}