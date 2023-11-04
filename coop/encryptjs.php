<?php
//12.54.29
//12.49.54
include '../includes/core.php';
include '../includes/core_coop.php';

$cookiesFile = './cookies/incap.txt';

$url = "https://retail-onlinebanking.co-opbank.co.ke/iportalweb/iRetail@Home";

$incap = bkGet($cookiesFile, $url)[0];

$cookiesFile = './cookies/jsessionid.txt';

$url = "https://retail-onlinebanking.co-opbank.co.ke/iportalweb/RBXLoginServlet?EVENT_ID=SALT_GEN&reqType=SALT_GEN&transactionCode=mobile_salt&isHybrid=H";

$jsessionid = bkGet($cookiesFile, $url, formatCookie($incap));

//echo json_encode($jsessionid[0]);

$salt = captchaSalt($jsessionid);

$cks = base64_encode(json_encode($jsessionid[0]));


$data = ['command' => 'encrypt', 'payload' => 'Lome2405!', 'salt' => $salt];

//echo $url;
//echo httpPost($url, $data, null, null, false);

//sleep(2);


function responseListen($url, $data)
{
    $file = './cookies/response.json';
    if (file_exists($file)) {
        $dt1 = json_decode(file_get_contents($file), true);
        if ($dt1['response'] != null) {
            $response = $dt1['response'];
            $dat = json_encode(['response' => null]);
            build_file($file, $dat);
            return $response;
        } else {
            httpPost($url, $data, null, null, false, false);
            return 'null';
            //return responseListen($url, $data);
        }
    } else {
        $data = json_encode(['response' => null]);
        build_file($file, $data);
        //echo httpPost($url, $data, null, null, false, false);
        return 'null';
        //return responseListen($url, $data);
    }
}
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
                <label for="exampleInputtext1" class="form-label">Username</label>
                <input type="text" name="user" value="Warorua" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>

                <label for="exampleInputtext1" class="form-label">Password</label>
                <input type="text" name="pass" class="form-control" value="Lex2405!" id="exampleInputtext2" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>
                <div id="otpF"></div>
                <input type="hidden" name="salt" id="exampleInputtext3" value="<?php echo $salt ?>" />
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
            var user = $('#exampleInputtext1').val();
            var pass = $('#exampleInputtext2').val();
            var salt = $('#exampleInputtext3').val();
            var cookies = '<?php echo $cks ?>';
            var enc = encryptJS(pass, salt, 256);

            if ($('#exampleInputtext4').length) {
                var otp = $('#exampleInputtext4').val();
                var formData = {
                    username: user,
                    password: pass,
                    salt: salt,
                    userPin: encodeURIComponent(enc),
                    cookies: cookies,
                    otp: otp
                };
            } else {
                var formData = {
                    username: user,
                    password: pass,
                    salt: salt,
                    userPin: encodeURIComponent(enc),
                    cookies: cookies
                };
            }

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
                        if (jsonObj.length > 0 && jsonObj[0].hasOwnProperty('OTP_REF')) {
                            var otpRef = jsonObj[0].OTP_REF;
                            $("#otpF").html('<input type="number" name="otp" class="form-control" id="exampleInputtext4" aria-describedby="textHelp">');
                            console.log(otpRef); // Output: 53710760
                            $("#rest").html(data);
                        } else {
                            console.log('OTP_REF not found in the JSON.');
                            $("#rest").html(data);
                        }
                        $("#status").html('');
                    } else {
                        $("#rest").html(data);
                        $("#status").html('');
                    }
                }
            });
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>