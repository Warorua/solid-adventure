<?php
include './sqlite/connect.php';

$letters = range('A', 'Z');

$l1 = $letters;
$l2 = $letters;

// Now, $letters contains an array of letters from A to Z
//print_r($letters);
$cnt = 0;
foreach($l1 as $r1){
    foreach($l2 as $r2){
        for($i=0;$i<=999;$i++){
            $i = (string)$i;
            $al1 = strlen($i);
            if($al1==1){
                $i = '00'.$i;
            }elseif($al1==2){
                $i = '0'.$i;
            }else{
                $i = $i;
            }
            $plate = 'K'.$r2.$r1.' '.$i;
            $cnt++;
            echo $plate.PHP_EOL;
        }
    }
}
echo 'Total: '. $plate.PHP_EOL;
?>
