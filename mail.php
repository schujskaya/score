<?php 

$data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);
$data_obj = json_decode($data_json);
$women =  $data_obj->{'women'}; 
$men =  $data_obj->{'men'};
$girls =  $data_obj->{'girls'}; 
$boys =  $data_obj->{'boys'}; 
$user_email =  $data_obj->{'user_email'}; 
$user_email_grid =  $data_obj->{'user_email_grid'}; 
$agree =  $data_obj->{'agree'}; 

$to = "schujskaya@mail.ru";
$subject = "Subscribe!";
$message = '<html><body><h1>New subscriber</h1>';
$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
if($user_email){
    $message .= "<tr><td><strong>Women :</strong> </td><td>" . $women . "</td></tr>";
    $message .= "<tr><td><strong>Men :</strong> </td><td>" . $men . "</td></tr>";
    $message .= "<tr><td><strong>Girls :</strong> </td><td>" . $girls . "</td></tr>";
    $message .= "<tr><td><strong>Boys :</strong> </td><td>" . $boys . "</td></tr>";
    $message .= "<tr><td><strong>E-mail :</strong> </td><td>" . $user_email . "</td></tr>";
    $message .= "<tr><td><strong>Agree:</strong> </td><td>" . $agree . "</td></tr>";
}
if($user_email_grid){
    $message .= "<tr><td><strong>E-mail :</strong> </td><td>" . $user_email_grid . "</td></tr>";   
}
$message .= "</table>";
$message .= '<img src="http://schujsqp.beget.tech/src/images/subscribe2.png" />';
$message .= "</body></html>";
$headers .= "Content-type: text/html; charset=$send_charset\r\n";

mail($to, $subject, $message, $headers);

echo $data_json;

?>