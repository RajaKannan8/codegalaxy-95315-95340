import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeContext";
import { DevArenaProvider } from "./state/DevArenaContext";
import SideNav from "./components/SideNav";
import TopBar from "./components/TopBar";
import ThemeSelector from "./components/ThemeSelector";
import GlassPanel from "./components/GlassPanel";
import Starfield from "./widgets/Starfield";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Leaderboard from "./pages/Leaderboard";
import Redeem from "./pages/Redeem";
import PRBoard from "./pages/PRBoard";
import RuleManager from "./pages/RuleManager";
import DisputeCenter from "./pages/DisputeCenter";
import UserProfile from "./pages/UserProfile";
import NotificationWidget from "./widgets/NotificationWidget";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Root App with layout, cosmic navigation, theme/contrast, and animated widgets.
 */
function App() {
  return (
    <ThemeProvider>
      <DevArenaProvider>
        <Router>
          <Starfield />
          <NotificationWidget />
          <div className="root-layout">
            <SideNav />
            <main className="main-content">
              <TopBar />
              <div className="content-area">
                <ThemeSelector />
                <GlassPanel>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/redeem" element={<Redeem />} />
                    <Route path="/prboard" element={<PRBoard />} />
                    <Route path="/rules" element={<RuleManager />} />
                    <Route path="/disputes" element={<DisputeCenter />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </GlassPanel>
              </div>
            </main>
          </div>
        </Router>
      </DevArenaProvider>
    </ThemeProvider>
  );
}
export default App;
