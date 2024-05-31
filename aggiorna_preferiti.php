<?php



$conn = require 'config.php';   

$userId = mysqli_real_escape_string($conn, $_POST['userId']);
$ciboId = mysqli_real_escape_string($conn, $_POST['foodId']);
$preferito = intval($_POST['isFavorite']); 

$query = "SELECT * FROM utente_cibi WHERE id_utente = '$userId' AND id_cibo = '$ciboId'";
$result = $conn->query($query);
if ($result->num_rows > 0) {

    $query = "UPDATE utente_cibi SET preferito = $preferito WHERE id_utente = '$userId' AND id_cibo = '$ciboId'";
} 

if ($conn->query($query) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>

