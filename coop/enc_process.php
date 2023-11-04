<?php
$payload = 'DAuOZLm5ublgphFGFx2kIn2+/OzgK3XIiga+NhMKNoX70TGF8xbBMLPnI1Cco1EnBYBZCnQzUy6vCDFVIi2sm34S0Ba6Ys/7dwCDORXXjZTWwzIqiH3oYYR8VYrpDWgoMKJfTTe+xeyqfyodHyS6x7Uv+A58F816lztuGZnRfsPYD8cLwZ4kCmYyxfPGtyASsTs8ar0sF9xBZCwgqIob+nZ6jaY5Bne4fEWAExKpsuKBRs776yv8oVtXnZNDustOlTh5dAxME2gxuY9qoppG8plXqHn7COpRZM48rOE741YndI37qTdCJkCpk9c42wL5aWt+Kqxpvr/p1FZvZa5KlgG0yMfZVKFiN1Cdti+/o2xI2nznUCWAbmAPA5C9GS8w9zKM+VUczXk4OW2gnj/WCg5vSrRqu/G7c2RPSOs16V57YGqriXIWM1xx8n714pdA7sO5A50/YnAoIWLjLWedky9pQhCuVZFYR2xDWFiYmlT8A7P/xFPbOKYi9c+SRpBMQ+QrOfySk/McydMTViLT5NumB29me17Ek1zYcQDEFyQtF/zkWdEkyjEOdgoX0TiQ6ftP1t30xIHgKGf5mTZvRK/jFeedOZC09QCJYl5npOsXPxOfEMBSoTM3pzSBO45agd+SvBahs8LwfLUwTPY+PvDr3i2MYSnGi1Rrj83T1Qk9xWGM/Vw+tF4jl+oHP2bvZ0lFEkwC2kUzFGRymXgDBQod7ka7qmB1FHgstwaB/xomGa67q1h0zNV+WUj+gQxnMgA=';
//$payload = 'zgqOZDQ0NDQM2h9XAnGJTgF1P5ELrUGiyotSeO09TY+bDbufPUxWjjrRu3dWTJ97qfjJkQtNtpwFh3NnbM3S59uzza0HdObOrw6+CAAI1L3KXokz6b3QvjYO2cq+lQA=';
$salt = 'EAtnwpNXt33ANDCtxWhHiKsMVT1czdllN4AkVE61';
//$salt = '61leWXrDlddlDK0NZxnYSNz18JJ122';
$command = 'decrypt';
?>
<html>
<head>
    <div id="rest"></div>
    <script type="text/javascript" src="encryptjs.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
    <?php
    if (isset($command)) {
        if (isset($payload)) {
            $payload = $payload;
        } else {
            $payload = '';
        }
        if (isset($salt)) {
            $salt = $salt;
        } else {
            $salt = '';
        }
        if ($command == 'decrypt') {
    ?>
            <script type="text/javascript">
                var dec = decrypt('<?php echo $payload ?>', '<?php echo $salt ?>', 256);
                //document.getElementById('dec').innerHTML = dec;
                $("#rest").html(dec);
                //*
                //*/
                //window.location.assign("./encryptjs.php?response=" + dec);
                //window.location.href = "./encryptjs.php?response=" + dec;
            </script>
        <?php
        } elseif ($command == 'encrypt') {
        ?>
            <script type="text/javascript">
                var enc = encryptJS('<?php echo $payload ?>', '<?php echo $salt ?>', 256);
                //document.getElementById('enc').innerHTML = enc;
                //*
                $("#rest").html(enc);
                //*/
                //window.location.assign("./encryptjs.php?response=" + enc);
                //window.location.href = "./encryptjs.php?response=" + enc;
            </script>
        <?php
        }
    }
    ?>



</head>

</html>