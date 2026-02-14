import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';

const valuePropositions = [
    'Tailored insurance consulting for diverse markets',
    'Cross-cultural business strategy expertise',
    'Bilingual (French/English) advisory services',
    'Risk assessment and mitigation frameworks',
    'Regulatory compliance across jurisdictions',
];

const winningStrategies = [
    'Data-driven market analysis and insights',
    'Strategic partnerships and alliance building',
    'Innovative digital transformation roadmaps',
    'Client-centric service delivery models',
    'Continuous improvement and agile adaptation',
];

function Home() {
    return (
        <>
            <Hero />

            {/* About Us Section */}
            <section id="about" className="section home-about">
                <div className="container">
                    <div className="section-label">About Us</div>
                    <h2 className="home-about__title">
                        Who We Are
                    </h2>
                    <p className="home-about__text">
                        IBF Consulting is a premier advisory firm specializing in insurance, business strategy,
                        and French-market consulting. With decades of combined experience, our team bridges the gap
                        between North American and European business practices, delivering bespoke solutions that
                        drive measurable results for our clients worldwide.
                    </p>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="section home-mission">
                <div className="container">
                    <div className="section-label">Our Mission</div>
                    <h2 className="home-mission__title">
                        Empowering Businesses Through Strategic Excellence
                    </h2>
                    <p className="home-mission__text">
                        Our mission is to empower organizations to navigate complex regulatory landscapes,
                        optimize their operations, and unlock new growth opportunities. We combine deep industry
                        knowledge with innovative methodologies to deliver transformative outcomes for every client we serve.
                    </p>
                </div>
            </section>

            {/* Value Proposition & Winning Strategies */}
            <section className="section home-dual">
                <div className="container">
                    <div className="home-dual__grid">
                        {/* Value Proposition */}
                        <div className="home-dual__card">
                            <div className="section-label">Our Approach</div>
                            <h3 className="home-dual__heading">Our Value Proposition</h3>
                            <div className="home-dual__content">
                                <div className="home-dual__image-block">
                                    <div className="home-dual__image-placeholder">
                                        <span className="home-dual__image-icon">&#9672;</span>
                                    </div>
                                </div>
                                <ul className="home-dual__list">
                                    {valuePropositions.map((item, i) => (
                                        <li key={i} className="home-dual__list-item">
                                            <span className="home-dual__bullet"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Winning Strategies */}
                        <div className="home-dual__card">
                            <div className="section-label">Our Strengths</div>
                            <h3 className="home-dual__heading">Our Winning Strategies</h3>
                            <div className="home-dual__content">
                                <div className="home-dual__image-block">
                                    <div className="home-dual__image-placeholder">
                                        <span className="home-dual__image-icon">&#9672;</span>
                                    </div>
                                </div>
                                <ul className="home-dual__list">
                                    {winningStrategies.map((item, i) => (
                                        <li key={i} className="home-dual__list-item">
                                            <span className="home-dual__bullet"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="home-dual__cta">
                        <Link to="/services" className="btn-solid">
                            EXPLORE OUR SERVICES
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
