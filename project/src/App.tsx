import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Ministries from './pages/Ministries';
import WeeklyActivities from './pages/WeeklyActivities';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import SocialMedia from './pages/SocialMedia';
import Contacts from './pages/Contacts';
import Affiliations from './pages/Affiliations';
import AdminDashboard from './pages/AdminDashboard';
import Alumni from './pages/Alumni';
import ChatAssistant from "./components/ChatAssistant";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.ctrlKey &&
      e.shiftKey &&
      e.code === "KeyA"
    ) {
      e.preventDefault();
      navigate("/admin");
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, [navigate]);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/weekly-activities" element={<WeeklyActivities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/affiliations" element={<Affiliations />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/alumni" element={<Alumni />} />
        </Routes>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}

export default App;
