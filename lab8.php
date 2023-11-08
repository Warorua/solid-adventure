<?php

use WebSocket\Client;

include './includes/core_ws.php';


function websocket($url, $payload, $headers = [])
{
    // Create a WebSocket client instance
    // $client = new Client($url);

    // Send the JSON payload

    $context = stream_context_create();
    //stream_context_set_option($context, 'ssl', 'verify_peer', false);
    //stream_context_set_option($context, 'ssl', 'verify_peer_name', false);

    $client = new WebSocket\Client($url, [
        'timeout' => 60, // 1 minute time out
        //'context' => $context,
        'fragment_size' => 5000,
        'headers' => $headers,
    ]);

    $client->send($payload);

    // Receive and display the response
    $response = $client->receive();

    // Close the WebSocket connection
    $client->close();

    return $response;
}

$url = 'wss://accounts.ecitizen.go.ke/live/websocket?_csrf_token=GWsRWDQ4cxB-HF8SEgBYB0osPFYJKAtZJFgjWtJy8XiabSa6-ZydCnQ2&_track_static%5B0%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fimages%2Ffavicon.ico&_track_static%5B1%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-25dc2cd4f32ad0d3f9adc232428c773d.css%3Fvsn%3Dd&_track_static%5B2%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-7ffaba9f01dbeaca6aba6a5ca02c109a.js%3Fvsn%3Dd&_mounts=0&_live_referer=undefined&vsn=2.0.0';
//$url = 'wss://accounts.ecitizen.go.ke/live/websocket?vsn=2.0.0';

// JSON payload
$payload = '[null,"8","phoenix","heartbeat",{}]';
//$payload = '["4","4","lv:phx-F2Tx4RwPUTuLylyC","phx_join",{"url":"https://accounts.ecitizen.go.ke/login/verify-login","params":{"_csrf_token":"GWsRWDQ4cxB-HF8SEgBYB0osPFYJKAtZJFgjWtJy8XiabSa6-ZydCnQ2","_track_static":["https://accounts.ecitizen.go.ke/images/favicon.ico","https://accounts.ecitizen.go.ke/assets/app-25dc2cd4f32ad0d3f9adc232428c773d.css?vsn=d","https://accounts.ecitizen.go.ke/assets/app-7ffaba9f01dbeaca6aba6a5ca02c109a.js?vsn=d"],"_mounts":0},"session":"SFMyNTY.g2gDaAJhBXQAAAAIdwJpZG0AAAAUcGh4LUYyVHg0UndQVVR1THlseUN3BHZpZXd3KkVsaXhpci5TaW5nbGVTaWdub25XZWIuTG9naW4uT1RQTGl2ZS5JbmRleHcKcGFyZW50X3BpZHcDbmlsdwdzZXNzaW9udAAAAAB3BnJvdXRlcncdRWxpeGlyLlNpbmdsZVNpZ25vbldlYi5Sb3V0ZXJ3CHJvb3RfcGlkdwNuaWx3DGxpdmVfc2Vzc2lvbmgCdxBhdXRob3JpemVkX3Jlc2V0bggArQunlTvSZBd3CXJvb3Rfdmlld3cqRWxpeGlyLlNpbmdsZVNpZ25vbldlYi5Mb2dpbi5PVFBMaXZlLkluZGV4bgYA9DrSfYgBYgABUYA.a-YrIMZHGWx1zMeRperLUEzN00RUc23fpJ-xRuL26nk","static":"SFMyNTY.g2gDaAJhBXQAAAADdwJpZG0AAAAUcGh4LUYyVHg0UndQVVR1THlseUN3BWZsYXNodAAAAAB3CmFzc2lnbl9uZXdsAAAAAncMY3VycmVudF91c2VydxNsb2dpbl9vdHBfdmVyaWZpZWQ_am4GAPQ60n2IAWIAAVGA.alMKBzfzZ_3euuHmotE9igck8zd8ydbpRK5A1l6puYU"}]';
//$payload = json_decode($payload);
//$payload = '["4","8","lv:phx-F2SXqXLvCdhZ8byC","event",{"type":"click","event":"send_otp","value":{"channel":"email"}}]';

//echo websocket($url, $payload);
/*
$url_1 = '';
$data = ['otp[otp]'];

echo httpPost($url_1, $data);
//*/

$data = authorize();
function eCitizenWs($data)
{
    $csrf = $data['csrf'];
    $session = $data['session'];
    $static = $data['static'];
    $id = $data['id'];
    //eCitizenWsAuth($csrf);
    $url = 'wss://accounts.ecitizen.go.ke/live/websocket?_csrf_token=' . $csrf . '&_track_static%5B0%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fimages%2Ffavicon.ico&_track_static%5B1%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-25dc2cd4f32ad0d3f9adc232428c773d.css%3Fvsn%3Dd&_track_static%5B2%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-7ffaba9f01dbeaca6aba6a5ca02c109a.js%3Fvsn%3Dd&_mounts=0&_live_referer=undefined&vsn=2.0.0';
    //$url = 'wss://accounts.ecitizen.go.ke/live/websocket?vsn=2.0.0';
    //$url = 'wss://accounts.ecitizen.go.ke/live/websocket?_csrf_token=' . $csrf . '&_track_static%5B0%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fimages%2Ffavicon.ico&_track_static%5B1%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-25dc2cd4f32ad0d3f9adc232428c773d.css%3Fvsn%3Dd&_track_static%5B2%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-7ffaba9f01dbeaca6aba6a5ca02c109a.js%3Fvsn%3Dd&_mounts=0&_live_referer=undefined&vsn=2.0.0';
    //
    //$payload = '["4","8","lv:phx-F2Tx4RwPUTuLylyC","event",{"type":"click","event":"send_otp","value":{"channel":"email"}}]';
    $payload = '[
     "4",
     "4",
     "lv:' . $id . '",
    "phx_join",
    {"url":"https://accounts.ecitizen.go.ke/login/verify-login",
        "params":{"_csrf_token":"' . $csrf . '",
            "_track_static":["https://accounts.ecitizen.go.ke/images/favicon.ico",
            "https://accounts.ecitizen.go.ke/assets/app-25dc2cd4f32ad0d3f9adc232428c773d.css?vsn=d",
            "https://accounts.ecitizen.go.ke/assets/app-7ffaba9f01dbeaca6aba6a5ca02c109a.js?vsn=d"],
            "_mounts":0
        },
        "session":"' . $session . '",
        "static":"' . $static . '"
    }]';
    $payload = '["4","8","lv:' . $id . '","event",{"type":"click","event":"send_otp","value":{"channel":"email"}}]';
    $headers = array(
        'Sec-WebSocket-Key: RKW079uIy3woMoDndBGNJg==',
        'Sec-WebSocket-Version: 13',
        //'Cookie: SERVER=web1; _gid=GA1.3.1046363204.1685663264; _ga=GA1.1.269279297.1685656790; _ga_77YDZ21Z7R=GS1.1.1685738042.3.0.1685738042.0.0.0; _ga_VGDNZMLX1M=GS1.1.1685738054.4.1.1685738109.0.0.0; _single_signon_key=SFMyNTY.g3QAAAAFbQAAAAtfY3NyZl90b2tlbm0AAAAYUy12MmNMOWlGRDZzcFM5MWd2RTJKRlprbQAAABVhdXRoX2N1cnJlbnRfcmVzb3VyY2V0AAAAHHcGYWN0aXZldwVmYWxzZXcCaWRiAJY7Q3cKX19zdHJ1Y3RfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2VydwhwYXNzd29yZG0AAAA8JDJiJDEwJFRHb0V5RGZ2SFlFUEtqcU9GUWQ4LmVZb1FXY1lGUldBZVRKdkE3Y0ZSREl4R2U1SHBVZzAudwhfX21ldGFfX3QAAAAGdwVzdGF0ZXcGbG9hZGVkdwdjb250ZXh0dwNuaWx3BnByZWZpeHcDbmlsdwZzb3VyY2VtAAAABXVzZXJzdwpfX3N0cnVjdF9fdxtFbGl4aXIuRWN0by5TY2hlbWEuTWV0YWRhdGF3BnNjaGVtYXcYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydwp1cGRhdGVkX2F0dAAAAAl3C21pY3Jvc2Vjb25kaAJhAGEAdwZzZWNvbmRhEHcIY2FsZW5kYXJ3E0VsaXhpci5DYWxlbmRhci5JU093BW1vbnRoYQZ3Cl9fc3RydWN0X193FEVsaXhpci5OYWl2ZURhdGVUaW1ldwR5ZWFyYgAAB-d3BGhvdXJhFHcDZGF5YQJ3Bm1pbnV0ZWEgdwVlbWFpbG0AAAAYV2Fyb3J1YWFsZXg2NDBAZ21haWwuY29tdwh2ZXJpZmllZHcEdHJ1ZXcJaWRfbnVtYmVybQAAAAgzOTI5MDk3NHcIc2Vzc2lvbnN0AAAABHcKX19zdHJ1Y3RfX3chRWxpeGlyLkVjdG8uQXNzb2NpYXRpb24uTm90TG9hZGVkdwlfX2ZpZWxkX193CHNlc3Npb25zdwlfX293bmVyX193GEVsaXhpci5TaW5nbGVTaWdub24uVXNlcncPX19jYXJkaW5hbGl0eV9fdwRtYW55dwVyb2xlc3QAAAAEdwpfX3N0cnVjdF9fdyFFbGl4aXIuRWN0by5Bc3NvY2lhdGlvbi5Ob3RMb2FkZWR3CV9fZmllbGRfX3cFcm9sZXN3CV9fb3duZXJfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydw9fX2NhcmRpbmFsaXR5X193BG1hbnl3CnVzZXJfcm9sZXN0AAAABHcKX19zdHJ1Y3RfX3chRWxpeGlyLkVjdG8uQXNzb2NpYXRpb24uTm90TG9hZGVkdwlfX2ZpZWxkX193CnVzZXJfcm9sZXN3CV9fb3duZXJfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydw9fX2NhcmRpbmFsaXR5X193BG1hbnl3CmNyZWF0ZWRfYXR0AAAACXcLbWljcm9zZWNvbmRoAmEAYQB3BnNlY29uZGEFdwhjYWxlbmRhcncTRWxpeGlyLkNhbGVuZGFyLklTT3cFbW9udGhhCHcKX19zdHJ1Y3RfX3cURWxpeGlyLk5haXZlRGF0ZVRpbWV3BHllYXJiAAAH5HcEaG91cmESdwNkYXlhGHcGbWludXRlYSp3DW1vYmlsZV9udW1iZXJtAAAADSsyNTQ3OTMwNjAxNjR3DWxhc3RfbG9naW5fYXR0AAAACXcLbWljcm9zZWNvbmRoAmEAYQB3BnNlY29uZGEQdwhjYWxlbmRhcncTRWxpeGlyLkNhbGVuZGFyLklTT3cFbW9udGhhBncKX19zdHJ1Y3RfX3cURWxpeGlyLk5haXZlRGF0ZVRpbWV3BHllYXJiAAAH53cEaG91cmEUdwNkYXlhAncGbWludXRlYSB3DGFjY291bnRfdHlwZW0AAAAHY2l0aXplbncKZmlyc3RfbmFtZW0AAAAEQUxFWHcGZ2VuZGVybQAAAAFNdwlsYXN0X25hbWVtAAAACldBTkcnQU5HJ0F3D21vYmlsZV92ZXJpZmllZHcEdHJ1ZXcQYnVzaW5lc3NfcHJvZmlsZXQAAAAEdwpfX3N0cnVjdF9fdyFFbGl4aXIuRWN0by5Bc3NvY2lhdGlvbi5Ob3RMb2FkZWR3CV9fZmllbGRfX3cQYnVzaW5lc3NfcHJvZmlsZXcJX19vd25lcl9fdxhFbGl4aXIuU2luZ2xlU2lnbm9uLlVzZXJ3D19fY2FyZGluYWxpdHlfX3cDb25ldwx1c2VyX3Byb2ZpbGV0AAAABHcKX19zdHJ1Y3RfX3chRWxpeGlyLkVjdG8uQXNzb2NpYXRpb24uTm90TG9hZGVkdwlfX2ZpZWxkX193DHVzZXJfcHJvZmlsZXcJX19vd25lcl9fdxhFbGl4aXIuU2luZ2xlU2lnbm9uLlVzZXJ3D19fY2FyZGluYWxpdHlfX3cDb25ldwtjaXRpemVuc2hpcG0AAAACS0V3B3N1cm5hbWVtAAAAB1dBUk9SVUF3DnRlcm1zX2FjY2VwdGVkdwVmYWxzZXcKZGVsZXRlZF9hdHcDbmlsdwhpc19hZG1pbncFZmFsc2V3FnJlcXVpcmVfcGFzc3dvcmRfcmVzZXR3BWZhbHNlbQAAAA9hdXRoX2V4cGlyZXNfYXR0AAAADXcLbWljcm9zZWNvbmRoAmIACiJOYQZ3BnNlY29uZGEJdwhjYWxlbmRhcncTRWxpeGlyLkNhbGVuZGFyLklTT3cFbW9udGhhBncKc3RkX29mZnNldGEAdwp1dGNfb2Zmc2V0YQB3CXpvbmVfYWJicm0AAAADVVRDdwpfX3N0cnVjdF9fdw9FbGl4aXIuRGF0ZVRpbWV3BHllYXJiAAAH53cEaG91cmEUdwNkYXlhAncGbWludXRlYTJ3CXRpbWVfem9uZW0AAAAHRXRjL1VUQ20AAAAPY3VycmVudF9zZXNzaW9ubQAAACB2b3RoaWFsd3g1U21hREdJcWM1RHAwK1NRQ09zSCtMa20AAAAKcmV0dXJuX3VybG0AAABDL2F1dGhvcml6ZT9yZXR1cm5fdXJsPWh0dHBzOi8vYnJzLmVjaXRpemVuLmdvLmtlL2F1dGgvc3NvLWF1dGhvcml6ZQ.sdqknzWRXwIw3GZC0JaCbY0AkO8ofbeO8W6uSj1LJ58',
        'Cookie: SERVER='.readAuthorizeServer().'; _gid=GA1.3.1046363204.1685663264; _ga=GA1.1.269279297.1685656790; _ga_77YDZ21Z7R=GS1.1.1685738042.3.0.1685738042.0.0.0; _ga_VGDNZMLX1M=GS1.1.1685738054.4.1.1685738109.0.0.0; _single_signon_key='.readAuthorizeKey(),
        
        'Upgrade: websocket',
        'Host: accounts.ecitizen.go.ke',
        'Pragma: no-cache',
        'Accept-Encoding: gzip, deflate',
        'Connection: Upgrade',
        'Cache-Control: no-cache',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Origin: https://accounts.ecitizen.go.ke',



    );
    //$headers = [];
    echo json_encode($headers). '<br><br><br>';
    echo $payload. '<br><br><br>';
    echo $url. '<br><br><br>';
    return websocket($url, $payload, $headers);
    //return json_encode($headers);
}

function eCitizenWsAuth($data)
{
    
    $csrf = $data['csrf'];
    //$csrf = 'Ly9dOys5PA8GCQorOgstPEQTBRAWcA8WdZ6ILNp6A_KywMFKtb_yzHjW';
    $url = 'https://accounts.ecitizen.go.ke/live/websocket?_csrf_token=' . $csrf . '&_track_static%5B0%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fimages%2Ffavicon.ico&_track_static%5B1%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-25dc2cd4f32ad0d3f9adc232428c773d.css%3Fvsn%3Dd&_track_static%5B2%5D=https%3A%2F%2Faccounts.ecitizen.go.ke%2Fassets%2Fapp-7ffaba9f01dbeaca6aba6a5ca02c109a.js%3Fvsn%3Dd&_mounts=0&_live_referer=undefined&vsn=2.0.0';
    //$url = 'https://kever.io/lab16.php';
   $payload = '';
    return websocket(
        $url,
        $payload,
        array(
            'Host: accounts.ecitizen.go.ke',
            'Connection: Upgrade',
            'Pragma: no-cache',
            'Cache-Control: no-cache',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Upgrade: websocket',
            'Origin: https://accounts.ecitizen.go.ke',
            'Sec-WebSocket-Version: 13',
            'Accept-Encoding: gzip, deflate',
            'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8',
            'Sec-WebSocket-Key: bjDtcpUN3I893Br4QqDCCw==',
            'Cookie: SERVER=web1;  _single_signon_key=SFMyNTY.g3QAAAAFbQAAAAtfY3NyZl90b2tlbm0AAAAYS3Vrcmd3TDlHVkFSTUZrdzBxWmlsOGVBbQAAABVhdXRoX2N1cnJlbnRfcmVzb3VyY2V0AAAAHHcGYWN0aXZldwVmYWxzZXcCaWRiAJY7Q3cKX19zdHJ1Y3RfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2VydwhwYXNzd29yZG0AAAA8JDJiJDEwJFRHb0V5RGZ2SFlFUEtqcU9GUWQ4LmVZb1FXY1lGUldBZVRKdkE3Y0ZSREl4R2U1SHBVZzAudwhfX21ldGFfX3QAAAAGdwVzdGF0ZXcGbG9hZGVkdwdjb250ZXh0dwNuaWx3BnByZWZpeHcDbmlsdwZzb3VyY2VtAAAABXVzZXJzdwpfX3N0cnVjdF9fdxtFbGl4aXIuRWN0by5TY2hlbWEuTWV0YWRhdGF3BnNjaGVtYXcYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydwp1cGRhdGVkX2F0dAAAAAl3C21pY3Jvc2Vjb25kaAJhAGEAdwZzZWNvbmRhGHcIY2FsZW5kYXJ3E0VsaXhpci5DYWxlbmRhci5JU093BW1vbnRoYQZ3Cl9fc3RydWN0X193FEVsaXhpci5OYWl2ZURhdGVUaW1ldwR5ZWFyYgAAB-d3BGhvdXJhEXcDZGF5YQF3Bm1pbnV0ZWECdwVlbWFpbG0AAAAYV2Fyb3J1YWFsZXg2NDBAZ21haWwuY29tdwh2ZXJpZmllZHcEdHJ1ZXcJaWRfbnVtYmVybQAAAAgzOTI5MDk3NHcIc2Vzc2lvbnN0AAAABHcKX19zdHJ1Y3RfX3chRWxpeGlyLkVjdG8uQXNzb2NpYXRpb24uTm90TG9hZGVkdwlfX2ZpZWxkX193CHNlc3Npb25zdwlfX293bmVyX193GEVsaXhpci5TaW5nbGVTaWdub24uVXNlcncPX19jYXJkaW5hbGl0eV9fdwRtYW55dwVyb2xlc3QAAAAEdwpfX3N0cnVjdF9fdyFFbGl4aXIuRWN0by5Bc3NvY2lhdGlvbi5Ob3RMb2FkZWR3CV9fZmllbGRfX3cFcm9sZXN3CV9fb3duZXJfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydw9fX2NhcmRpbmFsaXR5X193BG1hbnl3CnVzZXJfcm9sZXN0AAAABHcKX19zdHJ1Y3RfX3chRWxpeGlyLkVjdG8uQXNzb2NpYXRpb24uTm90TG9hZGVkdwlfX2ZpZWxkX193CnVzZXJfcm9sZXN3CV9fb3duZXJfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydw9fX2NhcmRpbmFsaXR5X193BG1hbnl3DWxhc3RfbG9naW5fYXR0AAAACXcLbWljcm9zZWNvbmRoAmEAYQB3BnNlY29uZGEYdwhjYWxlbmRhcncTRWxpeGlyLkNhbGVuZGFyLklTT3cFbW9udGhhBncKX19zdHJ1Y3RfX3cURWxpeGlyLk5haXZlRGF0ZVRpbWV3BHllYXJiAAAH53cEaG91cmERdwNkYXlhAXcGbWludXRlYQJ3CmNyZWF0ZWRfYXR0AAAACXcLbWljcm9zZWNvbmRoAmEAYQB3BnNlY29uZGEFdwhjYWxlbmRhcncTRWxpeGlyLkNhbGVuZGFyLklTT3cFbW9udGhhCHcKX19zdHJ1Y3RfX3cURWxpeGlyLk5haXZlRGF0ZVRpbWV3BHllYXJiAAAH5HcEaG91cmESdwNkYXlhGHcGbWludXRlYSp3CmZpcnN0X25hbWVtAAAABEFMRVh3CWxhc3RfbmFtZW0AAAAKV0FORydBTkcnQXcMdXNlcl9wcm9maWxldAAAAAR3Cl9fc3RydWN0X193IUVsaXhpci5FY3RvLkFzc29jaWF0aW9uLk5vdExvYWRlZHcJX19maWVsZF9fdwx1c2VyX3Byb2ZpbGV3CV9fb3duZXJfX3cYRWxpeGlyLlNpbmdsZVNpZ25vbi5Vc2Vydw9fX2NhcmRpbmFsaXR5X193A29uZXcMYWNjb3VudF90eXBlbQAAAAdjaXRpemVudxBidXNpbmVzc19wcm9maWxldAAAAAR3Cl9fc3RydWN0X193IUVsaXhpci5FY3RvLkFzc29jaWF0aW9uLk5vdExvYWRlZHcJX19maWVsZF9fdxBidXNpbmVzc19wcm9maWxldwlfX293bmVyX193GEVsaXhpci5TaW5nbGVTaWdub24uVXNlcncPX19jYXJkaW5hbGl0eV9fdwNvbmV3C2NpdGl6ZW5zaGlwbQAAAAJLRXcKZGVsZXRlZF9hdHcDbmlsdwZnZW5kZXJtAAAAAU13CGlzX2FkbWludwVmYWxzZXcNbW9iaWxlX251bWJlcm0AAAANKzI1NDc5MzA2MDE2NHcPbW9iaWxlX3ZlcmlmaWVkdwR0cnVldxZyZXF1aXJlX3Bhc3N3b3JkX3Jlc2V0dwVmYWxzZXcHc3VybmFtZW0AAAAHV0FST1JVQXcOdGVybXNfYWNjZXB0ZWR3BWZhbHNlbQAAAA9hdXRoX2V4cGlyZXNfYXR0AAAADXcLbWljcm9zZWNvbmRoAmIACTOfYQZ3BnNlY29uZGEDdwhjYWxlbmRhcncTRWxpeGlyLkNhbGVuZGFyLklTT3cFbW9udGhhBncKX19zdHJ1Y3RfX3cPRWxpeGlyLkRhdGVUaW1ldwp1dGNfb2Zmc2V0YQB3CnN0ZF9vZmZzZXRhAHcEeWVhcmIAAAfndwRob3VyYRJ3A2RheWEBdwl6b25lX2FiYnJtAAAAA1VUQ3cGbWludXRlYTl3CXRpbWVfem9uZW0AAAAHRXRjL1VUQ20AAAAPY3VycmVudF9zZXNzaW9ubQAAACBNWk00SlFjWFkxV2svUTVRYmo0WlE1eG0xK2ZmbjA4RG0AAAAKcmV0dXJuX3VybG0AAABDL2F1dGhvcml6ZT9yZXR1cm5fdXJsPWh0dHBzOi8vYnJzLmVjaXRpemVuLmdvLmtlL2F1dGgvc3NvLWF1dGhvcml6ZQ.qohLSW4ts84BMHlAR2Lb3-3sNcTbrBcHX-ACXUQxzSg',
        )
    );
    //*/
}
function readAuthorizeKey()
{
    $cookiesFile = './cookies/_single_signon_key_authorize.txt';
    $dt1 = file_get_contents($cookiesFile);
    $dt1 = str_replace('_single_signon_key', '', removeBeforeWord($dt1, '_single_signon_key'));
    $pattern = '/\s*/m';
    $replace = '';
    $dt1 = preg_replace($pattern, $replace, $dt1);
    return $dt1;
}
function readAuthorizeServer()
{
    $cookiesFile = './cookies/_single_signon_key_authorize.txt';
    $dt1 = file_get_contents($cookiesFile);
    $dt1 = str_replace('SERVER', '', removeBeforeWord($dt1, 'SERVER'));
    $dt1 = str_replace('#HttpOnly_accounts.ecitizen.go.ke', '', removeAfterWord($dt1, '#HttpOnly_accounts.ecitizen.go.ke'));
    $pattern = '/\s*/m';
    $replace = '';
    $dt1 = preg_replace($pattern, $replace, $dt1);
    return $dt1;
}
//$data = '';
//echo eCitizenWsAuth($data);
//echo readAuthorizeKey();
//echo json_encode($data);
//echo readAuthorizeServer();
echo eCitizenWs($data);
//echo readkey("_single_signon_key_login");
