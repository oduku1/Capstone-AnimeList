import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function UpdatePopup({ selectedForUpdate, onClose }) {
  const { user, setUserAnime } = useContext(AuthContext);
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!selectedForUpdate) return null;

  const {
    title,
    image,
    episodes,
    mal_id,
  } = selectedForUpdate;

  useEffect(() => {
    setEpisodesWatched(selectedForUpdate.episodesWatched ?? 0);
    setRating(selectedForUpdate.rating ?? 0);
    setStatus(selectedForUpdate.status ?? "");
  }, [selectedForUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/users/${user.username}/anime`,
        {
          mal_id,
          episodesWatched,
          rating,
          status,
          episodes,
        }
      );

      if (res.data.anime) {
        setUserAnime((prevAnime) =>
          prevAnime.map((a) => (a._id === res.data.anime._id ? res.data.anime : a))
        );
      }

      setSuccess("Updated successfully! Closing popup...");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1500);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to update anime. Please try again.");
      }
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {image && <img src={image} alt={title} className="popup-image" />}
        <p>Episodes: {episodes || "N/A"}</p>

       

        <form className="add-anime-box" onSubmit={handleSubmit} style={{marginBottom:"15px",marginTop:"15px"}}>
          <div className="status-select">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Plan to Watch">Plan to Watch</option>
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
              <option value="On Hold">On Hold</option>
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

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>


        <button className="popup-add-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
