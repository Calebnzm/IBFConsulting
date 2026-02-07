import Contact from '../components/Contact';
import '../components/PageHeader.css';
import './ContactPage.css';

function ContactPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header page-header--no-back">
                <div className="container">
                    <h1 className="page-header__title">Get In Touch</h1>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="contact-intro">
                        <p className="contact-intro__text">
                            We'd love to hear from you. Whether you have a question about our services,
                            need a consultation, or want to discuss how we can help transform your business —
                            our team is ready to assist you.
                        </p>
                    </div>
                </div>
                <Contact showHeader={false} />
            </div>
        </div>
    );
}

export default ContactPage;
