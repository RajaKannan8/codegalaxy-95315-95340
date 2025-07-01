import React from "react";

/**
 * PUBLIC_INTERFACE
 * Animated cosmic XP/level ring component for dashboard/gamification.
 * Props: value, max, size, color, label
 */
function XPRings({ value = 0, max = 100, size = 94, color = "#ffb300", label = "XP" }) {
  const p = Math.max(0, Math.min(1, value / max));
  const radius = size / 2 - 8;
  const dasharray = 2 * Math.PI * radius;
  const dashoffset = (1 - p) * dasharray;

  return (
    <div style={{ width: size, height: size, display: "inline-block", position: "relative" }}>
      <svg width={size} height={size}>
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none"
          stroke="#353353"
          strokeWidth="9"
        />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={dasharray}
          strokeDashoffset={dashoffset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(.17,.68,.6,1.1)"
          }}
        />
      </svg>
      <div style={{
        position: "absolute",
        top: "49%", left: "50%",
        transform: "translate(-50%, -49%)",
        color: color,
        fontSize: size * 0.22,
        fontWeight: 800,
        letterSpacing: 1
      }}>
        {label}<br />
        <span style={{ fontSize: size * 0.27 }}>
          {value}
        </span>
      </div>
    </div>
  );
}
export default XPRings;
