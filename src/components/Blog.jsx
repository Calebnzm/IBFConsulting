import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, queries, formatDate } from '../lib/sanity';
import LoadingSpinner from './LoadingSpinner';
import './Blog.css';

// Fallback posts
// Fallback posts removed


function Blog() {
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

    const formatPostDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (!loading && (!posts || posts.length === 0)) {
        return null;
    }

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
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="blog__grid">
                        {posts.slice(0, 3).map((post) => (
                            <Link key={post._id || post.slug} to={`/blog/${post.slug}`} className="post-card">
                                <div className="post-card__header">
                                    <span className="post-card__category">{post.category}</span>
                                    <span className="post-card__date">{formatPostDate(post.publishedDate)}</span>
                                </div>
                                <h3 className="post-card__title">{post.title}</h3>
                                <div className="post-card__footer">
                                    <span className="post-card__author">{post.author?.name}</span>
                                    <span className="post-card__arrow">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Blog;
