<?php
/*
echo date("Y-M-d H:i:s").PHP_EOL;
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://pesaflow.ecitizen.go.ke/PaymentAPI/getStatus.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => "billRefNumber=4MXRN9",
  CURLOPT_HTTPHEADER => array(
    'Cookie: PHPSESSID=172.18.187.33:80~8pq2kevdpnvgvqhtaqbe98ivj3'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response.PHP_EOL;
echo date("Y-M-d H:i:s").PHP_EOL;
*/


$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://nairobiservices.go.ke/api/authentication/auth/users',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Cookie: csrftoken=wLXkotHfgESsspXuCg3gRCXjfZQkmJkm54LFueIhJv67UqihJZ0RZuHc416zDGLH; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODYzLCJpZF9udW1iZXIiOm51bGwsImtyYV9waW4iOiJQMDUxNjg3Mjk4RyIsImVtYWlsIjoiQUxNSVJJQUtFQEdNQUlMLkNPTSIsInBhc3Nwb3J0IjpudWxsLCJ1c2VybmFtZSI6IkFsbWlyaWEgTHRkIiwiZXhwIjoxNjgxNDY0NTgwLCJjdXN0b21lcl9pZCI6IjIwMjBfMDEzODIiLCJtb2JpbGVfbnVtYmVyIjoiMjU0NzExNTc2OTA5In0.DagH4XZzzA9tUNrZ3Ykg0zlrCEDXOzDFjes7k91yw4U'
  ),
));

$data = curl_exec($curl);

curl_close($curl);

$dt1 = json_decode($data, true);

if (is_array($dt1)) {
    if (isset($dt1['data']['onstreet'])) {
        if (count($dt1['data']['onstreet']) > 1) {
            $file = './dtt.json';

            $file_data = fopen($file, "w");

            fwrite($file_data, $data);

            fclose($file_data);

            return 'Users Data Done </br>';;
        } else {
            build_file('./nrs_data_error.json', $data);
            return 'Count Error 3, Processing Users Data :<b></b></br>';;
        }
    } else {
        build_file('./nrs_data_error.json', $data);
        return 'Object Error 2, Processing Users Data :<b></b></br>';;
    }
} else {
    build_file('./nrs_data_error.json', $data);
    return 'Error Processing Users Data :<b></b></br>';;
}

echo $data;
