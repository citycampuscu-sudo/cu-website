import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    'Home',
    'About',
    'Leadership',
    'Ministries',
    'Weekly Activities',
    'Events',
    'Gallery',
    'Social Media',
    'Contacts',
    'Affiliations',
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('Home')}>
            <img src="/MUKCCU LOGO.jpg" alt="MUKCCU Logo" className="h-14 w-14 rounded-full object-cover" />
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#2e3e87' }}>MUKCCU</h1>
              <p className="text-xs" style={{ color: '#b4712d' }}>Pursuing Holiness</p>
            </div>
          </div>

          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === item
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={currentPage === item ? { backgroundColor: '#2e3e87' } : {}}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === item
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={currentPage === item ? { backgroundColor: '#2e3e87' } : {}}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
