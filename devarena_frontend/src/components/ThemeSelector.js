import React from "react";
import { useTheme, THEME_PRESETS } from "../theme/ThemeContext";

// PUBLIC_INTERFACE
function ThemeSelector() {
  /** Dropdown selector for theme/contrast presets. */
  const { themeKey, setThemeKey } = useTheme();

  return (
    <div className="theme-selector">
      <select
        value={themeKey}
        onChange={e => setThemeKey(e.target.value)}
        aria-label="Theme preset"
      >
        {Object.keys(THEME_PRESETS).map(key => (
          <option key={key} value={key}>
            {THEME_PRESETS[key].name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSelector;
