import React from "react";
import "./TopBar.css";

// PUBLIC_INTERFACE
function TopBar({ onThemeToggle, theme }) {
  /** Top app bar with user area, status effects, and theme toggle. */
  return (
    <header className="top-bar">
      <div>
        <span className="top-bar__brand">DevArena</span>
      </div>
      <div className="top-bar__actions">
        <button className="theme-toggle-btn" onClick={onThemeToggle} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <span className="top-bar__user">
          <span role="img" aria-label="avatar">👨‍🚀</span>
        </span>
        <span className="top-bar__notify">
          <span role="img" aria-label="notifications">🔔</span>
        </span>
      </div>
    </header>
  );
}

export default TopBar;
