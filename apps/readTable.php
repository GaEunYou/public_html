<?php

include_once 'dbInfo.php';

$minDate = '';
$maxDate = '';
$result = $db->query("SELECT id, min_date, max_date FROM anal_date_info WHERE id='ANAL_DATE'");
print_r($result);


while($row = $result->fetchArray()) {
    
    $minDate = $row['min_date'];
    $maxDate = $row['max_date'];
}

$result->finalize();

echo $minDate;
echo $maxDate;
?>
