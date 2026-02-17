import './StrategiesSection.css';

function StrategiesSection() {
    return (
        <section className="strategies-section container">
            <div className="strategies-row">
                {/* Value Proposition Column */}
                <div className="strategies-col">
                    <h3 className="strategies-header">Our Value Proposition</h3>
                    <div className="strategies-content">
                        <div className="strategies-image-placeholder">Image</div>
                        <div className="strategies-list">
                            <ul>
                                <li>Expert Analysis</li>
                                <li>Tailored Solutions</li>
                                <li>Market Insight</li>
                                <li>Strategic Growth</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Winning Strategies Column */}
                <div className="strategies-col">
                    <h3 className="strategies-header">Our Winning Strategies</h3>
                    <div className="strategies-content">
                        <div className="strategies-image-placeholder">Image</div>
                        <div className="strategies-list">
                            <ul>
                                <li>Data-Driven</li>
                                <li>Client-Centric</li>
                                <li>Innovative Approach</li>
                                <li>Sustainable Results</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StrategiesSection;
