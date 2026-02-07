import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="loading-spinner__container">
                <div className="loading-spinner__half loading-spinner__half--left"></div>
                <div className="loading-spinner__half loading-spinner__half--right"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
