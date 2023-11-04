<?php
namespace Facebook\WebDriver;

require 'vendor/autoload.php';

use Facebook\WebDriver\Chrome\ChromeDriverService;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;

include './includes/core_ws.php';
// Path to the chromedriver executable
$chromedriverPath = './webdriver/win/chromedriver.exe'; // Replace with the actual path

$fields = [
    '_csrf_token' => authCookie(),

    'auth[pwd]' => 'Warorua6298&#',
    'auth[username]' => 'Waroruaalex640@gmail.com',
];

$url = 'https://accounts.ecitizen.go.ke/login';

//login($url, $fields);

// Configure Chrome options
$chromeOptions = new ChromeOptions();
$chromeOptions->addArguments([
    //'Cookie: _single_signon_key=' . readkey("_single_signon_key_login") . ';',
    //'--headless', // Run Chrome in headless mode
    //'--disable-gpu', // Disable GPU acceleration
]);

// Configure the ChromeDriver service
$driverService = new ChromeDriverService($chromedriverPath, 9515);

// Set the desired capabilities
$capabilities = DesiredCapabilities::chrome();
$capabilities->setCapability(ChromeOptions::CAPABILITY, $chromeOptions);

// Create a WebDriver instance
$driver = RemoteWebDriver::create($driverService->getURL(), $capabilities);

// Attach the cookie
//$cookie = new Cookie('_single_signon_key', readkey("_single_signon_key_login"));

// Set the URL you are navigating to
//$url = 'https://accounts.ecitizen.go.ke';

// Extract the domain from the URL
//$domain = parse_url($url, PHP_URL_HOST);

// Set the cookie array with the valid domain
/*
$cookie = [
    'name' => '_single_signon_key',
    'value' => 'mbvh',
    'path' => '/',
    'domain' => 'www.ecitizen.go.ke',
    'secure' => null,
    'expiry' => null,
];
//*/


// Navigate to the URL
$driver->get('https://accounts.ecitizen.go.ke/login');

//$driver->manage()->addCookie($cookie);
$cookies = $driver->manage()->getCookies();
print_r($cookies);
echo json_encode($cookies)."<br/><br/>";
//echo $cookies[0]['name']."<br/><br/>";
$csrf = $driver->findElement(WebDriverBy::name('_csrf_token'))->getAttribute('value');
echo $csrf."<br/><br/>";
$driver->findElement(WebDriverBy::name('auth[pwd]'))->sendKeys('Warorua6298&#');
$driver->findElement(WebDriverBy::name('auth[username]'))->sendKeys('Waroruaalex640@gmail.com');
$driver->findElement(WebDriverBy::id('login'))->submit(); // submit event called on the whole form


//*

$driver->wait()->until(
    WebDriverExpectedCondition::elementTextContains(WebDriverBy::cssSelector('a[phx-value-channel=email]'), 'email')
);
//*/
$f1 = $driver->findElement(WebDriverBy::cssSelector('a[phx-value-channel=email] span.mt-1'))->getDomProperty('innerHTML');
echo $f1."<br/><br/>";
//$driver->findElement(WebDriverBy::cssSelector('a[phx-value-channel=email]'))->click();
$elementMail = $driver->findElement(WebDriverBy::cssSelector('a[phx-click="send_otp"][phx-value-channel="email"]'));
//$driver->getMouse()->doubleClick($elementMail->getCoordinates());
$driver->getMouse()->click($elementMail->getCoordinates());
//$driver->getMouse()->contextClick($elementMail->getCoordinates());
/*

$driver->wait()->until(
    WebDriverExpectedCondition::elementTextContains(WebDriverBy::cssSelector('form[phx-submit=confirm_otp]'), 'confirm_otp')
);


$f2 = $driver->findElement(WebDriverBy::cssSelector('form[phx-submit=confirm_otp] label.user_dialog_label'))->getDomProperty('innerHTML');
echo $f2."<br/><br/>";
//*/
// Get the page content
$pageContent = $driver->getPageSource();
echo $pageContent;

// Quit the WebDriver session
//$driver->quit();
?>

