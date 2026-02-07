import Reviews from '../components/Reviews';
import '../components/PageHeader.css';
import './ReviewsPage.css';

function ReviewsPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header page-header--no-back">
                <div className="container">
                    <h1 className="page-header__title">Client Testimonials</h1>
                </div>
            </div>
            <div className="page-content">
                <Reviews showHeader={false} />
            </div>
        </div>
    );
}

export default ReviewsPage;
