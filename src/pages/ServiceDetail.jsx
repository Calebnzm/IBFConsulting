import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../components/PageHeader.css';
import './ServiceDetail.css';

const servicesData = {
    'strategy-consulting': {
        id: 'strategy-consulting',
        title: 'Strategy Consulting',
        subtitle: 'Develop winning strategies that drive growth',
        description: 'Our strategy consulting practice helps organizations navigate complex business challenges and capitalize on emerging opportunities. We work alongside your leadership team to develop actionable strategies that drive sustainable growth.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
        details: [
            {
                title: 'Market Analysis',
                description: 'Deep-dive into your market landscape to identify opportunities, threats, and competitive positioning strategies.'
            },
            {
                title: 'Growth Strategy',
                description: 'Develop comprehensive growth roadmaps that align with your business objectives and market dynamics.'
            },
            {
                title: 'Competitive Positioning',
                description: 'Define your unique value proposition and create strategies to differentiate from competitors.'
            },
            {
                title: 'Business Planning',
                description: 'Create detailed business plans that translate strategy into actionable initiatives and measurable outcomes.'
            }
        ],
        process: [
            'Discovery & Assessment',
            'Market Research',
            'Strategy Development',
            'Implementation Planning',
            'Execution Support'
        ]
    },
    'business-analytics': {
        id: 'business-analytics',
        title: 'Business Analytics',
        subtitle: 'Transform data into actionable insights',
        description: 'Our analytics solutions help you harness the power of data to make better business decisions. We implement cutting-edge analytics frameworks that provide real-time insights into your business performance.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        details: [
            {
                title: 'Data Visualization',
                description: 'Create intuitive dashboards and reports that make complex data accessible to all stakeholders.'
            },
            {
                title: 'Predictive Analytics',
                description: 'Leverage machine learning and statistical models to forecast trends and anticipate market changes.'
            },
            {
                title: 'KPI Dashboards',
                description: 'Design and implement real-time dashboards that track your most critical performance indicators.'
            },
            {
                title: 'Performance Tracking',
                description: 'Monitor business performance against targets and identify areas for improvement.'
            }
        ],
        process: [
            'Data Assessment',
            'Requirements Gathering',
            'Solution Design',
            'Implementation',
            'Training & Support'
        ]
    },
    'digital-transformation': {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        subtitle: 'Navigate the digital landscape',
        description: 'We guide organizations through digital transformation journeys, helping them leverage technology to improve operations, enhance customer experiences, and create new business models.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
        details: [
            {
                title: 'Technology Strategy',
                description: 'Develop a comprehensive technology roadmap aligned with your business objectives.'
            },
            {
                title: 'Digital Roadmap',
                description: 'Create phased implementation plans that minimize disruption while maximizing value.'
            },
            {
                title: 'Change Management',
                description: 'Ensure successful adoption through effective change management and training programs.'
            },
            {
                title: 'Process Automation',
                description: 'Identify and implement automation opportunities to improve efficiency and reduce costs.'
            }
        ],
        process: [
            'Digital Maturity Assessment',
            'Vision & Strategy',
            'Technology Selection',
            'Pilot Programs',
            'Scale & Optimize'
        ]
    },
    'operations-excellence': {
        id: 'operations-excellence',
        title: 'Operations Excellence',
        subtitle: 'Optimize for maximum efficiency',
        description: 'Our operations consulting helps organizations streamline processes, reduce costs, and improve quality. We apply proven methodologies to transform your operations into a competitive advantage.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
        details: [
            {
                title: 'Process Optimization',
                description: 'Analyze and redesign processes to eliminate waste and improve efficiency.'
            },
            {
                title: 'Lean Management',
                description: 'Implement lean principles to create a culture of continuous improvement.'
            },
            {
                title: 'Quality Assurance',
                description: 'Establish quality management systems that ensure consistent delivery of excellence.'
            },
            {
                title: 'Cost Reduction',
                description: 'Identify and implement cost reduction initiatives without compromising quality.'
            }
        ],
        process: [
            'Operations Assessment',
            'Process Mapping',
            'Improvement Design',
            'Implementation',
            'Continuous Monitoring'
        ]
    }
};

function ServiceDetail() {
    const { id } = useParams();
    const service = servicesData[id];
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!service) {
        return (
            <div className="page-wrapper">
                <div className="container">
                    <div className="service-detail__not-found">
                        <h1>Service not found</h1>
                        <Link to="/services" className="btn-solid">Back to Services</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <div className={`page-header ${isScrolled ? 'page-header--scrolled' : ''}`}>
                <div className="container">
                    <Link to="/services" className="page-header__back">← Back to Services</Link>
                    <h1 className="page-header__title">{service.title}</h1>
                </div>
            </div>

            {/* Content */}
            <section className="service-detail__content page-section">
                <div className="container">
                    <div className="service-detail__grid">
                        <div className="service-detail__info">
                            <p className="service-detail__description">{service.description}</p>

                            <div className="service-detail__details">
                                {service.details.map((detail, index) => (
                                    <div key={index} className="service-detail__detail">
                                        <span className="service-detail__detail-number">0{index + 1}</span>
                                        <h3 className="service-detail__detail-title">{detail.title}</h3>
                                        <p className="service-detail__detail-desc">{detail.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="service-detail__sidebar">
                            <img src={service.image} alt={service.title} className="service-detail__image" />

                            <div className="service-detail__process">
                                <h4>Our Process</h4>
                                <ul>
                                    {service.process.map((step, index) => (
                                        <li key={index}>
                                            <span className="step-number">{index + 1}</span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to="/contact" className="btn-solid service-detail__cta">
                                GET STARTED
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServiceDetail;
