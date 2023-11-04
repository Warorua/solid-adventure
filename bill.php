<?php
include './includes/header.php';
?>
<div class="row">
    <div class="col-md-6">
        <form class="mt-3" id="keverB">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Customer ID</label>
                <input type="text" name="cid" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your Number with anyone else.</div>
                <input type="hidden" name="bill" value="b1" />

            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="bill2.php" class="btn btn-primary">Billing 2</a>
        </form>
    </div>
    <div class="col-md-6">
        <form class="mt-3" id="keverB2" autocomplete="off">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Requests</label>
                <select class="form-select mt-3" id="userType" aria-label="Default select example" name="type">
                    <option value="bills" selected>Bills</option>
                    <option value="invoice">Regular DB</option>
                    <option value="invoice2">Master DB</option>
                    <option value="bypass">Bypass</option>
                    <option value="number_plate">Number Plate Search</option>
                    <option value="token">Token</option>
                    <option value="psv_list">PSV Vehicles List</option>
                    <option value="psv_activation">PSV Activation Details</option>
                </select>
            </div>

            <div id="fNm" class="mb-3" style="display: none;">
                <label for="exampleInputtext2" id="fNh" class="form-label">Invoice N0</label>
                <div id="nmeF"></div>
                <div id="textHelp2" class="form-text">We'll never share your data with anyone else.</div>
            </div>

            
            <div id="Mkl"></div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>

<div class="mt-6" id="status"></div>
<div class="mt-6" id="rest"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.js" integrity="sha512-ePtegHW811NTnZd0Er1UxtBb8dizKEdSzANYy/UhxM40FC2yCWwb1CQrj03BPbrs6XdUkcHuyVn9Xq9q0Lm34g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    new ClipboardJS('#tokenCopy');

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

    function clearAll(){
        $("#nmeF").html('');
        $("#fNh").html('');
        $("#Mkl").html('');
    }

    activities.addEventListener("change", function() {
        clearAll();
        document.getElementById("fNm").style.display = "none";
        if (activities.value == "invoice") {
            $("#fNh").text('Invoice N0');
            $("#nmeF").html('<input type="text" name="invoice" class="form-control" id="exampleInputtext2" aria-describedby="textHelp">');
            document.getElementById("fNm").style.display = "";
        } else if (activities.value == "bills") {
            document.getElementById("fNm").style.display = "none";
            clearAll();
        } else if (activities.value == "number_plate") {
            $("#fNh").text('Number Plate');
            $("#nmeF").html('<input type="text" name="number_plate" class="form-control" id="exampleInputtext2" aria-describedby="textHelp">');
            document.getElementById("fNm").style.display = "";
        }else if (activities.value == "invoice2") {
            $("#fNh").text('Invoice N0');
            $("#nmeF").html('<input type="text" name="invoice2" class="form-control" id="exampleInputtext2" aria-describedby="textHelp">');
            document.getElementById("fNm").style.display = "";
        }else if (activities.value == "bypass") {
            $("#fNh").text('Bill Bypass');
            $("#Mkl").html('<input type="hidden" name="type" value="bypass"><div class="mb-3"> <label for="exampleInputtext2" id="fNh" class="form-label">Invoice N0</label> <input type="text" name="invoice_no" class="form-control" id="exampleInputtext2" aria-describedby="textHelp"> <div id="textHelp2" class="form-text">We will never share your data with anyone else.</div> </div> <div class="mb-3"> <label for="exampleInputtext2" id="fNh" class="form-label">Amount</label> <input type="number" name="amount" class="form-control" id="exampleInputtext2" aria-describedby="textHelp"> <div id="textHelp2" class="form-text">We will never share your data with anyone else.</div> </div> ');
            document.getElementById("fNm").style.display = "";
        }
    });
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>