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
    <nav
  className="bg-white shadow-md sticky top-0 z-50 border-b-2"
  style={{ borderColor: '#b4712d' }}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('Home')}>
            <img src="/MUKCCU LOGO.jpg" alt="MUKCCU Logo" className="h-16 w-16 rounded-full object-cover" />
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
  className="relative lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
>
  <Menu
    size={24}
    className={`transition-all duration-300 ${
      isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
    }`}
  />

  <X
    size={24}
    className={`absolute top-2 left-2 transition-all duration-300 ${
      isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
    }`}
  />
</button>
        </div>

        {isOpen && (
  <>
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
      onClick={() => setIsOpen(false)}
    />

    <div className="relative z-50 lg:hidden p-4 space-y-1 bg-white shadow-xl">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:translate-x-2 ${
                  currentPage === item
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={
  currentPage === item
    ? {
        backgroundColor: '#b4712d',
        fontWeight: '700'
      }
    : {}
}
              >
                {item}
              </button>
            ))}
    </div>
  </>
)}
      </div>
    </nav>
  );
}
