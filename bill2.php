<?php
include './includes/header.php';
?>
<div class="row">
    <div class="col-md-6">
        <form class="mt-3" id="keverB">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Phone Number</label>
                <input type="text" name="phone" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your Number with anyone else.</div>

                <label for="exampleInputtext1" class="form-label">USSD PIN</label>
                <input type="number" name="pin" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your PIN with anyone else.</div>
                <input type="hidden" name="bill" value="b2" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="bill.php" class="btn btn-primary">Billing 1</a>
        </form>
    </div>
    <div class="col-md-6">
        <form class="mt-3" id="keverB2" autocomplete="off">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Requests</label>
                <select class="form-select mt-3" id="userType" aria-label="Default select example" name="type">
                    <option value="bills" selected>Bills</option>
                    <option value="invoice">Invoice</option>
                    <option value="invoice_2">Parking Invoice</option>
                    <option value="token">Token</option>
                    <option value="psv_list">PSV Vehicles List</option>
                    <option value="psv_activation">PSV Activation Details</option>
                </select>
            </div>

            <div id="fNm" class="mb-3" style="display: none;">
                <label for="exampleInputtext2" class="form-label">Invoice N0</label>
                <div id="nmeF"></div>
                <div id="textHelp2" class="form-text">We'll never share your data with anyone else.</div>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>


<div class="mt-6" id="status"></div>
<div class="mt-6" id="rest"></div>
</div>
<script>
    $(document).on('submit', '#keverB', function(e) {
        e.preventDefault();
        $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
        formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "./tokenizer.php",
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

    $(document).on('submit', '#keverB2', function(e) {
        e.preventDefault();
        $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
        formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "./finder_4.php",
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
        if (activities.value == "invoice") {
            $("#nmeF").html('<input type="text" name="invoice" class="form-control" id="exampleInputtext2" aria-describedby="textHelp">');
            document.getElementById("fNm").style.display = "";
        } else if (activities.value == "bills") {
            document.getElementById("fNm").style.display = "none";
            $("#nmeF").html('');
        } else if (activities.value == "invoice_2") {
            $("#nmeF").html('<input type="text" name="invoice_2" class="form-control" id="exampleInputtext2" aria-describedby="textHelp">');
            document.getElementById("fNm").style.display = "";
        }
    });
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>