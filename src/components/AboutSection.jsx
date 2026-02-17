import './AboutSection.css';

function AboutSection() {
    return (
        <section className="about-section container">
            <div className="about-section__box">
                <h1 className="about-section__tagline" style={{ color: 'var(--primary-deep)', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.1em', marginBottom: 'var(--space-lg)', textTransform: 'uppercase' }}>
                    INSURANCE | BUSINESS | FRENCH - CONSULTING
                </h1>
                <h2 className="about-section__title">About Us</h2>
                <p className="about-section__description">
                    We are a premier consulting firm dedicated to bridging the gap between insurance, business strategy, and French markets. Our expertise lies in delivering tailored solutions that drive growth and operational excellence.
                </p>
            </div>
        </section>
    );
}

export default AboutSection;
