<?php

include_once 'dbInfo.php';

//anal min date, max date info
$db->exec("CREATE TABLE IF NOT EXISTS 'anal_date_info' ('id' TEXT NOT NULL, 'min_date' TEXT NOT NULL, 'max_date' TEXT NOT NULL, PRIMARY KEY('id') );");

//anal user option
$db->exec("CREATE TABLE IF NOT EXISTS 'anal_info' ('sno' INTEGER NOT NULL, 'anal_file' TEXT NOT NULL, 'anal_level' INTEGER, 'anal_time' TEXT NOT NULL, 'anal_item' TEXT NOT NULL, 'anal_type' TEXT NOT NULL, 'period_type' TEXT NOT NULL, 'anal_start' TEXT NOT NULL, 'anal_end' TEXT NOT NULL, 'anal_area' TEXT NOT NULL, PRIMARY KEY('sno') );");

//pred user option
$db->exec("CREATE TABLE IF NOT EXISTS 'pred_info' ('sno' INTEGER NOT NULL, 'pred_date' TEXT NOT NULL, 'pred_time' TEXT NOT NULL, 'pred_type' TEXT NOT NULL, 'pred_item' TEXT NOT NULL, real_path TEXT NOT NULL, 'reg_date' NUMBERIC DEFAULT (datetime('now', '+9 hours')),  PRIMARY KEY('sno')) ");
?>
