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
        $.ajax({
            url: 'https://identity.safaricom.com/graphql?grant_type=client_credentials',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response) {
                console.log('Success:', response);
                $('#dt').html(response);
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
                $('#dt').html('Error:', error);
            }
        });
    </script>
</body>

</html>