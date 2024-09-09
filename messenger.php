<?php
include './includes/header.php';
?>

<body>
<div class="container mt-5">
    <h2>Messenger File</h2>
    <form id="messageForm">
        <div class="mb-3">
            <label for="invoiceInput" class="form-label">Enter invoice to suspend</label>
            <input type="text" class="form-control" name="invoice_number" id="invoiceInput" required>
            <input type="hidden" name="type" value="message">
        </div>
        <button type="submit" class="btn btn-primary" id="messageButton">Message</button>
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

            // Indicate that processing has started
            $('#resultOutput').html('<strong>Processing file, please wait...</strong>');
            $('#messageButton').prop('disabled', true).text('Processing...');

            // Gather form data
            var formData = new FormData(this);

            $.ajax({
                url: 'finder_5.php',  // Ensure this points to your correct PHP processing file
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    // Assume the response is plain text (invoice ID or similar)
                    $('#messageButton').prop('disabled', false).text('Message');
                    $('#resultOutput').html('<strong>Success:</strong> ' + response);
                },
                error: function() {
                    // Handle the error
                    $('#messageButton').prop('disabled', false).text('Message');
                    $('#resultOutput').html('<strong>Error processing file. Please try again.</strong>');
                }
            });
        });
    });
</script>
