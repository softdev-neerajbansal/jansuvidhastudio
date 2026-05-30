<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$name = isset($_GET['name']) ? trim($_GET['name']) : '';
if (!$name) {
    http_response_code(400);
    echo '[{"Status":"Error","Message":"Missing office name"}]';
    exit;
}

$ch = curl_init('https://api.postalpincode.in/postoffice/' . urlencode($name));
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
]);
$body     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode ?: 500);
echo $body ?: '[{"Status":"Error","Message":"Could not connect to post office service"}]';
