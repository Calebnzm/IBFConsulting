import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/PageHeader.css';
import './ResourcesPage.css';

const resources = [
    {
        id: 'digital-transformation-playbook',
        type: 'Whitepaper',
        title: 'Digital Transformation Playbook 2024',
        description: 'A comprehensive guide to navigating digital change in your organization, from strategy to implementation.',
        date: 'January 2024',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
        id: 'techventures-case-study',
        type: 'Case Study',
        title: 'How We Helped TechVentures Scale',
        description: 'Learn how strategic consulting led to 150% revenue growth for a fast-growing technology company.',
        date: 'December 2023',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
        id: 'future-of-work-report',
        type: 'Ebook',
        title: 'The Future of Work Report',
        description: 'Insights on workplace trends shaping the next decade, including remote work, AI, and employee experience.',
        date: 'November 2023',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop'
    },
    {
        id: 'business-analytics-webinar',
        type: 'Webinar',
        title: 'Mastering Business Analytics',
        description: 'On-demand webinar on data-driven decision making and building an analytics-first culture.',
        date: 'October 2023',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop'
    },
    {
        id: 'operations-efficiency-guide',
        type: 'Guide',
        title: 'Operations Efficiency Guide',
        description: 'Practical strategies for streamlining operations and reducing costs without sacrificing quality.',
        date: 'September 2023',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
    },
    {
        id: 'leadership-toolkit',
        type: 'Toolkit',
        title: 'Leadership Development Toolkit',
        description: 'Templates, frameworks, and exercises for developing high-performing leaders at every level.',
        date: 'August 2023',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    }
];

function ResourcesPage() {
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
                    <h1 className="page-header__title">Knowledge Hub</h1>
                </div>
            </div>

            {/* Resources Grid */}
            <section className="resources-page__content page-content">
                <div className="container">
                    <div className="resources-page__grid">
                        {resources.map((resource) => (
                            <Link key={resource.id} to={`/resources/${resource.id}`} className="resource-card">
                                <div className="resource-card__image">
                                    <img src={resource.image} alt={resource.title} />
                                    <span className="resource-card__type">{resource.type}</span>
                                </div>
                                <div className="resource-card__content">
                                    <span className="resource-card__date">{resource.date}</span>
                                    <h2 className="resource-card__title">{resource.title}</h2>
                                    <p className="resource-card__description">{resource.description}</p>
                                    <span className="resource-card__link">
                                        View Resource <span>→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResourcesPage;

