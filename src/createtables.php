<?php
// creates two tables, one for users and points, one for event codes
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$createUsersTable = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    points INT(11) DEFAULT 0
)";

if ($conn->query($createUsersTable) === TRUE) {
    echo "Users table created successfully<br>";
} else {
    echo "Error creating users table: " . $conn->error;
}

$createEventCodesTable = "CREATE TABLE IF NOT EXISTS event_codes (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL
)";

if ($conn->query($createEventCodesTable) === TRUE) {
    echo "Event codes table created successfully<br>";
} else {
    echo "Error creating event codes table: " . $conn->error;
}

$conn->close();
?>
