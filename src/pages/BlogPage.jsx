import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, queries, urlFor, formatDate } from '../lib/sanity';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './BlogPage.css';

const fallbackPosts = [
    {
        slug: 'sustainable-growth-strategies',
        category: 'Strategy',
        publishedDate: '2024-01-15',
        title: '5 Strategies for Sustainable Business Growth',
        excerpt: 'Discover proven approaches to scale your business while maintaining operational excellence and company culture.',
        author: { name: 'Sarah Mitchell' },
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
        slug: 'ai-powered-analytics',
        category: 'Technology',
        publishedDate: '2024-01-10',
        title: 'AI-Powered Analytics: The Future of Business Intelligence',
        excerpt: 'How artificial intelligence is revolutionizing the way companies make data-driven decisions.',
        author: { name: 'Michael Chen' },
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
        slug: 'remote-team-building',
        category: 'Leadership',
        publishedDate: '2024-01-05',
        title: 'Building High-Performance Teams in Remote Environments',
        excerpt: 'Expert insights on fostering collaboration and productivity in distributed teams.',
        author: { name: 'Emily Rodriguez' },
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
    },
];

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await client.fetch(queries.allBlogPosts);
                if (data && data.length > 0) {
                    setPosts(data);
                } else {
                    setPosts(fallbackPosts);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setPosts(fallbackPosts);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const getImageUrl = (post) => {
        if (post.image?.asset) {
            return urlFor(post.image).width(600).height(400).url();
        }
        return post.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
    };

    const formatPostDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="page-wrapper">
            <div className="page-header page-header--no-back">
                <div className="container">
                    <h1 className="page-header__title">Insights & Articles</h1>
                </div>
            </div>

            {/* Posts Grid */}
            <section className="blog-page__content page-content">
                <div className="container">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="blog-page__grid">
                            {posts.map((post) => (
                                <Link key={post._id || post.slug} to={`/blog/${post.slug}`} className="blog-card">
                                    <div className="blog-card__image">
                                        <img src={getImageUrl(post)} alt={post.title} />
                                        <span className="blog-card__category">{post.category}</span>
                                    </div>
                                    <div className="blog-card__content">
                                        <div className="blog-card__meta">
                                            <span>{formatPostDate(post.publishedDate)}</span>
                                            {post.readTime && (
                                                <>
                                                    <span>•</span>
                                                    <span>{post.readTime}</span>
                                                </>
                                            )}
                                        </div>
                                        <h2 className="blog-card__title">{post.title}</h2>
                                        {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
                                        <div className="blog-card__author">
                                            <span>By {post.author?.name}</span>
                                            <span className="blog-card__arrow">→</span>
                                        </div>
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

export default BlogPage;
