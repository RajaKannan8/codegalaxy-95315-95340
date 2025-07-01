import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api";
import { useDevArena } from "../state/DevArenaContext";

// PUBLIC_INTERFACE
function Projects() {
  /**
   * Projects page – dynamic loading with cosmic stats.
   */
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setNotifications } = useDevArena();

  useEffect(() => {
    fetchProjects()
      .then(data => {
        setProjects(data.projects || data); // support different backend shape
        setLoading(false);
      })
      .catch(err => {
        setError("Failed loading projects.");
        if (setNotifications) setNotifications(n =>
          [...n, "Could not load projects — try again!"]
        );
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {loading ? (
        <div>Loading cosmic data...</div>
      ) : error ? (
        <div style={{ color: "#ff6f6f" }}>{error}</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30, marginTop: 18 }}>
          {projects.length === 0 && (
            <div>No projects yet.</div>
          )}
          {projects.map(proj => (
            <div key={proj.id} style={{
              background: "rgba(49,38,120,0.29)",
              border: "1.2px solid #3d5afe",
              borderRadius: 15,
              boxShadow: "0 2px 17px #192a841c",
              color: "#fff",
              minWidth: 230,
              marginBottom: 19,
              padding: "1.6em 2em"
            }}>
              <div style={{
                fontSize: 18, fontWeight: 700, color: "#00eeee", marginBottom: 4
              }}>
                <span role="img" aria-label="code planet">🪐</span> {proj.name}
              </div>
              <div style={{ color: "#bdeaff", fontSize: 15, marginBottom: 7 }}>{proj.description || "No description"}</div>
              <div style={{ fontSize: 14 }}>
                <b>Contributors:</b> {proj.contributors?.length ?? "?"}
              </div>
              <div style={{ fontSize: 14 }}>
                <b>Open PRs:</b> {proj.pr_count ?? 0} &nbsp; | &nbsp;
                <b>Bugs:</b> {proj.bug_count ?? 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Projects;
