import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import Popup from "../components/Popup";

export default function SearchPage() {
  const {
    fullResults,
    query,
    setSelectedAnime,
    selectedAnime,
    openPopup,
    setOpenPopup,
    loading,
    user,
    setFullResults
  } = useContext(AuthContext);

  useEffect(() => {
    async function fetchSearchResults() {
      if (query) {
        try {
          const data = await searchAnime(query);
          setFullResults(data);
        } catch (error) {
          console.error("Failed to fetch anime on mount:", error);
          setFullResults([]);
        }
      }
    }

    fetchSearchResults();
  }, [query, setFullResults]);


  function handleClick(anime) {
    setSelectedAnime(anime);
    setOpenPopup(true);
  }


  const getRatingColor = (rating) => {
    if (rating === null) return "transparent";

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
                  <p
                    className="mal-score"
                    style={{
                      backgroundColor: getRatingColor(res.score),
                      color: "black",
                    }}
                  >
                    {res.score}
                  </p>
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
                  to={`/anime/${encodeURIComponent(res.mal_id)}`}
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
