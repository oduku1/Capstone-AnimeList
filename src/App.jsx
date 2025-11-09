import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import AnimePage from "./pages/AnimePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Profile from "./pages/Profile.jsx";
import SingleAnime from "./pages/SingleAnime.jsx";
import { searchAnime } from "./api_fetching/jikan.js";

function App() {
  const { anime, setAnime, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSearch(query) {
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchAnime(query);
      setAnime(data);
      navigate("/discover");
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover anime={anime} loading={loading} />} />
        <Route path="/discover/:anime" element={<AnimePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:user" element={<Profile />} />
        <Route path="/anime/:anime" element={<SingleAnime />} />
      </Routes>
    </>
  );
}

export default App;