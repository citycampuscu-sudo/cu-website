import { Heart, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 py-8" style={{ backgroundColor: '#2e3e87' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#b4712d' }}>Contact Us</h3>
            <p className="text-sm mb-2">citycampusc.u@gmail.com</p>
            <p className="text-sm">Maseno University Kisumu Campus</p>
            <p className="text-sm">7th Floor, Kisumu City</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#b4712d' }}>Quick Links</h3>
            <div className="space-y-2 text-sm">
              <p>Sunday Service: 8:00 AM - 10:30 AM</p>
              <p>Bible Study: Tuesdays 8:00 PM - 9:00 PM</p>
              <p>Prayer & Fasting: Every Friday</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#b4712d' }}>Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/profile.php?id=100064050612790&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://youtube.com/@masenouniversitykisumucamp2013?si=58a9zMVbcGmLX98g"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://vm.tiktok.com/ZMhVnv9Pb/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-600 text-center text-sm text-white flex items-center justify-center gap-2">
          <span>Made with</span>
          <Heart size={16} fill="currentColor" style={{ color: '#b4712d' }} />
          <span>for MUKCCU © 2025</span>
        </div>
      </div>
    </footer>
  );
}
