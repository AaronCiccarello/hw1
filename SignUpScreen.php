<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   


    $conn = require 'config.php';
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $email = mysqli_real_escape_string($conn, $_POST['email']); 

 
      $sql = "SELECT * FROM utenti WHERE username = '$username' OR email = '$email'";
      $result = $conn->query($sql);
  
      if ($result->num_rows > 0) {

          $_SESSION['error'] = 'Username o email già in uso. Per favore, scegli un altro username o email.';
          header('Location: SignUpScreen.php');
          exit;
      } else {
        $sql = "INSERT INTO utenti (username, password, email) VALUES ('$username', '$password', '$email')";
        if ($conn->query($sql) === TRUE) {
            $_SESSION['success'] = 'Registrazione avvenuta con successo. Ora puoi effettuare il login.';
            header('Location: LogInScreen.php');
            exit;
        } else {
            $_SESSION['error'] = "Errore: " . $sql . "<br>" . $conn->error;
        }
      }
      $conn->close();
}

?>



<!DOCTYPE html>
<html>

    <head>
        <title> sono un sito </title>
        <link rel="stylesheet" type="text/css" href="SignUpScreen.css">
        <link rel="icon" type="image/png" href="images/felicita.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Shadows+Into+Light&display=swap" rel="stylesheet">
        <script src="SignUpScreen.js" defer></script>
        <meta name="viewport"
        content="width=device-width, initial-scale=1">
    </head>

    <body>
            <?php
                    if (isset($_SESSION['error'])) {
                            echo "<p class='errore'>" . $_SESSION['error'] . "</p>";
                            unset($_SESSION['error']);
                    }
            ?>
        <div class="AllPage"> <img src="images/wallD.png" id="background-image">
            <div class="AccessBanner"> 

                <h1 class="Title"> Subscribe </h1>
               

                <form action="SignUpScreen.php" method="post">
                    <div class="boxUsername">
                        <input id="username" name="username" type="text" class="input-boxUsername" placeholder="Username">
                    </div>
                    <div class = "boxPassword" >
                        <input id="password" name="password" type="text" class="input-boxPassword" placeholder="Password">
        
                    </div>
                    <div class = "boxPassword" >
                        <input id="confirmPassword" type="text" class="input-boxPassword" placeholder="Confirm Password">
        
                    </div>
                    <div class = "boxPassword" >
                        <input type="text" name="email" id="email" class="input-boxPassword" placeholder="enter Email">
        
                    </div>
                    <div>
                        <input id="submit" type="submit" value="Submit">
                    </div>
                    
                </form>
                <p class =  "error"></p>
                
                    <a href="http://localhost/LogInScreen.php" class="ritornologIn"> torna al login </a>

            </div>
        </div>

    </body>



</html>