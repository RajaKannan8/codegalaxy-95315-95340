import React, { useState, useEffect } from "react";
import { useDevArena } from "../state/DevArenaContext";
import XPRings from "../widgets/XPRings";
import { fetchBugs, fetchPRs, submitPR } from "../api";

/**
 * PUBLIC_INTERFACE
 * PR/Bug Board page – drag/drop, API integration, XP feedback, micro-interactions.
 */
function PRBoard() {
  const { xp, triggerLevelUp, setNotifications } = useDevArena();
  const [bugs, setBugs] = useState([]);
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // Load bugs and PRs from backend
    Promise.all([fetchBugs(), fetchPRs()])
      .then(([bugResp, prResp]) => {
        setBugs(bugResp.bugs || bugResp);
        setPRs(prResp.prs || prResp);
        setLoading(false);
      })
      .catch(() => {
        setErr("Failed to load bugs/PRs.");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  // Drag-drop animation micro-interaction (and backend PR-creation)
  const onDropToPR = async (bug) => {
    setBugs(curr => curr.filter(b => b.id !== bug.id));
    try {
      const prResult = await submitPR({
        title: bug.title,
        source_bug_id: bug.id,
        // Add extra fields as needed: project_id, description, reporter, etc.
      });
      setPRs(curr => [...curr, prResult.pr || {
        id: prResult.id || "pr-" + bug.id, title: bug.title, status: "review"
      }]);
      triggerLevelUp();
      if (setNotifications) setNotifications(n => [...n, "🎉 Bug resolved — new PR submitted!"]);
    } catch (e) {
      if (setNotifications) setNotifications(n => [...n, "Failed to promote bug to PR."]);
    }
  };

  return (
    <div>
      <h2>Pull Requests & Bugs</h2>
      {loading ? (
        <div>Loading cosmic board...</div>
      ) : err ? (
        <div style={{ color: "#ff7262" }}>{err}</div>
      ) : (
        <div style={{
          display: "flex", gap: "3vw", marginTop: 22, flexWrap: "wrap"
        }}>
          <section style={{ minWidth: 220 }}>
            <h4>Open Bugs</h4>
            <div style={{ minHeight: 90 }}>
              {bugs.length === 0 && <div style={{ color: "#bdeaff" }}>No bugs in the cosmic logs!</div>}
              {bugs.map(bug => (
                <div key={bug.id}
                     style={{
                       background: "rgba(60,16,90,0.54)",
                       padding: "1.2em 2em",
                       borderRadius: "1.1em",
                       marginBottom: 14,
                       color: "#f4f4f8",
                       backdropFilter: "blur(3px)",
                       cursor: "grab",
                       boxShadow: "0 2px 16px #812aff3c",
                       fontWeight: 500,
                       border: "1.4px solid #ac5ae1",
                       transition: "transform 0.2s"
                     }}
                     draggable
                     onDragStart={e => e.dataTransfer.setData("bugId", bug.id)}
                >
                  🐞 <span>{bug.title}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ minWidth: 220 }}>
            <h4>Pull Requests</h4>
            <div
              style={{
                minHeight: 90,
                border: "2.5px dashed #44e",
                borderRadius: "0.9em",
                padding: "0.7em 2em",
                marginBottom: 14,
                backdropFilter: "blur(4px)",
                background: "rgba(60,60,130,0.21)"
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                const bugId = e.dataTransfer.getData("bugId");
                const bug = bugs.find(b => b.id === bugId);
                if (bug) onDropToPR(bug);
              }}
            >
              {prs.length === 0 && <div style={{ color: "#ffb300", fontSize: 14, marginTop: 9 }}>
                Drag bugs here to convert to PRs!
              </div>}
              {prs.map(pr => (
                <div key={pr.id}
                    style={{
                      background: "rgba(95,55,240,0.60)",
                      padding: "1.05em 2em",
                      borderRadius: "0.94em",
                      marginBottom: 10,
                      color: "#fff",
                      boxShadow: "0 2px 13px #851aff53",
                      fontWeight: 500
                    }}
                >
                  🚀 <span>{pr.title}</span>
                </div>
              ))}
            </div>
          </section>

          <div style={{ minWidth: 160, alignSelf: "flex-start" }}>
            <div style={{ marginBottom: 13 }}>
              <XPRings value={xp} max={100} color="#ffb300" label="XP" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default PRBoard;
