<?php

require __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function slugify($text) {
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);
  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);
  // trim
  $text = trim($text, '-');
  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);
  // lowercase
  $text = strtolower($text);

  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}

$mail = new PHPMailer(true);
$errors = '';

$author = $_POST['author'];
$title = $_POST['title'];
$url = $_POST['url'];
$year = $_POST['year'];
$day = $_POST['day'];
$path = 'No image provided';
$saveUrl = "http://codevember.xyz/admin?author=$author&title=$title&url=$url&day=$day&year=$year";

if (isset($_FILES['cover'])) {
  $ext = str_replace('image/', '',  $_FILES['cover']['type']);
  $name = $year.'-'.$day.'-'.slugify($author).'.'.$ext;
  $path = '/uploads/' . $name;
  $uploaded = move_uploaded_file($_FILES['cover']['tmp_name'], __DIR__ . $path);

  if ($uploaded == false) {
    $errors .= 'Error while uploading file. ';
  } else {
    $saveUrl .= "&image=/static$path";
  }
}

try {
  // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->isSMTP();
  $mail->Host       = 'smtp.gmail.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = '<GMAIL_ACCOUNT>';
  $mail->Password   = '<GMAIL_PASSWORD>';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $mail->setFrom('no-reply@codevember.xyz');
  $mail->addReplyTo('no-reply@codevember.xyz');
  $mail->addAddress('codevemberio@gmail.com');

  $mail->isHTML(true);
  $mail->Subject = 'New submission from codevember.xyz';
  $body = 'You received a new contribution!';
  $body .= '<ul>';
  $body .= '<li><b>author:</b> '. $author .'</li>';
  $body .= '<li><b>title:</b> '. $title .'</li>';
  $body .= '<li><b>day:</b> '. $day .'</li>';
  $body .= '<li><b>year:</b> '. $year .'</li>';
  $body .= '<li><b>url:</b> <a href="'.$url.'" target="_blank">'.$url.'</a></li>';
  $body .= '<li><b>image:</b> /static'. $path .'</li>';
  $body .= '<li><b>save it:</b> <a href="'.$saveUrl.'" target="_blank">'.$saveUrl.'</a></li>';
  $body .= '</ul>';
  $mail->Body = $body;
  $sent = $mail->send();

  header('Content-type: application/json');
  echo json_encode([
    'sent' => $sent,
    'error' => $errors
  ]);
} catch (Exception $e) {
  $errors .= $mail->ErrorInfo;

  header('Content-type: application/json');
  echo json_encode([
    'sent' => false,
    'error' => $errors
  ]);
}