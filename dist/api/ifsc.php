<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$code = isset($_GET['code']) ? preg_replace('/[^A-Z0-9]/', '', strtoupper($_GET['code'])) : '';
if (!$code) { http_response_code(400); echo '{"error":"Missing IFSC code"}'; exit; }

$ch = curl_init("https://ifsc.razorpay.com/{$code}");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_HTTPHEADER     => ['Accept: application/json', 'User-Agent: Mozilla/5.0'],
]);
$body     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode ?: 500);
echo $body ?: '{"error":"Failed to fetch IFSC data"}';
