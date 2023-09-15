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

if ($username && $password) {
  // Check if the username exists
  $checkQuery = "SELECT * FROM users WHERE username = '$username'";
  $checkResult = mysqli_query($con, $checkQuery);

  if (mysqli_num_rows($checkResult) > 0) {
    $row = mysqli_fetch_assoc($checkResult);
    $storedPassword = $row['password'];
    $uid = $row['id']; // Get the user's ID

    // Verify the password
    if (($password == $storedPassword)) {
      // Fetch data from the usersdata table where uid matches id
      $userDataQuery = "SELECT * FROM usersdata WHERE uid = $uid";
      $userDataResult = mysqli_query($con, $userDataQuery);

      if (mysqli_num_rows($userDataResult) > 0) {
        $userData = mysqli_fetch_assoc($userDataResult);

        $response = array(
          'status' => 'Valid',
          'username' => $username,
          'userData' => $userData
        );
        echo json_encode($response);
      } else {
        $response = array(
          'status' => 'Valid',
          'username' => $username,
          'userData' => null
        );
        echo json_encode($response);
      }
    } else {
      $response = array(
        'status' => 'IncorrectPassword'
      );
      echo json_encode($response);
    }
  } else {
    $response = array(
      'status' => 'UsernameNotFound'
    );
    echo json_encode($response);
  }
}
?>
