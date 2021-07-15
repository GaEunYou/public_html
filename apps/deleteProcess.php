<?php

include_once 'dbInfo.php';
$result = array();

$argDate;
if(isset($_GET['date'])) {
    $argDate = $_GET['date'];
	
} else { //today - 2day delete directory
	$argDate = date("Ymd", strtotime("-2 days"));	
}

$datePath = '/s4/home/nimr/ukpp/public_html/images/' . $argDate;
if(!is_dir($datePath)) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = 'not dir path : ' . $datePath;
    echo json_encode($result);
	
} else {
	//rmdir($datePath);
	chmod($datePath, 0777);
	$result['resultCode'] = '0000';
    $result['resultCodeNm'] = 'SUCCESS';
	$result['resultMsg'] = 'remove path : ' . $datePath;
	echo json_encode($result);
}
?>

