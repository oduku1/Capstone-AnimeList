import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import plus from "/src/assets/icons8-plus-button (1).svg";
import Popup from "../components/Popup";

export default function Discover() {
  const {
    anime,
    loading,
    queriedAnime,
    openPopup,
    setOpenPopup,
    selectedAnime,
    setSelectedAnime,
  } = useContext(AuthContext);

  const { anime: animeQuery } = useParams();

  if (loading) return <p style={{ color: "white" }}>Loading top anime...</p>;

  function handleClick(anime) {
    setOpenPopup(true);
    setSelectedAnime(anime);
  }
  if (animeQuery) {
    return (
      <>
        <div className="anime-grid-wrapper">
          <div className="anime-grid main-content">
            {queriedAnime.current && queriedAnime.current.length > 0 ? (
              queriedAnime.current.map((qAnime) => (
                <div key={qAnime.mal_id} className="anime-card">
                  <div className="image-container">
                    <img
                      src={qAnime.images?.jpg?.image_url}
                      alt={qAnime.title}
                      width="150"
                      height="200"
                    />
                    <button
                      className="add-button"
                      onClick={() => handleClick(qAnime)}
                    >
                      <img src={plus} />
                    </button>
                  </div>
  
                  <Link
                    to={`/anime/${encodeURIComponent(qAnime.title)}`}
                    className="anime-title-link"
                  >
                    {qAnime.title}
                  </Link>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>No anime found.</p>
            )}
          </div>
        </div>
  
        {openPopup && (
          <Popup
            selectedAnime={selectedAnime}
            onClose={() => setOpenPopup(false)}
          />
        )}
      </>
    );
  }
  
  return (
    <>
    <h3 style={{textAlign:"center"}}>Top Airing Anime</h3>
      <div className="anime-grid-wrapper">
        <div className="anime-grid main-content">
          {anime && anime.length > 0 ? (
            anime.map((a) => (
              <div key={a.mal_id} className="anime-card">
                <div className="image-container">
                  <img
                    src={a.images?.jpg?.image_url}
                    alt={a.title}
                    width="150"
                    height="200"
                  />
                  <button className="add-button" onClick={() => handleClick(a)}>
                    <img src={plus} />
                  </button>
                </div>
  
                <Link
                  to={`/anime/${encodeURIComponent(a.title)}`}
                  className="anime-title-link"
                >
                  {a.title}
                </Link>
              </div>
            ))
          ) : (
            <p style={{ color: "white" }}>No anime found.</p>
          )}
        </div>
      </div>
  
      {openPopup && (
        <Popup
          selectedAnime={selectedAnime}
          onClose={() => setOpenPopup(false)}
        />
      )}
    </>
  );
}
