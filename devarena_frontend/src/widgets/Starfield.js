import React from "react";
import "./Starfield.css";

// PUBLIC_INTERFACE
function Starfield() {
  /** Placeholder for cosmic/starfield animated background. */
  return (
    <div className="starfield-bg">
      {/* TODO: Replace this dummy stars with actual animated canvas/SVG/parallax */}
      {Array.from({ length: 42 }).map((_, i) =>
        <div key={i} className="star" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${2 + Math.random() * 4}s`
        }} />
      )}
    </div>
  );
}
export default Starfield;
