import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, queries, urlFor, formatDate } from '../lib/sanity';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './BlogPage.css';

// Fallback posts removed


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
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setPosts([]);
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
                        posts.length > 0 ? (
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
                        ) : (
                            <div className="no-content">
                                <p>No articles available at the moment.</p>
                            </div>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}

export default BlogPage;
