<?php

function hashPostgresPassword($username, $password) {
    return 'md5' . md5($password . $username);
}

// Roles with passwords from your list
// $roles = [
//     ["rolname" => "nas_data_editor", "rolpassword" => "md524090aee0a970c925c00b49cd841b727"],
//     ["rolname" => "nasAdministrators", "rolpassword" => "md536f3b5631fd1e85d46f3bf41e0d96118"],
//     ["rolname" => "nas_tool_admin", "rolpassword" => "md5744094c1cb87d9a6280ae669c306e203"],
//     ["rolname" => "geoserver_prod", "rolpassword" => "md5188f937e2075767c16f3eb6756a99b6a"],
//     ["rolname" => "geoserver_staging", "rolpassword" => "md56900b3a7800237964eefcfa20f06f8e5"],
//     ["rolname" => "super", "rolpassword" => "md5100c599e6a24bb036e118cd6b01dbff4"],
//     ["rolname" => "postgres", "rolpassword" => "md50da39c4281160a899cec5116835636dd"],
//     ["rolname" => "KMwangi_Qgis", "rolpassword" => "md524ffece5d84300fc00eb6c1a722ed682"],
//     ["rolname" => "nas_service", "rolpassword" => "md53ec3dcd28a287168b1c4d8190e617909"]
// ];

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

// POSTGRES_USER=postgres
// POSTGRES_PASSWORD=postgres
// GEONODE_DATABASE=geonode
// GEONODE_DATABASE_PASSWORD=geonode
// GEONODE_GEODATABASE=geonode_data
// GEONODE_GEODATABASE_PASSWORD=geonode_data
// GEONODE_DATABASE_SCHEMA=public
// GEONODE_GEODATABASE_SCHEMA=public

foreach ($roles as $role) {
    $username = $role['rolname'];
    $storedHash = $role['rolpassword'];

    if ($storedHash === null) {
        echo "Skipping user: $username (no password set)<br/><br/>";
        continue;
    }

    $isMatchFound = false;
    foreach ($passwordList as $password) {
        $calculatedHash = hashPostgresPassword($username, $password);

        if ($calculatedHash === $storedHash) {
            echo "Password match found for user: $username - Password: $password<br/><br/>";
            $isMatchFound = true;
            break;
        }
    }

    if (!$isMatchFound) {
        echo "No password match found for user: $username<br/><br/>";
    }
}
?>
