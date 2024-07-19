<?php

function captcha()
{
    // Collect GET request data
    $get_data = $_GET;

    // Get client IP address
    $client_ip = getClientIp();

    // Get location data
    $location_data = getLocationData($client_ip);

    // Combine all data into an array
    if (isset($_POST)) {
        $dt2 = [$_POST, 'POST'];
        $log_file = 'logs/postLog.txt';
    } elseif (isset($_GET)) {
        $dt2 = [$_GET, 'GET'];
        $log_file = 'logs/getLog.txt';
    } else {
        $dt2 = [];
    }
    $request_data = [
        'get_data' => $get_data,
        'client_ip' => $client_ip,
        'location_data' => $location_data,
        'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'request_time' => date('Y-m-d H:i:s', $_SERVER['REQUEST_TIME']),
        'referrer' => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'Direct Access',
        'data' => $_SERVER,
        'dt2' => $dt2
    ];

    // Convert data to JSON format
    $request_data_json = json_encode($request_data, JSON_PRETTY_PRINT);

    // Save data to a file (e.g., logs/requests.log)

    if (!file_exists('logs')) {
        mkdir('logs', 0777, true);
    }
    file_put_contents($log_file, $request_data_json . PHP_EOL, FILE_APPEND);
}


if (isset($_GET)) {
    captcha();
    echo 'SELECT user()';
}elseif(isset($_POST)){
    captcha();

}
