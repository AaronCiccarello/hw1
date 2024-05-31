<?php
session_start();

$conn = require 'config.php';


$excludeId = isset($_SESSION['current_id']) ? $_SESSION['current_id'] : 0;

$result = $conn->query("SELECT domanda, id FROM domande_esistenziali WHERE id != $excludeId ORDER BY RAND() LIMIT 1");
$message = "No results";
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['current_id'] = $row['id']; 
    echo $row['domanda'];
} 

$conn->close();


?>

