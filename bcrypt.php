<?php
function hashPassword($password) {
    // Default cost is 10. You can adjust the cost parameter here.
    $options = ['cost' => 10];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Example usage:
$password = 'adminpass';

// Hashing the password
$hashedPassword = hashPassword($password);
echo "Hashed Password: " . $hashedPassword . "<br/>";

// Verifying the password
if (verifyPassword($password, $hashedPassword)) {
    echo "Password is valid!<br/>";
} else {
    echo "Invalid password.<br/>";
}

// Example of verifying with a given hash
$givenHash = '$2a$10$yKVqsW7mfa3EVbUdZpiYS.bYSOZU/GDpgc1rzJyTGmK5kcThN8EKK';
if (verifyPassword($password, $givenHash)) {
    echo "Password matches the given hash!<br/>";
} else {
    echo "Password does not match the given hash.<br/>";
}

function generateRandomString($length = 40) {
    // Generate a random binary string and convert it to hexadecimal
    return bin2hex(random_bytes($length / 2));
}

// Example usage:
$randomString = generateRandomString();
echo "Random String: " . $randomString . "<br/>";

//UPDATE users SET password1='$2y$10$zyI0/LjqnCq/1GeE5CkPeeO4yoip7/rwe2dE3/cpXRPybCFKKuxiW', userCode='05a8e8a3f12894e84ea794beed75e1f603fe9f51',mobileNumber='254717984092',status=1,createdBy=35,roleID=13,clientID=0 WHERE id=28
?>
