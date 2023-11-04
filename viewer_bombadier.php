<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container mt-6">
        <div class="mt-6" id="status"></div>
        <table class="mt-6 table table-striped-columns">
            <thead>
                <th>Engine Script</th>
                <th>Data Count</th>
            </thead>
            <tbody id="rest">

            </tbody>
        </table>
    </div>
    <script>
       // setInterval(function() {
            $.ajax({
                type: "POST",
                url: "./view_bombadier_bc.php",
                success: function(data) {
                    $("#status").html('');
                    $("#rest").html(data);
                }
            })
       // }, 1000);
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>