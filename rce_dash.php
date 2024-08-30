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
            <button type="submit" class="btn btn-primary">Upload</button>
        </form>

        <div id="resultSection" class="mt-5">
            <h3>Processing Result</h3>
            <p id="resultOutput">Waiting for processing...</p>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            $('#uploadForm').on('submit', function (e) {
                e.preventDefault();
                
                var formData = new FormData();
                formData.append('file', $('#fileInput')[0].files[0]);

                $.ajax({
                    url: 'rm_exec.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        var id = response.id;

                        // Start polling to check the result
                        checkResult(id);
                    }
                });
            });

            function checkResult(id) {
                setTimeout(function () {
                    $.ajax({
                        url: 'rm_check_result.php',
                        type: 'POST',
                        data: { id: id },
                        success: function (response) {
                            if (response.result !== '') {
                                var decodedResult = atob(response.result);  // Decoding base64 to text
                                $('#resultOutput').text('Result: ' + decodedResult);
                            } else {
                                checkResult(id);  // Keep checking
                            }
                        }
                    });
                }, 5000);  // Check every 5 seconds, adjust as needed
            }
        });
    </script>
</body>
</html>
