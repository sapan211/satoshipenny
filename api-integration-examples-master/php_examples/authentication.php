<?php

$secretKey = 'ZTkzOTQ2M2I2ODI0NGM0NTk2ODg2OTJiOGRmMTk1YTllMTNkNjNiMjlmM2Q0MzMyODk2NjZlMmM2OTQxMjlhZg';
$publicKey = 'MTNmMmQzYjlkYjYxNDI5ZTlhZjY1M2RmZTEwOTI1MDk';
$timestamp = time();
$payload = $timestamp . '.' . $publicKey;
$hash = hash_hmac('sha256', $payload, $secretKey, true);
$keys = unpack('H*', $hash);
$hexHash = array_shift($keys);
$signature = $payload . '.' . $hexHash;

$tickerUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD"; // request URL
$aHTTP = array(
  'http' =>
    array(
    'method'  => 'GET',
  	)
);
$aHTTP['http']['header']  = "X-Signature: " . $signature;
$context = stream_context_create($aHTTP);
$content = file_get_contents($tickerUrl, false, $context);

echo $content;

?>
