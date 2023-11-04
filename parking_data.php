<?php
include './includes/header.php';
?>
        <div>
            Toggle column:
            <a class="toggle-vis badge text-bg-primary" data-column="0">ID</a>
            <a class="toggle-vis badge text-bg-primary" data-column="1">customer id </a>
            <a class="toggle-vis badge text-bg-primary" data-column="2">transaction no </a>
            <a class="toggle-vis badge text-bg-primary" data-column="3">username </a>
            <a class="toggle-vis badge text-bg-primary" data-column="4">zone </a>
            <a class="toggle-vis badge text-bg-primary" data-column="5">vehicle </a>
            <a class="toggle-vis badge text-bg-primary" data-column="6">vehicle type </a>
            <a class="toggle-vis badge text-bg-primary" data-column="7">transaction mobile no </a>
            <a class="toggle-vis badge text-bg-primary" data-column="8">timestamp </a>
            <a class="toggle-vis badge text-bg-primary" data-column="9">duration </a>
            <a class="toggle-vis badge text-bg-primary" data-column="10">startDate </a>
            <a class="toggle-vis badge text-bg-primary" data-column="11">endDate </a>
            <a class="toggle-vis badge text-bg-primary" data-column="12">amount </a>
            <a class="toggle-vis badge text-bg-primary" data-column="13">invoice no </a>
            <a class="toggle-vis badge text-bg-primary" data-column="14">invoice report </a>
            <a class="toggle-vis badge text-bg-primary" data-column="15">paid </a>
            <a class="toggle-vis badge text-bg-primary" data-column="16">vehicle owner </a>
            <a class="toggle-vis badge text-bg-primary" data-column="17">owner mobile </a>
            <a class="toggle-vis badge text-bg-primary" data-column="18">bank ref </a>
            <a class="toggle-vis badge text-bg-primary" data-column="19">erp status code </a>
            <a class="toggle-vis badge text-bg-primary" data-column="20">erp error </a>
            <a class="toggle-vis badge text-bg-primary" data-column="21">has penalty </a>
            <a class="toggle-vis badge text-bg-primary" data-column="22">penalty amount </a>
            <a class="toggle-vis badge text-bg-primary" data-column="23">penalty timestamp </a>
            <a class="toggle-vis badge text-bg-primary" data-column="24">created from </a>
        </div>
        <div class="table-responsive">

            <table id="table_id" class="display mt-5 pt-3">
                <thead>
                    <tr>
                        <th>id </th>
                        <th>customer id </th>
                        <th>transaction no </th>
                        <th>username </th>
                        <th>zone </th>
                        <th>vehicle </th>
                        <th>vehicle type </th>
                        <th>transaction mobile no </th>
                        <th>timestamp </th>
                        <th>duration </th>
                        <th>startDate </th>
                        <th>endDate </th>
                        <th>amount </th>
                        <th>invoice no </th>
                        <th>invoice report </th>
                        <th>paid </th>
                        <th>vehicle owner </th>
                        <th>owner mobile </th>
                        <th>bank ref </th>
                        <th>erp status code </th>
                        <th>erp error </th>
                        <th>has penalty </th>
                        <th>penalty amount </th>
                        <th>penalty timestamp </th>
                        <th>created from </th>

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
                //"deferRender": true,
                stateSave: true,
                "autoWidth": false,
                //"serverSide": true,
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
                    "url": "dailyParking.json",
                    dataSrc: 'data.onstreet',
                },
                //"ajax": "dtt.json",
                "columns": [{
                        data: 'id'
                    },
                    {
                        data: 'customer_id'
                    },
                    {
                        data: 'transaction_no'
                    },
                    {
                        data: 'username'
                    },
                    {
                        data: 'zone'
                    },
                    {
                        data: 'vehicle'
                    },
                    {
                        data: 'vehicle_type'
                    },
                    {
                        data: 'transaction_mobile_no'
                    },
                    {
                        data: 'timestamp'
                    },
                    {
                        data: 'duration'
                    },
                    {
                        data: 'startDate'
                    },
                    {
                        data: 'endDate'
                    },
                    {
                        data: 'amount'
                    },
                    {
                        data: 'invoice_no'
                    },
                    {
                        data: 'invoice_report'
                    },
                    {
                        data: 'paid'
                    },
                    {
                        data: 'vehicle_owner'
                    },
                    {
                        data: 'owner_mobile'
                    },
                    {
                        data: 'bank_ref'
                    },
                    {
                        data: 'erp_status_code'
                    },
                    {
                        data: 'erp_error'
                    },
                    {
                        data: 'has_penalty'
                    },
                    {
                        data: 'penalty_amount'
                    },
                    {
                        data: 'penalty_timestamp'
                    },
                    {
                        data: 'created_from'
                    },
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