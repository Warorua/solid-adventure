<?php
echo '@echo off<br/>
echo Importing All Tasks<br/>
echo.<br/>
';
for($i=0;$i<=100;$i++){
    echo '
schtasks.exe /create /TN "Kever\Engine '.$i.'" /XML "C:\xampp\htdocs\kever\xml\\Engine '.$i.'.xml"<br/>
';
}
echo '
echo.<br/>
echo Importing Done<br/>
echo.<br/>
pause<br/>';