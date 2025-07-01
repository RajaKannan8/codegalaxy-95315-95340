import React, { createContext, useContext, useState, useEffect } from "react";

export const THEME_PRESETS = {
  galactic: {
    name: "Galactic Blue",
    root: {
      "--bg-primary": "#161a2a",
      "--bg-secondary": "#22264d",
      "--text-primary": "#fafdff",
      "--text-secondary": "#00eeee",
      "--border-color": "#3d5afe",
      "--button-bg": "#1a1a4a",
      "--button-text": "#fff"
    }
  },
  nebula: {
    name: "Nebula Purple",
    root: {
      "--bg-primary": "#2a1437",
      "--bg-secondary": "#521e74",
      "--text-primary": "#f5e6ff",
      "--text-secondary": "#d2adfa",
      "--border-color": "#ac5ae1",
      "--button-bg": "#731dd8",
      "--button-text": "#fff"
    }
  },
  highcontrast: {
    name: "High Contrast",
    root: {
      "--bg-primary": "#181818",
      "--bg-secondary": "#000",
      "--text-primary": "#fff",
      "--text-secondary": "#ffb300",
      "--border-color": "#ffc400",
      "--button-bg": "#ffb300",
      "--button-text": "#000"
    }
  }
};

const ThemeContext = createContext();
// PUBLIC_INTERFACE
export function useTheme() {
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState("galactic");
  useEffect(() => {
    // Set CSS variables for active theme preset
    const themeVars = THEME_PRESETS[themeKey]?.root || {};
    Object.entries(themeVars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
  }, [themeKey]);

  return (
    <ThemeContext.Provider value={{ themeKey, setThemeKey, themeName: THEME_PRESETS[themeKey].name }}>
      {children}
    </ThemeContext.Provider>
  );
}
