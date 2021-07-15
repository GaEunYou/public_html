<?php

include_once 'dbInfo.php';
$result = array(); //return result
$_ANAL_PATH_ = '/crldata/windres/KMAPP/01_ori/anal';

/* 년도 디렉토리 조회 */
$handle = opendir($_ANAL_PATH_);
$yearDirs = array();
while(($filename = readdir($handle)) !== false) {
    if($filename == '.' || $filename == '..' || (4 != strlen($filename))) { //4글자 디렉토리 
        continue;
    }

    $yearDirs[] = $filename;
}

sort($yearDirs);
echo print_r($yearDirs);

/* 년도 디렉토리의 날짜 조회 */
$allDirs = array();
$hh;
foreach($yearDirs as $year) {
    $handle = opendir($_ANAL_PATH_ . '/' . $year);
    while(($filename = readdir($handle)) !== false) {
        if($filename == '.' || $filename == '..' || (10 != strlen($filename))) { //6글자 디렉토리 
            continue;
        }
    
        //YYYYMMDDHH 00, 21 확인
        $hh = substr($filename, 8, 2);
        if('00' == $hh || '21' == $hh) {
            $allDirs[] = $filename;
        } 
    }
}

sort($allDirs);
echo print_r($allDirs);

echo min($allDirs) . '<br>'; //날짜 min
echo max($allDirs) . '<br>'; //날짜 max

$minDate = substr(min($allDirs), 0, 8);
$maxDate = substr(max($allDirs), 0, 8);

$result['resultCode'] = '0000';
$result['resultCodeNm'] = 'SUCCESS';
$result['resultMsg'] = 'UPDATE ANAL DATE INFO';

try {
    $query = "INSERT OR REPLACE INTO anal_date_info (id, min_date, max_date) ";
    $query = $query . "VALUES('ANAL_DATE', '$minDate', '$maxDate');";
    $db->exec($query);

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$db->close();
echo json_encode($result);
?>