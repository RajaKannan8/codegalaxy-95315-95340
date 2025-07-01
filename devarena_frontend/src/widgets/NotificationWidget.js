import React, { useEffect } from "react";
import { useDevArena } from "../state/DevArenaContext";

/**
 * PUBLIC_INTERFACE
 * Notification widget for cosmic micro-interactions, animations.
 */
function NotificationWidget() {
  const { notifications, setNotifications, levelUp } = useDevArena();

  // Dismiss notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(curr => curr.slice(1));
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);

  // Cosmic level-up flare micro-interaction
  return (
    <div style={{
      position: "fixed", top: 32, right: 34, zIndex: 2000, pointerEvents: "none"
    }}>
      {levelUp &&
        <div style={{
          background: "linear-gradient(120deg,#FFF18B 50%,#FFA800BB 100%)",
          borderRadius: "2em", padding: "1em 2.4em",
          marginBottom: 12, textAlign: "center", fontSize: 22,
          color: "#291b03", boxShadow: "0 6px 30px #ffd5497e, 0 1px 5px #0005",
          fontWeight: 700, letterSpacing: 1, transition: "opacity 0.7s"
        }}>
          ✨ Level Up! ✨
        </div>
      }
      {notifications.map((n, i) => (
        <div key={i} style={{
          background: "rgba(17,18,34,0.95)",
          border: "1.5px solid #ffb30084",
          borderRadius: "1em",
          color: "#fff",
          boxShadow: "0 2px 14px #1a09309c",
          padding: "0.75em 2.2em",
          marginBottom: "11px",
          fontSize: 16,
          fontWeight: 500,
          pointerEvents: "auto",
          transition: "opacity 0.28s"
        }}>
          {n}
        </div>
      ))}
    </div>
  );
}

export default NotificationWidget;
