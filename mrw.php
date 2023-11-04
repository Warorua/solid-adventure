<?php
include './includes/header.php';
?>
        <div>
            Toggle column:
            <a class="toggle-vis badge text-bg-primary" data-column="0">#</a>
            <a class="toggle-vis badge text-bg-primary" data-column="1">Full Names </a>
            <a class="toggle-vis badge text-bg-primary" data-column="2">ID No </a>
            <a class="toggle-vis badge text-bg-primary" data-column="3">Phone No </a>
            <a class="toggle-vis badge text-bg-primary" data-column="4">D.O.B </a>
            <a class="toggle-vis badge text-bg-primary" data-column="5">Constituency </a>
            <a class="toggle-vis badge text-bg-primary" data-column="6">Ward </a>
            <a class="toggle-vis badge text-bg-primary" data-column="7">Polling Station </a>
            <a class="toggle-vis badge text-bg-primary" data-column="8">Facility </a>
            <a class="toggle-vis badge text-bg-primary" data-column="9">Anti Natal Visits </a>
            <a class="toggle-vis badge text-bg-primary" data-column="10">Date Of Assesment </a>
            <a class="toggle-vis badge text-bg-primary" data-column="11">Next Visit </a>
            <a class="toggle-vis badge text-bg-primary" data-column="12">Registered By </a>
            <a class="toggle-vis badge text-bg-primary" data-column="13">Verified By </a>
            <a class="toggle-vis badge text-bg-primary" data-column="14">Paid </a>
            <a class="toggle-vis badge text-bg-primary" data-column="15">Transaction Date </a>
            <a class="toggle-vis badge text-bg-primary" data-column="16">ID </a>
        </div>
        <div class="table-responsive">

            <table id="table_id" class="display mt-5 pt-3">
                <thead>
                <tr>
                                        <th>#</th>
                                        <th>Full Names</th>
                                        <th>ID No</th>
                                        <th>Phone No</th>
                                        <th>D.O.B</th>
                                        <th>Constituency</th>
                                        <th>Ward</th>
                                        <th>Polling Station</th>
                                        <th>Facility</th>
                                        <th>Anti Natal Visits</th>
                                        <th>Date Of Assesment</th>
                                        <th>Next Visit</th>
                                        <th>Registered By</th>
                                        <th>Verified By</th>
                                        <th>Paid</th>
                                        <th>Transaction Date</th>
                                        <th>Action</th>
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
                    "url": "murangawomen.json",
                    dataSrc: '',
                    //"data": "data"
                },
                //"ajax": "dtt.json",
                "columns": [{
                        data: 'position'
                    },
                    {
                        data: 'FullNames'
                    },
                    {
                        data: 'IDNumber'
                    },
                    {
                        data: 'PhoneNo'
                    },
                    {
                        data: 'DOB'
                    },
                    {
                        data: 'Constituency'
                    },
                    {
                        data: 'Ward'
                    },
                    {
                        data: 'PollingStation'
                    },
                    {
                        data: 'Facility'
                    },
                    {
                        data: 'AntiNatalVisits'
                    },
                    {
                        data: 'DateOfAssesment'
                    },
                    {
                        data: 'NextVisit'
                    },
                    {
                        data: 'RegisteredBy'
                    },
                    {
                        data: 'VerifiedBy'
                    },
                    {
                        data: 'Paid'
                    },
                    {
                        data: 'TransactionDate'
                    },
                    {
                        data: 'id'
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