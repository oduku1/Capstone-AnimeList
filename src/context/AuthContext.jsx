import { createContext, useState, useEffect, useRef } from "react";
import getData from "../api_fetching/jikan";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fullResults, setFullResults] = useState(null);

  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userAnime, setUserAnime] = useState([]);

  const [results, setResults] = useState([]);
  const queriedAnime = useRef([]);

  const [searchCommitted, setSearchCommitted] = useState(false);

  const [dark, setDark] = useState(localStorage.getItem("theme") || "light");
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [page, setPage] = useState(1);

  // ✅ AUTO LOGIN USING JWT TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return;
      }

      setUser({ username: decoded.username, id: decoded.id });
      setLoggedIn(true);

    } catch (err) {
      console.error("Invalid or corrupted token");
      localStorage.removeItem("token");
    }
  }, []);

  // 🔥 Logout function usable anywhere
  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
    navigate("/login"); 
  }

  // Fetch Top Trending Anime (supports pagination)
  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      const data = await getData(page);
      setAnime(data);
      setLoading(false);
    }
    fetchTopAnime();
  }, [page]);

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

    logout,

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