import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'SERVICES', href: '/#services' },
  { name: 'TESTIMONIALS', href: '/#reviews' },
  { name: 'RESOURCES', href: '/#resources' },
  { name: 'BLOG', href: '/#blog' },
  { name: 'TEAM', href: '/#team' },
  { name: 'CONTACT', href: '/#contact' }
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

  // Custom smooth scroll with configurable duration
  const smoothScrollTo = (targetPosition, duration = 1000) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Bell curve easing (ease-in-out): starts slow, speeds up in middle, slows at end
      // Using sine-based easing for smooth bell curve feel
      const easeInOutSine = -(Math.cos(Math.PI * progress) - 1) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutSine);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  // Handle smooth scroll for hash links and home
  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false);

    // Handle home link
    if (href === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        smoothScrollTo(0, 800);
      }
      return;
    }

    // Handle hash links
    if (href.includes('#')) {
      const [path, hash] = href.split('#');

      // If we're on the home page and the link is for a home section
      if ((path === '/' || path === '') && location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          smoothScrollTo(offsetPosition, 1200);
        }
      }
      // If we are on another page, let the Link component handle navigation
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          <span className="navbar__logo-text">PTConsulting</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="navbar__nav">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="navbar__link"
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
                  className="navbar__mobile-link"
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
