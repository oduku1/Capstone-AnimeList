import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Popup from "../components/Popup";

export default function SearchPage() {
  const {
    fullResults,
    setSelectedAnime,
    selectedAnime,
    openPopup,
    setOpenPopup,
    loading,
    user,
  } = useContext(AuthContext);

  function handleClick(anime) {
    setSelectedAnime(anime);
    setOpenPopup(true);
  }

  if (loading) {
    return <p className="loading-text">Loading top anime...</p>;
  }

  return (
    <>
      <div className="anime-grid-wrapper">
        <div className="anime-grid main-content">
          {fullResults?.length > 0 ? (
            fullResults.map((res) => (
              <div key={res.mal_id} className="anime-card">
                <div className="image-container">
                  <img src={res.images?.jpg?.image_url} alt={res.title} />
                  {user ? (
                    <button
                      className="add-button"
                      onClick={() => handleClick(res)}
                    >
                      +
                    </button>
                  ) : (
                    <div className="login-hint">Log in to add</div>
                  )}
                </div>
                <Link
                  to={`/anime/${encodeURIComponent(res.title)}`}
                  className="anime-title-link"
                  onClick={()=>setSelectedAnime(res)}
                >
                  {res.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="loading-text">No anime found.</p>
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
