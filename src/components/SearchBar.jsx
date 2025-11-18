import React, { useState, useEffect, useRef, useContext } from "react";
import { searchAnime } from "../api_fetching/jikan";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { results, setResults, queriedAnime, setFullResults, setSelectedAnime } = useContext(AuthContext);

  // Fetch suggestions on typing with debounce (for dropdown only)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const data = await searchAnime(query.trim());
        const sliced = data.slice(0, 6);

        setResults(sliced);
        setShowDropdown(true);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, setResults]);

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

      try {
        const data = await searchAnime(query.trim());

        setFullResults(data);
        queriedAnime.current = data;

        navigate(`/discover/search/${encodeURIComponent(query.trim())}`);

        setShowDropdown(false);
        setQuery("");
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      }
    }
  }

  // When user clicks dropdown item, navigate and update fullResults
  function handleSelect(anime) {
    setSelectedAnime(anime);
    setFullResults([anime]);
    queriedAnime.current = [anime];

    navigate(`/anime/${encodeURIComponent(anime.title)}`);
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
        <ul className="search-dropdown" role="listbox">
          {results.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => handleSelect(anime)}
              className="dropdown-item"
              role="option"
              tabIndex={0}
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
