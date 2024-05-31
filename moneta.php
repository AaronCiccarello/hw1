<?php
$conn = require 'config.php';
if (!isset($_POST['value'])) {
    echo "Value not provided";
    exit;
}
$value = mysqli_real_escape_string($conn, $_POST['value']);
$value = $value + 1;
$sql = "SELECT moneta FROM valuta where id = $value";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["moneta"];
    }
} else {
    echo "No results";
} 

$conn->close();
?>