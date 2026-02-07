import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
    company: [
        { name: 'About', href: '/' },
        { name: 'Careers', href: '/contact' },
        { name: 'Contact', href: '/contact' },
    ],
    services: [
        { name: 'Strategy', href: '/services/strategy-consulting' },
        { name: 'Analytics', href: '/services/business-analytics' },
        { name: 'Digital', href: '/services/digital-transformation' },
    ],
    resources: [
        { name: 'Blog', href: '/blog' },
        { name: 'Resources', href: '/resources' },
        { name: 'Case Studies', href: '/testimonials' },
    ],
};

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container container">
                {/* Top */}
                <div className="footer__top">
                    <div className="footer__brand">
                        <span className="footer__logo-icon">◈</span>
                        <span className="footer__logo-text">IBFConsulting</span>
                    </div>

                    <div className="footer__links">
                        <div className="footer__column">
                            <h4 className="footer__column-title">Company</h4>
                            <ul className="footer__list">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="footer__link">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer__column">
                            <h4 className="footer__column-title">Services</h4>
                            <ul className="footer__list">
                                {footerLinks.services.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="footer__link">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer__column">
                            <h4 className="footer__column-title">Resources</h4>
                            <ul className="footer__list">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="footer__link">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} IBF Consulting. All rights reserved.
                    </p>
                    <div className="footer__social">
                        <a href="#" className="footer__social-link">LinkedIn</a>
                        <a href="#" className="footer__social-link">Twitter</a>
                        <a href="#" className="footer__social-link">Instagram</a>
                    </div>
                </div>

                {/* Watermark */}
                <div className="footer__watermark">
                    IBFConsulting
                </div>
            </div>
        </footer>
    );
}

export default Footer;
