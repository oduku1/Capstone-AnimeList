import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { searchAnime } from "../api_fetching/jikan";
import { AuthContext } from "../context/AuthContext";

export default function AnimePage() {
  const { anime } = useParams();
  const {results,setResults} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAnime() {
      if (!anime) return;
      setLoading(true);
      const data = await searchAnime(anime);
      setResults(data);
      setLoading(false);
    }
    fetchAnime();
  }, [anime]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="anime-results-page main-content">
      <h2>Results for “{decodeURIComponent(anime)}”</h2>
      <div className="anime-grid">
        {results.map((item) => (
          <div key={item.mal_id} className="anime-card">
            <img src={item.images?.jpg?.image_url} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


