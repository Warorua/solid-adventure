<?php
include './includes/core.php';

for ($i = 300; $i <= 400; $i++) {
    $url = 'https://nairobiservices.go.ke/api/authentication/bill/transaction/details';

    $data = httpPost($url, ["invoice_no"=>'BL-LR-046'.$i]);

    $dt1 = json_decode($data, true);

    if (isset($dt1['staff_id'])) {
        if($dt1['staff_id' != null]){
            echo $dt1['staff_id'];
        break;
        }
        
    }
}
echo 'done';
