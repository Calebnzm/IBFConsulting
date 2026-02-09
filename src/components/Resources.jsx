import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, queries } from '../lib/sanity';
import LoadingSpinner from './LoadingSpinner';
import './Resources.css';

// Fallback resources
// Fallback resources removed


function Resources() {
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

    if (!loading && (!resources || resources.length === 0)) {
        return null;
    }

    return (
        <section id="resources" className="resources section">
            <div className="resources__container container">
                <div className="resources__grid">
                    {/* Header */}
                    <div className="resources__header">
                        <span className="section-label">Resources</span>
                        <h2 className="resources__title">
                            Insights &<br />Knowledge Hub: Explore our expert insights.
                        </h2>
                        <p className="resources__description">
                            Access our library of expert insights, research papers, and practical guides.
                        </p>
                    </div>

                    {/* List */}
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="resources__list">
                            {resources.map((resource, index) => (
                                <Link key={resource._id || resource.slug} to={`/resources/${resource.slug}`} className="resource-item">
                                    <div className="resource-item__left">
                                        <span className="resource-item__number">0{index + 1}</span>
                                        <span className="resource-item__type">{resource.type}</span>
                                    </div>
                                    <h3 className="resource-item__title">{resource.title}</h3>
                                    <div className="resource-item__right">
                                        <span className="resource-item__arrow">→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="resources__cta">
                    <Link to="/resources" className="btn-corner">
                        <span>VIEW ALL RESOURCES</span>
                        <span className="corner-bl"></span>
                        <span className="corner-br"></span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Resources;
