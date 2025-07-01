import React from "react";
import "./GlassPanel.css";

// PUBLIC_INTERFACE
function GlassPanel({ children }) {
  /** Glassmorphic content panel for main content. */
  return (
    <div className="glass-panel">
      {children}
    </div>
  );
}

export default GlassPanel;
