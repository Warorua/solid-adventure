<?php

require_once('../vendor/autoload.php');

// Fingerprint Pro Secret API Key
const FPJS_API_SECRET = "sfT7IfxPSAYt2ExFiOmF";


// A mandatory visitorId of a specific visitor
$FPJS_VISITOR_ID = $_POST['visitor'];


// An optional requestId made by a specific visitor
//const FPJS_REQUEST_ID = "1677964683050.KTSf70";
const FPJS_REQUEST_ID = "";
// An optional linkedId of the visit
const FPJS_LINKED_ID = "linkedId";
// An optional parameter limiting scanned results
const LIMIT = 10;
// An optional parameter used to paginate results, see lastTimestamp
const BEFORE = 1;

// Import Fingerprint Pro Classes and Guzzle Http Client
use Fingerprint\ServerAPI\Api\FingerprintApi;
use Fingerprint\ServerAPI\Configuration;
use GuzzleHttp\Client;

// Create a new Configuration instance with your Fingerprint Pro Server API Key and your Fingerprint Pro Server API Region.
/**
 * You can specify a region on getDefaultConfiguration function's second parameter
 * If you leave the second parameter empty, then Configuration::REGION_GLOBAL will be used as a default region
 * Options for regions are:
 * Configuration::REGION_EUROPE
 * Congiruration::REGION_GLOBAL
 * Configuration::REGION_ASIA
 */

 $obj = '';
$config = Configuration::getDefaultConfiguration(FPJS_API_SECRET, Configuration::REGION_GLOBAL);
$client = new FingerprintApi(
    new Client(),
    $config
);

// Get a specific visitor's all visits
try {
    // Fetch all visits with a given visitorId, with a page limit
    $response = $client->getVisits($FPJS_VISITOR_ID, null, null, LIMIT);
    $dt1 = $response->__toString();
    $obj .= "<pre>" . $dt1 . "</pre>";
    $dt2 = json_decode($dt1, true);

} catch (Exception $e) {
    $obj .= 'Exception when calling FingerprintApi->getEvent: '. $e->getMessage(). PHP_EOL;
}

// Get a specific visitor's all visits with a linkedId
try {
    // Fetch all visits with a given visitorId, with a page limit, skipping the first visit
    $response = $client->getVisits($FPJS_VISITOR_ID, null, FPJS_LINKED_ID, LIMIT, BEFORE);
    $obj .= "<pre>" . $response->__toString() . "</pre>";
} catch (Exception $e) {
    $obj .= 'Exception when calling FingerprintApi->getEvent: '. $e->getMessage(). PHP_EOL;
}

// Use all the parameters on getVisits
try {
    // Fetch the visitor's all visits with a given requestId and linkedId with a page limit while skipping the first visit
    $response = $client->getVisits($FPJS_VISITOR_ID, FPJS_REQUEST_ID, FPJS_LINKED_ID, LIMIT, BEFORE);
    $obj .= "<pre>" . $response->__toString() . "</pre>";
} catch (Exception $e) {
    $obj .= 'Exception when calling FingerprintApi->getEvent: '. $e->getMessage(). PHP_EOL;
}

// Get an event with a given requestId
try {
    // Fetch the event with a given requestId
    $response = $client->getEvent(FPJS_REQUEST_ID);
    $obj .= "<pre>" . $response->__toString() . "</pre>";
} catch (Exception $e) {
    $obj .= 'Exception when calling FingerprintApi->getEvent: '. $e->getMessage(). PHP_EOL;
}

echo $obj;
$cookie_name = "visitorId";
$cookie_value = $dt2['visitorId'];
setcookie($cookie_name, $cookie_value, time() + (86400 * 365), "/");

echo $dt2['visitorId'];

