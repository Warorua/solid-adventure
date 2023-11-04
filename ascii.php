<?php
$asciiTable = [];

for ($i = 0; $i <= 127; $i++) {
    $asciiTable[chr($i)] = $i;
}

// Printing the ASCII table
foreach ($asciiTable as $character => $decimal) {
    echo "Character: " . $character . ", Decimal: " . $decimal . "<br/>";
}
