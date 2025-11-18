import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function NavBar({ onSearch }) {
  const { loggedIn, logout,user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        // <-- THIS removes token + resets user
    navigate("/");   // optional redirect
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
        {loggedIn && <Link to={`/list/${user.username}`}>My List</Link>}
      </div>

      <div className="nav-right">
        <DarkModeToggle/>
        <SearchBar onSearch={onSearch} />
        {loggedIn ? (
          <button onClick={handleLogout} className="login-btn">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="login-btn">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
