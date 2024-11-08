<?php
require 'vendor/autoload.php';

use simplehtmldom\HtmlDocument;
use Sonata\GoogleAuthenticator\GoogleAuthenticator;
use Sonata\GoogleAuthenticator\GoogleQrUrl;

//include './includes/core.php';

include './includes/core2.php';

////////CAR PLATE SEARCH
$source = 'sec';

include './includes/uni_conn.php';

$output = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['username']) || !isset($_POST['password'])  || !isset($_POST['mesee'])) {
        http_response_code(400);
        echo "Incomplete request 1";
        exit();
    }
    if (empty($_POST['username']) || empty($_POST['password'])) {
        http_response_code(400);
        echo "Incomplete request 2";
        exit();
    }
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password

    // Generate a Google Authenticator secret
    function generateRandomId() {
        // Generate a random number, you can set limits as desired
        $random_number = mt_rand(0, 999); // Adjust range as needed for your ID requirements
    
        // Format the number to fit "96_1" pattern
        return sprintf('96_%d', $random_number);
    }

    $gAuth = new GoogleAuthenticator();
    $ga_secret = $gAuth->generateSecret();
    $ga_secret = base64_encode($ga_secret);
    $user_obj = [];
    
    if(isset($userId)){
        //echo  'userId is set';
        //echo  ' And is is: '.$userId;
        $stmt = $conn4->prepare("SELECT * FROM users WHERE user_id = :user_id");
        $stmt->execute(['user_id'=>$userId]);
        $adm_obj = $stmt->fetch();
        //echo json_encode($adm_obj);

        if($adm_obj['role'] != '0'){
            http_response_code(401);
            echo "Forbidden Request!";
            exit();
        }
    }else{
        http_response_code(400);
        echo "Bad request 1";
        exit();
    }
    echo  $userId;
    // Store the new user in the database (replace with actual DB logic)
    //$stmt = $conn4->prepare("SELECT * FROM users WHERE username = :username");
    $stmt = $conn4->prepare("INSERT INTO users (user_id, username, password, ga_secret) VALUES (:user_id, :username, :pass, :ga)");
    if ($stmt->execute(['user_id'=>generateRandomId(),'username'=>$username, 'pass'=>$password, 'ga'=>$ga_secret])) {
        // Generate QR code for Google Authenticator setup
        $qrCodeUrl = GoogleQrUrl::generate('PKestrel' . $username, $ga_secret);

        $user_obj['success'] = true;
        $user_obj['message'] = 'Account create successfully';
        $user_obj['username'] = $username;
        $user_obj['qr_src'] = $qrCodeUrl;

        //echo "<h3>User '$username' created successfully.</h3>";
        //echo "<p>Scan this QR code with Google Authenticator:</p>";
        //echo "<img src='" . htmlspecialchars($qrCodeUrl) . "' alt='QR Code'>";
        //echo "<p>Or enter this secret key manually: " . htmlspecialchars($ga_secret) . "</p>";
        echo json_encode($user_obj, JSON_PRETTY_PRINT);
    } else {
        http_response_code(400);
        //echo "<p>Error: Could not create user. Username might already exist.</p>";
        $user_obj['success'] = false;
        $user_obj['message'] = 'Account creation failed!';
        echo json_encode($user_obj, JSON_PRETTY_PRINT);
    }
} else {
    http_response_code(400);
    $output['error'] = 'Required parameters not set!';
    echo json_encode($output, JSON_PRETTY_PRINT);
}
