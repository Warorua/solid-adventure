<?php
include './includes/header.php';
?>
        <div>
            Toggle column:
            <a class="toggle-vis badge text-bg-primary" data-column="0">ID</a>
            <a class="toggle-vis badge text-bg-primary" data-column="1">ID Number</a>
            <a class="toggle-vis badge text-bg-primary" data-column="2">Alien ID Number</a>
            <a class="toggle-vis badge text-bg-primary" data-column="3">KRA Pin</a>
            <a class="toggle-vis badge text-bg-primary" data-column="4">BRS no</a>
            <a class="toggle-vis badge text-bg-primary" data-column="5">Mobile Number</a>
            <a class="toggle-vis badge text-bg-primary" data-column="6">Email</a>
            <a class="toggle-vis badge text-bg-primary" data-column="7">2nd Mobile Number</a>
            <a class="toggle-vis badge text-bg-primary" data-column="8">Secondary Email</a>
            <a class="toggle-vis badge text-bg-primary" data-column="9">Tax Payer Type</a>
            <a class="toggle-vis badge text-bg-primary" data-column="10">Tax Payer Name</a>
            <a class="toggle-vis badge text-bg-primary" data-column="11">Password</a>
            <a class="toggle-vis badge text-bg-primary" data-column="12">Passport N0</a>
            <a class="toggle-vis badge text-bg-primary" data-column="13">Customer ID</a>
            <a class="toggle-vis badge text-bg-primary" data-column="14">Photo</a>
            <a class="toggle-vis badge text-bg-primary" data-column="15">Last Logged_in</a>
            <a class="toggle-vis badge text-bg-primary" data-column="16">USSD Pin</a>
            <a class="toggle-vis badge text-bg-primary" data-column="17">PSV</a>
            <a class="toggle-vis badge text-bg-primary" data-column="18">Is Alien</a>
        </div>
        <div class="table-responsive">

            <table id="table_id" class="display mt-5 pt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Number</th>
                        <th>Alien ID Number</th>
                        <th>KRA Pin</th>
                        <th>BRS no</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>2nd Mobile Number</th>
                        <th>Secondary Email</th>
                        <th>Tax Payer Type</th>
                        <th>Tax Payer Name</th>
                        <th>Password</th>
                        <th>Passport N0</th>
                        <th>Customer ID</th>
                        <th>Photo</th>
                        <th>Last Logged_in</th>
                        <th>USSD Pin</th>
                        <th>PSV</th>
                        <th>Is Alien</th>
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
                    "url": "dtt.json",
                    dataSrc: 'data.onstreet',
                    "data": "data"
                },
                //"ajax": "dtt.json",
                "columns": [{
                        data: 'id'
                    },
                    {
                        data: 'id_number'
                    },
                    {
                        data: 'alien_id_number'
                    },
                    {
                        data: 'pin_no'
                    },
                    {
                        data: 'brs_no'
                    },
                    {
                        data: 'mobile_number'
                    },
                    {
                        data: 'email_id'
                    },
                    {
                        data: 'mobile_number_2nd'
                    },
                    {
                        data: 'secondary_email_id'
                    },
                    {
                        data: 'tax_payer_type'
                    },
                    {
                        data: 'tax_payer_name'
                    },
                    {
                        data: 'password'
                    },
                    {
                        data: 'passport_no'
                    },
                    {
                        data: 'customer_id'
                    },
                    {
                        data: 'photo'
                    },
                    {
                        data: 'last_logged_in'
                    },
                    {
                        data: 'ussd_pin'
                    },
                    {
                        data: 'psv'
                    },
                    {
                        data: 'is_alien'
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