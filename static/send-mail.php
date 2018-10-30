<?php

  require __DIR__ . '/../../vendor/autoload.php';

  use PHPMailer\PHPMailer\PHPMailer;

  $mail = new PHPMailer();

  $author = $_POST['author'];
  $title = $_POST['title'];
  $url = $_POST['url'];
  $year = $_POST['year'];
  $day = $_POST['day'];

  $mail->setFrom('no-reply@codevember.xyz');
  $mail->addReplyTo('no-reply@codevember.xyz');
  $mail->addAddress('codevemberio@gmail.com');

  $mail->isHTML(true);
  $mail->Subject = 'New submission from codevember.xyz';
  $body = 'You received a new contribution!';
  $body .= '<ul>';
  $body .= '<li><b>author:</b> '. $author;
  $body .= '<li><b>title:</b> '. $title;
  $body .= '<li><b>day:</b> '. $day;
  $body .= '<li><b>year:</b> '. $year;
  $body .= '<li><b>url:</b> <a href="'.$url.'" target="_blank">'.$url.'</a>';
  $body .= '</ul>';
  $mail->Body = $body;
  $sent = $mail->send();

  header('Content-type: application/json');
  echo json_encode([
    'sent' => $sent,
    'error' => $mail->ErrorInfo
  ]);