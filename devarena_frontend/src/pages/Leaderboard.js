import React, { useEffect, useState } from "react";
import XPRings from "../widgets/XPRings";
import { fetchLeaderboard } from "../api";
import { useDevArena } from "../state/DevArenaContext";

/**
 * PUBLIC_INTERFACE
 * Asteroid belt leaderboard — ranked by live XP data.
 */
function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { levelUp } = useDevArena();

  useEffect(() => {
    fetchLeaderboard()
      .then(data => {
        setLeaders(data.leaderboard || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? (
        <div>Loading top pilots ...</div>
      ) : (
        <div style={{ display: "flex", gap: 34, marginTop: 24 }}>
          {leaders.length === 0
            ? <div style={{ color: "#ffe682" }}>No cosmic champions yet!</div>
            : leaders.slice(0, 12).map((x, i) =>
                <div key={x.id || x.user} style={{
                  display: "flex", flexDirection: "column", alignItems: "center"
                }}>
                  <XPRings value={x.xp} max={x.max_xp || 400} size={92}
                    color={i === 0 ? "#ffd54f" : "#ac5ae1"}
                    label={"XP"}
                  />
                  <div style={{
                    color: "#d2adfa", fontWeight: 700, letterSpacing: 1, fontSize: 15, marginTop: 2
                  }}>
                    {x.user || x.username}
                  </div>
                  {i === 0 && levelUp && (
                    <div style={{
                      background: "radial-gradient(circle,#fff9b0,#ffe40011 80%)",
                      color: "#ffb300", borderRadius: 8,
                      padding: "0.11em 1.1em", marginTop: 5, fontWeight: 700, fontSize: 16
                    }}>🚀 Level Up!</div>
                  )}
                </div>
              )
          }
        </div>
      )}
      <div style={{ marginTop: 22, fontSize: 15, color: "#bdeaff" }}>
        <span role="img" aria-label="asteroid belt">🪐</span> The top XP winners shine brightest in the cosmic race!
      </div>
    </div>
  );
}
export default Leaderboard;
