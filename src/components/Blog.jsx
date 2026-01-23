import { Link } from 'react-router-dom';
import './Blog.css';

const posts = [
    {
        id: 'sustainable-growth-strategies',
        category: 'Strategy',
        date: 'Jan 15, 2024',
        title: '5 Strategies for Sustainable Business Growth',
        author: 'Sarah Mitchell',
    },
    {
        id: 'ai-powered-analytics',
        category: 'Technology',
        date: 'Jan 10, 2024',
        title: 'AI-Powered Analytics: The Future of Business Intelligence',
        author: 'Michael Chen',
    },
    {
        id: 'remote-team-building',
        category: 'Leadership',
        date: 'Jan 5, 2024',
        title: 'Building High-Performance Teams in Remote Environments',
        author: 'Emily Rodriguez',
    },
];

function Blog() {
    return (
        <section id="blog" className="blog section">
            <div className="blog__container container">
                {/* Header */}
                <div className="blog__header">
                    <div className="blog__header-left">
                        <span className="section-label">Blog</span>
                        <h2 className="blog__title">Latest insights.</h2>
                    </div>
                    <Link to="/blog" className="blog__view-all btn-corner">
                        <span>ALL ARTICLES</span>
                        <span className="corner-bl"></span>
                        <span className="corner-br"></span>
                    </Link>
                </div>

                {/* Posts Grid */}
                <div className="blog__grid">
                    {posts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="post-card">
                            <div className="post-card__header">
                                <span className="post-card__category">{post.category}</span>
                                <span className="post-card__date">{post.date}</span>
                            </div>
                            <h3 className="post-card__title">{post.title}</h3>
                            <div className="post-card__footer">
                                <span className="post-card__author">{post.author}</span>
                                <span className="post-card__arrow">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Blog;
