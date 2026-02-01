import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../components/PageHeader.css';
import './ResourceDetail.css';

const resourcesData = {
    'digital-transformation-playbook': {
        id: 'digital-transformation-playbook',
        type: 'Whitepaper',
        title: 'Digital Transformation Playbook 2024',
        description: 'A comprehensive guide to navigating digital change in your organization.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
        downloadUrl: '#',
        sections: [
            {
                title: 'What You\'ll Learn',
                content: 'This playbook covers the essential frameworks, tools, and strategies needed to successfully transform your business for the digital age.'
            },
            {
                title: 'Key Topics',
                list: [
                    'Digital maturity assessment frameworks',
                    'Technology selection criteria',
                    'Change management best practices',
                    'Implementation roadmap templates',
                    'Measuring ROI of digital initiatives'
                ]
            },
            {
                title: 'Who Should Read This',
                content: 'This resource is designed for executives, IT leaders, and business strategists looking to drive digital transformation in their organizations.'
            }
        ]
    },
    'techventures-case-study': {
        id: 'techventures-case-study',
        type: 'Case Study',
        title: 'How We Helped TechVentures Scale',
        description: 'A detailed look at how strategic consulting led to 150% revenue growth.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
        downloadUrl: '#',
        sections: [
            {
                title: 'The Challenge',
                content: 'TechVentures, a fast-growing B2B SaaS company, was struggling to scale their operations while maintaining their culture and customer satisfaction levels.'
            },
            {
                title: 'Our Approach',
                list: [
                    'Comprehensive operations assessment',
                    'Scalable process design',
                    'Technology stack optimization',
                    'Leadership development program',
                    'Customer success transformation'
                ]
            },
            {
                title: 'The Results',
                content: '150% revenue growth within 18 months, 40% improvement in operational efficiency, and a significant boost in customer retention rates.'
            }
        ]
    }
};

// Default resource for IDs not in the data
const defaultResource = (id) => ({
    id,
    type: 'Resource',
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'This resource provides valuable insights for your business.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop',
    downloadUrl: '#',
    sections: [
        {
            title: 'Overview',
            content: 'This resource is being finalized. Check back soon for the complete content, or contact us to discuss your specific needs.'
        }
    ]
});

function ResourceDetail() {
    const { id } = useParams();
    const resource = resourcesData[id] || defaultResource(id);
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
                    <h1 className="page-header__title">{resource.title}</h1>
                </div>
            </div>

            {/* Image */}
            <div className="resource-detail__image">
                <img src={resource.image} alt={resource.title} />
            </div>

            {/* Content */}
            <section className="resource-detail__content page-section">
                <div className="container">
                    <div className="resource-detail__sections">
                        {resource.sections.map((section, index) => (
                            <div key={index} className="resource-detail__section">
                                <h2>{section.title}</h2>
                                {section.content && <p>{section.content}</p>}
                                {section.list && (
                                    <ul>
                                        {section.list.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="resource-detail__footer">
                        <Link to="/#contact" className="btn-corner">
                            <span>GET IN TOUCH</span>
                            <span className="corner-bl"></span>
                            <span className="corner-br"></span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResourceDetail;
