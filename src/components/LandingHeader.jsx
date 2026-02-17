import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingHeader.css';

function LandingHeader() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let mouse = { x: null, y: null };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; // Full screen canvas for effect
        };

        const createParticles = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - particle.x;
                    const dy = mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        particle.x -= dx * force * 0.02;
                        particle.y -= dy * force * 0.02;
                    }
                }

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`; // White particles for dark bg
                ctx.fill();

                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(drawParticles);
        };

        const handleMouseMove = (e) => {
            // Need to account for scroll if canvas is fixed or absolute
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <header className="landing-header">
            <canvas ref={canvasRef} className="landing-header__canvas"></canvas>

            <div className="landing-header__content container">
                {/* Top Row: Brand & Nav */}
                <div className="landing-header__top">
                    <div className="landing-header__brand-box glass-panel">
                        <span className="landing-header__brand-text">IBF Consulting</span>
                    </div>
                    <nav className="landing-header__nav">
                        <Link to="/about" className="landing-header__nav-btn glass-btn">About</Link>
                        <Link to="/services" className="landing-header__nav-btn glass-btn">Services</Link>
                        <Link to="/team" className="landing-header__nav-btn glass-btn">Team</Link>
                        <Link to="/contact" className="landing-header__nav-btn glass-btn">Contact</Link>
                    </nav>
                </div>

                {/* Main Row: Logo & Tagline */}
                <div className="landing-header__main">
                    <div className="landing-header__logo-box glass-panel">
                        <span className="landing-header__logo-icon">◈</span>
                    </div>
                    <div className="landing-header__tagline-box glass-panel">
                        <h1 className="landing-header__tagline">INSURANCE | BUSINESS | FRENCH - CONSULTING</h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default LandingHeader;
