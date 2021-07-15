<?php

include_once 'dbInfo.php';
$result = array(); //return result

$predDate;
$predTime;
$predType;
$predItem;
$predLevel;

$predDate = $_GET['predDate'];
$predTime = $_GET['predTime'];
$predType = $_GET['predType'];
$predItem = $_GET['predItem'];
$predLevel = $_GET['predLevel'];
$predDate = str_replace('-', '', $predDate);

/* user color */
$color = $_GET['color'];
$vstep = $_GET['vstep'];
$vmin = $_GET['vmin'];
$vmax = $_GET['vmax'];
$legendSize = $_GET['legendSize'];
$legendPosition = $_GET['legendPosition'];

if(empty($vstep)) {
    $vstep = -9999;
}

if(empty($vmin)) {
    $vmin = -9999;
}

if(empty($vmax)) {
    $vmax = -9999;
}

/* make temp directory */
date_default_timezone_set('Asia/Seoul');
$datePath = date('Ymd', time());
$imgRealPath = '/s4/home/nimr/ukpp/public_html/images/' . $datePath;

if(!is_dir($imgRealPath)) { //make date path
    umask(0);
    mkdir($imgRealPath, 0777, true);
}

$timePath = time(); //temp directory
$imgRealPath = $imgRealPath . '/' . $timePath; //랜덤값 추가 필요 (요청시간 중복 방지)
if(!is_dir($imgRealPath)) { //make date path
    umask(0);
    mkdir($imgRealPath, 0777, true);
}

$result['resultCode'] = '0000';
$result['resultCodeNm'] = 'SUCCESS';
$result['resultMsg'] = 'images/' . $datePath . '/' . $timePath . '/';

//insert user options
try {
    $query = "INSERT INTO pred_info (sno, pred_date, pred_time, pred_type, pred_item, pred_level, real_path, color, vstep, vmin, vmax, legend_size, legend_position) ";
    $query = $query . "VALUES($timePath, '$predDate', '$predTime', '$predType', '$predItem', '$predLevel', '$imgRealPath', '$color', $vstep, $vmin, $vmax, $legendSize, '$legendPosition')";

    $db->exec($query);

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$db->close();

$queue_path = "/s4/home/nimr/ukpp/KOAST/queue";
$ffn = $queue_path . '/' . $timePath . '.que_dnsc';
$cont = $predDate . $predTime . '|' . $imgRealPath;
file_put_contents($ffn, $cont);

echo json_encode($result);

?>