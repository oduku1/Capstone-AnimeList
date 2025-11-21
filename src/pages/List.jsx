import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import UpdatePopup from "../components/UpdatePopup";
import "../css/List.css";
import DeletePopup from "../components/DeletePopup";

export default function Profile() {
  const { user, loggedIn, userAnime, setUserAnime} = useContext(AuthContext);
  const [updateSelect, setUpdateSelect ] = useState(null)
  const [deleteSelect,setDeleteSelect ] = useState(null)
  const [filterGenre, setFilterGenre] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sort, setSort] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete,setOpenDelete] = useState(false)
  const { username } = useParams();
  const navigate = useNavigate();

  const filterKeys = ["Plan to Watch", "Watching", "Completed", "Dropped"];

  function handleUpdate(anime) {
    setUpdateSelect(anime);
    setOpenUpdate(true);
  }

  function handleDelete(anime){
    setDeleteSelect(anime)
    setOpenDelete(true)
  }

  const sortKeys = [
    "Date Added (Newest)",
    "Date Added (Oldest)",
    "Rating(Low-High)",
    "Rating(High-Low)",
    "Alphabetical (A-Z)",
    "Alphabetical (Z-A)",
  ];

  const sortFunctions = {
    "Date Added (Newest)": (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded),
    "Date Added (Oldest)": (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
    "Rating(Low-High)": (a, b) => a.rating - b.rating,
    "Rating(High-Low)": (a, b) => b.rating - a.rating,
    "Alphabetical (A-Z)": (a, b) => a.title.localeCompare(b.title),
    "Alphabetical (Z-A)": (a, b) => b.title.localeCompare(a.title),
  };

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
    "Shounen",
  ];

  const filteredAnime = userAnime
    ?.filter((anime) => (filterGenre ? anime.genres.includes(filterGenre) : true))
    .filter((anime) => (filterStatus ? anime.status === filterStatus : true));

  const sortedAnime = filteredAnime.sort(sortFunctions[sort] || (() => 0));

  // Fetch user anime only if userAnime is empty to avoid overwriting local changes
  useEffect(() => {
    if (!user?.username) return;
    if (userAnime.length > 0) return; // Already have data, no need to fetch

    const fetchUserAnime = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profile/${username}`
        );
        setUserAnime(response.data.userAnime || []);
      } catch (e) {
        console.error("Failed to fetch user anime:", e);
      }
    };

    fetchUserAnime();
  }, [user?.username, username, setUserAnime, userAnime.length]);

  if (!loggedIn || !user) {
    return (
      <div className="main-content" style={{ color: "white", textAlign: "center" }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  const getRatingColor = (rating) => {
    if (rating === null) return "none";

    const colorRatio = Math.min(Math.max(rating / 10, 0), 1); // (0 to 1)
    let red, green, blue;
    if (colorRatio < 0.5) {
      const newRatio = colorRatio / 0.5;
      red = 255;
      green = Math.round(255 * newRatio);
      blue = 0;
    } else {
      const newRatio = (colorRatio - 0.5) / 0.5;
      red = Math.round(255 * (1 - newRatio));
      green = Math.round(128 + 127 * (1 - newRatio));
      blue = 0;
    }
    return `rgb(${red},${green},${blue})`;
  };

  return (
    <div className="main-content" style={{ color: "white", textAlign: "center" }}>
      <div className="query-container">
        <div className="search-container">
          <input placeholder="Search For Anime" />
          <button>Go</button>
        </div>

        <div className="filter-container">
          <select
            className="filter-select"
            onChange={(e) => setFilterGenre(e.target.value)}
            value={filterGenre}
          >
            <option value="">All Genres</option>
            {genresKeys.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="">All Statuses</option>
            {filterKeys.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="" disabled>
              Filter
            </option>
            {sortKeys.map((sortKey, index) => (
              <option key={index} value={sortKey}>
                {sortKey}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setFilterGenre("");
              setFilterStatus("");
              setSort("");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {filteredAnime.length === 0 && (
        <div className="main-content" style={{ color: "white", textAlign: "center" }}>
          <h4 className="empty-list">
            Broaden Your Anime Palette, Add Some More To Your List
          </h4>
        </div>
      )}

      {sortedAnime.map((anime) => (
        <div className="list-card" key={anime._id}>
          <div className="img-container">
            <img src={anime.image} alt={anime.title} />
            <p className="mal-score" style={{ backgroundColor: getRatingColor(anime.mal_score), color: "black" }}>
              {anime.mal_score}
            </p>
          </div>

          <div className="list-details">
            <h4>{anime.title}</h4>
            <p>Genres: {anime.genres.join(", ")}</p>
            <p>Episodes Watched: {anime.episodesWatched}</p>
            <p style={{ color: getRatingColor(anime.rating) }}>Your Rating: {anime.rating}</p>
            <p className="list-status-text">Status: {anime.status}</p>
          </div>

          <button onClick={()=>handleUpdate(anime)} className="list-update-btn">Update</button>
          <button onClick={()=>handleDelete(anime)} className="list-delete-btn">Delete</button>
        </div>
      ))}

      {
        openUpdate 
        && 
        <UpdatePopup selectedForUpdate = {updateSelect} 
        onClose = {()=>{
          setOpenUpdate(false);
          setUpdateSelect(null)}

        }/>
      }
      {
        openDelete 
        &&
        <DeletePopup

        selectedForDelete = {deleteSelect}

        onClose = {()=>{
          setOpenDelete(false);
          setDeleteSelect(null)}}
        />
      
      }
    
    </div>
  );
}
