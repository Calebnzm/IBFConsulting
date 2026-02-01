import { useState, useEffect } from 'react';
import Reviews from '../components/Reviews';
import '../components/PageHeader.css';
import './ReviewsPage.css';

function ReviewsPage() {
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
                    <h1 className="page-header__title">Client Testimonials</h1>
                </div>
            </div>
            <div className="page-content">
                <Reviews showHeader={false} />
            </div>
        </div>
    );
}

export default ReviewsPage;

