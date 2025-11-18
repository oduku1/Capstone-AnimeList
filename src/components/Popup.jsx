import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../css/Popup.css"


export default function Popup({ selectedAnime, onClose }) {
  const [add, setAdd] = useState(false);
  const {user} = useContext(AuthContext);
  const [success,setSuccess] = useState("")
  const genres = selectedAnime.genres.map(g => g.name);


  if (!selectedAnime) return null; // safety check
  const { title, images, episodes,setOpenPopup } = selectedAnime;
  const image = images?.jpg?.image_url;

  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(null);
  

  useEffect(() => {
    setEpisodesWatched(0);
    setRating(0);
    setStatus(undefined);
  }, [selectedAnime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/users/${user.username}/anime`, {
        title,
        genres,
        image,
        episodesWatched,
        status,
        rating,
        episodes
      });
      setSuccess("Added Anime to List! Closing Popup")
      setTimeout(()=>{
        onClose()
        setSuccess("")

      },1500)
    } catch (e) {
      console.error("Failed to add anime:", e);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>

      <button onClick={()=>console.log(user)}>user</button>

        <h2>{title}</h2>
        <img src={image} alt={title} className="popup-image" />
        <p>Episodes: {episodes || "N/A"}</p>
        <p>Status: {selectedAnime.status || "Unknown"}</p>

        <button onClick={() => setAdd((prev) => !prev)}>
          {add ? "Hide" : "Add to list"}
        </button>

        {add && (
          <div className="add-anime-box">
            <div className="status-select">
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>
            <div className="episodes-watched">
              Episodes Watched:
              <input
                type="number"
                value={episodesWatched}
                min={0}
                max={episodes || undefined}
                onChange={(e) => setEpisodesWatched(Number(e.target.value))}
              />
            </div>
            <div className="rating">
              Rating:
              <input
                type="number"
                value={rating}
                min={0}
                max={10}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>
            <div>
              <button onClick={handleSubmit}>Add to list</button>
            </div>
          </div>
        )}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
