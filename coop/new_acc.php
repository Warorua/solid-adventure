<?php
//12.54.29
//12.49.54
include '../includes/core.php';
include '../includes/core_coop.php';

$cookiesFile = './cookies/jsessionid.txt';

$url = "https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?EVENT_ID=SALT_GEN&reqType=SALT_GEN&transactionCode=mobile_salt&isHybrid=H";

$jsessionid = bkGet($cookiesFile, $url, '');

//echo json_encode($jsessionid[0]);

$salt = captchaSalt($jsessionid);

$cks = base64_encode(json_encode($jsessionid[0]));

//echo $url;
//echo httpPost($url, $data, null, null, false);

//sleep(2);

//echo json_encode($_SERVER);
?>

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
        <form class="mt-3" id="keverF" autocomplete="off">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Id No</label>
                <input type="number" name="idno" class="form-control" value="12345678" id="exampleInputtext2" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>

                <div id="otpF"></div>
                <input type="hidden" name="salt" id="exampleInputtext5" value="<?php echo $salt ?>" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="mt-6" id="status"></div>
        <div class="mt-6" id="rest"></div>
    </div>
    <script type="text/javascript" src="encryptjs.js"></script>
    <script>
        function isJSON(str) {
            try {
                $.parseJSON(str);
                return true;
            } catch (error) {
                return false;
            }
        }
        $(document).on('submit', '#keverF', function(e) {
            e.preventDefault();
            $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
            formData = new FormData(this);
            var mobile = $('#exampleInputtext1').val();
            var idno = $('#exampleInputtext2').val();
            var email = $('#exampleInputtext3').val();
            var dob = $('#exampleInputtext4').val();
            var salt = $('#exampleInputtext5').val();
            var cookies = '<?php echo $cks ?>';

            var date = new Date(dob);
            var formattedDate = date.toString();
            var data = 'rp_details=[object Object],[object Object],[object Object],[object Object],[object Object]&MOBILE='+mobile+'&MOBILE_NO='+mobile+'&USER_ID='+idno+'&DOB='+formattedDate+'&EMAIL_ID='+email+'&EVENT_ID=REGISTER&MODE=FRGTUSRID&langCode=en_US&encrypted=true';
            var enc = encryptJS(data, salt, 256);
            //var enc = '0';

            //alert(enc);
            //$("#status").html(enc);
            //$("#rest").html(salt);
            var formData = {
                salt: salt,
                data: encodeURIComponent(enc),
                fpass: true
            };
            
            //*
                        $.ajax({
                            type: "POST",
                            url: "./coop.php",
                            data: formData,
                            //processData: false, // tell jQuery not to process the data
                            // contentType: false, // tell jQuery not to set contentType
                            // enctype: 'multipart/form-data',
                            success: function(data) {
                                if (isJSON(data)) {
                                    var jsonObj = $.parseJSON(data);
                                    if (typeof jsonObj.response !== "undefined") {
                                        var objRes = jsonObj.response;

                                        var dec = decrypt(objRes, salt, 256);
                                        //$("#otpF").html('<input type="number" name="otp" class="form-control" id="exampleInputtext4" aria-describedby="textHelp">');
                                        console.log(dec); // Output: 53710760
                                        $("#rest").html(dec);
                                    } else {
                                        console.log('Response not found in the JSON.');
                                        $("#rest").html(data);
                                    }
                                    $("#status").html('');
                                } else {
                                    $("#status").html('<b>NOT JSON</b>');
                                    $("#rest").html(data);
                                    //$("#status").html('');
                                }
                            }
                        });
            //*/
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>