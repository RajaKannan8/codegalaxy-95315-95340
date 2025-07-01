import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";

// PUBLIC_INTERFACE
function SideNav() {
  /** 3D Cosmic themed left side navigation bar. */
  return (
    <nav className="sidenav-3d">
      <div className="planet-nav">
        <NavLink to="/" end className="nav-planet" aria-label="Home">
          <span role="img" aria-label="planet">🪐</span>
        </NavLink>
        <NavLink to="/projects" className="nav-planet" aria-label="Projects">
          <span role="img" aria-label="rocket">🚀</span>
        </NavLink>
        <NavLink to="/leaderboard" className="nav-planet" aria-label="Leaderboard">
          <span role="img" aria-label="trophy">🏆</span>
        </NavLink>
        <NavLink to="/redeem" className="nav-planet" aria-label="Redeem">
          <span role="img" aria-label="star">🌟</span>
        </NavLink>
        <NavLink to="/prboard" className="nav-planet" aria-label="PR Board">
          <span role="img" aria-label="alien-code">👾</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default SideNav;
