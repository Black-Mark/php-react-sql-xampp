import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null); // State to store additional user data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password,
    };

    axios
      .post("http://localhost/php-react-sql/login.php", sendData)
      .then((result) => {
        if (result.data.status === "UsernameNotFound") {
          setMessage("Username not found!");
          // Clear the user data when login is invalid
          setUserData(null);
        } else if (result.data.status === "IncorrectPassword") {
          setMessage("Password is Incorrect!");
          // Clear the user data when login is invalid
          setUserData(null);
        } else if (result.data.status === "Valid") {
          setMessage("Hello " + result.data.username);

          // Store additional data in state
          setUserData(result.data.userData);
        }
      });

    console.log(sendData);
  };

  return (
    <div>
      <div>Login</div>
      <form onSubmit={submitForm}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={data.username}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={data.password}
          />
          <input type="submit" name="submit" value="Login" />
        </div>
      </form>
      {message && <div>{message}</div>}
      {userData && (
        <div>
          {/* Render and use the additional user data here */}
          <p>User Data:</p>
          <p>usersdata.id: {userData.id}</p>
          <p>usersdata.uid: {userData.uid}</p>
          <p>usersdata.datainfo: {userData.datainfo}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
