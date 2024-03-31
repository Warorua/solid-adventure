<?php
/*
include './rejuv/conn.php';

$stmt = $conn->prepare("SELECT id, paybillBal FROM mpesaTransactions ORDER BY id DESC LIMIT 1");
$stmt->execute();
$up = $stmt->fetch();
$newId = $up['id']+2;
$newBal = $up['paybillBal']+500;


echo $up['id'].'<br/>';
echo $newId.'<br/>';
echo $up['paybillBal'].'<br/>';
echo $newBal.'<br/>';
*/

function splitName($fullName) {
    // Trim any extra spaces from the name and split it into an array
    $nameParts = explode(' ', trim($fullName));
    // Initialize an array to hold first, middle, and last names
    $name = ['first' => '', 'middle' => '', 'last' => ''];

    // Depending on the number of parts, assign them accordingly
    switch (count($nameParts)) {
        case 1:
            // Only one part, so it's the first name
            $name['first'] = $nameParts[0];
            break;
        case 2:
            // Two parts, so first and last names
            $name['first'] = $nameParts[0];
            $name['last'] = $nameParts[1];
            break;
        default:
            // Three or more parts, so first, last, and the rest as middle names
            $name['first'] = array_shift($nameParts); // Assign and remove the first item
            $name['last'] = array_pop($nameParts); // Assign and remove the last item
            $name['middle'] = implode(' ', $nameParts); // The rest are middle names
            break;
    }

    return $name;
}

// Example usage
$fullName = "John Michael";
$splitName = splitName($fullName);
print_r($splitName);
