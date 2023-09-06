import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

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
        if (result.data.status === "Invalid") {
          setMessage("Incorrect password or username not found");
        } else if (result.data.status === "Valid") {
          setMessage("Hello " + result.data.username);
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
    </div>
  );
}

export default Login;
