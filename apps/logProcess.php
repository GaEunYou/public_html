<?php

include_once 'dbInfo.php';
$result = array(); //return result
$sno = $_GET['sno']; //timestemp

$logPath = '';
try {
    $query = "SELECT real_path FROM anal_info WHERE sno = $sno;";
    $resultSet = $db->query($query);
    $resultArray = array();
    while($row = $resultSet->fetchArray(SQLITE3_ASSOC)) {
        $logPath = $row['real_path'];
    }

    $logPath = $logPath . '/anal.log'; //공통로그파일명, 로그파일이 없는 경우 확인이 필요하다. (shell 처리중인 경우 로그파일이 없을 수 있다.)

    if(!file_exists($logPath)) { //log file check
        $result['resultCode'] = '0000';
        $result['resultCodeNm'] = 'SUCCESS';
        $result['resultMsg'] = $resultArray;
        $db->close();
        echo json_encode($result);
        exit();
    }

    $array_lines = file($logPath);
    $countLine = count($array_lines);

    $resultArray = array();
    for($i = 0; $i < $countLine; $i++) {
        array_push($resultArray, preg_replace('/\r\n|\r|\n/', '', $array_lines[$i]));
    }

    $result['resultCode'] = '0000';
    $result['resultCodeNm'] = 'SUCCESS';
    $result['resultMsg'] = $resultArray;

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$db->close();
echo json_encode($result);
exit();
?>