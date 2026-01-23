import './Team.css';

const teamMembers = [
    {
        id: 1,
        name: 'Cuspers Obanda',
        role: 'FOUNDER & CEO',
        bio: '"I believe that every business has untapped potential waiting to be discovered. Our role is to illuminate the path to that potential and guide organizations toward strategic excellence."',
        image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd605?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/cuspers-obanda',
            twitter: 'https://twitter.com/cuspersobanda'
        }
    },
    {
        id: 2,
        name: 'Wangari Kamau',
        role: 'SENIOR STRATEGY CONSULTANT',
        bio: '"Strategy is about making choices. The best strategies come from deeply understanding your customers, your market, and your unique strengths."',
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
        bio: '"Data tells a story. Our job is to listen carefully, understand the narrative, and translate it into actionable insights that drive real business value."',
        image: 'https://images.unsplash.com/photo-1500361270739-16964b2a4289?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/david-odhiambo',
            twitter: 'https://twitter.com/davidodhiambo'
        }
    },
    {
        id: 4,
        name: 'Fatuma Hassan',
        role: 'ORGANIZATIONAL DEVELOPMENT LEAD',
        bio: '"The best organizations are built on a foundation of exceptional people. Leadership development is not just training—it\'s transformation."',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face',
        social: {
            linkedin: 'https://linkedin.com/in/fatuma-hassan',
            twitter: 'https://twitter.com/fatumahassan'
        }
    }
];

function Team() {
    return (
        <section id="team" className="team section">
            <div className="team__container container">
                <div className="team__grid">
                    {/* Header */}
                    <div className="team__header">
                        <span className="section-label">Our Team</span>
                        <h2 className="team__title">
                            The People Behind<br />the Excellence
                        </h2>
                        <div className="team__description">
                            <p>
                                Our team is made of strategists, analysts, and innovators who believe
                                business transformation should feel effortless. We combine deep expertise
                                in consulting with a passion for driving measurable results.
                            </p>
                            <p>
                                As trusted advisors to leading organizations, we help shape the future
                                of businesses across industries. Above all, we are united by curiosity,
                                precision, and the desire to create lasting impact.
                            </p>
                        </div>
                    </div>

                    {/* Team Cards */}
                    <div className="team__members">
                        {teamMembers.map((member) => (
                            <article key={member.id} className="team-card">
                                <div className="team-card__content">
                                    <h3 className="team-card__name">{member.name}</h3>
                                    <span className="team-card__role">{member.role}</span>
                                    <blockquote className="team-card__bio">{member.bio}</blockquote>
                                    <div className="team-card__social">
                                        <a href={member.social.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                            LinkedIn
                                        </a>
                                        <a href={member.social.twitter} className="team-card__social-link" target="_blank" rel="noopener noreferrer">
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                                <div className="team-card__image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;
