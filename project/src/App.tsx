import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import Ministries from "./pages/Ministries";
import Activities from "./pages/Activities";
import Gallery from "./pages/Gallery";
import Connect from "./pages/Connect";
import AdminDashboard from "./pages/AdminDashboard";
import Alumni from "./pages/Alumni";
import MinistryDetails from "./pages/MinistryDetails";
import ChatAssistant from "./components/ChatAssistant";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyA") {
        e.preventDefault();
        navigate("/admin");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/ministries" element={<Ministries />} />

          <Route
            path="/ministries/:slug"
            element={<MinistryDetails />}
          />

          <Route path="/activities" element={<Activities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/alumni" element={<Alumni />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Legacy redirects */}
          <Route
            path="/weekly-activities"
            element={<Navigate to="/activities" replace />}
          />

          <Route
            path="/events"
            element={<Navigate to="/activities" replace />}
          />

          <Route
            path="/social-media"
            element={<Navigate to="/connect" replace />}
          />

          <Route
            path="/contacts"
            element={<Navigate to="/connect" replace />}
          />

          <Route
            path="/affiliations"
            element={<Navigate to="/about" replace />}
          />
        </Routes>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}

export default App;
