<?php
$size_limit = 10000000;
$allowed_types = array('jpg', 'jpeg', 'bmp', 'png', 'gif', 'tiff');
$mime_type_black_list = array(
    'text/html', 'text/javascript', 'text/x-javascript',  'application/x-shellscript',
    'application/x-php', 'text/x-php', 'text/x-php',
    'text/x-python', 'text/x-perl', 'text/x-bash', 'text/x-sh', 'text/x-csh',
    'text/x-c++', 'text/x-c'
);

$file_extension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
if (
    !strlen($file_extension) ||
    !in_array($file_extension, $allowed_types) ||
    in_array(mime_content_type($_FILES['file']['tmp_name']), $mime_type_black_list)
) {
    echo "Possible file upload attack!\n";
} else if ($_FILES['file']['size'] > $size_limit) {
    echo "The file is too large.\n";
} else {
    date_default_timezone_set('Asia/Shanghai');
    $file_path = 'upload/' . data("YmdHis") . strval(rand(1000, 9999)) . '.' . $file_extension;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $file_path)) {
        echo "File is valid, and was successfully uploaded.\n";
    } else {
        echo "Unknown error. Upload failed.\n";
    }
}
