import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { username } = useParams();
  const { user, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  if (!loggedIn || !user) {
    return (
      <div className="main-content" style={{ color: "white", textAlign: "center" }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ color: "white", textAlign: "center" }}>
      <h2>Welcome, {loggedUser?.username}!</h2>
      <p>Email: {loggedUser?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}