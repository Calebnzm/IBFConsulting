import Team from '../components/Team';
import '../components/PageHeader.css';
import './TeamPage.css';

function TeamPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header page-header--no-back">
                <div className="container">
                    <h1 className="page-header__title">Meet Our Team</h1>
                </div>
            </div>
            <div className="page-content">
                <Team showHeader={false} />
            </div>
        </div>
    );
}

export default TeamPage;
