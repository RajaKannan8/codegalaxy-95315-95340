import React from "react";
import XPRings from "../widgets/XPRings";

/**
 * PUBLIC_INTERFACE
 * Asteroid belt leaderboard — gamified cosmic XP and badges.
 */
function Leaderboard() {
  const sampleLeaders = [
    { user: "astroJill", xp: 292 },
    { user: "cosmoSam", xp: 251 },
    { user: "orbitMax", xp: 232 }
  ];
  return (
    <div>
      <h2>Leaderboard</h2>
      <div style={{ display: "flex", gap: 34, marginTop: 24 }}>
        {sampleLeaders.map((x, i) =>
          <div key={x.user} style={{
            display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <XPRings value={x.xp} max={400} size={92} color="#ac5ae1" label="XP" />
            <div style={{
              color: "#d2adfa", fontWeight: 700, letterSpacing: 1, fontSize: 15, marginTop: 2
            }}>{x.user}</div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 22, fontSize: 15, color: "#bdeaff" }}>
        <span role="img" aria-label="asteroid belt">🪐</span> The top XP winners shine brightest in the cosmic race!
      </div>
    </div>
  );
}
export default Leaderboard;
