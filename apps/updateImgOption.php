<?php

include_once 'dbInfo.php';
$result = array(); //return result

/* user color */
$sno = $_GET['sno'];
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

$outPutPath = '';
try {
    $query = "SELECT real_path FROM anal_info WHERE sno = $sno;";
    $resultSet = $db->query($query);
    $resultArray = array();
    while($row = $resultSet->fetchArray(SQLITE3_ASSOC)) {
        $outPutPath = $row['real_path'];
    }

    $outPutPath = $outPutPath . '/output.nc';

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
}

/*
if(!file_exists($outPutPath)) { //output.nc file check
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = 'output.nc';
    $db->close();
    echo json_encode($result);
    exit();
}
*/

$result['resultCode'] = '0000';
$result['resultCodeNm'] = 'SUCCESS';

try { //update img option
    $query = "UPDATE anal_info SET color='$color', vstep=$vstep, vmin=$vmin, vmax=$vmin, legend_size=$legendSize, legend_position='$legendPosition' ";
    $query = $query . "WHERE sno=$sno";

    //echo $query;
    $db->exec($query);

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$db->close();

$queue_path = "/s4/home/nimr/ukpp/KOAST/queue";
$ffn = $queue_path . '/' . $sno . '.que';
file_put_contents($ffn, $sno);

echo json_encode($result);
?>