<?php
use simplehtmldom\HtmlDocument;
require './vendor/autoload.php';
include './includes/core.php';

// use the factory to create a Faker\Generator instance
/*
$faker = new Faker\Generator();
$faker->addProvider(new Faker\Provider\en_US\Person($faker));
$faker->addProvider(new Faker\Provider\en_US\Address($faker));
$faker->addProvider(new Faker\Provider\en_US\PhoneNumber($faker));
$faker->addProvider(new Faker\Provider\en_US\Company($faker));
$faker->addProvider(new Faker\Provider\Lorem($faker));
$faker->addProvider(new Faker\Provider\Internet($faker));


for ($i = 0; $i <= 108; $i++) {
    // generate data by accessing properties
    $first_name = $faker->name;
    // 'Lucy Cechtelar';
    //echo $faker->address;
    // "426 Jordy Lodge
    // Cartwrightshire, SC 88120-6700"
    $email = $faker->freeEmail;
    $referrer = 'patricia';
    // Dolores sit sint laboriosam dolorem culpa et autem. Beatae nam sunt fugit
    // et sit et mollitia sed.
    // Fuga deserunt tempora facere magni omnis. Omnis quia temporibus laudantium
    // sit minima sint.
    //

    $username = $faker->userName;

    $password = $faker->password;

    $set = '1234567890';
    $code = substr(str_shuffle($set), 0, 8);

    $phonenumber = '2547' . $code;

    $data = [
            'confirm_password' =>    $password,
            'email' =>    $email,
            'first_name' =>    $first_name,
            'password' =>    $password,
            'phonenumber' =>    $phonenumber,
            'referrer' =>    $referrer,
            'signup-btn' =>    '',
            'username' =>    $username
        ];
    $url = 'https://techglobalagencies.com/register.php?invitedby=' . $referrer;

     httpPost($url, $data);
}
*/
$fname = './team-3.png';
//$fname = './lab10.php';

//*
$the_pin = 'A002642213D';

$cookie = [
    "Cookie: BIGipServerElasticAPMAgent=2399253514.18975.0000",
    "Cookie: BIGipServeriTAX-Portal-POOL=721920010.37407.0000",
    "Cookie: JSESSIONID=C955A49505CEADCD4294743A13AFE381",
    "Cookie: TS00000000076=08d3496641ab280010f1d3cfd0e63a9a9718796a48c14f1bdd47b833c85f64949836a4b98ea6632f5b0cf397f2587b63085b131d8f09d000b252230ea3fe49a0e6a3be8803a8e8de86ebc450193e93ca559d322ec092d9d85d11c497c7d68d5b183c681ec12f748da49b210d7275533f5a47f4b23a365a1e1337700144e424c9dc4588ae0ee77fc036aabc6a6c914a33c3a63d9267ad9a6a7acb299dfb687278393a2b92c8f7e1bbcacbc4b20ef44f20bcbde65bd57a31d28a1938c5fa9b51b34afad96a3f8fcde07d778998e0adff68955a116a136f8a184adb8919500f1efb12b2b7202990d51e824ac4bc6c1f8dfe4f56aa9eeebaf009102b47cc311b4a68c9bd826660433c3e",
    "Cookie: TS0158d659=01463256c11c81e978931b0d7f7b92c87b05c725d01ed45074f42a631f47e464876bef951eb7cf5483afed610ec068bdd462cd83d1aadb3b36a259ebee664763cb035b1df1dc81cee23aa4bcf1c5f904f59d34d2f5",
    "Cookie: TS01a37fed=01463256c13000676e6f0d03a055de795c22e96cd31d73bbe704b38e19ed645db2fdc27530b0b65351eb71edbb40e9befa5fc1286a1593ae553dade292ad3e24ca162623fa2e0c96871fe80d1b04dc8485b4a269df",
    "Cookie: TS4cb80a3b027=08d3496641ab20000cb37859106d288dd55c348221c6ef8bb5c84692955e650f05dc2e3c5aeb23bc08cfc119ac113000f4d45f486f7421d370e208851809c2d8b4b2c13b4b1afc311af83be8b43f57376bef172514db82db97a51887f9d8dded",
    "Cookie: TS8a8d2db6029=08d3496641ab280090dc248a53f5780c09a6f5e58f3e419483e54c0d1100a74b756748bc07baef3da6cbf5760212daf4",
    "Cookie: TSPD_101_DID=08d3496641ab28008c1eaaa76d42fdc1d0120fcd24120d6d89ea49f97a4a4fc03f9001ffe808a840b303ae91d7425f7c080aaae0fe063800b30a5d372771da3427f81afe692e1201d2a8631003e2b7d544151e37fc13d2edaac314bef7c4100bdfa5789fe1af4461aff71b6448aef6a2",
];

$data1 = [ 
    "callCount"=>"1",
    "windowName"=>"#TS00000000076=4b59a23b73564fc7006413ef5b283694c4bb30c42203df0a5b718749d52a47dda7",
    "c0-scriptName"=>"FetchTaxPayerDetail",
    "c0-methodName"=>"fetchTaxPayerDetail",
    "c0-id"=>"0",
    "c0-param0"=>"string:A015470324F",
    "c0-param1"=>"string:A015470324F",
    "batchId"=>"1",
    "page"=>"/KRA-Portal/paymentRegistration.htm?actionCode=loadPRForm",
    "httpSessionId"=>"",
    "scriptSessionId"=>"D2053C47656A628F9C506C08402DFCCF",
];

$data2 = [ 
    "callCount"=>"1",
    "windowName"=>"#TS00000000076=4b59a23b73564fc7006413ef5b283694c4bb30c42203df0a5b718749d52a47dda7",
    "c0-scriptName"=>"FetchTotalLiabilityDetailsWeb",
    "c0-methodName"=>"FetchTotalLiabilityDetailsWeb",
    "c0-id"=>"0",
    "c0-param0"=>"string:17600775",
    "c0-param1"=>"string:2",
    "c0-param2"=>"string:0",
    "c0-param3"=>"string:SAT",
    "c0-param4"=>"string:0",
    "batchId"=>"4",
    "page"=>"/KRA-Portal/paymentRegistration.htm?actionCode=loadPRForm",
    "httpSessionId"=>"",
    "scriptSessionId"=>"CA7E4C55E337263B729A33695B17E45E",
];


$data = [ 
    "EcoActId"=>"",	
    "EcoActUpdate"=>"",	
    "ISEmailVerified"=>"",	
    "Role"=>"",	
    "actionCode"=>"viewEReturns",
    "isMobileVerified"=>"",	
    "proffUpdate"=>"",	
    "token_key"=>"null",
    "userType"=>"TAXPAYER",
];



$url2 = 'https://itax.kra.go.ke/KRA-Portal/dwr/call/plaincall/FetchTotalLiabilityDetailsWeb.fetchTotalLiabilityDetailsWeb.dwr';

$url0 = 'https://itax.kra.go.ke/KRA-Portal/eReturnsView.htm?ACTION_TYPE=viewForm&trpId=61787569&obligationId=2';

$url3 = 'https://itax.kra.go.ke/KRA-Portal/eReturns.htm?actionCode=viewReturnData';

$url = 'https://itax.kra.go.ke/KRA-Portal/eReturns.htm';

$url4 = 'https://itax.kra.go.ke/KRA-Portal/eReturns.htm';

$data4 = [ 
    "ackN"=>"",	
    "ackNo"=>"",	
    "agencyNo"=>"",	
    "authAgentFlow"=>"",	
    "authAgentObligId"=>"0",
    "captcahText"=>"153",
    "courtType"=>"-1",
    "fromDt"=>"",	
    "isSessionActive"=>"Yes",
    "pin"=>"A015470324F",
    "pmtStatus"=>"-1",
    "prn"=>"",	
    "prnForUtilisation"=>"",	
    "searchType"=>"PAY",
    "taxPayerStatus"=>"",	
    "taxType"=>"",	
    "toDt"=>"",	
    "tpCountyPaymentConsult"=>"null",
    "viewType"=>"",	
    "writeOffStatus"=>"",	
    "wthCerNo"=>"",
];

function get_itax_token()
{
    global $url, $data, $cookie;

    $dt1 = httpPost($url, $data, $cookie);

    $token = (new HtmlDocument())->load($dt1)->find('input[name="token_key"]', 0)->value;

    return $token;
}


$data3 = [ 
    "PageSize"=>"0",
    "actionCode"=>"",	
    "alertpinMsg"=>"",	
    "branchName"=>"",	
    "dateFromDt"=>"",	
    " dateToDt"=>"",	
    "flag"=>"",	
    "hdnPin"=>"",	
    "hdnTaxPayerInfo"=>"",	
    "hdnTaxtype"=>"N",
    "hdnbranchName"=>"",	
    "isConsult"=>"Y",
    "isTaxRepresentative"=>"N",
    "nameField"=>"",	
    "nameFieldName"=>"",	
    "oldpin"=>"",	
    "oldpinFlag"=>"",	
    "pinField"=>"",	
    "pinFieldName"=>"",	
    "pinNo"=>"",	
    "rtnPeriodList"=>"",	
    "strCurrentPage"=>"1",
    "strPin"=>$the_pin,
    "successpinCode"=>"",	
    "taxType"=>"2",
    "taxTypeList"=>"",	
    "taxTypeName"=>"02",
    "token_key"=>get_itax_token(),
    "trPin"=>"",	
    "trpNo"=>"",	
    "txptypCd"=>"",	
    "typeReturn"=>"O",
];


//echo httpUpload($url2, $data2, $cookie);

echo httpGet($url0, [], $cookie);

//echo httpPost($url, $data, $cookie);

 //echo httpPost($url3, $data3, $cookie);
 //echo httpPost($url4, $data4, $cookie);
 //echo get_itax_token();
//*/

 //echo json_encode($data3);
?>