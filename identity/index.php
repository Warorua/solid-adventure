<?php include '../includes/core.php' ?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">

    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>
</head>
<body class="container mt-6">
    <div id="dt"></div>
    <div id="status"></div>
    <script>
        function makePostRequest() {
            $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
            $.ajax({
                url: "./fetcher.php",
                type: "POST",
                dataType: "json",
                success: function(response) {
                    if (response && typeof response === 'object' && response.hasOwnProperty('status')) {
                        if (response.status === 'valid') {
                            $('#dt').html(response.body);
                            //alert('Success');
                            $('#status').html('');
                        } else if (response.status === 'error') {
                            $('#dt').html(response.body);
                            makePostRequest(); // Repeat the post request
                        }
                    } else {
                        if(response == ''){
                            $('#dt').html('<b>EMPTY RESPONSE</b>');
                        }else{
                            $('#dt').html(response);
                        }
                        makePostRequest(); // Repeat the post request if response is not a valid JSON object
                    }
                },
                error: function(xhr, status, error) {
                    $('#dt').html('<b>'+error+'</b>');
                    makePostRequest(); // Repeat the post request in case of an error
                }
            });
        }

        // Start the initial post request
        makePostRequest();
    </script>
</body>
</html>
