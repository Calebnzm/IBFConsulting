import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../components/PageHeader.css';
import './BlogPost.css';

const blogPostsData = {
    'sustainable-growth-strategies': {
        id: 'sustainable-growth-strategies',
        category: 'Strategy',
        date: 'January 15, 2024',
        title: '5 Strategies for Sustainable Business Growth',
        author: {
            name: 'Sarah Mitchell',
            role: 'Senior Strategy Consultant',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
        },
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
        content: `
      <p>Sustainable business growth requires more than just increasing revenue. It demands a holistic approach that considers long-term viability, operational efficiency, and organizational culture.</p>
      
      <h2>1. Focus on Customer Retention</h2>
      <p>While acquiring new customers is important, retaining existing ones is often more cost-effective and leads to more sustainable growth. Implement customer success programs that ensure your clients achieve their goals with your product or service.</p>
      
      <h2>2. Build Scalable Systems</h2>
      <p>Growth becomes unsustainable when your systems can't keep up with demand. Invest in scalable infrastructure, automated processes, and robust technology platforms that can handle increased volume without proportional increases in cost or complexity.</p>
      
      <h2>3. Develop Your People</h2>
      <p>Your team is your greatest asset. Create development programs that help employees grow their skills and advance their careers. This not only improves retention but also ensures you have the talent needed to execute your growth strategy.</p>
      
      <h2>4. Maintain Financial Discipline</h2>
      <p>Growth at any cost is not sustainable. Ensure that your growth initiatives are properly funded and that you're maintaining healthy margins. Monitor key financial metrics and adjust your strategy as needed.</p>
      
      <h2>5. Stay Customer-Centric</h2>
      <p>As you grow, it's easy to lose touch with customer needs. Maintain regular feedback loops, conduct customer research, and ensure that product development remains focused on solving real customer problems.</p>
      
      <h2>Conclusion</h2>
      <p>Sustainable growth is a marathon, not a sprint. By focusing on these five strategies, you can build a business that not only grows but thrives for the long term.</p>
    `
    },
    'ai-powered-analytics': {
        id: 'ai-powered-analytics',
        category: 'Technology',
        date: 'January 10, 2024',
        title: 'AI-Powered Analytics: The Future of Business Intelligence',
        author: {
            name: 'Michael Chen',
            role: 'Head of Analytics',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
        content: `
      <p>Artificial intelligence is transforming how businesses analyze data and make decisions. In this article, we explore the key trends and opportunities in AI-powered analytics.</p>
      
      <h2>The Evolution of Business Intelligence</h2>
      <p>Traditional BI focused on descriptive analytics—understanding what happened. AI-powered analytics goes further, enabling predictive and prescriptive insights that help businesses anticipate trends and take proactive action.</p>
      
      <h2>Key Capabilities</h2>
      <p>Modern AI analytics platforms offer natural language processing, automated insight generation, and real-time anomaly detection. These capabilities make analytics accessible to business users, not just data scientists.</p>
      
      <h2>Implementation Considerations</h2>
      <p>Successfully implementing AI analytics requires clean data, clear use cases, and organizational buy-in. Start with pilot projects that demonstrate value before scaling across the organization.</p>
      
      <h2>The Road Ahead</h2>
      <p>As AI technology continues to advance, we can expect even more sophisticated analytics capabilities. Organizations that invest in these technologies today will be well-positioned to compete in the data-driven economy of tomorrow.</p>
    `
    },
    'remote-team-building': {
        id: 'remote-team-building',
        category: 'Leadership',
        date: 'January 5, 2024',
        title: 'Building High-Performance Teams in Remote Environments',
        author: {
            name: 'Emily Rodriguez',
            role: 'Organizational Development Lead',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
        content: `
      <p>Remote work has become the norm for many organizations. Building high-performance teams in this environment requires intentional effort and new approaches to collaboration.</p>
      
      <h2>Communication is Key</h2>
      <p>Over-communicate in remote settings. Use a mix of synchronous and asynchronous communication tools, and establish clear norms for when to use each.</p>
      
      <h2>Build Trust Intentionally</h2>
      <p>Trust is harder to build without face-to-face interaction. Create opportunities for team members to connect personally, share their work, and celebrate successes together.</p>
      
      <h2>Focus on Outcomes</h2>
      <p>Remote work requires a shift from measuring activity to measuring outcomes. Set clear goals and give team members autonomy in how they achieve them.</p>
      
      <h2>Invest in Tools and Training</h2>
      <p>Provide your team with the tools they need to collaborate effectively, and train them on how to use these tools well.</p>
    `
    }
};

// Default content for posts not in the detailed data
const defaultPost = (id) => ({
    id,
    category: 'General',
    date: 'December 2023',
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    author: {
        name: 'PT Consulting Team',
        role: 'Content Team',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
    },
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop',
    content: `
    <p>This article is coming soon. Check back later for the full content.</p>
    <p>In the meantime, feel free to explore our other articles or contact us to discuss how we can help with your business challenges.</p>
  `
});

function BlogPost() {
    const { id } = useParams();
    const post = blogPostsData[id] || defaultPost(id);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <article className="page-wrapper">
            <div className={`page-header ${isScrolled ? 'page-header--scrolled' : ''}`}>
                <div className="container">
                    <Link to="/blog" className="page-header__back">← Back to Blog</Link>
                    <h1 className="page-header__title">{post.title}</h1>
                </div>
            </div>

            {/* Featured Image */}
            <div className="blog-post__image">
                <img src={post.image} alt={post.title} />
            </div>

            {/* Content */}
            <section className="blog-post__content page-section">
                <div className="container">
                    <div
                        className="blog-post__body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

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
