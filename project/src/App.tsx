import { Routes, Route } from 'react-router-dom';

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

function App() {
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
