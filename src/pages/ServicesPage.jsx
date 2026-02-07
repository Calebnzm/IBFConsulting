import Services from '../components/Services';
import '../components/PageHeader.css';
import './ServicesPage.css';

function ServicesPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header page-header--no-back">
                <div className="container">
                    <h1 className="page-header__title">Strategic solutions for modern enterprises.</h1>
                </div>
            </div>
            <div className="page-content">
                <Services showHeader={false} />
            </div>
        </div>
    );
}

export default ServicesPage;
