import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // State for the message

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
      .post("http://localhost/php-react-sql/register.php", sendData)
      .then((result) => {
        if (result.data.status === "username_taken") {
          // Display a prompt to the user
          setMessage("Username already exists. Please choose a different username.");
        } else if (result.data.status === "valid") {
          // Registration was successful, you can redirect or display a success message
          setMessage("Registration successful!");
        } else {
          setMessage(""); // Clear the message
          console.log(result.data.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(sendData);
  };

  return (
    <div>
      <div>Register</div>
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
            type="text"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={data.password}
          />
          <input type="submit" name="submit" value="Register" />
        </div>
      </form>
      <p>{message}</p> {/* Display the message */}
    </div>
  );
}

export default Register;
