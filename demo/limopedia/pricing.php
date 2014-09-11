<?php

// Information to be modified
$your_email = "info@limopedia.com"; // email address to which the form data will be sent
$subject = "Price Calculation Form"; // subject of the email that is sent
$thanks_page = "payment.php"; // path to the thank you page following successful form submission

// Nothing needs to be modified below this line
if (isset($_POST["submit"])) {
	$nam = $_POST["name"];
	$comp = $_POST["company"];
	$fleet = $_POST["fleet"];
	$ema = trim($_POST["email"]);
	$mob = trim($_POST["phone"]);
	$site = $_POST["website"];
	$loadtime = $_POST["loadtime"];

	if (get_magic_quotes_gpc()) { 
	$nam = stripslashes($nam);
	$comp = stripslashes($comp);
	$fleet = stripslashes($fleet);
	$ema = stripslashes($ema);
	$mob = stripslashes($mob);
	$site = stripslashes($site);
	}

$error_msg=array(); 

if (empty($nam) || !preg_match("~^[a-z\-'\s]{1,60}$~i", $nam)) { 
$error_msg[] = "The name field must contain only letters, spaces, dashes ( - ) and single quotes ( ' )";
}

if (empty($ema) || !filter_var($ema, FILTER_VALIDATE_EMAIL)) {
	$error_msg[] = "Your email must have a valid format, such as name@mailhost.com";
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
	"Full Name: $nam\n\n" .
	"Company Name: $comp\n\n" .
	"Fleet Size: $fleet\n\n" .
	"Company Website: $site\n\n" .
	"Contact Email: $ema\n\n" .
	"Contact Phone: $mob\n\n"
; 

// Assuming there's no error, send the email and redirect to Thank You page

if  (!$error_msg) {
mail ($your_email, $subject, $email_body, "From: $nam <$ema>" . "\r\n" . "Reply-To: $nam <$ema>");
header ("Location: $thanks_page");
exit();
}  

} 
?>
<!doctype html>
<html class="no-js" lang="en">

<head id="www-limopedia-com" data-template-set="master-template">
	<meta charset="UTF-8">
	<title>Limopedia - Driven by the Phone</title><meta name="description" content="Limopiedia receive reservations and improve communications with your clients">
	<meta name="dcterms.rightsHolder" content="Limopedia Corporation">
	<meta name="dcterms.rights" content="All rights reserved">
	<meta name="dcterms.rightsHolder" content="2014">
	<!-- za Styles -->
	<link href="css/bootstrap.css" rel="stylesheet">
	<link href="css/limopedia.css" rel="stylesheet">
	<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
  <![endif]-->
	<!-- za fav and touch icons -->
	<link rel="author" href="humans.txt">
	<link rel="shortcut icon" href="favicon.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/icons/apple-touch-icon-144x144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/icons/apple-touch-icon-72x72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="images/img/apple-touch-icon-57x57-precomposed.png">
	<!-- za Facebook Share -->
	<meta property="og:site_name" content="Limopedia">
	<meta property="og:url" content="http://www.limopedia.com">
	<meta property="og:title" content="Limopedia - Driven by the Phone">
	<meta property="og:type" content="website">
	<meta property="og:image" content="http://limopedia.com/img/icons/fb-preview.png">
	<meta property="og:description" content="Limousine operators from all over the world use Limopiedia to receive reservations and to dramatically improve communications with their clients">
	<!-- za Twitter Card -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="@limopedia">
	<meta name="twitter:url" content="http://www.limopedia.com">
	<meta name="twitter:title" content="Limopedia - Driven by the Phone">
	<meta name="twitter:description" content="Limousine operators from all over the world use Limopiedia to receive reservations and to dramatically improve communications with their clients">
	<meta name="twitter:image" content="http://limopedia.com/img/icons/tw-card.png">
</head>

<body data-spy="scroll" data-target=".main-navigation">
	<header class="navbar navbar-default navbar-fixed-top" id="navigation-bar">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand logo" href="index.php">Limopedia</a>
			</div>
			<!-- /.navbar-header -->
			<div class="main-navigation navbar-collapse collapse single-page-nav">
				<ul class="nav navbar-nav">
					<li class="active">
						<a class="external" href="index.php#nav-header">Home</a>
					</li>
					<li>
						<a class="external" href="index.php#nav-about">About Us</a>
					</li>
					<li>
						<a class="external" href="index.php#nav-features">Features</a>
					</li>
					<li>
						<a class="external" href="pricing.php">Pricing</a>
					</li>
					<li>
						<a class="external" href="index.php#nav-contact">Contact Us</a>
					</li>
				</ul>
				<!-- /.nav -->
				<div class="call pull-right">Or call us for more information
					<span>866-491-8508</span>
				</div>
			</div>
			<!--/.nav-collapse -->
		</div>
		<!-- /.container -->
	</header>
	<!-- /header -->

  <section id="nav-contact" class="home-about pricing-form">
  	<div class="container">
    	<div class="row">
  			<form method="post" action="<?php $_SERVER['PHP_SELF'] ?>" class="form-horizontal col-lg-10 col-lg-offset-1">
          <div class="jumbotron">

            <div class="form-group">
              <h2>Get Your Limousine App Today!<span>World-class support and service are just a few clicks away. We are here to help you succeed!</span></h2>
            </div>
            <div class="form-group">
              <label class="sr-only" for="name">Name</label>
              <input name="name" type="text" class="form-control" id="name" placeholder="Full Name" value="<?php if (isset($_POST["name"])) {echo $nam;} ?>" required>
            </div>
            <div class="form-group">
              <label class="sr-only" for="company">Company</label>
              <input name="company" type="text" class="form-control" id="company" placeholder="Company Name" value="<?php if (isset($_POST["company"])) {echo $comp;} ?>" required>
            </div>
            <div class="form-group">
              <label class="sr-only" for="fleet">Fleet Size</label>
              <input name="fleet" type="text" class="form-control" id="fleet" placeholder="Fleet Size" value="<?php if (isset($_POST["fleet"])) {echo $fleet;} ?>" required>
            </div>
            <div class="form-group">
              <label class="sr-only" for="website">Company Website</label>
              <input name="website" type="text" class="form-control" id="website" placeholder="Company Website" value="<?php if (isset($_POST["website"])) {echo $site;} ?>" required>
            </div>
            <div class="form-group">
              <label class="sr-only" for="email">Email Address</label>
              <input name="email" type="email" class="form-control" id="email" placeholder="Primary Contact Email" value="<?php if (isset($_POST["email"])) {echo $ema;} ?>" required>
            </div>
            <div class="form-group">
              <label class="sr-only" for="phone">Primary Contact Phone</label>
              <input name="phone" type="text" class="form-control" id="phone" placeholder="Primary Contact Phone" value="<?php if (isset($_POST["phone"])) {echo $mob;} ?>" required>
            </div>          
            <input type="hidden" name="loadtime" value="<?php echo time(); ?>">
            
            <div class="form-group payment">
              <input type="submit" name="submit" value="Calculate App Price" class="btn btn-default btn-lg btn-primary">
            </div>
          </div>
        </form>
    	</div>
    </div>
  </section>

  <footer>
		<div class="container text-center">
			<div class="row">
				<div class="col-md-12 col-sm-12 footer-links footer-links-navi">
					<a class="external" href="index.php#nav-header" class="active">Home</a>•
					<a class="external" href="index.php#nav-about">About Us</a>•
					<a class="external" href="index.php#nav-features">Features</a>•
					<a class="external" href="pricing.php">Pricing</a>•
					<a class="external" href="index.php#nav-contact">Contact Us</a>
				</div>
				<!-- /.footer-links -->
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-12 col-sm-12 social">
					<h3>Let’s Socialize!</h3>
					<a href="http://www.facebook.com/limopedia" class="facebook">Facebook</a>
					<a href="http://www.twitter.com/limopedia" class="twitter">Twitter</a>
					<a href="http://www.linkedin.com/company/5043565" class="linkedin">LinkedIn</a>
				</div>
				<!-- /.social -->
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-12 col-sm-12 call text-center">
					Or call us for more information
					<span>866-491-8508</span>
				</div>
				<!-- /.col-md-12 -->
			</div>
			<!-- /.row -->
			

		</div>
		<!-- /.container -->
		<div class="privacy">
			<div class="container">
				<div class="row text-center">
					<div class="col-md-12 col-sm-12">
						&copy; 2013 |
						<a href="privacy.php">Privacy Policy</a> All Rights Reserved
					</div>
					<!-- /.col-md-12 -->
				</div>
				<!-- /.row -->
			</div>
			<!-- /.container -->
		</div>
		<!-- /.privacy -->
	</footer>
	<!-- /footer -->

	<!-- za Scripts -->
	<script src="https://code.jquery.com/jquery.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.pagenav.min.js"></script>
  <script src="js/limopedia.js"></script>
</body>
</html>
<!--
   _      _                                _ _       
  | |    (_)                              | (_)      
  | |     _ _ __ ___   ___  _ __   ___  __| |_  __ _ 
  | |    | | '_ ` _ \ / _ \| '_ \ / _ \/ _` | |/ _` |
  | |____| | | | | | | (_) | |_) |  __/ (_| | | (_| |
  |______|_|_| |_| |_|\___/| .__/ \___|\__,_|_|\__,_|
                           | |                       
                           |_|                       
-->