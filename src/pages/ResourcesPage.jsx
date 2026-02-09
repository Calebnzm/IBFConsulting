import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, queries, urlFor } from '../lib/sanity';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './ResourcesPage.css';

// Fallback resources removed


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
                    setResources([]);
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
                setResources([]);
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
                    <h1 className="page-header__title">Knowledge Hub: Explore our expert insights</h1>
                </div>
            </div>

            {/* Resources Grid */}
            <section className="resources-page__content page-content">
                <div className="container">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        resources.length > 0 ? (
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
                        ) : (
                            <div className="no-content">
                                <p>No resources available at the moment. Please check back later.</p>
                            </div>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}

export default ResourcesPage;
