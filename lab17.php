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

        <div id="content">

            <form class="mt-3" id="keverF" autocomplete="off">
                <div class="mb-3">
                <select class="form-select mt-3" id="userType" aria-label="Default select example" name="ptype">
                        <option value="2" selected>SET</option>
                        <option value="1">CUSTOM</option>
                    </select>
                    <select class="form-select mt-3" id="userType" aria-label="Default select example" name="target">
                        <option value="2" selected>KOTNOVA</option>
                        <option value="1">PF</option>
                    </select>
                    <select class="form-select mt-3" id="userType" aria-label="Default select example" name="action">
                        <option value="length" selected>LEN</option>
                        <option value="char">CHAR</option>
                    </select>
                    <select class="form-select mt-3" id="userType" aria-label="Default select example" name="finder">
                        <option value="1" selected>F1</option>
                        <option value="2">F2</option>
                        <option value="3">F-Punc</option>
                        <option value="4">F-Special</option>
                    </select>

                    <label for="exampleInputtext1" class="form-label">Sleep</label>
                    <input type="number" name="sleep" class="form-control" value="5" id="exampleInputtext1" aria-describedby="textHelp">
                    <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>

                    <label for="exampleInputtext1" class="form-label">Char Position</label>
                    <input type="number" name="charpos" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                    <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>

                    <label for="exampleInputtext1" class="form-label">Action parameter</label>
                    <input type="text" name="param" class="form-control" id="exampleInputtext1" placeholder="@@hostname" aria-describedby="textHelp">
                    <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>


                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class="mt-6" id="status"></div>
            <div class="mt-6" id="rest"></div>
        </div>
        <script>
            $(document).on('submit', '#keverF', function(e) {
                e.preventDefault();
                $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
                formData = new FormData(this);
                $.ajax({
                    type: "POST",
                    url: "./sql_lab2.php",
                    data: formData,
                    processData: false, // tell jQuery not to process the data
                    contentType: false, // tell jQuery not to set contentType
                    enctype: 'multipart/form-data',
                    success: function(data) {
                        $("#status").html('');
                        $("#rest").html(data);
                    }
                });
            });
        </script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>