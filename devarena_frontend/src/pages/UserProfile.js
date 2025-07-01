import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../api";
import XPRings from "../widgets/XPRings";

/**
 * PUBLIC_INTERFACE
 * Avatar user profile – show cosmic stats, rank, badges from API.
 */
function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile()
      .then(data => {
        setProfile(data.user || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {loading ?
        <div>Loading astronaut stats...</div>
        : profile ?
          (<>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 18 }}>
              <span style={{
                fontSize: 42, borderRadius: "50%", padding: 12, background: "#18183c", boxShadow: "0 2px 9px #7402"
              }}>
                {profile.avatar_emoji || "🧑‍🚀"}
              </span>
              <div>
                <div style={{
                  fontWeight: 700, fontSize: 20, color: "#5ce3ff", marginBottom: 4
                }}>
                  {profile.username || profile.name || "?"}
                </div>
                <div style={{ fontSize: 15, color: "#ffc400" }}>
                  <XPRings value={profile.xp || 0} max={profile.max_xp || 500} size={54} color="#ffc400" />
                </div>
                <div style={{
                  fontSize: 15, color: "#bdeaff", marginTop: 5
                }}>
                  Rank: <b>#{profile.rank ?? "?"}</b>
                </div>
                <div style={{ marginTop: 6 }}>
                  {profile.badges?.map((b, i) =>
                    <span key={i} style={{
                      background: "rgba(255,227,110,0.09)",
                      color: "#ffe300", marginRight: 8,
                      padding: "0.16em 0.58em", borderRadius: 13, fontSize: 14
                    }}>{b}</span>
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 29 }}>
              <h4 style={{ margin: "1em 0 0.4em" }}>Recent History</h4>
              {(profile.history && profile.history.length > 0)
                ? <ul>{profile.history.map((h, i) =>
                    <li key={i} style={{ color: "#aef" }}>{h}</li>
                  )}</ul>
                : <div style={{ color: "#8090c4" }}>No activity yet!</div>
              }
            </div>
          </>)
          : <div style={{ color: "#aaa" }}>No user info found.</div>
      }
    </div>
  );
}
export default UserProfile;
