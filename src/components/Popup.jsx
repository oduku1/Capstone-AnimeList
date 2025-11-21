import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Popup({ selectedAnime, onClose }) {
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");
  const { user, userAnime, setUserAnime } = useContext(AuthContext);
  const [success, setSuccess] = useState("");

  if (!selectedAnime) return null; // safety check

  const {
    title,
    images = {},
    episodes,
    genres: animeGenres = [],
    trailer = {},
    score,
    aired = {},
    duration,
    status: initialStatus,
  } = selectedAnime;

  const genres = animeGenres.map((g) => (typeof g === "string" ? g : g.name));

  const image = images?.jpg?.image_url;
  const trailerUrl = trailer?.embed_url;
  const airedFrom = aired?.from;

  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(initialStatus || "");

  useEffect(() => {
    setEpisodesWatched(0);
    setRating(0);
    setStatus(initialStatus || "");
  }, [selectedAnime, initialStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/${user.username}/anime`,
        {
          title,
          genres,
          image,
          episodesWatched,
          status,
          rating,
          episodes,
          trailer: trailerUrl,
          mal_score: score,
          dateAired: airedFrom ? new Date(airedFrom) : null,
          dateAdded: new Date(),
          anime_duration: duration,
        }
      );

      // Update userAnime state by appending new anime
      setUserAnime((prev) => [...prev, res.data]);

      setSuccess("Added Anime to List! Closing Popup");
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);
    } catch (e) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        setError("Failed to add anime. Please try again.");
      }

      console.error("Failed to add anime:", e);

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {image && <img src={image} alt={title} className="popup-image" />}
        <p>Episodes: {episodes || "N/A"}</p>
        <p>Status: {status || "Unknown"}</p>

        <button
          type="button"
          className="popup-add-btn"
          onClick={() => setAdd((prev) => !prev)}
        >
          {add ? "Hide" : "Add to list"}
        </button>

        {add && (
          <form className="add-anime-box" onSubmit={handleSubmit}>
            <div className="status-select">
              Status:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select status</option>
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>
            <div className="episodes-watched">
              <p>Episodes Watched:</p>
              <input
                type="number"
                value={episodesWatched}
                min={0}
                max={episodes || undefined}
                onChange={(e) => setEpisodesWatched(Number(e.target.value))}
                required
              />
            </div>
            <div className="rating">
              Rating:
              <input
                type="number"
                value={rating}
                min={0}
                max={10}
                step={0.1}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>
            <div>
              <button type="submit">Add to list</button>
            </div>
          </form>
        )}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="button" className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
