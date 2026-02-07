import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, queries, urlFor } from '../lib/sanity';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './ResourceDetail.css';

// Fallback data
const fallbackResourcesData = {
    'digital-transformation-playbook': {
        slug: 'digital-transformation-playbook',
        type: 'Whitepaper',
        title: 'Digital Transformation Playbook 2024',
        description: 'A comprehensive guide to navigating digital change in your organization.',
        image: null,
        downloadUrl: '#',
        sections: [
            {
                title: "What You'll Learn",
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
        slug: 'techventures-case-study',
        type: 'Case Study',
        title: 'How We Helped TechVentures Scale',
        description: 'A detailed look at how strategic consulting led to 150% revenue growth.',
        image: null,
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

const defaultImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop';

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
                    setResource(fallbackResourcesData[id] || createDefaultResource(id));
                }
            } catch (error) {
                console.error('Error fetching resource:', error);
                setResource(fallbackResourcesData[id] || createDefaultResource(id));
            } finally {
                setLoading(false);
            }
        }
        fetchResource();
    }, [id]);

    const createDefaultResource = (slug) => ({
        slug,
        type: 'Resource',
        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: 'This resource provides valuable insights for your business.',
        image: null,
        downloadUrl: '#',
        sections: [
            {
                title: 'Overview',
                content: 'This resource is being finalized. Check back soon for the complete content.'
            }
        ]
    });

    const getImageUrl = () => {
        if (resource?.image) {
            return urlFor(resource.image).width(1200).height(600).url();
        }
        return defaultImage;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <Link to="/resources" className="page-header__back">
                        <span className="page-header__back-arrow">←</span>
                        Back
                    </Link>
                    <h1 className="page-header__title">{resource.title}</h1>
                </div>
            </div>

            {/* Image */}
            <div className="resource-detail__image">
                <img src={getImageUrl()} alt={resource.title} />
            </div>

            {/* Content */}
            <section className="resource-detail__content page-section">
                <div className="container">
                    <div className="resource-detail__sections">
                        {resource.sections?.map((section, index) => (
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
