import './CompanyCarousel.css';

const companies = [
    { name: 'Safaricom' },
    { name: 'Equity Bank' },
    { name: 'KCB Group' },
    { name: 'EABL' },
    { name: 'Kenya Airways' },
    { name: 'Britam' },
    { name: 'Centum' },
    { name: 'Co-operative Bank' },
    { name: 'Standard Media' },
    { name: 'Nation Media' }
];

function CompanyCarousel() {
    // Duplicate the list to create the infinite scroll effect
    const carouselItems = [...companies, ...companies];

    return (
        <section className="company-carousel">
            <div className="container">
                <div className="section-label" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    Trusted by Industry Leaders
                </div>
            </div>
            <div className="company-carousel__track">
                {carouselItems.map((company, index) => (
                    <div key={`${company.name}-${index}`} className="company-logo">
                        {/* 
                            Using styled text for now as we don't have actual SVG logos.
                            In a real scenario, we would use <img> tags.
                         */}
                        <span>{company.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CompanyCarousel;
