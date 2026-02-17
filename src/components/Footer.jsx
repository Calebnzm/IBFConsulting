import { Link } from 'react-router-dom';
import './Footer.css';
import { useState, useEffect } from 'react';
import { client, queries } from '../lib/sanity';

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Resources', href: '/resources' },
    { name: 'Blog', href: '/blog' },
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
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const data = await client.fetch(queries.footer);
                setFooterData(data);
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };
        fetchFooter();
    }, []);

    // Defaults
    const description = footerData?.companyDescription || "A premier advisory firm specializing in insurance, business strategy, and French-market consulting. Bridging North American and European business practices with bespoke solutions.";
    const email = footerData?.email || "insurancebusinessfrench@gmail.com";
    const phone = footerData?.phone || "+254 706 262354";
    const website = footerData?.website || "ibfconsulting.org";
    const copyright = footerData?.copyrightText || `IBF Consulting. All rights reserved.`;

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
                            {description}
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
                                <a href={`mailto:${email}`} className="footer__link">
                                    {email}
                                </a>
                            </li>
                            <li className="footer__contact-item">
                                <span className="footer__contact-label">Phone:</span>
                                <a href={`tel:${phone}`} className="footer__link">
                                    {phone}
                                </a>
                            </li>
                            <li className="footer__contact-item">
                                <span className="footer__contact-label">Website:</span>
                                <span className="footer__link">{website}</span>
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
                        &copy; {currentYear} {copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
