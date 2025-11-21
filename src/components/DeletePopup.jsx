import "../css/DeletePopup.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";

export default function DeletePopup({ selectedForDelete, onClose }) {
  const { user, userAnime, setUserAnime } = useContext(AuthContext);

  const { title, image, mal_id } = selectedForDelete || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!selectedForDelete) return null;

  async function handleDelete(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/users/${user.username}/anime`,
        {
          data: { mal_id }
        }
      );

      setUserAnime(prev => prev.filter(a => a.mal_id !== mal_id));

      setSuccess("Anime removed from your list.");
      console.log(res.data);

      setTimeout(() => {
        onClose();
      }, 500);

    } catch (err) {
      console.error(err);
      setError("Failed to remove anime.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <p className="delete-validation">
          <strong>Are You Sure You Want To Delete</strong>
        </p>

        <h2>{title}</h2>

        {image && <img src={image} alt={title} className="popup-image" />}

        <p className="delete-validation">
          <strong>From Your List?</strong>
        </p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div style={{ marginTop: "5px" }}>
          <button className="yes-btn" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Yes"}
          </button>
          <button className="no-btn" onClick={onClose} disabled={loading}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
