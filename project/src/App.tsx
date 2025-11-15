import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState('Home');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setCurrentPage('Admin');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home onNavigate={setCurrentPage} />;
      case 'About':
        return <About />;
      case 'Leadership':
        return <Leadership />;
      case 'Ministries':
        return <Ministries onNavigate={setCurrentPage} />;
      case 'Weekly Activities':
        return <WeeklyActivities />;
      case 'Events':
        return <Events />;
      case 'Gallery':
        return <Gallery />;
      case 'Social Media':
        return <SocialMedia />;
      case 'Contacts':
        return <Contacts />;
      case 'Affiliations':
        return <Affiliations />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
