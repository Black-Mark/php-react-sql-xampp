<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$con = mysqli_connect("localhost", "root", "");
mysqli_select_db($con, "react-server");

// Check if the username already exists
$checkQuery = "SELECT * FROM users WHERE username = '$username'";
$checkResult = mysqli_query($con, $checkQuery);

if (mysqli_num_rows($checkResult) > 0) {
    $response = array(
        'status' => 'username_taken'
    );
    echo json_encode($response);
} else {
    // Username is not taken, proceed with registration
    if (!empty($username) && !empty($password)) {
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        $result = mysqli_query($con, $sql);

        if ($result) {
            $response = array(
                'status' => 'valid'
            );
            echo json_encode($response);
        } else {
            $response = array(
                'status' => 'invalid'
            );
            echo json_encode($response);
        }
    } else {
        $response = array(
            'status' => 'invalid_empty_data'
        );
        echo json_encode($response);
    }
}
?>
