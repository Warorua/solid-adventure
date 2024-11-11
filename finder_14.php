<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;

//include './includes/core.php';

include './includes/core2.php';
//$brs_pin = 

if (isset($brs_pin)) {
    $doc_active = TRUE;
    $kra = $object_1['kra'] = $brs_pin;
    if ($kra != '' && strlen($kra) > 4) {
        $url = 'https://itax.kra.go.ke/KRA-Portal/eTreAmendment.htm?actionCode=loadViewProfile&taxPayerPin=' . $kra;

        $fields = array(
            'applicantType' => 'taxpayer',
            'cmbTaxpayerType' => 'INDI',
            'fieldsToSkip' => 'representativeName,taxPayerName',
            'representativeName' => '',
            'representativePin' => '',
            //'taxPayerName' => $fullname,
            'taxPayerPin' => $kra,
            'viewProfileFlag' => 'Y',
        );


        $dt3 = httpPost($url, $fields);
        //   $data = $dt3;
        $object_101 = scrape_2($dt3);
        if (is_array($object_101)) {
            foreach ($object_101 as $id => $object_102) {
                $object_1[$id] = $object_102;
            }
        }
        //$object_1 = $dt3;
        //$object .= 'KRA = ' . $dt2['profile']['kra_pin'] . '<br/>';
    }
}