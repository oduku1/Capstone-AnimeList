import { createContext, useState, useEffect } from "react";
import getData from "../api_fetching/jikan";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch top anime on startup
  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      const data = await getData();
      setAnime(data);
      setLoading(false);
    }
    fetchTopAnime();
  }, []);

  const value = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
    anime,
    setAnime,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}