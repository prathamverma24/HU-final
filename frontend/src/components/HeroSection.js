import React, { useState, useEffect } from 'react';
import { getSectionContent } from '../services/api';
import './HeroSection.css';

function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState({
    badge_text: 'ADMISSIONS 2026 OPEN',
    title_white: 'ADMISSIONS',
    title_green: 'OPEN 2026',
    description: "Join Haridwar University, Uttarakhand's premier destination for future leaders.",
    apply_now_link: 'https://huroorkee.ac.in/apply-now',
    campus_tour_link: 'https://huroorkee.ac.in/student-corner/photo-gallery',
    video_url: 'https://www.youtube.com/embed/blzl5ee5GSU',
    fallback_image: '/images/hero-fallback.avif',
    logo_image: '/images/logo.jpeg'
  });

  useEffect(() => {
    // Fetch section content from API
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('hero');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching hero content:', error);
        // Keep default content if fetch fails
      }
    };
    fetchContent();

    // Preload the fallback image
    const img = new Image();
    img.src = content.fallback_image;
    img.onload = () => setImageLoaded(true);

    // Keep fallback image for 5 seconds before showing video
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <section className="hero-section">
      {/* Loading Spinner */}
      {!imageLoaded && (
        <div className="hero-loading">
          <div className="spinner"></div>
        </div>
      )}

      {/* Fallback Background Image */}
      <div className={`fallback-background ${videoLoaded ? 'fade-out' : ''} ${imageLoaded ? 'loaded' : ''}`}>
        <img src={content.fallback_image} alt="Haridwar University" />
      </div>

      {/* Video Background */}
      <div className={`video-background ${videoLoaded ? 'fade-in' : ''}`}>
        <iframe
          src={`${content.video_url}?autoplay=1&mute=1&loop=1&playlist=${content.video_url.split('/').pop()}&controls=0&modestbranding=1&fs=0`}
          allow="autoplay; muted"
          title="Hero Video"
        />
      </div>

      {/* Logo */}
      <div className="hero-logo">
        <img src={content.logo_image} alt="Haridwar University Logo" />
      </div>

      {/* Mobile Menu Toggle Button */}
      <button 
        className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Top Right Buttons - Desktop */}
      <div className="hero-nav-buttons desktop-nav">
        <a href="#about" className="nav-btn">About Us</a>
        <a href="#programs" className="nav-btn">Programs</a>
        <a href={content.apply_now_link} target="_blank" rel="noopener noreferrer" className="nav-btn primary">
          Register Now
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
        </div>
        <nav className="mobile-menu-nav">
          <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span className="icon">ℹ️</span>
            About Us
          </a>
          <a href="#programs" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span className="icon">📚</span>
            Programs
          </a>
          <a 
            href={content.apply_now_link}
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-nav-link primary"
            onClick={closeMobileMenu}
          >
            <span className="icon">✓</span>
            Register Now
          </a>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          {/* Admissions Badge */}
          <div className="admissions-badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">{content.badge_text}</span>
          </div>

          {/* Main Heading */}
          <div className="hero-title-wrapper">
            <h1 className="hero-main-title">
              <span className="title-white">{content.title_white}</span>
              <span className="title-green">{content.title_green}</span>
            </h1>
          </div>

          {/* Description */}
          <p className="hero-description">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <a href={content.apply_now_link} target="_blank" rel="noopener noreferrer" className="hero-btn apply-now-btn">
              APPLY NOW
              <span className="btn-arrow">→</span>
            </a>
            <a href={content.campus_tour_link} target="_blank" rel="noopener noreferrer" className="hero-btn campus-tour-btn">
              CAMPUS TOUR
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
