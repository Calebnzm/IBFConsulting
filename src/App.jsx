import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useCallback, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetail from './pages/ResourceDetail';
import './App.css';

// Custom smooth scroll with gentle, slow easing
function smoothScrollTo(targetPosition, duration = 2000) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Custom easing function: Gentle bell curve with wider base and lower peak
  // This creates a smoother, slower transition that doesn't accelerate as rapidly
  function gentleEaseInOut(t) {
    // Using a modified quintic ease-in-out for gentler acceleration
    // Combined with a dampening factor for smoother feel
    if (t < 0.5) {
      // Ease in: gentle start
      return 4 * t * t * t;
    } else {
      // Ease out: gentle finish
      const f = (2 * t) - 2;
      return 0.5 * f * f * f + 1;
    }
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Apply the gentle easing
    const easedProgress = gentleEaseInOut(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

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
      const headerOffset = 0; // No offset needed with scroll-snap
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      smoothScrollTo(offsetPosition, 2500); // Slower, gentler scroll
    }
  }, []);

  // Scroll to top BEFORE browser paints (prevents flash at bottom)
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        scrollToElement(hash.substring(1));
      }, 150);
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
