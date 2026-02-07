import { useState, useEffect } from 'react';
import { client, queries, urlFor } from '../lib/sanity';
import LoadingSpinner from './LoadingSpinner';
import './Team.css';

// Fallback data
const fallbackTeamMembers = [
    {
        _id: '1',
        name: 'Cuspers Obanda',
        role: 'FOUNDER & CEO',
        bio: '"I believe that every business has untapped potential waiting to be discovered. Our role is to illuminate the path to that potential and guide organizations toward strategic excellence."',
        image: null,
        isFeatured: true,
        social: {
            linkedin: 'https://linkedin.com/in/cuspers-obanda',
            twitter: 'https://twitter.com/cuspersobanda'
        }
    },
    {
        _id: '2',
        name: 'Wangari Kamau',
        role: 'SENIOR STRATEGY CONSULTANT',
        bio: '"Strategy is about making choices that create lasting competitive advantage."',
        image: null,
        social: {
            linkedin: 'https://linkedin.com/in/wangari-kamau',
            twitter: 'https://twitter.com/wangarikamau'
        }
    },
    {
        _id: '3',
        name: 'David Odhiambo',
        role: 'HEAD OF ANALYTICS',
        bio: '"Data tells a story. Our job is to translate it into actionable insights."',
        image: null,
        social: {
            linkedin: 'https://linkedin.com/in/david-odhiambo',
            twitter: 'https://twitter.com/davidodhiambo'
        }
    },
    {
        _id: '4',
        name: 'Fatuma Hassan',
        role: 'ORGANIZATIONAL DEVELOPMENT LEAD',
        bio: '"Leadership development is not just training—it\'s transformation."',
        image: null,
        social: {
            linkedin: 'https://linkedin.com/in/fatuma-hassan',
            twitter: 'https://twitter.com/fatumahassan'
        }
    },
    {
        _id: '5',
        name: 'James Mwangi',
        role: 'FINANCIAL STRATEGY DIRECTOR',
        bio: '"Creating sustainable value through smart resource allocation."',
        image: null,
        social: {
            linkedin: 'https://linkedin.com/in/james-mwangi',
            twitter: 'https://twitter.com/jamesmwangi'
        }
    },
    {
        _id: '6',
        name: 'Amina Osei',
        role: 'DIGITAL TRANSFORMATION LEAD',
        bio: '"Successful digital transformation puts humans at the center."',
        image: null,
        social: {
            linkedin: 'https://linkedin.com/in/amina-osei',
            twitter: 'https://twitter.com/aminaosei'
        }
    }
];

const defaultImages = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face'
];

function Team({ showHeader = true }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeamMembers() {
            try {
                const data = await client.fetch(queries.allTeamMembers);
                if (data && data.length > 0) {
                    setTeamMembers(data);
                } else {
                    setTeamMembers(fallbackTeamMembers);
                }
            } catch (error) {
                console.error('Error fetching team members:', error);
                setTeamMembers(fallbackTeamMembers);
            } finally {
                setLoading(false);
            }
        }
        fetchTeamMembers();
    }, []);

    // Separate CEO from other members
    const ceo = teamMembers.find(m => m.isFeatured) || teamMembers[0];
    const otherMembers = teamMembers.filter(m => m._id !== ceo?._id);

    const getImageUrl = (member, index) => {
        if (member.image) {
            // Display full image without cropping
            return urlFor(member.image).width(400).url();
        }
        return defaultImages[index % defaultImages.length];
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section id="team" className="team section">
            <div className="team__container container">
                {/* Top Row: Header + CEO */}
                <div className="team__top">
                    {/* Header - conditionally rendered */}
                    {showHeader && (
                        <div className="team__header">
                            <span className="section-label">Our Team</span>
                            <h2 className="team__title">
                                The People Behind<br />the Excellence
                            </h2>
                            <div className="team__description">
                                <p>
                                    Our team is made of strategists, analysts, and innovators who believe
                                    business transformation should feel effortless.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* CEO Featured Card */}
                    {ceo && (
                        <article className="team-card team-card--featured">
                            <div className="team-card__image team-card__image--full">
                                <img src={getImageUrl(ceo, 0)} alt={ceo.name} />
                            </div>
                            <div className="team-card__content">
                                <h3 className="team-card__name">{ceo.name}</h3>
                                <span className="team-card__role">{ceo.role}</span>
                                {ceo.bio && <blockquote className="team-card__bio">{ceo.bio}</blockquote>}
                                <div className="team-card__social">
                                    {ceo.social?.linkedin && (
                                        <a href={ceo.social.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                            LinkedIn
                                        </a>
                                    )}
                                    {ceo.social?.twitter && (
                                        <a href={ceo.social.twitter} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                            Twitter
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    )}
                </div>

                {/* All Team Members Grid */}
                {otherMembers.length > 0 && (
                    <div className="team__all-members">
                        <h3 className="team__section-title">Our Leadership Team</h3>
                        <div className="team__members-grid">
                            {otherMembers.map((member, idx) => (
                                <article key={member._id} className="team-card team-card--grid">
                                    <div className="team-card__image team-card__image--full">
                                        <img src={getImageUrl(member, idx + 1)} alt={member.name} />
                                    </div>
                                    <div className="team-card__content">
                                        <h3 className="team-card__name">{member.name}</h3>
                                        <span className="team-card__role">{member.role}</span>
                                        {member.bio && <p className="team-card__bio-text">{member.bio}</p>}
                                        <div className="team-card__social">
                                            {member.social?.linkedin && (
                                                <a href={member.social.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                                    LinkedIn
                                                </a>
                                            )}
                                            {member.social?.twitter && (
                                                <a href={member.social.twitter} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                                    Twitter
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Team;
