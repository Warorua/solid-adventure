<?php
$total = 0;
for ($i = 0; $i <= 2; $i++) {
    // if (file_exists('https://nxtacquisitions.com/ke/store/master_' . $i . '_db.json')) {
    $data = json_decode(file_get_contents('https://tweetbot.site/store/master_' . $i . '_db.json'), TRUE);
    $total += count($data['data']);
    echo count($data['data']) . ' -------  ' . $i . '<br/>';
    //  }
}
for ($i = 3; $i <= 10; $i++) {
    // if (file_exists('https://nxtacquisitions.com/ke/store/master_' . $i . '_db.json')) {
    $data = json_decode(file_get_contents('https://nxtacquisitions.com/ke/store/master_' . $i . '_db.json'), TRUE);
    $total += count($data['data']);
    echo count($data['data']) . ' -------  ' . $i . '<br/>';
    //  }
}
echo 'TOTAL: ' . $total;