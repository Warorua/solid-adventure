<?php

function hashPostgresPassword($username, $password)
{
    if ($password === '') {
        // PostgreSQL MD5 hash format: md5(password + username)
        return 'md5' . md5('' . $username);
    } else {
        // PostgreSQL MD5 hash format: md5(password + username)
        return 'md5' . md5($password . $username);
    }
}

$username = 'postgres';
$password = '';

echo 'md50da39c4281160a899cec5116835636dd'. "<br/>";
echo 'md5' . md5($password . $username). "<br/>";
echo 'md5' . md5($password .''. $username). "<br/>";
echo 'md5' . md5($password ). "<br/>";
echo 'md5' . md5( $username). "<br/>";
echo 'md5' . md5('postgres' . $username). "<br/>";
echo 'md5' . md5(null . $username). "<br/>";



die();

$roles = [
    ["rolname" => "nasuser", "rolpassword" => "md5d514b98a1fa214f712853bd897117c2e"],
    ["rolname" => "geoserver_prod", "rolpassword" => "md5188f937e2075767c16f3eb6756a99b6a"],
    ["rolname" => "geoserver_staging", "rolpassword" => "md56900b3a7800237964eefcfa20f06f8e5"],
    ["rolname" => "postgres", "rolpassword" => "md50da39c4281160a899cec5116835636dd"],
    ["rolname" => "nas_service", "rolpassword" => "md53ec3dcd28a287168b1c4d8190e617909"],
    ["rolname" => "KMwangi_Qgis", "rolpassword" => "md524ffece5d84300fc00eb6c1a722ed682"]
];

// List of potential passwords to test
$passwordList = [
    'password1', // Replace with guessed or known passwords
    'postgres',
    'Postgres',
    'nas_data_editor',
    'nasAdministrators',
    'nas_tool_admin',
    'geoserver_prod',
    'geoserver_staging',
    'super',
    'KMwangi_Qgis',
    'nas_service',
    'geoserver',
    'nas',
    'KMwangi',
    'Qgis',
    'nms_p@$$',
    'nas_p@$$',
    'super_p@$$',
    'geoserver_p@$$',
    'p@$$',
    'Geoserver',
    'KMwangi_p@$$',
    'KMwangi_',
    'Super',
    'SUPER',
    'Nas',
    'happycoding',
    'default_password',
    ''
];
foreach ($roles as $role) {
    $username = $role['rolname'];
    $storedHash = $role['rolpassword'];

    if ($storedHash === null) {
        echo "Skipping user: $username (no password set)<br/>";
        continue;
    }

    $isMatchFound = false;
    foreach ($passwordList as $password) {
        $calculatedHash = hashPostgresPassword($username, $password);

        // Debugging Output
        echo "Testing user: $username, Password: " . ($password === '' ? '[empty]' : $password) . "<br/>";
        echo "Calculated Hash: $calculatedHash<br/>";
        echo "Stored Hash: $storedHash<br/>";

        if ($calculatedHash === $storedHash) {
            echo "Password match found for user: $username - Password: " . ($password === '' ? '[empty]' : $password) . "<br/><br/>";
            $isMatchFound = true;
            break;
        }
    }

    if (!$isMatchFound) {
        echo "No password match found for user: $username<br/><br/>";
    }
}
?>
