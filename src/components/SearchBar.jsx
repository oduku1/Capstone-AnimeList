import React, { useState, useEffect, useRef, useContext } from "react";
import { searchAnime } from "../api_fetching/jikan";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { results, setResults, queriedAnime, setFullResults } = useContext(AuthContext);

  // Fetch suggestions on typing with debounce (for dropdown only)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      const data = await searchAnime(query.trim());
      const sliced = data.slice(0, 6);

      setResults(sliced);  // update dropdown only
      setShowDropdown(true);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Only update fullResults and navigate on Enter
  async function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();

      const data = await searchAnime(query.trim());

      setFullResults(data);          // update fullResults on enter
      queriedAnime.current = data;

      navigate(`/discover/search/${encodeURIComponent(query.trim())}`);

      setShowDropdown(false);
      setQuery("");  // optional: clear input after search commit
    }
  }

  // When user clicks dropdown item, navigate and update fullResults
  async function handleSelect(animeTitle) {
    const data = await searchAnime(animeTitle);
    setFullResults(data);
    queriedAnime.current = data;

    navigate(`/anime/${encodeURIComponent(animeTitle)}`);
    setShowDropdown(false);
    setQuery("");
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <input
        type="text"
        placeholder="Search anime..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {showDropdown && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => handleSelect(anime.title)}
              className="dropdown-item"
            >
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                width="40"
                height="55"
                style={{ marginRight: "10px", borderRadius: "4px" }}
              />
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
