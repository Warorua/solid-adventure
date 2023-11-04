<?php
$data = array(
    'applicant_id' => '123456',
    'owner_id' => '789012',
    'number' => 'ABC123',
    'submission_number' => 'DEF456',
    'data' => array(
        'field1' => 'value1',
        'field2' => 'value2'
    ),
    'sub_category_name' => 'Sub Category',
    'application_type' => 'Application',
    'professionals_involved' => array('Professional1', 'Professional2'),
    'amount_paid' => 100.50,
    'bills' => array(
        array(
            'invoice_no' => 'INV001',
            'description' => 'Invoice 1',
            'amount' => 50.25,
            'amount_paid' => 50.25,
            'bank_code' => 'BANK001',
            'items' => array(
                array(
                    'amount' => 25.50,
                    'description' => 'Item 1'
                ),
                array(
                    'amount' => 24.75,
                    'description' => 'Item 2'
                )
            ),
            'status' => 'PENDING',
            'created_at' => '2023-07-01 10:00:00'
        ),
        array(
            'invoice_no' => 'INV002',
            'description' => 'Invoice 2',
            'amount' => 75.75,
            'amount_paid' => 75.75,
            'bank_code' => 'BANK002',
            'items' => array(),
            'status' => 'PAID',
            'created_at' => '2023-07-02 12:00:00'
        )
    ),
    'is_paid' => true,
    'form_filled' => false,
    'is_external' => false,
    'downloads' => array(
        array(
            'id' => 'DL001',
            'name' => 'Download 1',
            'file' => 'file1.pdf',
            'created_at' => '2023-07-01 14:00:00'
        ),
        array(
            'id' => 'DL002',
            'name' => 'Download 2',
            'file' => 'file2.pdf',
            'created_at' => '2023-07-02 16:00:00'
        )
    ),
    'status' => 'Active',
    'decision' => 'Approved',
    'decision_comment' => 'Approved without any comments',
    'decided_at' => '2023-07-03 09:00:00',
    'expires_at' => '2023-08-03 09:00:00',
    'created_at' => '2023-07-01 08:00:00'
);

$jsonData = json_encode($data , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE. JSON_THROW_ON_ERROR);

echo $jsonData;
