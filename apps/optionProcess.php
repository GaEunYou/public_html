<?php

include_once 'dbInfo.php';
$result = array(); //return result

$analLevel;
$analFile = $_GET['analFile'];
if('vert' == $analFile) {
	$analLevel = $_GET['analLevel'];
} else {
	$analLevel = 0;
}

$analTime = $_GET['analTime']; //array time
$strAnalTime = implode(',', $analTime); //array time to string 'time1,time2,time3, ...'

$analItem = $_GET['analItem']; 
$analType = $_GET['analType'];

$periodType = $_GET['periodType']; 
$analStart = $_GET['analStart'];
$analStart = str_replace('-', '', $analStart); //remove '-'

$analEnd = $_GET['analEnd'];
$analEnd = str_replace('-', '', $analEnd); //remove '-'

$analArea = $_GET['analArea'];

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
$imgRealPath = $imgRealPath . '/' . $timePath;
if(!is_dir($imgRealPath)) { //make date path
    umask(0);
    mkdir($imgRealPath, 0777, true);
}

$result['resultCode'] = '0000';
$result['resultCodeNm'] = 'SUCCESS';
$result['resultMsg'] = 'images/' . $datePath . '/' . $timePath . '/';

//insert user options
try {
    $query = "INSERT INTO anal_info (sno, anal_file, anal_level, anal_time, anal_item, anal_type, period_type, anal_start, anal_end, anal_area, real_path, color, vstep, vmin, vmax, legend_size, legend_position) ";
    $query = $query . "VALUES($timePath, '$analFile', $analLevel, '$strAnalTime', '$analItem', '$analType', '$periodType', '$analStart', '$analEnd', '$analArea', '$imgRealPath', '$color', $vstep, $vmin, $vmax, $legendSize, '$legendPosition')";
    $db->exec($query);

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$db->close();

$queue_path = "/s4/home/nimr/ukpp/KOAST/queue";
$ffn = $queue_path . '/' . $timePath . '.que';
$cont = $timePath;
file_put_contents($ffn, $timePath);

echo json_encode($result);
?>
