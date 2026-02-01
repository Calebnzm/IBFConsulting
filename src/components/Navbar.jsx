import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { name: 'HOME', href: '/' },
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

  // Close mobile menu when navigating
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if link is active
  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={handleNavClick}>
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
                  onClick={handleNavClick}
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

