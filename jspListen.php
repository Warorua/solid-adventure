<?php
function getClientIp()
{
    $ip = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

// Function to get location data from IP address
function getLocationData($ip)
{
    $url = "http://ip-api.com/json/{$ip}";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

function captcha()
{
    // Collect GET request data
    

    // Get client IP address
    $client_ip = getClientIp();

    // Get location data
    $location_data = getLocationData($client_ip);

    // Combine all data into an array
    if (isset($_POST)) {
        $dt2 = [$_POST, 'POST'];
        $log_file = 'logs/postLog.txt';
        $get_data = $_POST;
    } elseif (isset($_GET)) {
        $dt2 = [$_GET, 'GET'];
        $log_file = 'logs/getLog.txt';
        $get_data = $_GET;
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
    $file = captcha();
    echo 'SELECT user()';
}elseif(isset($_POST)){
    $file =  captcha();

}
