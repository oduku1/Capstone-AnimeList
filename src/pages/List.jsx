import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../css/List.css"

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

  const filterKeys = ["Plan to Watch","Watching","Completed","Dropped"]

  const genresKeys = [
    "Action",
    "Adventure",
    "Avant Garde",
    "Award Winning",
    "Boys Love",
    "Comedy",
    "Drama",
    "Fantasy",
    "Girls Love",
    "Gourmet",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Suspense",
    "Ecchi",
    "Erotica",
    "Hentai",
    "Adult Cast",
    "Anthropomorphic",
    "CGDCT",
    "Childcare",
    "Combat Sports",
    "Crossdressing",
    "Delinquents",
    "Detective",
    "Educational",
    "Gag Humor",
    "Gore",
    "Harem",
    "High Stakes Game",
    "Historical",
    "Idols (Female)",
    "Idols (Male)",
    "Isekai",
    "Iyashikei",
    "Love Polygon",
    "Magical Sex Shift",
    "Mahou Shoujo",
    "Martial Arts",
    "Mecha",
    "Medical",
    "Military",
    "Music",
    "Mythology",
    "Organized Crime",
    "Otaku Culture",
    "Parody",
    "Performing Arts",
    "Pets",
    "Psychological",
    "Racing",
    "Reincarnation",
    "Reverse Harem",
    "Love Status Quo",
    "Samurai",
    "School",
    "Showbiz",
    "Space",
    "Strategy Game",
    "Super Power",
    "Survival",
    "Team Sports",
    "Time Travel",
    "Vampire",
    "Video Game",
    "Visual Arts",
    "Workplace",
    "Urban Fantasy",
    "Villainess",
    "Josei",
    "Kids",
    "Seinen",
    "Shoujo",
    "Shounen"
  ];

  const filteredAnime = userAnime
  ?.filter(anime => filterGenre ? anime.genres.includes(filterGenre) : true)
  .filter(anime => filterStatus ? anime.status === filterStatus : true);


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
      <select className="filter-select" onChange={(e)=>setFilterGenre(e.target.value)}>
        <option value={""}>All Genres</option>
        {genresKeys.map(genre=><option value={genre}>{genre}</option>)}
      </select>
      <select className="filter-select" onChange={(e)=>setFilterStatus(e.target.value)}>
        <option value={""}>All Statuses</option>
        {filterKeys.map(option=><option value={option}>{option}</option>)}
      </select>
      {filteredAnime.map((anime) => (
      <div className="list-card" key={anime._id}>
        <img src={anime.image} alt={anime.title} />

        <div className="list-details">
          <h4>{anime.title}</h4>
          <p>Genres: {anime.genres.join(", ")}</p>
          <p>Your Rating: {anime.rating}</p>
          <p className="list-status-text">Status: {anime.status}</p>
        </div>

        <button className="list-update-btn">Update</button>
        <button className="list-delete-btn">Delete</button>
      </div>
    ))}

    </div>
  );
}