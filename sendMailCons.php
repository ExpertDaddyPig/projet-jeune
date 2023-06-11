<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'modules/PHPMailer/src/Exception.php';
require 'modules/PHPMailer/src/PHPMailer.php';
require 'modules/PHPMailer/src/SMTP.php';

$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$source = $protocol . $_SERVER['HTTP_HOST'];

$vars = new stdClass;
$vars = json_decode($_GET['vars']);
$subject = $_GET['subject'];
$dest = $_GET['dest'];

$mail = new PHPMailer;

$mail->CharSet = "UTF-8";
$mail->isSMTP();
$mail->Host = 'smtp.laposte.net';
$mail->SMTPAuth = true;
$mail->Username = 'projet.jeunes69420';
$mail->Password = 'Amogus69420!';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('projet.jeunes69420@laposte.net', 'Jeunes 6.4');
$mail->addReplyTo('projet.jeunes69420@laposte.net', 'Jeunes 6.4');
$mail->addAddress($dest);

$mail->isHTML(true);

$mail->Subject = $subject;

$bodyContent = "Bonjour, <br>Le projet Jeunes 6.4 est un dispositif de valorisation de l'engagement des jeunes en Pyrénées-Atlantiques soutenu par l'Etat, le Conseil Général, le Conseil Régional, les CAF Béarn Soule et Pays Basque, la MSA, la CPAM.<br>Le projet, adressé aux jeunes entre 16 et 30 ans, vise à valoriser toute expérience comme source d'enrichissement qui puisse être reconnue comme l'expression d'un savoir faire ou savoir être.<br>Un jeune vous a envoyé une demande de consultation de référence. Cliquez sur le lien ci-dessous afin de confirmer les informations que le jeune a inscrit.<br>".$source."/consultant.html?username=".$vars->username."&refPos=".$vars->pos."<br>Projet Jeune 6.4";
$mail->Body = $bodyContent;

if (!$mail->send()) {
    echo 'Le mail n\'a pas pu être envoyé. Erreur: ' . $mail->ErrorInfo;
} else {
    echo 'La demande de consultation de référence a été envoyée au consultant.';
}
?>