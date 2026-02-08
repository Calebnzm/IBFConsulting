import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact({ showHeader = true }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Get current timestamp
            const now = new Date();
            const time = now.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });

            // Prepare template parameters
            const templateParams = {
                name: formData.name,
                email: formData.email,
                company: formData.company || 'Not provided',
                message: formData.message,
                time: time
            };

            // Send email using EmailJS
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_begv5ca',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Success
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                company: '',
                message: '',
            });

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');

            // Clear error message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact section">
            <div className="contact__container container">
                <div className="contact__grid">
                    {/* Header - conditionally rendered */}
                    {showHeader && (
                        <div className="contact__header">
                            <span className="section-label">Contact</span>
                            <h2 className="contact__title">
                                Let's start a<br />conversation.
                            </h2>
                            <p className="contact__description">
                                Ready to transform your business? Get in touch and let's discuss
                                how we can help you achieve your goals.
                            </p>

                            <div className="contact__info">
                                <div className="contact__info-item">
                                    <span className="contact__info-label">Email</span>
                                    <a href="mailto:hello@ibfconsulting.com" className="contact__info-value">
                                        hello@ibfconsulting.com
                                    </a>
                                </div>
                                <div className="contact__info-item">
                                    <span className="contact__info-label">Phone</span>
                                    <a href="tel:+254700123456" className="contact__info-value">
                                        +254 700 123 456
                                    </a>
                                </div>
                                <div className="contact__info-item">
                                    <span className="contact__info-label">Location</span>
                                    <span className="contact__info-value">
                                        Nairobi, Kenya
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="contact__form-wrapper">
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Your company name"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Tell us about your project..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div style={{
                                    padding: '12px 20px',
                                    marginBottom: '20px',
                                    backgroundColor: '#d4edda',
                                    color: '#155724',
                                    borderRadius: '4px',
                                    border: '1px solid #c3e6cb'
                                }}>
                                    ✓ Thank you for your message! We will get back to you soon.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div style={{
                                    padding: '12px 20px',
                                    marginBottom: '20px',
                                    backgroundColor: '#f8d7da',
                                    color: '#721c24',
                                    borderRadius: '4px',
                                    border: '1px solid #f5c6cb'
                                }}>
                                    ✕ Something went wrong. Please try again or contact us directly.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="contact__submit btn-solid"
                                disabled={isSubmitting}
                                style={{
                                    opacity: isSubmitting ? 0.7 : 1,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
