<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$pin = isset($_GET['pin']) ? preg_replace('/[^0-9]/', '', $_GET['pin']) : '';
if (!$pin || strlen($pin) !== 6) {
    http_response_code(400);
    echo '[{"Status":"Error","Message":"Invalid PIN code — must be 6 digits"}]';
    exit;
}

$ch = curl_init("https://api.postalpincode.in/pincode/{$pin}");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false,   // bypass expired SSL cert on postalpincode.in
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
]);
$body     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode ?: 500);
echo $body ?: '[{"Status":"Error","Message":"Could not connect to PIN code service"}]';
