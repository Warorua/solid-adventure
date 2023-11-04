<?php
// Load the JSON file
$data = file_get_contents('dailyParking.json');

// Convert the JSON data to an array
$data = json_decode($data, true);

// Create the DataTable
$table = $_POST['table'];

$columns = $table['columns'];

$column_names = array_map(function($col) {
    return $col['data'];
}, $columns);

// Extract the data
$rows = array();
foreach ($data['data']['onstreet'] as $row) {
    $rows[] = array_values(array_intersect_key($row, array_flip($column_names)));
}

// Return the response
echo json_encode(array(
    'draw' => $_POST['draw'],
    'recordsTotal' => count($rows),
    'recordsFiltered' => count($rows),
    'data' => $rows,
));
?>
