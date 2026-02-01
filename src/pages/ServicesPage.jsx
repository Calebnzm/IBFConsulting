import { useState, useEffect } from 'react';
import Services from '../components/Services';
import '../components/PageHeader.css';
import './ServicesPage.css';

function ServicesPage() {
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
                    <h1 className="page-header__title">Strategic solutions for modern enterprises.</h1>
                </div>
            </div>
            <div className="page-content">
                <Services showHeader={false} />
            </div>
        </div>
    );
}

export default ServicesPage;



