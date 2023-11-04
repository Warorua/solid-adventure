<?php
include './includes/sql_conn_lab.php';

//$responseQuery = json_decode(base64_decode($_GET['query']), true);

//$processQuery = json_decode(base64_decode($_GET['q']), true);
$stateCodeQuery = json_decode(base64_decode($_GET['statecode']), true);
$stateObjectQuery = json_decode(base64_decode($_GET['stateobject']), true);

$stateObjectQuery_query = json_decode(base64_decode($stateObjectQuery['query']), true);

$responseQuery = $stateObjectQuery_query;

//*
$stateObjectQuery['statecode'] = $_GET['statecode'];

$charposp = $responseQuery['charpos'];
$paramp = $responseQuery['param'];
$targetp = $responseQuery['target'];
$sleepp = $responseQuery['sleep'];

if (count($stateCodeQuery) < 2) {
    if ($stateObjectQuery['f'] == 'L') {
        echo length_finder($sleepp, $targetp, $paramp, $stateObjectQuery) . '<BR/>';
    } else {
        echo character_finder($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>';
    }
} else {
    $eval = evaluateArray($stateCodeQuery);

    if ($eval == false) {
        echo length_finder($sleepp, $targetp, $paramp, $stateObjectQuery) . '<BR/>';
    } else {
        if ($eval == true) {
            $result = $stateCodeQuery[0];
        } else {
            $result = $eval;
        }
        /*
        if (isset($stateObjectQuery['pr'])) {
            $pr1 = base64_decode($stateObjectQuery['pr']);
            $pr2 = $pr1 . '-' . $result;
            $progress = base64_encode($pr2);
        } else {
            $progress = base64_encode($result);
        }
        //*/
        if ($stateObjectQuery['f'] == 'L') {
            $file = './pftb/tableColumns.json';
            if (!file_exists($file)) {
                $file_data = [$stateObjectQuery['tb'] => [$stateObjectQuery['cl'] => $result]];
                //  $file_data = [$stateObjectQuery['tb'] => ['sd_'.$stateObjectQuery['cl'] => $stateCodeQuery]];
                //$file_json = json_encode($file_data);
            } else {
                $file_data = json_decode(file_get_contents($file), true);
                //array_push($file_data, [$stateObjectQuery['tb'] => $pr2]);
                $file_data[$stateObjectQuery['tb']][$stateObjectQuery['cl']] = $result;
                // $file_data[$stateObjectQuery['tb']]['sd_'.$stateObjectQuery['cl']] = $stateCodeQuery;
            }
            $file_json = json_encode($file_data);
            build_file($file, $file_json);

            if ($stateObjectQuery['cl'] == $stateObjectQuery['ttcm']) {
                if (isset($stateObjectQuery['pr'])) {
                    $pr1 = base64_decode($stateObjectQuery['pr']);
                    $pr2 = $pr1 . '-' . $result;
                    $progress = base64_encode($pr2);
                } else {
                    $progress = base64_encode($result);
                }
                $nt = 'p1';
                httpGet('https://localhost/kever/sql.php', ['result' => $progress]);
                //header('location: sql.php?result=' . $progress);
            } else {
                $stateObjectQuery['cl'] = $stateObjectQuery['cl'] + 1;
                $continueObj = base64_encode(json_encode($stateObjectQuery));
                $nt = 'p2';
                $respPage = 'sql.php?cont=' . $continueObj . '&pr=' . $progress;

                httpGet('https://localhost/kever/sql.php', ['cont' => $continueObj, 'pr' => $progress]);
                // header('location: ' . $respPage);
            }
        } else {
            $file = './pftb/tableColumnNames.json';
            if (!file_exists($file)) {
                $file_data = [$stateObjectQuery['tb'] => [$stateObjectQuery['cl'] => [$charposp => $result]]];
                //  $file_data = [$stateObjectQuery['tb'] => ['sd_'.$stateObjectQuery['cl'] => $stateCodeQuery]];
                //$file_json = json_encode($file_data);
            } else {
                $file_data = json_decode(file_get_contents($file), true);
                //array_push($file_data, [$stateObjectQuery['tb'] => $pr2]);
                $file_data[$stateObjectQuery['tb']][$stateObjectQuery['cl']][$charposp] = $result;
                // $file_data[$stateObjectQuery['tb']]['sd_'.$stateObjectQuery['cl']] = $stateCodeQuery;
            }
            $file_json = json_encode($file_data);
            build_file($file, $file_json);

            if ($stateObjectQuery['charpos'] == $stateObjectQuery['lngth']) {
                if (isset($stateObjectQuery['pr'])) {
                    $pr1 = base64_decode($stateObjectQuery['pr']);
                    $pr2 = $pr1 . '-' . $result;
                    $progress = base64_encode($pr2);
                } else {
                    $progress = base64_encode($result);
                }
                $nt = 'p1';
                httpGet('https://localhost/kever/sql.php', ['result' => $progress]);
                //header('location: sql.php?result=' . $progress);
            } else {
                $stateObjectQuery['charpos'] = $stateObjectQuery['charpos'] + 1;
                $continueObj = base64_encode(json_encode($stateObjectQuery));
                $nt = 'p2';
                $respPage = 'sql.php?cont=' . $continueObj . '&pr=' . $progress;
                httpGet('https://localhost/kever/sql.php', ['cont' => $continueObj, 'pr' => $progress]);
                // header('location: ' . $respPage);
            }
        }


        //*/

        //*
        echo json_encode($stateCodeQuery) . '<br/><br/>';
        echo json_encode($stateObjectQuery) . '<br/><br/>';
        echo json_encode($responseQuery) . '<br/><br/>';
        echo json_encode($stateObjectQuery_query) . '<br/><br/>';
        echo count($stateCodeQuery) . '<br/><br/>';
        echo $responseQuery['param'] . '<br/><br/>';
        echo $respPage . '<br/><br/>';
        echo $nt . '<br/><br/>';
        //*/

    }
}
echo date('H:i:s');
//$_SESSION[$processQuery['tb'].'_'.$processQuery['cl']] = [];
//session_unset();
//session_reset();
//unset($_SESSION[$processQuery['tb'].'_'.$processQuery['cl']]);
//https://localhost/kever/sql.php

function sql_verif($statecode, $stateobject)
{
    //$responseQuery = json_decode(base64_decode($_GET['query']), true);

    //$processQuery = json_decode(base64_decode($_GET['q']), true);
    $stateCodeQuery = json_decode(base64_decode($statecode), true);
    $stateObjectQuery = json_decode(base64_decode($stateobject), true);

    $stateObjectQuery_query = json_decode(base64_decode($stateObjectQuery['query']), true);

    $responseQuery = $stateObjectQuery_query;

    //*
    $stateObjectQuery['statecode'] = $_GET['statecode'];

    $charposp = $responseQuery['charpos'];
    $paramp = $responseQuery['param'];
    $targetp = $responseQuery['target'];
    $sleepp = $responseQuery['sleep'];

    if (count($stateCodeQuery) < 2) {
        if ($stateObjectQuery['f'] == 'L') {
            echo length_finder($sleepp, $targetp, $paramp, $stateObjectQuery) . '<BR/>';
        } else {
            echo character_finder($charposp, $paramp, $targetp, $sleepp, $stateObjectQuery) . '<BR/>';
        }
    } else {
        $eval = evaluateArray($stateCodeQuery);

        if ($eval == false) {
            echo length_finder($sleepp, $targetp, $paramp, $stateObjectQuery) . '<BR/>';
        } else {
            if ($eval == true) {
                $result = $stateCodeQuery[0];
            } else {
                $result = $eval;
            }
            //*
            if (isset($stateObjectQuery['pr'])) {
                $pr1 = base64_decode($stateObjectQuery['pr']);
                $pr2 = $pr1 . '-' . $result;
                $progress = base64_encode($pr2);
            } else {
                $progress = base64_encode($result);
            }
            //*/
            if ($stateObjectQuery['f'] == 'L') {
                $file = './pftb/tableColumns.json';
                if (!file_exists($file)) {
                    $file_data = [$stateObjectQuery['tb'] => [$stateObjectQuery['cl'] => $result]];
                    //  $file_data = [$stateObjectQuery['tb'] => ['sd_'.$stateObjectQuery['cl'] => $stateCodeQuery]];
                    //$file_json = json_encode($file_data);
                } else {
                    $file_data = json_decode(file_get_contents($file), true);
                    //array_push($file_data, [$stateObjectQuery['tb'] => $pr2]);
                    $file_data[$stateObjectQuery['tb']][$stateObjectQuery['cl']] = $result;
                    // $file_data[$stateObjectQuery['tb']]['sd_'.$stateObjectQuery['cl']] = $stateCodeQuery;
                }
                $file_json = json_encode($file_data);
                build_file($file, $file_json);

                if ($stateObjectQuery['cl'] == $stateObjectQuery['ttcm']) {
                    if (isset($stateObjectQuery['pr'])) {
                        $pr1 = base64_decode($stateObjectQuery['pr']);
                        $pr2 = $pr1 . '-' . $result;
                        $progress = base64_encode($pr2);
                    } else {
                        $progress = base64_encode($result);
                    }
                    $nt = 'p1';
                    httpGet('https://localhost/kever/sql.php', ['result' => $progress]);
                    //header('location: sql.php?result=' . $progress);
                } else {
                    $stateObjectQuery['cl'] = $stateObjectQuery['cl'] + 1;
                    $continueObj = base64_encode(json_encode($stateObjectQuery));
                    $nt = 'p2';
                    $respPage = 'sql.php?cont=' . $continueObj . '&pr=' . $progress;

                    httpGet('https://localhost/kever/sql.php', ['cont' => $continueObj, 'pr' => $progress]);
                    // header('location: ' . $respPage);
                }
            } else {
                $file = './pftb/tableColumnNames.json';
                if (!file_exists($file)) {
                    $file_data = [$stateObjectQuery['tb'] => [$stateObjectQuery['cl'] => [$charposp => $result]]];
                    //  $file_data = [$stateObjectQuery['tb'] => ['sd_'.$stateObjectQuery['cl'] => $stateCodeQuery]];
                    //$file_json = json_encode($file_data);
                } else {
                    $file_data = json_decode(file_get_contents($file), true);
                    //array_push($file_data, [$stateObjectQuery['tb'] => $pr2]);
                    $file_data[$stateObjectQuery['tb']][$stateObjectQuery['cl']][$charposp] = $result;
                    // $file_data[$stateObjectQuery['tb']]['sd_'.$stateObjectQuery['cl']] = $stateCodeQuery;
                }
                $file_json = json_encode($file_data);
                build_file($file, $file_json);

                if ($stateObjectQuery['charpos'] == $stateObjectQuery['lngth']) {
                    if (isset($stateObjectQuery['pr'])) {
                        $pr1 = base64_decode($stateObjectQuery['pr']);
                        $pr2 = $pr1 . '-' . $result;
                        $progress = base64_encode($pr2);
                    } else {
                        $progress = base64_encode($result);
                    }
                    $nt = 'p1';
                    httpGet('https://localhost/kever/sql.php', ['result' => $progress]);
                    //header('location: sql.php?result=' . $progress);
                } else {
                    $stateObjectQuery['charpos'] = $stateObjectQuery['charpos'] + 1;
                    $continueObj = base64_encode(json_encode($stateObjectQuery));
                    $nt = 'p2';
                    $respPage = 'sql.php?cont=' . $continueObj . '&pr=' . $progress;
                    httpGet('https://localhost/kever/sql.php', ['cont' => $continueObj, 'pr' => $progress]);
                    // header('location: ' . $respPage);
                }
            }

        }
    }
   
 
}
