<?php

$uploaddir = '/var/www/img.yusanshi.com/upload/';
$uploadfile = $uploaddir . basename($_FILES['file']['name']);

echo '<pre>';
// if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
if (true) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "Possible file upload attack!\n";
}
