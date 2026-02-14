import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, queries, urlFor } from '../lib/sanity';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './ResourceDetail.css';

function ResourceDetail() {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResource() {
            try {
                const data = await client.fetch(queries.resourceBySlug(id));
                if (data) {
                    setResource(data);
                } else {
                    setResource(null);
                }
            } catch (error) {
                console.error('Error fetching resource:', error);
                setResource(null);
            } finally {
                setLoading(false);
            }
        }
        fetchResource();
    }, [id]);

    const getImageUrl = () => {
        if (resource?.image?.asset) {
            return urlFor(resource.image).width(1200).height(600).url();
        }
        return null;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!resource) {
        return (
            <div className="page-wrapper">
                <div className="container">
                    <div className="service-detail__not-found">
                        <h1>Resource not found</h1>
                        <Link to="/resources" className="btn-solid">Back to Resources</Link>
                    </div>
                </div>
            </div>
        );
    }

    const resourceImage = getImageUrl();
    const hasSections = resource.sections && resource.sections.length > 0;

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <Link to="/resources" className="page-header__back">
                        <span className="page-header__back-arrow">&larr;</span>
                        Back
                    </Link>
                    <h1 className="page-header__title">{resource.title}</h1>
                </div>
            </div>

            {/* Image - only if available */}
            {resourceImage && (
                <div className="resource-detail__image">
                    <img src={resourceImage} alt={resource.title} />
                </div>
            )}

            {/* Description bar */}
            {(resource.description || resource.type) && (
                <div className="resource-detail__meta-bar">
                    <div className="container">
                        <div className="resource-detail__meta-inner">
                            {resource.type && (
                                <span className="resource-detail__type-badge">{resource.type}</span>
                            )}
                            {resource.description && (
                                <p className="resource-detail__desc">{resource.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <section className="resource-detail__content page-section">
                <div className="container">
                    {hasSections ? (
                        <div className="resource-detail__sections">
                            {resource.sections.map((section, index) => (
                                <div key={index} className="resource-detail__section">
                                    {section.title && <h2>{section.title}</h2>}
                                    {section.content && <p>{section.content}</p>}
                                    {section.list && section.list.length > 0 && (
                                        <ul>
                                            {section.list.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-content">
                            <p>Content for this resource is being prepared. Please check back soon.</p>
                        </div>
                    )}

                    <div className="resource-detail__footer">
                        <Link to="/contact" className="btn-corner">
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
