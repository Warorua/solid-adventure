<?php
include './includes/header.php';
?>
<form class="mt-3" id="keverF" autocomplete="off">
    <div class="mb-3">
        <label for="exampleInputtext1" class="form-label">ID Number</label>
        <input type="text" name="idno" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
        <div id="textHelp" class="form-text">We'll never share your ID with anyone else.</div>

        <div id="fNm" class="mb-3" style="display: none;">
            <label for="exampleInputtext2" class="form-label">First Name</label>
            <div id="nmeF"></div>
            <div id="textHelp2" class="form-text">We'll never share your Name with anyone else.</div>
        </div>

        <select class="form-select mt-3" id="userType" aria-label="Default select example" name="type">
            <option value="citizen" selected>CITIZEN</option>
            <option value="resident">ALIEN</option>
        </select>
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
            url: "./finder_2.php",
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

    var activities = document.getElementById("userType");

    activities.addEventListener("change", function() {
        if (activities.value == "resident") {
            $("#nmeF").html('<input type="text" name="fname" class="form-control" id="exampleInputtext2" aria-describedby="textHelp">');
            document.getElementById("fNm").style.display = "";
        } else if (activities.value == "citizen") {
            document.getElementById("fNm").style.display = "none";
            $("#nmeF").html('');
        }
    });
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>