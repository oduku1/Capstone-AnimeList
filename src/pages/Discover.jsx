import React from "react";
import { Link } from "react-router-dom";

export default function Discover({ anime, loading }) {
  if (loading) return <p style={{ color: "white" }}>Loading top anime...</p>;

  return (
    <div className="anime-grid main-content">
      {anime && anime.length > 0 ? (
        anime.map((a) => (
          <div key={a.mal_id} className="anime-card">
            <img
              src={a.images?.jpg?.image_url}
              alt={a.title}
              width="150"
              height="200"
            />
            <Link to={`/anime/${encodeURIComponent(a.title)}`} className="anime-title-link">
              {a.title}
            </Link>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>No anime found.</p>
      )}
    </div>
  );
}