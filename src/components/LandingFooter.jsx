import './LandingFooter.css';
import { Link } from 'react-router-dom';

function LandingFooter() {
    return (
        <footer className="landing-footer">
            <div className="landing-footer__main container">
                {/* Brand Column */}
                <div className="landing-footer__col landing-footer__brand">
                    <h4 className="landing-footer__title">IBF Consulting</h4>
                    <p className="landing-footer__text">
                        Brief Description<br />
                        of what the<br />
                        company does ◈
                    </p>
                </div>

                {/* Quick Links Column */}
                <div className="landing-footer__col landing-footer__links">
                    <h4 className="landing-footer__title">Quick Links</h4>
                    <ul className="landing-footer__list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div className="landing-footer__col landing-footer__contact">
                    <h4 className="landing-footer__title">Contact</h4>
                    <ul className="landing-footer__list">
                        <li>Email: info@ibfconsulting.com</li>
                        <li>Phone: +1 234 567 890</li>
                        <li>Website: www.ibfconsulting.com</li>
                    </ul>
                </div>
            </div>

            {/* Our Reach Section */}
            <div className="landing-footer__reach container">
                <h4 className="landing-footer__reach-title">Our Reach</h4>
                <p className="landing-footer__reach-list">
                    North America | South America | Europe | Asia | Africa | Middle East | Australia
                </p>
            </div>
        </footer>
    );
}

export default LandingFooter;
