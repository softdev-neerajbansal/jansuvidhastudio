<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo '{"error":"Method not allowed"}';
    exit;
}

// --- basic per-session rate limit (12 messages / minute) ---
session_start();
$now = time();
$window = 60;
$limit = 12;
if (!isset($_SESSION['chat_hits']) || $_SESSION['chat_hits']['window_start'] < $now - $window) {
    $_SESSION['chat_hits'] = ['window_start' => $now, 'count' => 0];
}
$_SESSION['chat_hits']['count']++;
if ($_SESSION['chat_hits']['count'] > $limit) {
    http_response_code(429);
    echo '{"error":"Too many messages — please wait a moment and try again."}';
    exit;
}

$payload  = json_decode(file_get_contents('php://input'), true);
$messages = isset($payload['messages']) && is_array($payload['messages']) ? $payload['messages'] : [];

// Keep only the last 10 turns and validate shape, to bound cost per request
$clean = [];
foreach (array_slice($messages, -10) as $m) {
    if (!isset($m['role'], $m['content']) || !in_array($m['role'], ['user', 'assistant'], true)) continue;
    $content = is_string($m['content']) ? trim($m['content']) : '';
    if ($content === '') continue;
    $clean[] = ['role' => $m['role'], 'content' => mb_substr($content, 0, 2000)];
}

if (empty($clean) || end($clean)['role'] !== 'user') {
    http_response_code(400);
    echo '{"error":"No message provided"}';
    exit;
}

// Prefer a real environment variable; fall back to a local, untracked config file
// (config.local.php, created directly on the server — never committed to git,
// never touched by deploys) for hosts where setting PHP env vars isn't practical.
$apiKey = getenv('ANTHROPIC_API_KEY');
if (!$apiKey) {
    $localConfig = __DIR__ . '/config.local.php';
    if (file_exists($localConfig)) {
        $apiKey = (include $localConfig)['ANTHROPIC_API_KEY'] ?? null;
    }
}
if (!$apiKey) {
    http_response_code(500);
    echo '{"error":"Chat is not configured yet. Please try again later."}';
    exit;
}

$systemPrompt = <<<SYS
You are the help assistant embedded on JanSuvidhaStudio, a free Indian public-services website.
The site offers: IFSC code finder, PIN code & post office finder, PAN card validator, UPI ID checker,
Train PNR status checker, Govt Jobs listings, Sarkari Result checker, Ration Card status check,
Voter ID search, and Aadhar card services — all free, no login required.

Help visitors find the right tool and answer general questions about these topics (banking codes,
postal system, PAN/Aadhar/Voter ID basics, train travel, government jobs and exams). When relevant,
tell the user which section of the site to open (e.g. "Open the IFSC Code Finder tab").
Keep answers short and clear — this is a small chat widget, not a long-form article.
If asked something unrelated to these services or to India-related public information, politely
redirect to what the site can help with. Never ask for or store sensitive personal data (full PAN,
Aadhar number, bank account numbers) — explain the user can look these up directly in the relevant tool.
SYS;

$body = json_encode([
    'model'         => 'claude-opus-4-8',
    'max_tokens'    => 1024,
    'system'        => $systemPrompt,
    'output_config' => ['effort' => 'low'],
    'messages'      => $clean,
]);

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $body,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . $apiKey,
        'anthropic-version: 2023-06-01',
    ],
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr || !$response) {
    http_response_code(502);
    echo json_encode(['error' => 'Could not reach the chat service.']);
    exit;
}

$data = json_decode($response, true);

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(['error' => $data['error']['message'] ?? 'Chat service error.']);
    exit;
}

$reply = '';
if (($data['stop_reason'] ?? '') === 'refusal') {
    $reply = "I can't help with that. Try asking about one of our services instead.";
} elseif (!empty($data['content'])) {
    foreach ($data['content'] as $block) {
        if (($block['type'] ?? '') === 'text') $reply .= $block['text'];
    }
}

echo json_encode(['reply' => $reply !== '' ? $reply : "Sorry, I didn't catch that — could you rephrase?"]);
