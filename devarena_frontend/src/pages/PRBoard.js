import React, { useState } from "react";
import { useDevArena } from "../state/DevArenaContext";
import XPRings from "../widgets/XPRings";

const dummyBugs = [
  { id: "b1", title: "UI bug in cosmic nav", status: "open" },
  { id: "b2", title: "XP ring not animated", status: "in progress" }
];

const dummyPRs = [
  { id: "pr1", title: "Add glass panel component", status: "review" }
];

/**
 * PUBLIC_INTERFACE
 * PR/Bug Board page – glassmorphic drag/drop cards with micro-interactions, XP/level display, animated.
 */
function PRBoard() {
  const { user, xp, triggerLevelUp } = useDevArena();
  const [bugs, setBugs] = useState(dummyBugs);
  const [prs, setPRs] = useState(dummyPRs);

  // Drag-drop animation micro-interaction
  const onDropToPR = (bug) => {
    setBugs(bugs => bugs.filter(b => b.id !== bug.id));
    setPRs(prs => [...prs, { id: "pr-" + bug.id, title: bug.title, status: "review" }]);
    triggerLevelUp();
  };

  return (
    <div>
      <h2>Pull Requests & Bugs</h2>
      <div style={{
        display: "flex", gap: "3vw", marginTop: 22, flexWrap: "wrap"
      }}>
        <section style={{ minWidth: 220 }}>
          <h4>Open Bugs</h4>
          <div style={{ minHeight: 90 }}>
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
            <div style={{ color: "#ffb300", fontSize: 14, marginTop: 9 }}>
              {prs.length === 0 && "Drag bugs here to convert to PRs!"}
            </div>
          </div>
        </section>

        <div style={{ minWidth: 160, alignSelf: "flex-start" }}>
          <div style={{ marginBottom: 13 }}>
            <XPRings value={xp} max={100} color="#ffb300" label="XP" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PRBoard;
