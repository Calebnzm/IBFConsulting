import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/PageHeader.css';
import './BlogPage.css';

const blogPosts = [
    {
        id: 'sustainable-growth-strategies',
        category: 'Strategy',
        date: 'Jan 15, 2024',
        title: '5 Strategies for Sustainable Business Growth',
        excerpt: 'Discover proven approaches to scale your business while maintaining operational excellence and company culture.',
        author: 'Sarah Mitchell',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
        id: 'ai-powered-analytics',
        category: 'Technology',
        date: 'Jan 10, 2024',
        title: 'AI-Powered Analytics: The Future of Business Intelligence',
        excerpt: 'How artificial intelligence is revolutionizing the way companies make data-driven decisions.',
        author: 'Michael Chen',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
        id: 'remote-team-building',
        category: 'Leadership',
        date: 'Jan 5, 2024',
        title: 'Building High-Performance Teams in Remote Environments',
        excerpt: 'Expert insights on fostering collaboration and productivity in distributed teams.',
        author: 'Emily Rodriguez',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
    },
    {
        id: 'digital-transformation-guide',
        category: 'Digital',
        date: 'Dec 28, 2023',
        title: 'The Complete Guide to Digital Transformation',
        excerpt: 'A step-by-step framework for modernizing your business operations and customer experiences.',
        author: 'David Thompson',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop'
    },
    {
        id: 'risk-management-strategies',
        category: 'Operations',
        date: 'Dec 20, 2023',
        title: 'Risk Management in Uncertain Times',
        excerpt: 'How to identify, assess, and mitigate business risks in a rapidly changing environment.',
        author: 'Amanda Foster',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
    },
    {
        id: 'leadership-development-trends',
        category: 'Leadership',
        date: 'Dec 15, 2023',
        title: 'Leadership Development Trends for 2024',
        excerpt: 'The skills and competencies that will define successful leaders in the coming years.',
        author: 'Sarah Mitchell',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    }
];

function BlogPage() {
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
                    <h1 className="page-header__title">Insights & Articles</h1>
                </div>
            </div>

            {/* Posts Grid */}
            <section className="blog-page__content page-content">
                <div className="container">
                    <div className="blog-page__grid">
                        {blogPosts.map((post) => (
                            <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
                                <div className="blog-card__image">
                                    <img src={post.image} alt={post.title} />
                                    <span className="blog-card__category">{post.category}</span>
                                </div>
                                <div className="blog-card__content">
                                    <div className="blog-card__meta">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="blog-card__title">{post.title}</h2>
                                    <p className="blog-card__excerpt">{post.excerpt}</p>
                                    <div className="blog-card__author">
                                        <span>By {post.author}</span>
                                        <span className="blog-card__arrow">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BlogPage;

