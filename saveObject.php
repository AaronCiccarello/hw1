<?php

$conn = require 'config.php'; 


$data = json_decode(file_get_contents('php://input'), true);
$userId = mysqli_real_escape_string($conn, $data['userId']);
$objectName = mysqli_real_escape_string($conn, $data['objectName']);

$sql = "SELECT * FROM oggetti_vinti WHERE nome_oggetto = '$objectName' AND utente_vincitore = '$userId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo json_encode(["message" => "Record già esistente"]);
} else {
  $sql = "INSERT INTO oggetti_vinti (nome_oggetto, utente_vincitore) VALUES ('$objectName', '$userId')";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Record inserito con successo"]);
  } else {
    echo json_encode(["message" => "Errore nell'inserimento del record: " . $conn->error]);
  }
}

$conn->close();
?>