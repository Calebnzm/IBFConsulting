import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
    {
        id: 'strategy-consulting',
        title: 'Strategy Consulting',
        description: 'Develop winning strategies that drive growth and competitive advantage. We analyze markets, identify opportunities, and create actionable roadmaps for success.',
        features: ['Market Analysis', 'Growth Strategy', 'Competitive Positioning', 'Business Planning'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop'
    },
    {
        id: 'business-analytics',
        title: 'Business Analytics',
        description: 'Transform raw data into actionable insights that inform better decisions. Our analytics solutions help you understand performance and predict future trends.',
        features: ['Data Visualization', 'Predictive Analytics', 'KPI Dashboards', 'Performance Tracking'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'Navigate the digital landscape and leverage technology for innovation. We guide organizations through technological change with proven frameworks.',
        features: ['Technology Strategy', 'Digital Roadmap', 'Change Management', 'Process Automation'],
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop'
    },
    {
        id: 'operations-excellence',
        title: 'Operations Excellence',
        description: 'Optimize your operations for maximum efficiency and quality. We identify bottlenecks, streamline processes, and implement best practices.',
        features: ['Process Optimization', 'Lean Management', 'Quality Assurance', 'Cost Reduction'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
    }
];

function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextService = () => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
    };

    const prevService = () => {
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    return (
        <section id="services" className="services section">
            <div className="services__container container">
                {/* Header */}
                <div className="services__header">
                    <span className="section-label">Our Expertise</span>
                    <h2 className="services__title">
                        Strategic solutions for<br />modern enterprises.
                    </h2>
                </div>

                {/* Services Carousel */}
                <div className="services__carousel">
                    <button
                        className="services__nav services__nav--prev"
                        onClick={prevService}
                        aria-label="Previous service"
                    >
                        ←
                    </button>

                    <div className="services__track">
                        {services.map((service, index) => (
                            <article
                                key={service.id}
                                className={`service-card ${index === currentIndex ? 'service-card--active' : ''}`}
                                style={{
                                    transform: `translateX(${(index - currentIndex) * 100}%)`,
                                }}
                            >
                                <div className="service-card__image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-card__content">
                                    <span className="service-card__number">0{index + 1}</span>
                                    <h3 className="service-card__title">{service.title}</h3>
                                    <p className="service-card__description">{service.description}</p>
                                    <ul className="service-card__features">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="service-card__feature">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={`/services/${service.id}`} className="service-card__link btn-corner">
                                        <span>VIEW DETAILS</span>
                                        <span className="corner-bl"></span>
                                        <span className="corner-br"></span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <button
                        className="services__nav services__nav--next"
                        onClick={nextService}
                        aria-label="Next service"
                    >
                        →
                    </button>
                </div>

                {/* Dots */}
                <div className="services__dots">
                    {services.map((_, index) => (
                        <button
                            key={index}
                            className={`services__dot ${index === currentIndex ? 'services__dot--active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to service ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
