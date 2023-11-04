<?php

// An example of using php-webdriver.
// Do not forget to run composer install before. You must also have Selenium server started and listening on port 4444.

namespace Facebook\WebDriver;

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;

require_once('vendor/autoload.php');
include './includes/core_ws.php';
// This is where Selenium server 2/3 listens by default. For Selenium 4, Chromedriver or Geckodriver, use http://localhost:4444/
$host = 'http://localhost:9515';

$capabilities = DesiredCapabilities::chrome();

$driver = RemoteWebDriver::create($host, $capabilities);


// navigate to Selenium page on Wikipedia
$driver->get('https://accounts.ecitizen.go.ke/login/verify-login');

/*
// write 'PHP' in the search box
$driver->findElement(WebDriverBy::id('searchInput')) // find search input element
    ->sendKeys('PHP') // fill the search box
    ->submit(); // submit the whole form

// wait until 'PHP' is shown in the page heading element
$driver->wait()->until(
    WebDriverExpectedCondition::elementTextContains(WebDriverBy::id('firstHeading'), 'PHP')
);

// print title of the current page to output
echo "The title is '" . $driver->getTitle() . "'<br/>";

// print URL of current page to output
echo "The current URL is '" . $driver->getCurrentURL() . "'<br/>";

// find element of 'History' item in menu
$historyButton = $driver->findElement(
    WebDriverBy::cssSelector('#ca-history a')
);

// read text of the element and print it to output
echo "About to click to button with text: '" . $historyButton->getText() . "'<br/>";

// click the element to navigate to revision history page
$historyButton->click();

// wait until the target page is loaded
$driver->wait()->until(
    WebDriverExpectedCondition::titleContains('Revision history')
);
//*/
// print the title of the current page
echo "The title is '" . $driver->getTitle() . "'<br/><br/>";

// print the URI of the current page

echo "The current URI is '" . $driver->getCurrentURL() . "'<br/><br/>";

// delete all cookies
//$driver->manage()->deleteAllCookies();

// add new cookie
//$cookie = new Cookie('cookie_set_by_selenium', 'cookie_value');
$fields = [
    '_csrf_token' => authCookie(),

    'auth[pwd]' => 'Warorua6298&#',
    'auth[username]' => 'Waroruaalex640@gmail.com',
];

$url = 'https://accounts.ecitizen.go.ke/login';

login($url, $fields);
$cookie = new Cookie('_single_signon_key', readkey("_single_signon_key_login"));

$driver->manage()->addCookie($cookie);

// dump current cookies to output
$cookies = $driver->manage()->getCookies();
print_r($cookies);
$pageContent = $driver->getPageSource();
echo $pageContent;
// terminate the session and close the browser
$driver->quit();