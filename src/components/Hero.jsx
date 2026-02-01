import { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
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
            canvas.height = window.innerHeight;
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
                ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
                ctx.fill();

                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(drawParticles);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
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
        <section id="home" className="hero">
            <canvas ref={canvasRef} className="hero__canvas"></canvas>

            <div className="hero__container container">
                <div className="hero__content">
                    {/* Dominant Logo/Brand */}
                    <div className="hero__brand">
                        <span className="hero__brand-icon">◈</span>
                        <h1 className="hero__brand-name">Insurance Business French Consulting</h1>
                    </div>

                    {/* Tagline */}
                    <p className="hero__tagline">
                        We transform businesses into
                        <span className="text-stencil"> strategic </span>
                        powerhouses.
                    </p>

                    <p className="hero__description">
                        The business world is evolving faster than ever. The next big leap won't
                        happen by chance — it will happen through strategic excellence.
                    </p>

                    <a href="#services" className="hero__cta btn-solid">
                        OUR SERVICES
                    </a>
                </div>
            </div>

            {/* Side Label */}
            <div className="hero__side-label">
                <span>Strategic Excellence</span>
            </div>
        </section>
    );
}

export default Hero;
