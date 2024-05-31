<?php

$conn = require 'config.php';

$sql = "SELECT premio FROM vantaggi";


$result = $conn->query($sql);


$vantaggi = array();

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        $vantaggi[] = $row;
    }
}

$conn->close();


echo json_encode($vantaggi);
?>