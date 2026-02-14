import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
];

const regions = [
    'North America',
    'South America',
    'Europe',
    'Asia',
    'Africa',
    'Middle East',
    'Australia',
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container container">
                {/* Main Footer Content - 3 Columns */}
                <div className="footer__top">
                    {/* Column 1: Company Description */}
                    <div className="footer__company">
                        <div className="footer__brand">
                            <span className="footer__logo-icon">&#9672;</span>
                            <span className="footer__logo-text">IBF Consulting</span>
                        </div>
                        <p className="footer__description">
                            A premier advisory firm specializing in insurance, business strategy,
                            and French-market consulting. Bridging North American and European
                            business practices with bespoke solutions.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer__column">
                        <h4 className="footer__column-title">Quick Links</h4>
                        <ul className="footer__list">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="footer__link">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="footer__column">
                        <h4 className="footer__column-title">Contact</h4>
                        <ul className="footer__list footer__contact-list">
                            <li className="footer__contact-item">
                                <span className="footer__contact-label">Email:</span>
                                <a href="mailto:info@ibfconsulting.com" className="footer__link">
                                    info@ibfconsulting.com
                                </a>
                            </li>
                            <li className="footer__contact-item">
                                <span className="footer__contact-label">Phone:</span>
                                <a href="tel:+1234567890" className="footer__link">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="footer__contact-item">
                                <span className="footer__contact-label">Website:</span>
                                <span className="footer__link">ibfconsulting.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Our Reach Bar */}
                <div className="footer__reach">
                    <h4 className="footer__reach-title">Our Reach</h4>
                    <div className="footer__reach-regions">
                        {regions.map((region, i) => (
                            <span key={region} className="footer__reach-region">
                                {region}
                                {i < regions.length - 1 && (
                                    <span className="footer__reach-divider">|</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        &copy; {currentYear} IBF Consulting. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
