<?php
include './includes/core.php';
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">

    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>

</head>

<body>
    <div class="container mt-6">
        <?php
        if (!isset($menu_no)) {
        ?>
            <ul class="nav nav-tabs mt-3">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="index.php">Search Tunnel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="list_data.php">Users Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="parking_data.php">D.Parking Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="s_parking_data.php">S.Parking Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="kra_brs.php">3rd Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="bill.php">Bills Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="kra_data.php">Revenue Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cpsb.php">CPSB Data</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="mrw.php">Murang'a Women Data</a>
                </li>
            </ul>

            <div class="pull-right mt-2 mb-2">
                <a href="javascript:Clickheretoprint()" style="font-size:20px;"><button class="btn btn-warning btn-large"><i class="icon-print"></i> Print Page Data</button></a>
            </div>
        <?php
        }
        ?>


        <script>
            $("[href='<?php if ($_SERVER['SERVER_NAME'] == 'localhost') {
                            echo str_replace("/kever/", '', $_SERVER['SCRIPT_NAME']);
                        } else {
                            echo str_replace("/", '', $_SERVER['SCRIPT_NAME']);
                        } ?>']").addClass('active');
        </script>

        <script>
            function Clickheretoprint() {
               var btcss = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">';
               btcss += '<style> .nav, .btn, .badge, form, .php-error{ display: none; } </style>';
               btcss += '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">';
                var disp_setting = "toolbar=yes,location=no,directories=yes,menubar=yes,";
                disp_setting += "scrollbars=yes,width=800, height=400, left=100, top=25";
                var content_vlue = document.getElementById("content").innerHTML;

                var docprint = window.open("", "", disp_setting);
                docprint.document.open();
                docprint.document.write(btcss+'</head><body class="mt-5 mx-2" onLoad="self.print()" style="width: 800px; font-size: 13px; font-family: arial;">');
                docprint.document.write(content_vlue);
                docprint.document.close();
                docprint.focus();
            }
        </script>
        <div id="content">