import React, { useEffect, useState } from "react";
import { fetchRewards, redeemReward } from "../api";
import { useDevArena } from "../state/DevArenaContext";

/**
 * PUBLIC_INTERFACE
 * Redeem rewards center – dynamic with real backend data.
 */
function Redeem() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeemStatus, setRedeemStatus] = useState({});
  const { setNotifications } = useDevArena();

  useEffect(() => {
    fetchRewards()
      .then(data => {
        setRewards(data.rewards || data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        if (setNotifications) setNotifications(n => [...n, "Failed to load rewards!"]);
      });
    // eslint-disable-next-line
  }, []);

  const doRedeem = async (rtype) => {
    setRedeemStatus(rs => ({ ...rs, [rtype]: "pending" }));
    try {
      const resp = await redeemReward(rtype);
      setRedeemStatus(rs => ({ ...rs, [rtype]: "done" }));
      if (setNotifications) setNotifications(n => [...n, "Reward redeemed!"]);
    } catch {
      setRedeemStatus(rs => ({ ...rs, [rtype]: "fail" }));
      if (setNotifications) setNotifications(n => [...n, "Failed to redeem reward. Try again later."]);
    }
  };

  // Fallback if no backend: use default rewards
  const displayRewards = rewards.length
    ? rewards
    : [
        { label: "Limited Edition Sticker", icon: "🛰️", type: "sticker" },
        { label: "Cosmic T-shirt", icon: "👕", type: "tshirt" },
        { label: "Discord VIP Role", icon: "🔮", type: "vip" }
    ];

  return (
    <div>
      <h2>Redeem Center</h2>
      {loading
        ? <div>Loading cosmic rewards...</div>
        : <div style={{
            display: "flex", gap: 36, marginTop: 23, flexWrap: "wrap"
          }}>
          {displayRewards.map((r, i) =>
            <div key={r.type || r.label}
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
                cursor: redeemStatus[r.type || r.label] === "done" ? "not-allowed" : "pointer",
                boxShadow: "0 1.5px 8px #ffb3002c",
                opacity: redeemStatus[r.type || r.label] === "done" ? 0.65 : 1
              }}
              disabled={redeemStatus[r.type || r.label] === "done"}
              onClick={() => doRedeem(r.type || r.label)}
              >
                {redeemStatus[r.type || r.label] === "pending"
                  ? "Redeeming..."
                  : redeemStatus[r.type || r.label] === "done"
                  ? "Redeemed!"
                  : "Redeem"
                }
              </button>
            </div>
          )}
        </div>
      }
      <div style={{ color: "#ffe682", marginTop: 36, fontWeight: 500 }}>
        Use your XP to unlock cosmic rewards!
      </div>
    </div>
  );
}
export default Redeem;
