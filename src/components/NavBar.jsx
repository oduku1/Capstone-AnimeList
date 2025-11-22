import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function NavBar({ onSearch }) {
  const { loggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/"), 0);
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/discover" className={({ isActive }) => isActive ? "active" : ""}>
          Discover
        </NavLink>

        {loggedIn && user && (
          <NavLink
            to={`/list/${user.username}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My List
          </NavLink>
        )}

        {loggedIn && user && (
          <NavLink
            to={`/profile/${user.username}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Profile
          </NavLink>
        )}
      </div>

      <div className="nav-right">
        <DarkModeToggle />
        <SearchBar onSearch={onSearch} />

        {loggedIn ? (
          <button onClick={handleLogout} className="login-btn">Logout</button>
        ) : (
          <button onClick={() => navigate("/login")} className="login-btn">Login</button>
        )}
      </div>
    </nav>
  );
}
