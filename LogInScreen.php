<?php

session_start();

if (isset($_SESSION['success'])) {
    echo "<script>alert('" . $_SESSION['success'] . "');</script>";
    unset($_SESSION['success']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $conn = require 'config.php';
    $data = json_decode(file_get_contents('php://input'), true);

    $username = mysqli_real_escape_string($conn, $data['username']);
    $password = mysqli_real_escape_string($conn, $data['password']);


    $result = $conn->query("SELECT id, password FROM utenti WHERE username = '$username'");

    $user = $result->fetch_assoc();
 
    if ($user && $password == $user['password']) { 

        $_SESSION['username'] = $username;
        echo 'success;' . $user['id'];
    } else {
  
        echo "Invalid username or password.";
    }
    $conn->close();
    exit();
}
?>

<!DOCTYPE html>
<html>

    <head>
        <title> sono un sito </title>
        <link rel="stylesheet" type="text/css" href="LogInScreen.css">
        <link rel="icon" type="image/png" href="images/felicita.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Shadows+Into+Light&display=swap" rel="stylesheet">
        <script src="LoginScreen.js" defer></script>
    </head>

    <body>
        <div class="AllPage">
            <img src="images/wallD.png">
            <div class="AccessBanner"> 

                <h1 class="Title"> Who am I? </h1>
                <form method="post" action="">
                    <div class="boxUsername">
                        <input type="text" name="username" class="input-boxUsername" placeholder="Username">
                    </div>
                    <div class = "boxPassword" >
                        <input type="text" name="password" class="input-boxPassword" placeholder="Password">
        
                    </div>
                    <div>
                        <input id="submit" type="submit" value="Submit">
                    </div>
                    
                </form>
                <p></p>
                <div>
                    <div class="registrazione">aren't you registered yet? Sign up  
                        <a href="SignUpScreen.php"> <button id="SignUp"> here </button> </a>
                    </div>
                   
                </div>


            </div>
        </div>

    </body>



</html>