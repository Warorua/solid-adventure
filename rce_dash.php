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
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="deleteAfterProcess">
            <label class="form-check-label" for="deleteAfterProcess">Delete after processing</label>
        </div>
        <button type="submit" class="btn btn-primary" id="uploadButton">Upload</button>
    </form>

    <div id="resultSection" class="mt-5">
        <h3>Processing Result</h3>
        <div class="mb-3">
            <label for="outputFormat" class="form-label">Output Format</label>
            <select class="form-select" id="outputFormat">
                <option value="terminal" selected>Terminal</option>
                <option value="html">HTML</option>
            </select>
        </div>
        <pre id="resultOutput" class="border p-3" style="background: #000; color: #0f0;">Waiting for processing...</pre>
    </div>
</div>

<script>
    $(document).ready(function () {
        let currentOutputFormat = 'terminal';

        // Handle output format change
        $('#outputFormat').on('change', function () {
            currentOutputFormat = $(this).val();
            const rawContent = $('#resultOutput').data('raw') || 'Waiting for processing...';
            updateOutput(rawContent);
        });

        $('#uploadForm').on('submit', function (e) {
            e.preventDefault();

            // Indicate the upload has started
            $('#resultOutput').text('Uploading file, please wait...');
            $('#uploadButton').prop('disabled', true).text('Uploading...');

            const formData = new FormData();
            formData.append('file', $('#fileInput')[0].files[0]);
            formData.append('deleteAfterProcess', $('#deleteAfterProcess').is(':checked'));

            $.ajax({
                url: 'rm_exec.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    const id = response; // Assume the response is just the ID (as plain text)

                    // Re-enable the button and change text after upload completes
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    $('#resultOutput').text('File uploaded. Processing...');

                    // Start polling to check the result
                    checkResult(id);
                },
                error: function () {
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    $('#resultOutput').text('Error uploading file. Please try again.');
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
                        if (response !== 'EMPTY') {
                            // Save the raw content and update the display
                            $('#resultOutput').data('raw', response);
                            updateOutput(response);

                            // Optionally delete the record after processing
                            if ($('#deleteAfterProcess').is(':checked')) {
                                deleteRecord(id);
                            }
                        } else {
                            checkResult(id); // Keep checking if the result is empty
                        }
                    }
                });
            }, 5000);
        }

        function deleteRecord(id) {
            $.ajax({
                url: 'rm_delete_record.php',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    const rawContent = $('#resultOutput').data('raw') + '\nRecord has been deleted.';
                    $('#resultOutput').data('raw', rawContent);
                    updateOutput(rawContent);
                },
                error: function () {
                    const rawContent = $('#resultOutput').data('raw') + '\nError deleting the record.';
                    $('#resultOutput').data('raw', rawContent);
                    updateOutput(rawContent);
                }
            });
        }

        function updateOutput(content) {
            if (currentOutputFormat === 'terminal') {
                $('#resultOutput').text(content); // Display as plain text
            } else if (currentOutputFormat === 'html') {
                const formattedContent = content
                    .replace(/</g, '&lt;') // Escape HTML tags
                    .replace(/>/g, '&gt;')
                    .replace(/\n/g, '<br>') // Replace newlines with <br>
                    .replace(/\s/g, '&nbsp;'); // Preserve spaces
                $('#resultOutput').html(formattedContent);
            }
        }
    });
</script>
