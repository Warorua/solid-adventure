<?php
if (isset($path)) {
    $path = $path;
} elseif (file_exists("./vendor/autoload.php")) {
    require_once './vendor/autoload.php';
    $path = "./";
} elseif (file_exists("../vendor/autoload.php")) {
    require_once '../vendor/autoload.php';
    $path = "../";
} elseif (file_exists("../../vendor/autoload.php")) {
    require_once '../../vendor/autoload.php';
    $path = "../../";
}

if (!function_exists('securityGuard')) {
    function securityGuard($filename)
    {
        $script1 = str_replace('/kever/', '', $_SERVER['PHP_SELF']);
        $script2 = str_replace('/', '', $script1);
        $file = json_decode(file_get_contents($filename), true);
        //rateLimit($file['request_limit'], $file['request_interval'], $ip);
        if ($file == null) {
            $file = [];
            if (isset($_SESSION['authorizedUserToken'])) {
                unset($_SESSION['authorizedUserToken']);
            }
            $_SESSION['error'] = 'False -1: Verif script offline!';
        }

        if (isset($file[$_COOKIE['visitorId']]['banned'])) {
            if ($file[$_COOKIE['visitorId']]['banned']) {
                return 'Ban';
            }
        }

        if ($script2 != 'fingerprint.php' && !array_key_exists($_COOKIE['visitorId'], $file)) {
            if (isset($_SESSION['authorizedUserToken'])) {
                unset($_SESSION['authorizedUserToken']);
            }
            //////////////////////////////////////////////////////////////////////////////////////////////
            $_SESSION['error'] = 'False 0: Unauthorized visitor!';
            header('location: https://via.placeholder.com/1200x800/e81919/262424?text=You+are+not+authorized+to+visit+that+site+False+0');
        } elseif (!$file[$_COOKIE['visitorId']]['member']) {
            if (!rateLimit($file[$_COOKIE['visitorId']]['request_limit'], $file[$_COOKIE['visitorId']]['request_interval'], $_COOKIE['visitorId'])) {
                if (isset($_SESSION['authorizedUserToken'])) {
                    unset($_SESSION['authorizedUserToken']);
                }
                $_SESSION['error'] = 'False 1: Authorization limit expired or reached!';
                if ($script2 != 'fingerprint.php') {
                    header('location: ./fingerprint.php');
                }
            } elseif (!$file[$_COOKIE['visitorId']]['active']) {
                if (isset($_SESSION['authorizedUserToken'])) {
                    unset($_SESSION['authorizedUserToken']);
                }
                $_SESSION['error'] = 'False 2: Inactive/Anonymous member!';
                header('location: https://via.placeholder.com/1200x800/e81919/262424?text=Inactive+member+False+2');
            } else {
                $_SESSION['authorizedUserToken'] = '';
                return 'True';
            }
        } else {
            if (rateLimit($file[$_COOKIE['visitorId']]['request_limit'], $file[$_COOKIE['visitorId']]['request_interval'], $_COOKIE['visitorId'])) {
                $_SESSION['authorizedUserToken'] = '';
                return 'True';
            } else {
                $_SESSION['error'] = 'False 4: API overlimit warning!';
                $_SESSION['authorizedUserToken'] = '';
                return 'True';
            }
        }
    }
}
if (!function_exists('rateLimit')) {
    function rateLimit($limit, $duration, $ip)
    {
        global $path;
        if ($limit == null && $duration == null) {
            $duration = 7200;
            $limit = 2;
        }
        $file = $path . '/includes/theSecurityTimeLimitTokenStorage223.json'; // Path to the rate limit file
        $currentTime = time();

        // Read the rate limit data from the file
        $rateLimitData = file_get_contents($file);
        $rateLimitData = json_decode($rateLimitData, true);

        // Clean up expired rate limit data
        $rateLimitData = cleanupRateLimitData($rateLimitData, $duration, $currentTime);


        // Check if the IP is already rate limited
        if (isset($rateLimitData[$ip])) {
            if (isset($rateLimitData[$ip]['last_request_time'])) {
                $lastRequestTime = $rateLimitData[$ip]['last_request_time'];
                $requestCount = $rateLimitData[$ip]['request_count'];

                // Check if the duration has passed since the last request
                if ($currentTime - $lastRequestTime >= $duration) {
                    // Reset the request count
                    $requestCount = 1;
                    $lastRequestTime = $currentTime;
                } else {
                    // Increment the request count
                    $requestCount++;
                    $lastRequestTime = max($lastRequestTime, $currentTime);
                }
            } else {
                $requestCount = 1;
                $lastRequestTime = $currentTime;
            }
        } else {
            // IP is not rate limited, initialize the data
            $requestCount = 1;
            $lastRequestTime = $currentTime;
        }

        // Update the rate limit data
        if (isset($rateLimitData[$ip]['total_requests'])) {
            $rateLimitData[$ip]['total_requests']++;
        } else {
            $rateLimitData[$ip]['total_requests'] = 1;
        }
        $rateLimitData[$ip]['request_count'] =  $requestCount;
        $rateLimitData[$ip]['last_request_time'] = $lastRequestTime;
        $rateLimitData[$ip]['request_limit'] = $rateLimitData[$ip]['request_limit'];
        $rateLimitData[$ip]['request_interval'] = $duration;
        if (isset($rateLimitData[$ip]['veto'])) {
            $rateLimitData[$ip]['veto'] = $rateLimitData[$ip]['veto'];
        } else {
            $rateLimitData[$ip]['veto'] = false;
        }

        if (isset($rateLimitData[$ip]['active'])) {
            $rateLimitData[$ip]['active'] = $rateLimitData[$ip]['active'];
        } else {
            $rateLimitData[$ip]['active'] = false;
        }

        if (isset($rateLimitData[$ip]['member'])) {
            $rateLimitData[$ip]['member'] = $rateLimitData[$ip]['member'];
        } else {
            $rateLimitData[$ip]['member'] = false;
        }


        if (isset($rateLimitData[$ip]['data'])) {
            $rateLimitData[$ip]['data'] = $rateLimitData[$ip]['data'];
        } else {
            $rateLimitData[$ip]['data'] = getUserInfo();
        }


        // Write the updated rate limit data to the file
        file_put_contents($file, json_encode($rateLimitData));

        // Check if the request count exceeds the limit
        if ($requestCount > $limit) {
            return false; // Request is rate limited
        }

        return true; // Request is allowed
    }
}
if (!function_exists('cleanupRateLimitData')) {
    function cleanupRateLimitData($rateLimitData, $duration, $currentTime)
    {
        foreach ($rateLimitData as $ip => $data) {
            if (isset($data['last_request_time'])) {
                $lastRequestTime = $data['last_request_time'];
                $member = $data['member'];

                // Check if the duration has passed since the last request
                if ($currentTime - $lastRequestTime < $duration) {
                    if ($member) {
                        $rateLimitData[$ip]['request_limit'] = 0;
                    } else {
                        $rateLimitData[$ip]['active'] = false;
                        // unset($rateLimitData[$ip]); // Remove expired record
                    }
                } else {
                    if ($member) {
                        $rateLimitData[$ip]['request_limit'] = 7200;
                    }
                }
            }
        }

        return $rateLimitData;
    }
}
if (!function_exists('getUserInfo')) {
    function getUserInfo()
    {
        $userInfo = array();

        // List of keys to retrieve from $_SERVER
        $keys = array(
            'REMOTE_ADDR',
            'HTTP_USER_AGENT',
            'HTTP_REFERER',
            'HTTP_ACCEPT_LANGUAGE'
        );

        // Additional keys for user information
        $additionalKeys = array(
            'HTTP_ACCEPT_CHARSET',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_CLIENT_IP',
            'HTTP_X_REQUESTED_WITH',
            'REMOTE_PORT',
            'SERVER_PROTOCOL',
            'REQUEST_METHOD',
            'SCRIPT_NAME',
            'REQUEST_TIME',
            'TIMEZONE',
            'GEOIP_CONTINENT_CODE',
            'GEOIP_COUNTRY_NAME',
            'GEOIP_CITY',
            'GEOIP_LATITUDE',
            'GEOIP_LONGITUDE',
            'CONTINENT',
            'HTTP_ACCEPT_LANGUAGE',
            'GEOIP_ORGANIZATION',
            'GEOIP_ISP',
            'HTTP_SEC_CH_UA_PLATFORM'
        );

        $keys = array_merge($keys, $additionalKeys);

        foreach ($keys as $key) {
            // Check if the key exists in $_SERVER
            if (isset($_SERVER[$key])) {
                $userInfo[$key] = $_SERVER[$key];
            } else {
                // Key is not available, assign a default value or leave it empty
                $userInfo[$key] = '';
            }
        }

        // Convert the user info array to JSON
        $json = $userInfo;
        //$json = json_encode($userInfo);

        return $json;
    }
}
