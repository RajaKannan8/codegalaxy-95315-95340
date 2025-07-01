import React from "react";

/**
 * PUBLIC_INTERFACE
 * Redeem rewards center – cosmic reward micro-interactions and reward selection.
 */
function Redeem() {
  const rewards = [
    { label: "Limited Edition Sticker", icon: "🛰️" },
    { label: "Cosmic T-shirt", icon: "👕" },
    { label: "Discord VIP Role", icon: "🔮" }
  ];
  return (
    <div>
      <h2>Redeem Center</h2>
      <div style={{
        display: "flex", gap: 36, marginTop: 23, flexWrap: "wrap"
      }}>
        {rewards.map((r, i) =>
          <div key={r.label}
               style={{
                 background: "rgba(90,30,210,0.38)",
                 border: "1.8px solid #d2adfa",
                 borderRadius: "1em",
                 minWidth: 140,
                 padding: "1.1em 2em",
                 fontSize: 20,
                 color: "#fff",
                 boxShadow: "0 2px 15px #a38ded3b",
                 textAlign: "center"
               }}>
            <span
              role="img"
              aria-label={r.label}
              style={{ fontSize: 32, display: "block", marginBottom: 7 }}
            >{r.icon}</span>
            <div>{r.label}</div>
            <button style={{
              marginTop: 14,
              background: "linear-gradient(80deg,#ffb300 60%,#edc45c 100%)",
              color: "#181818",
              fontWeight: 700,
              padding: "0.48em 1.2em",
              borderRadius: 8,
              border: 0,
              cursor: "pointer",
              boxShadow: "0 1.5px 8px #ffb3002c"
            }}>Redeem</button>
          </div>
        )}
      </div>
      <div style={{ color: "#ffe682", marginTop: 36, fontWeight: 500 }}>
        Use your XP to unlock cosmic rewards!
      </div>
    </div>
  );
}
export default Redeem;
