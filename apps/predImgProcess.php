<?php

include_once 'dbInfo.php';
$result = array(); //return result
$sno = $_GET['sno']; //timestemp

$result['resultCode'] = '0000';
$result['resultCodeNm'] = 'SUCCESS';
$result['resultMsg'] = $sno;

try {
	$db->close();

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$queue_path = "/s4/home/nimr/ukpp/KOAST/queue";
$ffn = $queue_path . '/' . $sno . '.que_dnsc_img';
file_put_contents($ffn, $sno);

echo json_encode($result);
exit();
?>

