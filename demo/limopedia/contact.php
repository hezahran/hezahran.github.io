<?php

// Information to be modified
$your_email = "info@limopedia.com"; // email address to which the form data will be sent
$subject = "Contact Message"; // subject of the email that is sent
$thanks_page = "thanks.php"; // path to the thank you page following successful form submission

// Nothing needs to be modified below this line
if (isset($_POST["submit"])) {
	$nam = $_POST["name"];
	$comp = $_POST["company"];
	$ema = trim($_POST["email"]);
	$mob = trim($_POST["phone"]);
	$com = $_POST["comments"];
	$loadtime = $_POST["loadtime"];

	if (get_magic_quotes_gpc()) { 
	$nam = stripslashes($nam);
	$ema = stripslashes($ema);
	$com = stripslashes($com);
	$comp = stripslashes($comp);
	$mob = stripslashes($mob);
	}

$error_msg=array(); 

if (empty($nam) || !preg_match("~^[a-z\-'\s]{1,60}$~i", $nam)) { 
$error_msg[] = "The name field must contain only letters, spaces, dashes ( - ) and single quotes ( ' )";
}

if (empty($ema) || !filter_var($ema, FILTER_VALIDATE_EMAIL)) {
	$error_msg[] = "Your email must have a valid format, such as name@mailhost.com";
}

$limit = 1000;

if (empty($com) || !preg_match("/^[0-9A-Za-z\/-\s'\(\)!\?\.,]+$/", $com) || (strlen($com) > $limit)) { 
$error_msg[] = "The Comments field must contain only letters, digits, spaces and basic punctuation (&nbsp;'&nbsp;-&nbsp;,&nbsp;.&nbsp;), and has a limit of 1000 characters";
}

$totaltime = time() - $loadtime;

if($totaltime < 7) {
   echo("Please fill in the form before submitting!");
   exit;
}

// Assuming there's an error, refresh the page with error list and repeat the form

if ($error_msg) {
echo '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
<style>
	body {background: #f7f7f7; font: 100%/1.375 georgia, serif; padding: 20px 40px;}
	div {margin-bottom: 10px;}
	.content {width: 40%; margin: 0 auto;}
	h1 {margin: 0 0 20px 0; font-size: 175%; font-family: calibri, arial, sans-serif;}
	label {margin-bottom: 2px;}
	input[type="text"], input[type="email"], textarea {font-size: 0.75em; width: 98%; font-family: arial; border: 1px solid #ebebeb; padding: 4px; display: block;}
	input[type="radio"] {margin: 0 5px 0 0;}
	textarea {overflow: auto;}
	.err {color: red; font-size: 0.875em; margin: 1em 0; padding: 0 2em;}
</style>
</head>
<body>
	<div class="content">
		<h1>O dear!</h1>
		<p>Unfortunately, your message could not be sent. The form as you filled it out is displayed below. Make sure each field completed, and please also address any issues listed below:</p>
		<ul class="err">';
foreach ($error_msg as $err) {
echo '<li>'.$err.'</li>';
}
echo '</ul>
	<form method="post" action="', $_SERVER['PHP_SELF'], '">
		<div>
			<label for="name">Name</label>
			<input name="name" type="text" size="40" maxlength="60" id="name" value="'; if (isset($_POST["name"])) {echo $nam;}; echo '">
		</div>
		<div>
			<label for="email">Email Address</label>
			<input name="email" type="email" size="40" maxlength="60" id="email" value="'; if (isset($_POST["email"])) {echo $ema;}; echo '">
		</div>
		<div>
			<label for="comm">Comments</label>
			<textarea name="comments" rows="10" cols="50" id="comm">'; if (isset($_POST["comments"])) {echo $com;}; echo '</textarea>
		</div>
		<input type="hidden" name="loadtime" value="', time(), '">
		<div>
			<input type="submit" name="submit" value="Send">
		</div>
	</form>
</body>
</html>';
exit();
} 

$email_body = 
	"Sender Name: $nam\n\n" .
	"Company: $comp\n\n" .
	"Contact Email: $ema\n\n" .
	"Contact Phone: $mob\n\n" .
    "Message Details:\n\n" .
	"$com" ; 

// Assuming there's no error, send the email and redirect to Thank You page

if  (!$error_msg) {
mail ($your_email, $subject, $email_body, "From: $nam <$ema>" . "\r\n" . "Reply-To: $nam <$ema>");
header ("Location: $thanks_page");
exit();
}  

} 
?>