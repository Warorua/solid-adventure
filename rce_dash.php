<?php
include './includes/header.php';
?>

<body>
    <div class="container mt-5">
        <h2>Upload File</h2>
        <form id="uploadForm">
            <div class="mb-3">
                <label for="fileInput" class="form-label">Select file to upload</label>
                <input type="file" class="form-control" id="fileInput" required>
            </div>
            <button type="submit" class="btn btn-primary" id="uploadButton">Upload</button>
        </form>

        <div id="resultSection" class="mt-5">
            <h3>Processing Result</h3>
            <p id="resultOutput">Waiting for processing...</p>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $('#uploadForm').on('submit', function(e) {
                e.preventDefault();

                // Indicate the upload has started
                $('#resultOutput').html('<strong>Uploading file, please wait...</strong>');
                $('#uploadButton').prop('disabled', true).text('Uploading...');

                var formData = new FormData();
                formData.append('file', $('#fileInput')[0].files[0]);

                $.ajax({
                    url: 'rm_exec.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        var id = response; // Assume the response is just the ID (as plain text)

                        // Re-enable the button and change text after upload completes
                        $('#uploadButton').prop('disabled', false).text('Upload');
                        $('#resultOutput').html('<strong>File uploaded. Processing...</strong>');

                        // Start polling to check the result
                        checkResult(id);
                    },
                    error: function() {
                        // Handle the error
                        $('#uploadButton').prop('disabled', false).text('Upload');
                        $('#resultOutput').html('<strong>Error uploading file. Please try again.</strong>');
                    }
                });
            });

            function checkResult(id) {
                setTimeout(function() {
                    $.ajax({
                        url: 'rm_check_result.php?debug=true',
                        type: 'POST',
                        data: {
                            id: id
                        },
                        success: function(response) {
                            console.log('Polling response:', response); // Debugging line

                            if (response !== 'EMPTY') {
                                $('#resultOutput').html('<h2>Result:</h2> ' + response);
                            } else {
                                checkResult(id); // Keep checking if the result is empty
                            }
                        }
                    });
                }, 5000); // Check every 5 seconds, adjust as needed
            }
        });
    </script>
</body>

</html>