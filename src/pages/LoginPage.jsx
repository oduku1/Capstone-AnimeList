import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      const { token, user } = res.data;

      // Save the JWT token
      localStorage.setItem("token", token);

      // Set global user context
      setUser(user);
      setLoggedIn(true);

      setUsername("");
      setPassword("");
      setError("");
      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate(`/list/${user.username}`);
        setSuccess("");
      }, 1500);

    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("User not found");
        } else if (err.response.status === 401) {
          setError("Invalid password");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Please try again.");
      }
      console.error(err);
    }
  }

  return (
    <form className="auth-form main-content" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />

      <button className="login-btn" type="submit">Login</button>

      <p>Don’t have an account? <Link to="/register" style={{color:"#ff4081"}}>Register Here</Link></p>
    </form>
  );
}
