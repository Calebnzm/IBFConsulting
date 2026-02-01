import { useState, useEffect } from 'react';
import Team from '../components/Team';
import '../components/PageHeader.css';
import './TeamPage.css';

function TeamPage() {
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
                    <h1 className="page-header__title">Meet Our Team</h1>
                </div>
            </div>
            <div className="page-content">
                <Team showHeader={false} />
            </div>
        </div>
    );
}

export default TeamPage;

