import { createContext, useState, useEffect, useRef } from "react";
import getData from "../api_fetching/jikan";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }
      return { username: decoded.username, id: decoded.id };
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const [fullResults, setFullResults] = useState(null);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const queriedAnime = useRef([]);
  const [searchCommitted, setSearchCommitted] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [page, setPage] = useState(1);

  const [dark, setDark] = useState(localStorage.getItem("theme") || "light");

  const [userAnime, setUserAnime] = useState(() => {
    const saved = localStorage.getItem("userAnime");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("userAnime", JSON.stringify(userAnime));
  }, [userAnime]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoggedIn(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setUser(null);
        setLoggedIn(false);
        return;
      }

      setUser({ username: decoded.username, id: decoded.id });
      setLoggedIn(true);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      setLoggedIn(false);
    }
  }, [localStorage.getItem("token")]); // 🔥 THIS is the fix that keeps UI in sync

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userAnime");
    setUser(null);
    setLoggedIn(false);
  }

  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      const data = await getData(page);
      setAnime(data);
      setLoading(false);
    }
    fetchTopAnime();
  }, [page]);

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
    setFullResults,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
