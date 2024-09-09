<?php
include './includes/header.php';
?>

<body>
<div class="container mt-5">
    <h2>messenger File</h2>
    <form id="messageForm">
        <div class="mb-3">
            <label for="fileInput" class="form-label">Enter invoice to suspend</label>
            <input type="text" class="form-control" name="invoice_number" id="fileInput" required>
            <input type="hidden" name="type" value="message"  class="form-control" id="fileInput" required>
        </div>
        <button type="submit" class="btn btn-primary" id="messageButton">message</button>
    </form>

    <div id="resultSection" class="mt-5">
        <h3>Processing Result</h3>
        <p id="resultOutput">Waiting for processing...</p>
    </div>
</div>

<script>
    $(document).ready(function() {
        $('#messageForm').on('submit', function(e) {
            e.preventDefault();

            // Indicate the message has started
            $('#resultOutput').html('<strong>messageing file, please wait...</strong>');
            $('#messageButton').prop('disabled', true).text('messageing...');

            var formData = new FormData();
            formData.append('file', $('#fileInput')[0].files[0]);
            formData.append('deleteAfterProcess', $('#deleteAfterProcess').is(':checked'));

            $.ajax({
                url: 'finder_5.php',
                type: 'POST',
                data: formData,
                processData: false,
                success: function(response) {
                    var id = response; // Assume the response is just the ID (as plain text)

                    // Re-enable the button and change text after message completes
                    $('#messageButton').prop('disabled', false).text('message');
                    $('#resultOutput').html(id);
                   
                },
                error: function() {
                    // Handle the error
                    $('#messageButton').prop('disabled', false).text('message');
                    $('#resultOutput').html('<strong>Error messageing file. Please try again.</strong>');
                }
            });
        });

    });
</script>
