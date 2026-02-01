import { useState, useEffect } from 'react';
import Contact from '../components/Contact';
import '../components/PageHeader.css';
import './ContactPage.css';

function ContactPage() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="page-wrapper">
            <div className={`page-header ${isScrolled ? 'page-header--scrolled' : ''}`}>
                <div className="container">
                    <h1 className="page-header__title">Get In Touch</h1>
                </div>
            </div>
            <div className="page-content">
                <Contact showHeader={false} />
            </div>
        </div>
    );
}

export default ContactPage;

