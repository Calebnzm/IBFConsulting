import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetail from './pages/ResourceDetail';
import './App.css';

// Custom smooth scroll with configurable duration
function smoothScrollTo(targetPosition, duration = 1000) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Bell curve easing (ease-in-out): starts slow, speeds up in middle, slows at end
    // Using sine-based easing for smooth bell curve feel
    const easeInOutSine = -(Math.cos(Math.PI * progress) - 1) / 2;

    window.scrollTo(0, startPosition + distance * easeInOutSine);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Smooth scroll to top or hash on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  const scrollToElement = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      smoothScrollTo(offsetPosition, 1200);
    }
  }, []);

  useEffect(() => {
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        scrollToElement(hash.substring(1));
      }, 150);
    } else {
      smoothScrollTo(0, 800);
    }
  }, [pathname, hash, scrollToElement]);

  return null;
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
