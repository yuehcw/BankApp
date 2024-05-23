import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form", { username, password, initialBalance });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        {
          username,
          password,
          initialBalance: parseFloat(initialBalance).toFixed(2),
        },
      );
      console.log(response.data);
      setError("");
      message.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      setError("Invalid input");
      console.error(
        "Invalid input",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          placeholder="Initial Balance"
          required
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
