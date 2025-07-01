import React from "react";
import "./TopBar.css";
import { useDevArena } from "../state/DevArenaContext";
import { useTheme } from "../theme/ThemeContext";

// PUBLIC_INTERFACE
function TopBar() {
  /** Top app bar, theme toggle and user/notify area, cosmic accent. */
  const { user } = useDevArena();
  const { themeKey, setThemeKey, themeName } = useTheme();

  // Toggle between available themes (galactic/nebulas/highcontrast cycle)
  const nextTheme = () => {
    const keys = ["galactic", "nebula", "highcontrast"];
    const idx = keys.indexOf(themeKey);
    setThemeKey(keys[(idx + 1) % keys.length]);
  };

  return (
    <header className="top-bar">
      <div>
        <span className="top-bar__brand">DevArena</span>
      </div>
      <div className="top-bar__actions">
        <button className="theme-toggle-btn" onClick={nextTheme} aria-label="Toggle theme">
          <span role="img" aria-label="theme">{themeKey === "galactic" ? "🪐" : themeKey === "nebula" ? "🛸" : "🌟"}</span>
          &nbsp;<span style={{ fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>{themeName}</span>
        </button>
        <span className="top-bar__user">
          <span role="img" aria-label="avatar" style={{ fontSize: 19 }}>
            {user?.avatar_emoji || "👨‍🚀"}
          </span>
        </span>
        <span className="top-bar__notify">
          <span role="img" aria-label="notifications">🔔</span>
        </span>
      </div>
    </header>
  );
}

export default TopBar;
