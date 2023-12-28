<?php
include './includes/conn_pure.php';
include './includes/header.php';
?>
<div class="row">
    <div class="col-md-6">
        <form class="mt-3" id="keverB" autocomplete="off">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Invoice Number</label>
                <input type="text" name="invoice_number" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your Number with anyone else.</div>
                <input type="hidden" name="type" value="monitor" />
                <label for="exampleInputtext1" class="form-label">Client</label>
                <select class="form-select mt-3" name="client" aria-label="Default select example">
                    <option value="all" selected>All</option>
                    <?php
                    $stmt = $conn->prepare('SELECT * FROM clients ORDER BY name ASC');
                    $stmt->execute();
                    $clients = $stmt->fetchAll();
                    foreach($clients as $rows){
                        echo '<option value="'.$rows['name'].'">'.$rows['name'].'</option>';
                    }
                    ?>
                </select>
                <div class="mb-3">
                    <label for="exampleInputtext1" class="form-label">Record</label>
                    <select class="form-select mt-3" name="record" aria-label="Default select example">
                        <option value="yes" selected>Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Monitor Record</button>
        </form>

    </div>
    <div class="col-md-6">
        <form class="mt-3" id="keverB2" autocomplete="off">
            <input type="hidden" name="type" value="bypassQuery">


            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Record Query</label>
                <select class="form-select mt-3" name="record" aria-label="Default select example">
                    <option value="all" selected>All</option>
                    <option value="paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="NaN">Erroneous</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Client Query</label>
                <select class="form-select mt-3" name="client" aria-label="Default select example">
                    <option value="all" selected>All</option>
                    <?php
                    $stmt = $conn->prepare('SELECT * FROM clients ORDER BY name ASC');
                    $stmt->execute();
                    $clients = $stmt->fetchAll();
                    foreach($clients as $rows){
                        echo '<option value="'.$rows['name'].'">'.$rows['name'].'</option>';
                    }
                    ?>
                </select>
            </div>

            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Purpose</label>
                <select class="form-select mt-3" name="purpose" aria-label="Default select example">
                    <option value="dev" selected>Development</option>
                    <option value="prod">Production</option>
                </select>
            </div>


            <button type="submit" id="bypassInitiate" class="btn btn-primary">Query</button>
        </form>
        <div class="row mt-4">
            <h5 class="col-md-12" id="statusR"></h5>
            <h5 class="col-md-12" id="statusM"></h5>
            <h5 class="col-md-12" id="invM"></h5>
            <h5 class="col-md-12" id="amtM"></h5>
        </div>
    </div>


    <div id="Mkl"></div>
</div>
<div class="row">
    <div class="mt-6 col-md-6" id="status"></div>
    <h4 class="mt-6 col-md-6" id="arrErr"></h4>
    <div class="mt-6 col-md-6" id="trackPad"></div>
    <div class="mt-6 col-md-12" id="rest"></div>
</div>

</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.js" integrity="sha512-ePtegHW811NTnZd0Er1UxtBb8dizKEdSzANYy/UhxM40FC2yCWwb1CQrj03BPbrs6XdUkcHuyVn9Xq9q0Lm34g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    new ClipboardJS('#trackCopy');

    $(document).on('submit', '#keverB', function(e) {
        e.preventDefault();
        $("#statusM").html('');
        $("#statusR").html('');
        $("#arrErr").html('');
        $("#amtM").html('');
        $("#invM").html('');

        $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
        formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "./finder_5.php",
            data: formData,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            // enctype: 'multipart/form-data', // This line is not needed for FormData
            success: function(data) {
                console.log(data); // Log the response data
                $("#status").html('');
                try {
                    var jsonData = JSON.parse(data);
                    console.log(jsonData);
                    $("#rest").html(jsonData.htmlData);
                    //$("#rest").html(data);
                    if (jsonData.masterDb && jsonData.masterDb.error) {
                        //$("#arrErr").html(jsonData.masterDb.error);
                        $("#arrErr").append('<div class="alert alert-danger" role="alert">' + jsonData.masterDb.error + '</div>');
                    } else {
                        if (jsonData.masterDb.success == true) {
                            var billAm = jsonData.masterDb.amount.replace(/,/g, '');
                            var billAm_2 = parseInt(billAm, 10);
                            $(".billAmount").attr("value", billAm_2);
                            $(".billInvoice").attr("value", jsonData.masterDb.invoiceNo);
                            if (jsonData.masterDb && jsonData.regularDb) {
                                if (jsonData.masterDb.status) {
                                    $("#invM").html('Invoice No: <div class="badge text-bg-info">' + jsonData.masterDb.invoiceNo + '</div>');
                                    $("#amtM").append('Master Price: <div class="badge text-bg-dark">' + jsonData.masterDb.amount + '</div>');
                                    if (jsonData.masterDb.status == 'paid') {
                                        $("#statusM").html('Master: <div class="badge text-bg-success">PAID</div>');
                                    } else {
                                        $("#statusM").html('Master: <div class="badge text-bg-danger">UNPAID</div>');
                                    }
                                    if (jsonData.regularDb.paid && jsonData.regularDb.erp_status_code) {
                                        $("#amtM").append('Regular Price: <div class="badge text-bg-dark">' + jsonData.regularDb.amount + '</div>');
                                        if (jsonData.masterDb.status == 'paid') {
                                            $("#statusM").html('Master: <div class="badge text-bg-success">PAID</div>');
                                            $("#arrErr").append('<div class="alert alert-success" role="alert">Invoice PAID and CLEARED/PASSED!</div>');
                                            if (jsonData.regularDb.paid == true) {
                                                $("#statusR").html('Regular: <div class="badge text-bg-success">PAID</div>');
                                            } else {
                                                $("#statusR").html('Regular: <div class="badge text-bg-danger">UNPAID</div> <div class="badge text-bg-info">UNPAID</div>');
                                            }
                                        } else {
                                            $("#statusM").html('Master: <div class="badge text-bg-danger">UNPAID</div>');
                                            if (jsonData.regularDb.paid == true && jsonData.regularDb.erp_status_code == '200') {
                                                $("#statusR").html('Regular: <div class="badge text-bg-success">PAID</div>');
                                                $("#arrErr").append('<div class="alert alert-primary" role="alert">Invoice PAID, and PENDING clearance!</div>');
                                            } else if (jsonData.regularDb.paid == true && jsonData.regularDb.erp_status_code == '400') {
                                                $("#arrErr").append('<div class="alert alert-info" role="alert">Invoice PAID but UNPROCESSED!</div>');
                                                $("#statusR").html('Regular: <div class="badge text-bg-warning">PAID</div>');
                                                $("#bypassInitiate").prop('disabled', false);
                                            } else if (jsonData.regularDb.paid == false && jsonData.regularDb.erp_status_code == '200') {
                                                $("#arrErr").append('<div class="alert alert-danger" role="alert">Invoice NOT PAID with status 200!</div>');
                                                $("#statusR").html('Regular: <div class="badge text-bg-danger">UNPAID</div>');
                                                $("#bypassInitiate").prop('disabled', false);
                                            } else if (jsonData.regularDb.paid == false && jsonData.regularDb.erp_status_code == '400') {
                                                $("#arrErr").append('<div class="alert alert-danger" role="alert">Invoice NOT PAID with status 400!</div>');
                                                $("#statusR").html('Regular: <div class="badge text-bg-danger">UNPAID</div>');
                                                $("#bypassInitiate").prop('disabled', false);
                                            } else if (jsonData.regularDb.paid == false && jsonData.regularDb.erp_status_code == '' || jsonData.regularDb.erp_status_code == null) {
                                                $("#arrErr").append('<div class="alert alert-info" role="alert">Payment Initiated but NOT PAID!</div>');
                                                $("#statusR").html('Regular: <div class="badge text-bg-warning">UNPAID</div>');
                                                $("#bypassInitiate").prop('disabled', false);
                                            } else {
                                                $("#arrErr").append('<div class="alert alert-danger" role="alert">UNKNOWN PAYMENT STATUS!!</div>');
                                                $("#statusR").html('Regular: <div class="badge text-bg-danger">UNPAID</div>');
                                            }
                                        }

                                    } else {
                                        //$("#arrErr").html('Invoice Transaction not processed at all!');
                                        $("#arrErr").append('<div class="alert alert-warning" role="alert">Invoice Transaction not processed at all!</div>');
                                        if (jsonData.masterDb.status == "paid") {
                                            //$("#arrErr").html('Transaction error. No receipt risk. DEBS!');
                                            $("#arrErr").append('<div class="alert alert-danger" role="alert">Transaction error. No receipt risk. DEBS!</div>');
                                        }
                                        $("#statusR").html('Regular: <div class="badge text-bg-danger">UNPAID</div>');
                                        $("#bypassInitiate").prop('disabled', false);
                                    }
                                } else {
                                    //$("#arrErr").html('Master DB payment status unavailable!');
                                    $("#arrErr").append('<div class="alert alert-danger" role="alert">Master DB payment status unavailable!</div>');
                                }
                            } else {
                                //$("#arrErr").html('Master or Regular DB full items error!');
                                $("#arrErr").append('<div class="alert alert-danger" role="alert">Master or Regular DB full items error!</div>');
                            }
                        } else {
                            $("#arrErr").append('<div class="alert alert-danger" role="alert">' + jsonData.masterDb.description + '</div>');
                        }

                    }
                } catch (e) {
                    console.error('Invalid JSON:', e);
                    $("#rest").html('Invalid JSON:', e);
                }



            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });


    $(document).on('submit', '#keverB2', function(e) {
        e.preventDefault();
        $("#statusM").html('');
        $("#statusR").html('');
        $("#arrErr").html('');
        $("#amtM").html('');
        $("#invM").html('');

        $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
        // Enable the invoice_no and amount fields
        //$(".billInvoice").prop('disabled', false);
        //$("#billAmount").prop('disabled', false);
        formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "./finder_5.php",
            data: formData,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            //enctype: 'multipart/form-data',
            success: function(data) {
                console.log(data); // Log the response data
                $("#status").html('');
                $("#rest").html(data);



            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                //$("#rest").html('Error:', error);
            }
        });
    });

    var payType = document.getElementById("pay_type");

    function clearAll() {
        $("#nmeF").html('');
        $("#fNh").html('');
        $("#Mkl").html('');
    }

    payType.addEventListener("change", function() {
        clearAll();
        document.getElementById("fNm").style.display = "none";

        if (payType.value == "custom") {
            $("#openBillAmount").prop('disabled', false);
            $("#hiddenBillAmount").prop('disabled', true);
        } else if (payType.value == "set") {
            $("#openBillAmount").prop('disabled', true);
            var origBill = document.getElementById("hiddenBillAmount").value;
            $("#openBillAmount").attr("value", origBill);
            $("#hiddenBillAmount").prop('disabled', false);
        }
    });

    // JavaScript function to be called from invTrack to change the class
    function changeButtonClass(elementId, rmClass, addClass, innerTxt) {
        var button = document.getElementById(elementId);
        if (button) {
            button.classList.remove(rmClass);
            button.classList.add(addClass);
            button.innerText = innerTxt;
        }
    }

    function invTrack(id) {
        $("#arrErr").html('');
        $("#trackPad").html('');
        changeButtonClass('trackButton' + id, 'btn-info', 'btn-dark', 'tracking...');

        var formData = {
            type: 'track',
            id: id,
            // Add other form fields as needed
        };

        // Make AJAX request
        $.ajax({
            type: 'POST',
            url: './finder_5.php', // Replace with your server-side script URL
            data: formData,
            success: function(response) {
                //console.log(response);

                try {
                    var jsonData = JSON.parse(response);
                    if (jsonData.invoice_no) {
                        changeButtonClass('trackButton' + id, 'btn-dark', 'btn-info', 'TRACKED');
                        $("#trackButton" + id).prop('disabled', true);
                        var trkBtn = document.getElementById("stTrack" + id);

                        trkBtn.classList.remove('text-bg-secondary');
                        trkBtn.classList.add('text-bg-primary');
                        trkBtn.innerText = 'TRACKED';
                        // Handle success, update UI, etc.
                        $("#trackPad").append('<div class="alert alert-success" role="alert">' + jsonData.invoice_no + ' Tracked!</div>');
                        var clickMsg = "'Track object Copied'";                        
                        $("#trackPad").append('<div class="card"> <div class="card-body">'+jsonData.invoice_no+'<br/>'+jsonData.amount+'<br/><br/>//DONE<br/><button data-clipboard-text="'+jsonData.invoice_no+'\n'+jsonData.amount+'\n\n//DONE" class="card-link btn btn-primary" onclick="alert('+clickMsg+')" id="trackCopy">Copy track</button> </div> </div>');
                    }else{
                        $("#trackPad").append('<div class="alert alert-danger" role="alert">UNEXPECTED RESPONSE! TRY TRACKING AGAIN!</div>');
                    }
                } catch (e) {
                    console.error('Invalid JSON:', e);
                    $("#trackPad").html('Invalid JSON:', e);
                }
            },
            error: function(error) {
                console.error('Error:', error);
                // Handle error, show error message, etc.
            }
        });
    }
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>