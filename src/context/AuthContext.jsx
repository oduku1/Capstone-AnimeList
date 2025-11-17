import { createContext, useState, useEffect, useRef } from "react";
import getData from "../api_fetching/jikan";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fullResults, setFullResults] = useState(null);

  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userAnime, setUserAnime] = useState([]);

  const [results, setResults] = useState([]);

  // Start as empty array so Discover doesn't react while typing
  const queriedAnime = useRef([]);

  // Needed so Discover only updates on ENTER
  const [searchCommitted, setSearchCommitted] = useState(false);

  const [dark, setDark] = useState(localStorage.getItem("theme") || "light");

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const [page, setPage] = useState(1);

  // Load saved user
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoggedIn(true);
    }
  }, []);

  // Fetch Top Trending Anime (supports pagination)
  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      const data = await getData(page);
      setAnime(data);
      setLoading(false);
    }
    fetchTopAnime();
  }, [page]); // ← NOW TRENDING UPDATES ON PAGE CHANGE

  // Theme handling
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(dark);
    localStorage.setItem("theme", dark);
  }, [dark]);

  const value = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,

    anime,
    setAnime,
    loading,
    setLoading,

    dark,
    setDark,

    results,
    setResults,

    queriedAnime,
    searchCommitted,
    setSearchCommitted,

    openPopup,
    setOpenPopup,
    selectedAnime,
    setSelectedAnime,

    page,
    setPage,

    userAnime,
    setUserAnime,

    fullResults,
     setFullResults
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
