<?php

include_once 'dbInfo.php';
$result = array(); //return result
$_ANAL_PATH_ = '/s4/ARCV/MODL/LDPS/N128';

/* 년도 디렉토리 조회 */
$handle = opendir($_ANAL_PATH_);
$yearDirs = array();
while(($filename = readdir($handle)) !== false) {
    if($filename == '.' || $filename == '..' || (6 != strlen($filename))) { //6 YYYYMM
        continue;
    }

    if(!is_link($_ANAL_PATH_ . '/' . $filename)) { //일단 링크 디렉토리가 아닌것만..
        $yearDirs[] = $filename; 
    }
}

//sort($yearDirs);
//echo print_r($yearDirs);

/* 년도 디렉토리의 날짜 조회 */
$allDirs = array();
$arrTime = array('00', '06' , '12', '18');
$pathLDPS = '';

foreach($yearDirs as $year) {
    $path = $_ANAL_PATH_ . '/' . $year;
    $handle = opendir($path);
    while(($filename = readdir($handle)) !== false) {
        if($filename == '.' || $filename == '..') {
            continue;
        }
    
        foreach($arrTime as $hh) {
            $pathLDPS = $path . '/' . $filename . '/' . $hh;
            if(!is_dir($pathLDPS)) {
                continue;
            }

            $paCnt = 0;
            $pcCnt = 0;
            $pdCnt = 0;
            $handleLDPS = opendir($pathLDPS);
            while(($filenameLDPS = readdir($handleLDPS)) !== false) { //LDPS 자료 확인
                if($filenameLDPS == '.' || $filenameLDPS == '..') {
                    continue;
                }

                //echo $filenameLDPS . '<br>';
                //echo substr($filenameLDPS, 8, 2) . '<br>';
                switch(substr($filenameLDPS, 8, 2)) {
                    case 'pa': $paCnt += 1; break;
                    case 'pc': $pcCnt += 1; break;
                    case 'pd': $pdCnt += 1; break;
                }
            }

            echo $paCnt . '/' . $pcCnt . '/' . $pdCnt . '<br>';

            if($paCnt == 25 && $pcCnt == 25 && $pdCnt == 25) {
                echo $pathLDPS . '/' . $filenameLDPS . '<br>';
                array_push($allDirs, $pathLDPS . '/' . $filenameLDPS);
            }
        }
    }
}

echo min($allDirs) . '<br>'; //날짜 min
echo max($allDirs) . '<br>'; //날짜 max

return;

$minDate = substr(min($allDirs), 0, 8);
$maxDate = substr(max($allDirs), 0, 8);

$result['resultCode'] = '0000';
$result['resultCodeNm'] = 'SUCCESS';
$result['resultMsg'] = 'UPDATE PRED DATE INFO';

try {
    $query = "INSERT OR REPLACE INTO anal_date_info (id, min_date, max_date) ";
    $query = $query . "VALUES('PRED_DATE', '$minDate', '$maxDate');";
    $db->exec($query);

} catch(Exception $e) {
    $result['resultCode'] = '9999';
    $result['resultCodeNm'] = 'ERROR';
    $result['resultMsg'] = $e->getMessage();
} 

$db->close();
echo json_encode($result);
?>