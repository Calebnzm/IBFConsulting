import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, queries, urlFor, formatDate } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../components/PageHeader.css';
import './BlogPost.css';

// Fallback data
const fallbackBlogPosts = {
    'sustainable-growth-strategies': {
        slug: 'sustainable-growth-strategies',
        category: 'Strategy',
        publishedDate: '2024-01-15',
        title: '5 Strategies for Sustainable Business Growth',
        author: {
            name: 'Sarah Mitchell',
            role: 'Senior Strategy Consultant',
            image: null
        },
        image: null,
        htmlContent: `
      <p>Sustainable business growth requires more than just increasing revenue. It demands a holistic approach that considers long-term viability, operational efficiency, and organizational culture.</p>
      
      <h2>1. Focus on Customer Retention</h2>
      <p>While acquiring new customers is important, retaining existing ones is often more cost-effective and leads to more sustainable growth.</p>
      
      <h2>2. Build Scalable Systems</h2>
      <p>Growth becomes unsustainable when your systems can't keep up with demand. Invest in scalable infrastructure.</p>
      
      <h2>3. Develop Your People</h2>
      <p>Your team is your greatest asset. Create development programs that help employees grow their skills.</p>
      
      <h2>4. Maintain Financial Discipline</h2>
      <p>Growth at any cost is not sustainable. Ensure that your growth initiatives are properly funded.</p>
      
      <h2>5. Stay Customer-Centric</h2>
      <p>As you grow, it's easy to lose touch with customer needs. Maintain regular feedback loops.</p>
    `
    }
};

const defaultImages = {
    post: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    author: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
};

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
                    // Use fallback
                    setPost(fallbackBlogPosts[id] || createDefaultPost(id));
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setPost(fallbackBlogPosts[id] || createDefaultPost(id));
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    const createDefaultPost = (slug) => ({
        slug,
        category: 'General',
        publishedDate: new Date().toISOString(),
        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        author: {
            name: 'IBF Consulting Team',
            role: 'Content Team',
            image: null
        },
        image: null,
        htmlContent: '<p>This article is coming soon. Check back later for the full content.</p>'
    });

    const getPostImageUrl = () => {
        if (post?.image) {
            return urlFor(post.image).width(1200).height(600).url();
        }
        return defaultImages.post;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <article className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <Link to="/blog" className="page-header__back">
                        <span className="page-header__back-arrow">←</span>
                        Back
                    </Link>
                    <h1 className="page-header__title">{post.title}</h1>
                </div>
            </div>

            {/* Featured Image */}
            <div className="blog-post__image">
                <img src={getPostImageUrl()} alt={post.title} />
            </div>

            {/* Content */}
            <section className="blog-post__content page-section">
                <div className="container">
                    <div className="blog-post__body">
                        {post.content ? (
                            <PortableText value={post.content} components={portableTextComponents} />
                        ) : post.htmlContent ? (
                            <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
                        ) : (
                            <p>Content coming soon.</p>
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
