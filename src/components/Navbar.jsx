import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { name: 'ABOUT', href: '/' },
  { name: 'SERVICES', href: '/services' },
  { name: 'TESTIMONIALS', href: '/testimonials' },
  { name: 'RESOURCES', href: '/resources' },
  { name: 'BLOG', href: '/blog' },
  { name: 'TEAM', href: '/team' },
  { name: 'CONTACT', href: '/contact' }
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  // Close mobile menu and handle hash navigation
  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.substring(2);
      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  // Check if link is active
  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={(e) => handleNavClick(e, '/')}>
          <span className="navbar__logo-icon">◈</span>
          <span className="navbar__logo-text">IBFConsulting</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="navbar__nav">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`navbar__link ${isActive(link.href) ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar__mobile-toggle ${isMobileMenuOpen ? 'navbar__mobile-toggle--active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          <ul className="navbar__mobile-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`navbar__mobile-link ${isActive(link.href) ? 'navbar__mobile-link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

