<?php
$msg = $_GET["msg"];
$sbj = $_GET["sbj"];
$email = $_GET["email"];
$msg = wordwrap($msg,70);
mail($email,$sbj,$msg);
?>