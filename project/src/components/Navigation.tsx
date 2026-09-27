import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home as HomeIcon,
  Info,
  Users,
  HeartHandshake,
  CalendarDays,
  Images,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  Facebook,
  Youtube,
  Music2,
} from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Leadership', path: '/leadership', icon: Users },
    { label: 'Ministries', path: '/ministries', icon: HeartHandshake },
    { label: 'Activities', path: '/activities', icon: CalendarDays },
    { label: 'Gallery', path: '/gallery', icon: Images },
    { label: 'Alumni', path: '/alumni', icon: GraduationCap },
    { label: 'Connect', path: '/connect', icon: MessageCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const closeMenu = () => setIsOpen(false);

  const handleJoinClick = () => {
    closeMenu();

    // If the registration modal is wired to the custom event in Home.tsx,
    // this opens it from anywhere in the site.
    if (location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('open-member-registration'));
      return;
    }

    navigate('/');
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-member-registration'));
    }, 100);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg'
            : 'bg-white shadow-sm'
        }`}
        style={{ borderBottom: '1px solid rgba(180, 113, 45, 0.18)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? 'h-16' : 'h-[76px]'
            }`}
          >
            {/* BRAND */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 flex-shrink-0 group"
              aria-label="MUKCCU Home"
            >
              <img
                src="/images/MUKCCU LOGO.jpg"
                alt="MUKCCU Logo"
                className={`rounded-full object-cover ring-2 ring-[#b4712d]/20 transition-all duration-300 ${
                  scrolled ? 'h-11 w-11' : 'h-12 w-12'
                }`}
              />

              <div className="leading-tight">
                <div
                  className="font-extrabold tracking-tight transition-all duration-300"
                  style={{ color: '#2e3e87' }}
                >
                  MUKCCU
                </div>
                <div
                  className={`font-medium transition-all duration-300 ${
                    scrolled ? 'text-[10px]' : 'text-[11px]'
                  }`}
                  style={{ color: '#b4712d' }}
                >
                  Pursuing Righteousness
                </div>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden xl:flex items-center">
              <div className="flex items-center gap-1">
                {navItems.map(({ label, path }) => {
                  const active = isActive(path);

                  return (
                    <Link
                      key={path}
                      to={path}
                      className="relative px-3 py-2 text-sm font-semibold transition-colors duration-200 group"
                      style={{
                        color: active ? '#2e3e87' : '#4b5563',
                      }}
                    >
                      <span className="group-hover:text-[#b4712d] transition-colors">
                        {label}
                      </span>

                      <span
                        className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full transition-all duration-300 ${
                          active
                            ? 'opacity-100 scale-x-100'
                            : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                        }`}
                        style={{ backgroundColor: '#b4712d' }}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* JOIN CTA */}
              <button
                type="button"
                onClick={handleJoinClick}
                className="ml-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#b4712d] focus:ring-offset-2"
                style={{ backgroundColor: '#b4712d' }}
              >
                Join the CU
                <ArrowRight size={16} />
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="xl:hidden relative p-2.5 rounded-xl text-[#2e3e87] hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              <Menu
                size={25}
                className={`transition-all duration-300 ${
                  isOpen
                    ? 'opacity-0 rotate-90 scale-75'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                size={25}
                className={`absolute inset-2.5 transition-all duration-300 ${
                  isOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[90] xl:hidden transition-all duration-300 ${
          isOpen
            ? 'pointer-events-auto visible'
            : 'pointer-events-none invisible'
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMenu}
          className={`absolute inset-0 w-full h-full bg-[#101735]/70 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[min(88vw,390px)] bg-[#101735] text-white shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Mobile brand header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <img
                  src="/images/MUKCCU LOGO.jpg"
                  alt="MUKCCU Logo"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#b4712d]/40"
                />
                <div>
                  <div className="font-extrabold text-lg">MUKCCU</div>
                  <div className="text-xs text-[#b4712d] font-semibold">
                    Pursuing Holiness
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu */}
            <div className="px-4 pt-7">
              <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#b4712d]">
                Explore MUKCCU
              </p>

              <div className="space-y-1">
                {navItems.map(({ label, path, icon: Icon }) => {
                  const active = isActive(path);

                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={closeMenu}
                      className={`flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 ${
                        active
                          ? 'bg-white text-[#2e3e87] shadow-lg'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          active ? 'bg-[#2e3e87]/10' : 'bg-white/5'
                        }`}
                      >
                        <Icon
                          size={19}
                          style={{ color: active ? '#2e3e87' : '#b4712d' }}
                        />
                      </span>

                      <span className="flex-1 font-semibold">{label}</span>

                      {active && (
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: '#b4712d' }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <button
                type="button"
                onClick={handleJoinClick}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: '#b4712d' }}
              >
                Join the CU
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Social footer */}
            <div className="mt-auto px-5 py-6">
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs font-semibold text-white/50 mb-3">
                  Stay connected
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com/profile.php?id=100064050612790"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MUKCCU on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Facebook size={18} />
                  </a>

                  <a
                    href="https://youtube.com/@masenouniversitycitycamp2013"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MUKCCU on YouTube"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Youtube size={18} />
                  </a>

                  <a
                    href="https://vm.tiktok.com/ZMhVnv9Pb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MUKCCU on TikTok"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Music2 size={18} />
                  </a>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-white/40">
                  Maseno University City Campus Christian Union
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prevent page content from sliding underneath the fixed navbar */}
      <div className="h-[76px] xl:h-[76px]" aria-hidden="true" />
    </>
  );
}
