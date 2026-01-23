import { useState } from 'react';
import './Reviews.css';

const reviews = [
    {
        id: 1,
        name: 'Wanjiku Kimani',
        role: 'CEO',
        company: 'TechVentures Kenya',
        logo: 'TechVentures',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
        text: 'PT Consulting transformed our business strategy completely. Their insights helped us achieve 150% revenue growth in just 18 months. Truly exceptional partners.',
        project: {
            title: 'Strategic Growth Initiative',
            description: 'Complete business strategy overhaul including market analysis, competitive positioning, and operational optimization. The engagement spanned 18 months and resulted in significant revenue growth.',
            results: ['150% revenue growth', '40% operational efficiency improvement', 'Successful regional expansion']
        }
    },
    {
        id: 2,
        name: 'Ochieng Otieno',
        role: 'CFO',
        company: 'East Africa Logistics',
        logo: 'EAL',
        image: 'https://images.unsplash.com/photo-1507537362848-9c7e70b725c6?w=100&h=100&fit=crop&crop=face',
        text: 'The analytics team provided data-driven recommendations that saved us millions. Their attention to detail and strategic thinking is unmatched in the industry.',
        project: {
            title: 'Data Analytics Transformation',
            description: 'Implementation of comprehensive analytics framework including dashboard development, predictive modeling, and real-time reporting infrastructure.',
            results: ['KES 50M+ in cost savings', 'Real-time reporting implementation', 'Predictive accuracy of 94%']
        }
    },
    {
        id: 3,
        name: 'Amina Mohamed',
        role: 'Director of Operations',
        company: 'Nairobi Innovation Hub',
        logo: 'iHub',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
        text: 'Working with PT Consulting on our digital transformation was a game-changer. They understood our needs and delivered beyond expectations.',
        project: {
            title: 'Digital Transformation Program',
            description: 'End-to-end digital transformation including technology stack modernization, process automation, and change management.',
            results: ['50% reduction in manual processes', 'Cloud migration completed', 'New customer portal launched']
        }
    },
    {
        id: 4,
        name: 'Kamau Njoroge',
        role: 'Managing Partner',
        company: 'Savannah Capital',
        logo: 'Savannah',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
        text: 'Their risk management expertise protected our portfolio during volatile times. Highly recommend their strategic advisory services.',
        project: {
            title: 'Risk Management Framework',
            description: 'Development and implementation of comprehensive risk management framework for investment portfolio protection.',
            results: ['Risk exposure reduced by 35%', 'Portfolio protected during market volatility', 'New compliance processes established']
        }
    },
    {
        id: 5,
        name: 'Zainab Abdi',
        role: 'VP of Strategy',
        company: 'Coastal Solutions',
        logo: 'Coastal',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
        text: 'The leadership development program they designed for our executives was transformative. Our team is now more aligned and effective than ever.',
        project: {
            title: 'Leadership Excellence Program',
            description: 'Custom leadership development program for executive team including coaching, workshops, and ongoing support.',
            results: ['Executive alignment improved', 'Leadership effectiveness score +45%', 'Succession planning established']
        }
    }
];

const partnerCompanies = [
    'Safaricom', 'Equity Bank', 'KCB Group', 'EABL', 'Kenya Airways',
    'Britam', 'Centum', 'Co-operative Bank', 'Standard Media', 'Nation Media'
];

function Reviews() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const nextReview = () => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const openModal = (review) => {
        setSelectedReview(review);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedReview(null);
        document.body.style.overflow = 'auto';
    };

    // Duplicate for infinite scroll effect
    const carouselItems = [...partnerCompanies, ...partnerCompanies];

    return (
        <section id="reviews" className="reviews section">
            <div className="reviews__container container">
                {/* Header */}
                <div className="reviews__header">
                    <span className="section-label">Testimonials</span>
                    <h2 className="reviews__title">
                        Trusted by industry leaders.
                    </h2>
                </div>

                {/* Company Logos Carousel - Now integrated */}
                <div className="reviews__partners">
                    <div className="reviews__partners-track">
                        {carouselItems.map((company, index) => (
                            <div key={`${company}-${index}`} className="reviews__partner-logo">
                                <span>{company}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial Carousel */}
                <div className="reviews__carousel">
                    <button className="reviews__nav reviews__nav--prev" onClick={prevReview}>
                        ←
                    </button>

                    <div className="reviews__track">
                        {reviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`review-card ${index === activeIndex ? 'review-card--active' : ''}`}
                                style={{
                                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                                }}
                            >
                                <blockquote className="review-card__text">
                                    "{review.text}"
                                </blockquote>
                                <div className="review-card__author">
                                    <img src={review.image} alt={review.name} className="review-card__avatar" />
                                    <div className="review-card__info">
                                        <h4 className="review-card__name">{review.name}</h4>
                                        <p className="review-card__role">{review.role}, {review.company}</p>
                                    </div>
                                </div>
                                <button
                                    className="review-card__details btn-corner"
                                    onClick={() => openModal(review)}
                                >
                                    <span>READ CASE STUDY</span>
                                    <span className="corner-bl"></span>
                                    <span className="corner-br"></span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="reviews__nav reviews__nav--next" onClick={nextReview}>
                        →
                    </button>
                </div>

                {/* Dots */}
                <div className="reviews__dots">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            className={`reviews__dot ${index === activeIndex ? 'reviews__dot--active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedReview && (
                <div className="reviews__modal" onClick={closeModal}>
                    <div className="reviews__modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="reviews__modal-close" onClick={closeModal}>×</button>
                        <div className="reviews__modal-header">
                            <span className="section-label">Case Study</span>
                            <h3>{selectedReview.project.title}</h3>
                            <p className="reviews__modal-company">{selectedReview.company}</p>
                        </div>
                        <div className="reviews__modal-body">
                            <p>{selectedReview.project.description}</p>
                            <h4>Key Results</h4>
                            <ul>
                                {selectedReview.project.results.map((result, idx) => (
                                    <li key={idx}>{result}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="reviews__modal-footer">
                            <blockquote>"{selectedReview.text}"</blockquote>
                            <p className="reviews__modal-author">— {selectedReview.name}, {selectedReview.role}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Reviews;
