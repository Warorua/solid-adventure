<?php
include './includes/header.php';
?>
<div class="row">
    <div class="col-md-6">
        <form class="mt-3" id="keverB">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Invoice Number</label>
                <input type="text" name="invoice_number" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
                <div id="textHelp" class="form-text">We'll never share your Number with anyone else.</div>
                <input type="hidden" name="type" value="authenticate" />

            </div>
            <button type="submit" class="btn btn-primary">Authenticate</button>
        </form>
        <div class="row mt-4">
            <h5 class="col-md-12" id="statusR"></h5>
            <h5 class="col-md-12" id="statusM"></h5>
        </div>
    </div>
    <div class="col-md-6">
        <form class="mt-3" id="keverB2" autocomplete="off">
            <input type="hidden" name="type" value="bypass">
            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Bypass Route</label>
                <select class="form-select mt-3" id="userType" aria-label="Default select example" name="route">
                    <option value="normal" selected>Normal</option>
                    <option value="taifa">Taifa</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Pay Type</label>
                <select class="form-select mt-3" id="pay_type" aria-label="Default select example">
                    <option value="set" selected>Set</option>
                    <option value="custom">Custom</option>
                </select>
            </div>


            <div class="mb-3"> <label for="exampleInputtext2" id="fNh" class="form-label">Invoice Number</label>
                <input type="text" class="form-control billInvoice" aria-describedby="textHelp" disabled>
                <input type="hidden" name="invoice_no" class="form-control billInvoice">
                <div id="textHelp2" class="form-text">Bill Invoice</div>
            </div>

            <div class="mb-3"> <label for="exampleInputtext2" id="fNh" class="form-label">Amount</label>
                <input type="number" name="amount" class="form-control billAmount" id="openBillAmount" aria-describedby="textHelp" disabled>
                <input type="hidden" name="amount" class="form-control billAmount" id="hiddenBillAmount" aria-describedby="textHelp">
                <div id="textHelp2" class="form-text">Bill amount</div>
            </div>

            <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Record</label>
                <select class="form-select mt-3" name="record" aria-label="Default select example">
                    <option value="yes" selected>Yes</option>
                    <option value="no">No</option>
                </select>
            </div>


            <div id="fNm" class="mb-3" style="display: none;">
                <label for="exampleInputtext2" id="fNh" class="form-label">Invoice N0</label>
                <div id="nmeF"></div>
                <div id="textHelp2" class="form-text">We'll never share your data with anyone else.</div>
            </div>

            <button type="submit" id="bypassInitiate" class="btn btn-primary" disabled>Bypass</button>
        </form>
    </div>


    <div id="Mkl"></div>
</div>
<div class="row">
    <div class="mt-6 col-md-12" id="status"></div>
    <h4 class="mt-6 col-md-8" id="arrErr"></h4>
    <div class="mt-6 col-md-12" id="rest"></div>
</div>

</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.js" integrity="sha512-ePtegHW811NTnZd0Er1UxtBb8dizKEdSzANYy/UhxM40FC2yCWwb1CQrj03BPbrs6XdUkcHuyVn9Xq9q0Lm34g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    new ClipboardJS('#tokenCopy');

    $(document).on('submit', '#keverB', function(e) {
        e.preventDefault();
        $("#statusM").html('');
        $("#statusR").html('');
        $("#arrErr").html('');

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
                                    if (jsonData.masterDb.status == 'paid') {
                                        $("#statusM").html('Master: <div class="badge text-bg-success">PAID</div>');
                                    } else {
                                        $("#statusM").html('Master: <div class="badge text-bg-danger">UNPAID</div>');
                                    }
                                    if (jsonData.regularDb.paid && jsonData.regularDb.erp_status_code) {
                                        if (jsonData.masterDb.status == 'paid') {
                                            $("#statusM").html('Master: <div class="badge text-bg-success">PAID</div>');
                                            $("#arrErr").append('<div class="alert alert-success" role="alert">Invoice PAID and CLEARED/PASSED!</div>');
                                            if (jsonData.regularDb.paid == true) {
                                                $("#statusR").html('Regular: <div class="badge text-bg-success">PAID</div>');
                                            } else {
                                                $("#statusR").html('Regular: <div class="badge text-bg-danger">UNPAID</div>');
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
                $("#rest").html('RESPONSE: ', data);

                try {
                    var jsonData = JSON.parse(data);
                    console.log(jsonData);
                    $("#rest").html(jsonData.htmlData);
                    if (jsonData.result) {
                        if (jsonData.result.success == true) {
                            $("#arrErr").append('<div class="alert alert-primary" role="alert">' + jsonData.result.description + '</div>');
                            $("#bypassInitiate").prop('disabled', true);
                            $("#statusR").html('<div class="badge text-bg-success">SUCCESSFULLY PROCESSED!</div>');
                        } else if (jsonData.result.error) {
                            $("#arrErr").append('<div class="alert alert-danger" role="alert">' + jsonData.result.error + '</div>');
                            $("#bypassInitiate").prop('disabled', false);
                            $("#statusR").html('<div class="badge text-bg-danger">PROCESSING NOT GONE THROUGH! REINITIATE!</div>');
                        } else {
                            $("#arrErr").append('<div class="alert alert-danger" role="alert">UNKNOWN RESPONSE</div>');
                            $("#bypassInitiate").prop('disabled', false);
                            $("#statusR").html('<div class="badge text-bg-dark">UNKNOWN RESPONSE! REINITIATE!</div>');
                        }
                    } else {
                        $("#arrErr").append('<div class="alert alert-danger" role="alert">UNEXPECTED RESPONSE: ' + data + '</div>');
                    }
                } catch (e) {
                    console.error('Invalid JSON:', e);
                    $("#arrErr").html('Invalid JSON:', e);
                }

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
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>