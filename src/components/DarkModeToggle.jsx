import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import moon from"../assets/moon.svg"
import sun from"../assets/sun.svg"

export default function DarkModeToggle() {
  // clearer naming for state setter
  const [dropdown, setDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const { dark, setDark } = useContext(AuthContext);

  // toggle when button clicked
  function handleButtonClick() {
    setDropdown(prev => !prev);
  }

  // handler for clicking a menu item: toggle dark and close
  function handleToggleDark() {
    setDark(prev => (prev === "dark" ? "light": "dark"));
    setDropdown(false);
  }

  // close dropdown on outside click or Esc
  useEffect(() => {
    if (!dropdown) return; // only attach listeners when open

    function handleDocumentClick(e) {
      // if click is outside wrapperRef, close
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setDropdown(false);
    }
    
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdown]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleButtonClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
        aria-label="Open dark mode menu"
        aria-expanded={dropdown}
      >
        {dark === "dark" ? 
        <img src={sun} alt="Sun icon" style={{ width: 30, height: 30 }}  /> :<img src={moon} alt="Sun icon" style={{ width: 30, height: 30 }}/>}
      </button>

      {dropdown && (
        <div
          role="menu"
          aria-label="Dark mode menu"
          style={{
            position: "absolute",
            right: 0,
            marginTop: 8,
            minWidth: 160,
            background: "#ffffff",
            color: "#000",
            borderRadius: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            padding: "8px 0",
            zIndex: 999,
          }}
        >
          {/* Example menu items */}
          <button
            role="menuitem"
            onClick={handleToggleDark}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {dark === "dark"? "Switch to Light" : "Switch to Dark"}
          </button>

        </div>
      )}
    </div>
  );
}
