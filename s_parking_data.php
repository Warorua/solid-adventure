<?php
include './includes/header.php';
?>
<div>
    Toggle column:
    <a class="toggle-vis badge text-bg-primary" data-column="0">ID</a>
    <a class="toggle-vis badge text-bg-primary" data-column="1">car registration number </a>
    <a class="toggle-vis badge text-bg-primary" data-column="2">vehicle type </a>
    <a class="toggle-vis badge text-bg-primary" data-column="3">amount paid </a>
    <a class="toggle-vis badge text-bg-primary" data-column="4">owner name </a>
    <a class="toggle-vis badge text-bg-primary" data-column="5">date created </a>
    <a class="toggle-vis badge text-bg-primary" data-column="6">start date </a>
    <a class="toggle-vis badge text-bg-primary" data-column="7">end date </a>
    <a class="toggle-vis badge text-bg-primary" data-column="8">paid </a>
   
</div>
<div class="table-responsive">

    <table id="table_id" class="display mt-5 pt-3">
        <thead>
            <tr>

                <th>id</th>
                <th>car registration number</th>
                <th>vehicle type</th>
                <th>amount paid</th>
                <th>owner name</th>
                <th>date created</th>
                <th>start date</th>
                <th>end date</th>
                <th>paid</th>
                <th>invoice no</th>

            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>

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

    $(document).ready(function() {
        var table = $('#table_id').DataTable({
            "processing": true,
            "deferRender": true,
            stateSave: true,
            "autoWidth": false,
            "lengthMenu": [10, 50, 100, 200, 500, 1000],
            "search": {
                "smart": false,
                "select": 'single',
                "info": false,
                "keys": true
            },
            scroller: {
                loadingIndicator: true
            },
            //"serverSide": true,
            "ajax": {
                "url": "seasonalParking.json",
                dataSrc: 'data',
                "data": "data"
            },
            //"ajax": "dtt.json",
            "columns": [{
                    data: 'id'
                },
                {
                    data: 'car_registration_number'
                },
                {
                    data: 'vehicle_type'
                },
                {
                    data: 'amountpaid'
                },
                {
                    data: 'owner_name'
                },
                {
                    data: 'datecreated'
                },
                {
                    data: 'startdate'
                },
                {
                    data: 'enddate'
                },
                {
                    data: 'paid'
                },
                {
                    data: 'invoice_no'
                }
            ],
        });


        $('a.toggle-vis').on('click', function(e) {
            e.preventDefault();

            // Get the column API object
            var column = table.column($(this).attr('data-column'));

            // Toggle the visibility
            column.visible(!column.visible());
        });
    });
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>