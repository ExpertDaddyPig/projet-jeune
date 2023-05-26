<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'modules/PHPMailer/src/Exception.php';
require 'modules/PHPMailer/src/PHPMailer.php';
require 'modules/PHPMailer/src/SMTP.php';

$message = $_GET['message'];
$subject = $_GET['subject'];
$dest = $_GET['dest'];

$mail = new PHPMailer;

$mail->isSMTP();
$mail->Host = 'smtp.laposte.net';
$mail->SMTPAuth = true;
$mail->Username = 'projet.jeunes69420@laposte.net';
$mail->Password = 'Amogus69420!';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('projet.jeunes69420@laposte.net', 'Jeunes 6.4');
$mail->addReplyTo('projet.jeunes69420@laposte.net', 'Jeunes 6.4');
$mail->addAddress($dest);

$mail->isHTML(true);

$mail->Subject = $subject;

$bodyContent = $message;
$mail->Body = $bodyContent;

if (!$mail->send()) {
    echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent.';
}
?>