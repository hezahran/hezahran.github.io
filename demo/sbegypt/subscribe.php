<?php

/******************************************************************
 * Constants
 ******************************************************************/
define('DATABASE_DIRECTORY', 'db');
define('DATABASE_NAME', 'subscribers');
define('DATABASE_MODE', 0666);

/******************************************************************
 * Variables
 ******************************************************************/
$full_path = sprintf('%s/%s.db', DATABASE_DIRECTORY, DATABASE_NAME);
$handler = new PDO('sqlite:' . $full_path);

/******************************************************************
 * SQL
 ******************************************************************/
$sql_create_table = '
    CREATE TABLE "subscribers" (
      "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      "email" text(255) NOT NULL
    );
';

$sql_insert_email = '
  INSERT INTO subscribers (email) VALUES (:email);
';

/******************************************************************
 * Create table
 ******************************************************************/
try {
    $handler->exec($sql_create_table);
} catch (PDOException $e) {
    echo json_encode(array(
        'error' => TRUE,
        'message' => $e->getMessage(),
    ));
    die;
}

/******************************************************************
 * Insert email
 ******************************************************************/
if (!empty($_POST['subscribe'])) {
    if (filter_var($_POST['subscribe'], FILTER_VALIDATE_EMAIL)) {
        $statement = $handler->prepare($sql_insert_email);

        if ($statement) {
            $statement->bindValue(':email', $_POST['subscribe'], SQLITE3_TEXT);
            $statement->execute();

            echo json_encode(array(
                'message' => 'OK',
            ));
            die;
        } else {
            echo json_encode(array(
                'error' => TRUE,
                'message' => 'Can not insert an email.',
            ));
            die;
        }
    } else {
        echo json_encode(array(
            'error' => TRUE,
            'message' => 'E-mail has wrong format.',
        ));
        die;
    }
} else {
    echo json_encode(array(
          'error' => TRUE,
          'message' => 'E-mail is missing.',
     ));
    die;
}
