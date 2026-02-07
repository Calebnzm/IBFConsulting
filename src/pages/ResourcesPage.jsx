import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, queries, urlFor } from '../lib/sanity';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './ResourcesPage.css';

const fallbackResources = [
    {
        slug: 'digital-transformation-playbook',
        type: 'Whitepaper',
        title: 'Digital Transformation Playbook 2024',
        description: 'A comprehensive guide to navigating digital change in your organization, from strategy to implementation.',
        date: 'January 2024',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
        slug: 'techventures-case-study',
        type: 'Case Study',
        title: 'How We Helped TechVentures Scale',
        description: 'Learn how strategic consulting led to 150% revenue growth for a fast-growing technology company.',
        date: 'December 2023',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
        slug: 'future-of-work-report',
        type: 'Ebook',
        title: 'The Future of Work Report',
        description: 'Insights on workplace trends shaping the next decade, including remote work, AI, and employee experience.',
        date: 'November 2023',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop'
    },
    {
        slug: 'business-analytics-webinar',
        type: 'Webinar',
        title: 'Mastering Business Analytics',
        description: 'On-demand webinar on data-driven decision making and building an analytics-first culture.',
        date: 'October 2023',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop'
    },
];

function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResources() {
            try {
                const data = await client.fetch(queries.allResources);
                if (data && data.length > 0) {
                    setResources(data);
                } else {
                    setResources(fallbackResources);
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
                setResources(fallbackResources);
            } finally {
                setLoading(false);
            }
        }
        fetchResources();
    }, []);

    const getImageUrl = (resource) => {
        if (resource.image?.asset) {
            return urlFor(resource.image).width(600).height(400).url();
        }
        return resource.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
    };

    return (
        <div className="page-wrapper">
            <div className="page-header page-header--no-back">
                <div className="container">
                    <h1 className="page-header__title">Knowledge Hub</h1>
                </div>
            </div>

            {/* Resources Grid */}
            <section className="resources-page__content page-content">
                <div className="container">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="resources-page__grid">
                            {resources.map((resource) => (
                                <Link key={resource._id || resource.slug} to={`/resources/${resource.slug}`} className="resource-card">
                                    <div className="resource-card__image">
                                        <img src={getImageUrl(resource)} alt={resource.title} />
                                        <span className="resource-card__type">{resource.type}</span>
                                    </div>
                                    <div className="resource-card__content">
                                        <h2 className="resource-card__title">{resource.title}</h2>
                                        <p className="resource-card__description">{resource.description}</p>
                                        <span className="resource-card__link">
                                            View Resource <span>→</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ResourcesPage;
