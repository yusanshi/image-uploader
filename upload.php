<?php
$size_limit = 10000000; // 10MB
$allowed_types = array('jpg', 'jpeg', 'bmp', 'png', 'gif', 'tiff', 'svg');
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
    echo json_encode(array('status' => 'error', 'msg' => 'Possible file upload attack!'));
} else if ($_FILES['file']['size'] > $size_limit) {
    echo json_encode(array('status' => 'error', 'msg' => 'The file is too large.'));
} else {
    date_default_timezone_set('Asia/Shanghai');
    $file_path = 'upload/' . date("YmdHis") . strval(rand(100000, 999999)) . '.' . $file_extension;
    if (move_uploaded_file($_FILES['file']['tmp_name'], $file_path)) {
        echo json_encode(array('status' => 'ok', 'msg' => $_SERVER['HTTP_REFERER'] . $file_path));
    } else {
        echo json_encode(array('status' => 'error', 'msg' => 'Unknown error.'));
    }
}
