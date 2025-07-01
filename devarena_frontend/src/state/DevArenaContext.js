import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
export const DevArenaContext = createContext();

/** PUBLIC_INTERFACE
 * Global DevArena app state provider – manages user, notifications, XP, micro-interactions, drag-drop state.
 */
export function useDevArena() {
  return useContext(DevArenaContext);
}

// PUBLIC_INTERFACE
export function DevArenaProvider({ children }) {
  // App-wide state
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rules, setRules] = useState([]);
  const [xp, setXP] = useState(0); // Gamified XP
  const [draggedBug, setDraggedBug] = useState(null);

  // Cosmic micro-interactions/level-up
  const [levelUp, setLevelUp] = useState(false);
  function triggerLevelUp() {
    setLevelUp(true);
    setTimeout(() => setLevelUp(false), 2200);
  }

  return (
    <DevArenaContext.Provider value={{
      user, setUser,
      notifications, setNotifications,
      projects, setProjects,
      rules, setRules,
      xp, setXP,
      draggedBug, setDraggedBug,
      levelUp, triggerLevelUp
    }}>
      {children}
    </DevArenaContext.Provider>
  );
}
