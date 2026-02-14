import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, queries, urlFor, formatDate } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './BlogPost.css';

// Portable Text components for rendering rich content
const portableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            return (
                <img
                    src={urlFor(value).width(800).url()}
                    alt={value.alt || 'Blog image'}
                    className="blog-post__inline-image"
                />
            );
        },
    },
    block: {
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
};

function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await client.fetch(queries.blogPostBySlug(id));
                if (data) {
                    setPost(data);
                } else {
                    setPost(null);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    const getPostImageUrl = () => {
        if (post?.image?.asset) {
            return urlFor(post.image).width(1200).height(600).url();
        }
        return null;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!post) {
        return (
            <div className="page-wrapper">
                <div className="container">
                    <div className="service-detail__not-found">
                        <h1>Article not found</h1>
                        <Link to="/blog" className="btn-solid">Back to Blog</Link>
                    </div>
                </div>
            </div>
        );
    }

    const postImage = getPostImageUrl();
    const hasContent = post.content || post.htmlContent;

    return (
        <article className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <Link to="/blog" className="page-header__back">
                        <span className="page-header__back-arrow">&larr;</span>
                        Back
                    </Link>
                    <h1 className="page-header__title">{post.title}</h1>
                </div>
            </div>

            {/* Featured Image - only if available */}
            {postImage && (
                <div className="blog-post__image">
                    <img src={postImage} alt={post.title} />
                </div>
            )}

            {/* Meta info */}
            {(post.category || post.publishedDate || post.author?.name) && (
                <div className="blog-post__meta-bar">
                    <div className="container">
                        <div className="blog-post__meta-inner">
                            {post.category && (
                                <span className="blog-post__category-badge">{post.category}</span>
                            )}
                            {post.publishedDate && (
                                <span className="blog-post__date">{formatDate(post.publishedDate)}</span>
                            )}
                            {post.author?.name && (
                                <span className="blog-post__author-name">By {post.author.name}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <section className="blog-post__content page-section">
                <div className="container">
                    <div className="blog-post__body">
                        {post.content ? (
                            <PortableText value={post.content} components={portableTextComponents} />
                        ) : post.htmlContent ? (
                            <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
                        ) : (
                            <div className="no-content">
                                <p>This article is being prepared. Check back soon for the full content.</p>
                            </div>
                        )}
                    </div>

                    <div className="blog-post__footer">
                        <Link to="/blog" className="btn-corner">
                            <span>MORE ARTICLES</span>
                            <span className="corner-bl"></span>
                            <span className="corner-br"></span>
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}

export default BlogPost;
