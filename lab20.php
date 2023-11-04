<?php
include './includes/core2.php';
/*
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://serviceportal.ntsa.go.ke/lookup-services/18/execute',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{"params":{"id_number":"10847647"},"data_template_id":"87d845f9-c187-47ff-9bd3-95d030eb9141","_csrf_token":"GEgXAVsaMQUnGwU3ADACMGATImsJNHAA_-VVoKZOkjkE7Ush2RX4qzHf"}',
  CURLOPT_HTTPHEADER => array(
    'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    'DNT: 1',
    'X-CSRF-TOKEN: GEgXAVsaMQUnGwU3ADACMGATImsJNHAA_-VVoKZOkjkE7Ush2RX4qzHf',
    'sec-ch-ua-mobile: ?0',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Content-Type: application/json',
    'Accept: application/json, text/plain',
    'sec-ch-ua-platform: "Windows"',
    'Sec-Fetch-Site: same-origin',
    'Sec-Fetch-Mode: cors',
    'Sec-Fetch-Dest: empty',
    'host: serviceportal.ntsa.go.ke',
    'Cookie: _automzero_key=SFMyNTY.g3QAAAADbQAAAAtfY3NyZl90b2tlbm0AAAAYR2VBVzRRa0pMcW5yN2VxWFJBel94TjhmbQAAAANvdHB0AAAAA2QACmF1dGhvcmlzZWRkAAR0cnVlZAAGZXhwaXJ5YmSZC29kAAlwYXRoX2Zyb21kAANuaWxtAAAAEnBoYXV4dGhfc2Vzc2lvbl9pZHQAAAACbQAAAApleHBpcmVzX2F0dAAAAA1kAApfX3N0cnVjdF9fZAAPRWxpeGlyLkRhdGVUaW1lZAAIY2FsZW5kYXJkABNFbGl4aXIuQ2FsZW5kYXIuSVNPZAADZGF5YRpkAARob3VyYQFkAAttaWNyb3NlY29uZGgCYgAGFeRhBmQABm1pbnV0ZWEbZAAFbW9udGhhBmQABnNlY29uZGE0ZAAKc3RkX29mZnNldGEAZAAJdGltZV96b25lbQAAAAdFdGMvVVRDZAAKdXRjX29mZnNldGEAZAAEeWVhcmIAAAfnZAAJem9uZV9hYmJybQAAAANVVENtAAAACnNlc3Npb25faWRtAAAAEFN2d204NndTOENOVnQ1UlQ.Z2c80B5RUbiuAXJ4Ru-rSL7fP5dYHKToIaBQQougbtQ'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;


SFMyNTY.g3QAAAAEbQAAAAtfY3NyZl90b2tlbm0AAAAYRWY3bzFBYVk2ZXNvWFcySFd3U3hBY185bQAAAANvdHB0AAAAA2QACmF1dGhvcmlzZWRkAAR0cnVlZAAGZXhwaXJ5YmSY8RdkAAlwYXRoX2Zyb21kAANuaWxtAAAAEnBoYXV4dGhfc2Vzc2lvbl9pZHQAAAACbQAAAApleHBpcmVzX2F0dAAAAA1kAApfX3N0cnVjdF9fZAAPRWxpeGlyLkRhdGVUaW1lZAAIY2FsZW5kYXJkABNFbGl4aXIuQ2FsZW5kYXIuSVNPZAADZGF5YRlkAARob3VyYRdkAAttaWNyb3NlY29uZGgCYgAEtIVhBmQABm1pbnV0ZWEeZAAFbW9udGhhBmQABnNlY29uZGE5ZAAKc3RkX29mZnNldGEAZAAJdGltZV96b25lbQAAAAdFdGMvVVRDZAAKdXRjX29mZnNldGEAZAAEeWVhcmIAAAfnZAAJem9uZV9hYmJybQAAAANVVENtAAAACnNlc3Npb25faWRtAAAAEDg0ZFRtLzEyZ0NUV1pzYjRtAAAABnN3X2N0eGQACmluZGl2aWR1YWw.i1Umbl7Z0JmAv29uZaeKVSr7Pfnj8NMYL7PrW_c7pIo
"�t\u0000\u0000\u0000\u0004m\u0000\u0000\u0000\u000b_csrf_tokenm\u0000\u0000\u0000\u0018Ef7o1AaY6esoXW2HWwSxAc_9m\u0000\u0000\u0000\u0003otpt\u0000\u0000\u0000\u0003d\u0000\nauthorisedd\u0000\u0004trued\u0000\u0006expirybd��\u0017d\u0000\tpath_fromd\u0000\u0003nilm\u0000\u0000\u0000\u0012phauxth_session_idt\u0000\u0000\u0000\u0002m\u0000\u0000\u0000\nexpires_att\u0000\u0000\u0000\rd\u0000\n__struct__d\u0000\u000fElixir.DateTimed\u0000\bcalendard\u0000\u0013Elixir.Calendar.ISOd\u0000\u0003daya\u0019d\u0000\u0004houra\u0017d\u0000\u000bmicrosecondh\u0002b\u0000\u0004��a\u0006d\u0000\u0006minutea\u001ed\u0000\u0005montha\u0006d\u0000\u0006seconda9d\u0000\nstd_offseta\u0000d\u0000\ttime_zonem\u0000\u0000\u0000\u0007Etc/UTCd\u0000\nutc_offseta\u0000d\u0000\u0004yearb\u0000\u0000\u0007�d\u0000\tzone_abbrm\u0000\u0000\u0000\u0003UTCm\u0000\u0000\u0000\nsession_idm\u0000\u0000\u0000\u001084dTm/12gCTWZsb4m\u0000\u0000\u0000\u0006sw_ctxd\u0000\nindividual"

SFMyNTY.g3QAAAADbQAAAAtfY3NyZl90b2tlbm0AAAAYR2VBVzRRa0pMcW5yN2VxWFJBel94TjhmbQAAAANvdHB0AAAAA2QACmF1dGhvcmlzZWRkAAR0cnVlZAAGZXhwaXJ5YmSZC29kAAlwYXRoX2Zyb21kAANuaWxtAAAAEnBoYXV4dGhfc2Vzc2lvbl9pZHQAAAACbQAAAApleHBpcmVzX2F0dAAAAA1kAApfX3N0cnVjdF9fZAAPRWxpeGlyLkRhdGVUaW1lZAAIY2FsZW5kYXJkABNFbGl4aXIuQ2FsZW5kYXIuSVNPZAADZGF5YRpkAARob3VyYQFkAAttaWNyb3NlY29uZGgCYgANLTthBmQABm1pbnV0ZWEWZAAFbW9udGhhBmQABnNlY29uZGEhZAAKc3RkX29mZnNldGEAZAAJdGltZV96b25lbQAAAAdFdGMvVVRDZAAKdXRjX29mZnNldGEAZAAEeWVhcmIAAAfnZAAJem9uZV9hYmJybQAAAANVVENtAAAACnNlc3Npb25faWRtAAAAEFN2d204NndTOENOVnQ1UlQ.HWq09aS9_jPucelietc-BkGs_vV88mTOtdZpvpRMTd8
"�t\u0000\u0000\u0000\u0003m\u0000\u0000\u0000\u000b_csrf_tokenm\u0000\u0000\u0000\u0018GeAW4QkJLqnr7eqXRAz_xN8fm\u0000\u0000\u0000\u0003otpt\u0000\u0000\u0000\u0003d\u0000\nauthorisedd\u0000\u0004trued\u0000\u0006expirybd�\u000bod\u0000\tpath_fromd\u0000\u0003nilm\u0000\u0000\u0000\u0012phauxth_session_idt\u0000\u0000\u0000\u0002m\u0000\u0000\u0000\nexpires_att\u0000\u0000\u0000\rd\u0000\n__struct__d\u0000\u000fElixir.DateTimed\u0000\bcalendard\u0000\u0013Elixir.Calendar.ISOd\u0000\u0003daya\u001ad\u0000\u0004houra\u0001d\u0000\u000bmicrosecondh\u0002b\u0000\r-;a\u0006d\u0000\u0006minutea\u0016d\u0000\u0005montha\u0006d\u0000\u0006seconda!d\u0000\nstd_offseta\u0000d\u0000\ttime_zonem\u0000\u0000\u0000\u0007Etc/UTCd\u0000\nutc_offseta\u0000d\u0000\u0004yearb\u0000\u0000\u0007�d\u0000\tzone_abbrm\u0000\u0000\u0000\u0003UTCm\u0000\u0000\u0000\nsession_idm\u0000\u0000\u0000\u0010Svwm86wS8CNVt5RT"

SFMyNTY.g3QAAAADbQAAAAtfY3NyZl90b2tlbm0AAAAYR2VBVzRRa0pMcW5yN2VxWFJBel94TjhmbQAAAANvdHB0AAAAA2QACmF1dGhvcmlzZWRkAAR0cnVlZAAGZXhwaXJ5YmSZC29kAAlwYXRoX2Zyb21kAANuaWxtAAAAEnBoYXV4dGhfc2Vzc2lvbl9pZHQAAAACbQAAAApleHBpcmVzX2F0dAAAAA1kAApfX3N0cnVjdF9fZAAPRWxpeGlyLkRhdGVUaW1lZAAIY2FsZW5kYXJkABNFbGl4aXIuQ2FsZW5kYXIuSVNPZAADZGF5YRpkAARob3VyYQFkAAttaWNyb3NlY29uZGgCYgAGFeRhBmQABm1pbnV0ZWEbZAAFbW9udGhhBmQABnNlY29uZGE0ZAAKc3RkX29mZnNldGEAZAAJdGltZV96b25lbQAAAAdFdGMvVVRDZAAKdXRjX29mZnNldGEAZAAEeWVhcmIAAAfnZAAJem9uZV9hYmJybQAAAANVVENtAAAACnNlc3Npb25faWRtAAAAEFN2d204NndTOENOVnQ1UlQ.Z2c80B5RUbiuAXJ4Ru-rSL7fP5dYHKToIaBQQougbtQ
"�t\u0000\u0000\u0000\u0003m\u0000\u0000\u0000\u000b_csrf_tokenm\u0000\u0000\u0000\u0018GeAW4QkJLqnr7eqXRAz_xN8fm\u0000\u0000\u0000\u0003otpt\u0000\u0000\u0000\u0003d\u0000\nauthorisedd\u0000\u0004trued\u0000\u0006expirybd�\u000bod\u0000\tpath_fromd\u0000\u0003nilm\u0000\u0000\u0000\u0012phauxth_session_idt\u0000\u0000\u0000\u0002m\u0000\u0000\u0000\nexpires_att\u0000\u0000\u0000\rd\u0000\n__struct__d\u0000\u000fElixir.DateTimed\u0000\bcalendard\u0000\u0013Elixir.Calendar.ISOd\u0000\u0003daya\u001ad\u0000\u0004houra\u0001d\u0000\u000bmicrosecondh\u0002b\u0000\u0006\u0015�a\u0006d\u0000\u0006minutea\u001bd\u0000\u0005montha\u0006d\u0000\u0006seconda4d\u0000\nstd_offseta\u0000d\u0000\ttime_zonem\u0000\u0000\u0000\u0007Etc/UTCd\u0000\nutc_offseta\u0000d\u0000\u0004yearb\u0000\u0000\u0007�d\u0000\tzone_abbrm\u0000\u0000\u0000\u0003UTCm\u0000\u0000\u0000\nsession_idm\u0000\u0000\u0000\u0010Svwm86wS8CNVt5RT"

*/

$idno = '12500766';
$dt1 = idSearchKRA($idno);
//$dt1 = innerFetch($idno);
echo $dt1;
