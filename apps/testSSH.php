<?php

error_reporting(E_ALL);
ini_set('display_errors', TRUE);

$argDate = strtotime("-2 days");
echo date("Ymd", $argDate);

/*
$output = exec("ssh -oStricHostKeyChecking=no ukpp@172.29.110.64 'echo OK' 2>$1'");
echo 'output: '. $output;

exec("ssh -o StricHostKeyChecking=no ukpp@172.29.110.64 'sh /s4/home/nimr/ukpp/KOAST/IMGS/SHEL/anal.sh'", $output);
print_r($output);
*/

/*
include('Net/SSH2.php');

$ssh = new SSH2('172.29.110.64');

$path = '/s4/home/nimr/ukpp/.ssh/';

$connection = ss2_connect('172.29.110.64', 22, array('hostkey' => 'ssh-rsa'));
$methods = ssh2_auth_public_file($connection, 'ukpp', $path.'id_rsa.pub', $path.'id_rsa', "!!!");

printf($connection);
*/


?>
