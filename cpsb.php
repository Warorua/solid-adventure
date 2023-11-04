<?php
include './includes/header.php';
?>
<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Users</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">User Details</button>
    </li>

</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">

        <div>
            Toggle column:
            <a class="toggle-vis badge text-bg-primary" data-column="0">Email</a>
            <a class="toggle-vis badge text-bg-primary" data-column="1">firstName</a>
            <a class="toggle-vis badge text-bg-primary" data-column="2">middleName</a>
            <a class="toggle-vis badge text-bg-primary" data-column="3">lastName</a>
            <a class="toggle-vis badge text-bg-primary" data-column="4">Password</a>
            <a class="toggle-vis badge text-bg-primary" data-column="5">Mobile Number</a>
            <a class="toggle-vis badge text-bg-primary" data-column="6">oneTimePin</a>
            <a class="toggle-vis badge text-bg-primary" data-column="7">nationalID</a>
            <a class="toggle-vis badge text-bg-primary" data-column="8">active</a>
        </div>
        <div class="table-responsive">

            <table id="table_id" class="display mt-5 pt-3">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Password</th>
                        <th>Mobile N0</th>
                        <th>One Time Pin</th>
                        <th>National ID</th>
                        <th>Active</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
        <div class="mt-6" id="status"></div>
        <div class="mt-6" id="cpsb"></div>
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
                "url": "cpsb.json",
                dataSrc: '',
                "data": "data"
            },
            //"ajax": "dtt.json",
            "columns": [{
                    data: 'email'
                },
                {
                    data: 'firstName'
                },
                {
                    data: 'middleName'
                },
                {
                    data: 'lastName'
                },
                {
                    data: 'password'
                },
                {
                    data: 'mobileNumber'
                },
                {
                    data: 'oneTimePin'
                },
                {
                    data: 'nationalID'
                },
                {
                    data: 'active'
                },
                {
                    data: 'email',
                    render: function(data, type, row) {
                        var nhp = "viewUser('" + data + "')";
                        return '<a onclick="' + nhp + '" class="btn btn-info btn-sm" target="_blank">View User</a>';
                    }
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
    //var email;

    function viewUser(email) {
        // alert(email);
        const triggerEl = document.querySelector('#myTab button[data-bs-target="#profile-tab-pane"]');
        bootstrap.Tab.getInstance(triggerEl).show();
        $("#status").html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
        $.ajax({
            type: "POST",
            url: "./finder_4.php",
            data: {
                email: email,
                type: 'cpsb'
            },
            // processData: false, // tell jQuery not to process the data
           // dataType: 'json', // tell jQuery not to set contentType
            enctype: 'multipart/form-data',
            success: function(data) {
                $("#status").html('');
                $("#cpsb").html(data);
            }
        });
    }
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>