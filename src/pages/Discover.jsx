import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Popup from "../components/Popup";
import "../css/Discover.css"

export default function Discover() {
  const {
    anime,
    loading,
    openPopup,
    setOpenPopup,
    selectedAnime,
    setSelectedAnime,
    page,
    setPage,
    user,
  } = useContext(AuthContext);

  function handleClick(anime) {
    setSelectedAnime(anime);
    setOpenPopup(true);
  }


  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    if (page > 1) setPage((prev) => prev - 1);
  }

  if (loading) return <p className="loading-text">Loading top anime...</p>;

  return (
    <div className="main-content">
      <h3 className="discover-title">Top Trending Anime</h3>

      <div className="anime-grid-wrapper">
        <div className="anime-grid">
          {anime?.length > 0 ? (
            anime.map((a) => (
              <div key={a.mal_id} className="anime-card">
                <div className="image-container">
                  <img src={a.images?.jpg?.image_url} alt={a.title} />

                  {user ? (
                    <button
                      className="add-button"
                      onClick={() => handleClick(a)}
                    >
                      +
                    </button>
                  ) : (
                    <div className="login-hint">Log in to add</div>
                  )}
                </div>

                <Link
                  to={`/anime/${encodeURIComponent(a.mal_id)}`}
                  className="anime-title-link"
                  onClick={()=>setSelectedAnime(a)}
                >
                  {a.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="loading-text">No anime found.</p>
          )}
        </div>
      </div>

      <div className="pagination-container">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`page-btn ${page === 1 ? "disabled" : ""}`}
        >
          ◀ Previous
        </button>

        <span className="page-number">Page {page}</span>

        <button onClick={nextPage} className="page-btn">
          Next ▶
        </button>
      </div>

      {openPopup && (
        <Popup
          selectedAnime={selectedAnime}
          onClose={() => {
            setOpenPopup(false);
            setSelectedAnime(null);
          }}
        />
      )}
    </div>
  );
}
