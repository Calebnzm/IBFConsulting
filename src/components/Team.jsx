import { useState } from 'react';
import './Team.css';

const teamMembers = [
    {
        id: 1,
        name: 'Cuspers Obanda',
        role: 'FOUNDER & CEO',
        bio: '"I believe that every business has untapped potential waiting to be discovered. Our role is to illuminate the path to that potential and guide organizations toward strategic excellence."',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/cuspers-obanda',
            twitter: 'https://twitter.com/cuspersobanda'
        }
    },
    {
        id: 2,
        name: 'Wangari Kamau',
        role: 'SENIOR STRATEGY CONSULTANT',
        bio: '"Strategy is about making choices that create lasting competitive advantage."',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/wangari-kamau',
            twitter: 'https://twitter.com/wangarikamau'
        }
    },
    {
        id: 3,
        name: 'David Odhiambo',
        role: 'HEAD OF ANALYTICS',
        bio: '"Data tells a story. Our job is to translate it into actionable insights."',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/david-odhiambo',
            twitter: 'https://twitter.com/davidodhiambo'
        }
    },
    {
        id: 4,
        name: 'Fatuma Hassan',
        role: 'ORGANIZATIONAL DEVELOPMENT LEAD',
        bio: '"Leadership development is not just training—it\'s transformation."',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/fatuma-hassan',
            twitter: 'https://twitter.com/fatumahassan'
        }
    },
    {
        id: 5,
        name: 'James Mwangi',
        role: 'FINANCIAL STRATEGY DIRECTOR',
        bio: '"Creating sustainable value through smart resource allocation."',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/james-mwangi',
            twitter: 'https://twitter.com/jamesmwangi'
        }
    },
    {
        id: 6,
        name: 'Amina Osei',
        role: 'DIGITAL TRANSFORMATION LEAD',
        bio: '"Successful digital transformation puts humans at the center."',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/amina-osei',
            twitter: 'https://twitter.com/aminaosei'
        }
    },
    {
        id: 7,
        name: 'Peter Njoroge',
        role: 'OPERATIONS CONSULTANT',
        bio: '"Streamlining processes to help companies achieve their full potential."',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/peter-njoroge',
            twitter: 'https://twitter.com/peternjoroge'
        }
    },
    {
        id: 8,
        name: 'Grace Atieno',
        role: 'MARKET RESEARCH ANALYST',
        bio: '"Data-driven insights unlock opportunities intuition cannot reveal."',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/grace-atieno',
            twitter: 'https://twitter.com/graceatieno'
        }
    }
];

function Team() {
    const [currentPage, setCurrentPage] = useState(0);

    // Separate CEO from other members
    const ceo = teamMembers[0];
    const otherMembers = teamMembers.slice(1);

    // Calculate pages (3 members per page)
    const membersPerPage = 3;
    const totalPages = Math.ceil(otherMembers.length / membersPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <section id="team" className="team section">
            <div className="team__container container">
                {/* Top Row: Header + CEO */}
                <div className="team__top">
                    {/* Header */}
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

                    {/* CEO Featured Card */}
                    <article className="team-card team-card--featured">
                        <div className="team-card__image">
                            <img src={ceo.image} alt={ceo.name} />
                        </div>
                        <div className="team-card__content">
                            <h3 className="team-card__name">{ceo.name}</h3>
                            <span className="team-card__role">{ceo.role}</span>
                            <blockquote className="team-card__bio">{ceo.bio}</blockquote>
                            <div className="team-card__social">
                                <a href={ceo.social.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                                <a href={ceo.social.twitter} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                    Twitter
                                </a>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Team Carousel */}
                <div className="team__carousel">
                    <div className="team__carousel-header">
                        <h3 className="team__carousel-title">Our Leadership Team</h3>
                        {totalPages > 1 && (
                            <div className="team__carousel-nav">
                                <button className="team__nav team__nav--prev" onClick={prevPage} aria-label="Previous">
                                    <span className="team__nav-arrow">←</span>
                                    <span className="team__nav-text">Prev</span>
                                </button>
                                <span className="team__carousel-indicator">{currentPage + 1} / {totalPages}</span>
                                <button className="team__nav team__nav--next" onClick={nextPage} aria-label="Next">
                                    <span className="team__nav-text">Next</span>
                                    <span className="team__nav-arrow">→</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="team__members-track">
                        {Array.from({ length: totalPages }, (_, pageIndex) => {
                            const pageMembers = otherMembers.slice(
                                pageIndex * membersPerPage,
                                (pageIndex + 1) * membersPerPage
                            );
                            return (
                                <div
                                    key={pageIndex}
                                    className={`team__members-page ${pageIndex === currentPage ? 'team__members-page--active' : ''}`}
                                    style={{
                                        transform: `translateX(${(pageIndex - currentPage) * 100}%)`,
                                    }}
                                >
                                    {pageMembers.map((member) => (
                                        <article key={member.id} className="team-card team-card--compact">
                                            <div className="team-card__image">
                                                <img src={member.image} alt={member.name} />
                                            </div>
                                            <div className="team-card__content">
                                                <h3 className="team-card__name">{member.name}</h3>
                                                <span className="team-card__role">{member.role}</span>
                                                <div className="team-card__social">
                                                    <a href={member.social.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                                        LinkedIn
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;
