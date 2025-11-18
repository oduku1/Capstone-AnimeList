import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, loggedIn,userAnime,setUserAnime } = useContext(AuthContext);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const {username} = useParams()
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));


  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }


  const filteredAnime = userAnime

  const getUserAnime = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/${user.username}`);
      const data  =  response.data
      return data; 
    } catch (e) {
      console.error("Failed to fetch user anime:", e);
    }
  };
  useEffect(() => {
    if (!user?.username) return;
  
    const fetchUserAnime = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/profile/${username}`);
        setUserAnime(response.data.userAnime || []);
      } catch (e) {
        console.error("Failed to fetch user anime:", e);
      }
    };
  
    fetchUserAnime();
  }, [user?.username, setUserAnime]);

 

  if (!loggedIn || !user) {
    return (
      <div className="main-content" style={{ color: "white", textAlign: "center" }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ color: "white", textAlign: "center" }}>
      <div>
        <h3>Your List</h3>
        <div className="filter-options">
        
        </div>
      </div>
    </div>
  );
}