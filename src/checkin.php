<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$eventcode = $_POST['eventcode'];

$checkEventCodeQuery = "SELECT id FROM event_codes WHERE code = '$eventcode'";
$result = $conn->query($checkEventCodeQuery);

if ($result->num_rows > 0) {
    $checkUserQuery = "SELECT id, points FROM users WHERE firstname = '$firstname' AND lastname = '$lastname'";
    $userResult = $conn->query($checkUserQuery);

    if ($userResult->num_rows > 0) {
        $userData = $userResult->fetch_assoc();
        $userId = $userData['id'];
        $currentPoints = $userData['points'];

        $updatePointsQuery = "UPDATE users SET points = $currentPoints + 1 WHERE id = $userId";
        if ($conn->query($updatePointsQuery) === TRUE) {
            echo "Points updated for registered user";
        } else {
            echo "Error updating points: " . $conn->error;
        }
    } else {
        $registerUserQuery = "INSERT INTO users (firstname, lastname, points) VALUES ('$firstname', '$lastname', 1)";
        if ($conn->query($registerUserQuery) === TRUE) {
            echo "User registered successfully and awarded a point";
        } else {
            echo "Error registering user: " . $conn->error;
        }
    }
} else {
    echo "Invalid event code";
}

$conn->close();
?>
