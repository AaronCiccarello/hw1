<?php

$conn = require 'config.php';


session_start();
$userId = $_POST['user_id']; 


$sql = "SELECT c.nome_cibo, uc.preferito, uc.id_cibo
        FROM utenti u
        JOIN utente_cibi uc ON u.id = uc.id_utente
        JOIN cibi_preferiti c ON uc.id_cibo = c.id
        WHERE u.id = $userId";
$result = mysqli_query($conn, $sql);

$favorites = [];
if (mysqli_num_rows($result) > 0) {

    while($row = mysqli_fetch_assoc($result)) {
        $favorites[] = $row;
    }
} 

header('Content-Type: application/json');
echo json_encode($favorites);

$conn->close();
?>