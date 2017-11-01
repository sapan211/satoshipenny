<?php 
$url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";
$price = json_decode(file_get_contents($url), true);
$last_price = $price['last'];
echo "$last_price";
?>
