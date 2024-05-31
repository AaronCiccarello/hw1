<?php
$conn = require 'config.php';
if(!isset($_POST['value'])){
    echo "Reddito non fornito";
    exit;
}   
$value = mysqli_real_escape_string($conn, $_POST['value']);
$value = $value + 1;

$sql = "SELECT soldi FROM compensi where id= $value";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["soldi"];
    }
} else {
    echo "Nessun risultato";
}

$conn -> close();