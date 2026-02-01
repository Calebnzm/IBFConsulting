import { Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import ReviewsPage from './pages/ReviewsPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetail from './pages/ResourceDetail';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/testimonials" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

