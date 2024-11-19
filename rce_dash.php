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
        <div id="resultOutputContainer">
            <pre id="resultOutput" class="terminal-style"></pre>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        let currentOutputFormat = 'terminal';

        // Initialize with "Waiting for processing..." message
        const initialMessage = 'Waiting for processing...';
        $('#resultOutput').data('raw', initialMessage);
        updateOutput(initialMessage);

        // Handle output format change
        $('#outputFormat').on('change', function () {
            currentOutputFormat = $(this).val();
            const rawContent = $('#resultOutput').data('raw') || initialMessage;
            updateOutput(rawContent);
        });

        $('#uploadForm').on('submit', function (e) {
            e.preventDefault();

            // Reset and show uploading status
            const uploadingMessage = 'Uploading file, please wait...';
            $('#resultOutput').data('raw', uploadingMessage);
            updateOutput(uploadingMessage);
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
                    const id = response;

                    // Update UI after upload completes
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    appendToOutput('File uploaded. Processing...');

                    // Start polling to check the result
                    checkResult(id);
                },
                error: function () {
                    $('#uploadButton').prop('disabled', false).text('Upload');
                    appendToOutput('Error uploading file. Please try again.');
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
                            appendToOutput(response);

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
                success: function () {
                    appendToOutput('Record has been deleted.');
                },
                error: function () {
                    appendToOutput('Error deleting the record.');
                }
            });
        }

        function updateOutput(content) {
            if (currentOutputFormat === 'terminal') {
                $('#resultOutput').text(content);
            } else if (currentOutputFormat === 'html') {
                const formattedContent = content.replace(/\n/g, '<br>');
                $('#resultOutput').html(formattedContent);
            }
        }

        function appendToOutput(newContent) {
            const rawContent = $('#resultOutput').data('raw') || '';
            const updatedContent = rawContent + '\n' + newContent;
            $('#resultOutput').data('raw', updatedContent);
            updateOutput(updatedContent);
        }
    });
</script>

<style>
    .terminal-style {
        background: #000;
        color: #0f0;
        padding: 10px;
        border: 1px solid #444;
        white-space: pre-wrap;
    }

    .html-style {
        background: #f8f9fa;
        color: #212529;
        padding: 10px;
        border: 1px solid #ddd;
        white-space: normal;
    }
</style>
