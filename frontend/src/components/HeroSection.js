import React, { useState, useEffect, useRef } from 'react';
import { getSectionContent } from '../services/api';
import heroFallbackImage from '../assets/Distinguished_Leadership.webp';
import './HeroSection.css';

const defaultHeroContent = {
  badge_text: 'ADMISSIONS 2026 OPEN',
  title_white: 'ADMISSIONS',
  title_green: 'OPEN 2026',
  description: "Join Haridwar University, Uttarakhand's premier destination for future leaders.",
  apply_now_link: 'https://huroorkee.ac.in/apply-now',
  campus_tour_link: 'https://huroorkee.ac.in/student-corner/photo-gallery',
  video_url: 'https://www.youtube.com/embed/blzl5ee5GSU',
  fallback_image: '/images/hero-fallback.avif',
  logo_image: '/images/logo.jpeg'
};

function HeroSection({ refreshTrigger, initialContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(initialContent || defaultHeroContent);
  const [videoReady, setVideoReady] = useState(false);
  const [useImageFallback, setUseImageFallback] = useState(false);
  const [canShowVideo, setCanShowVideo] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    if (initialContent != null) {
      setContent(initialContent);
      return;
    }
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('hero');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };
    fetchContent();
    const handleStorageChange = (e) => {
      if (e.key === 'section_updated_hero') fetchContent();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshTrigger, initialContent]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const getYoutubeVideoId = (url) => {
    if (!url) return 'blzl5ee5GSU';

    if (url.includes('youtube.com/embed/')) {
      const match = url.match(/embed\/([^?&/]+)/);
      return match?.[1] || 'blzl5ee5GSU';
    }

    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
      return id || 'blzl5ee5GSU';
    }

    if (url.includes('youtube.com/watch') || url.includes('m.youtube.com/watch')) {
      const query = url.split('?')[1] || '';
      const params = new URLSearchParams(query);
      return params.get('v') || 'blzl5ee5GSU';
    }

    return 'blzl5ee5GSU';
  };

  const videoId = getYoutubeVideoId(content.video_url || defaultHeroContent.video_url);
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&fs=0&loop=1&playlist=${videoId}&cc_load_policy=0&rel=0&playsinline=1`;
  const fallbackImageSrc = content.fallback_image || heroFallbackImage;

  useEffect(() => {
    const saveDataEnabled = navigator.connection?.saveData === true;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
    const isSmallScreen = window.matchMedia?.('(max-width: 768px)')?.matches === true;
    setAllowVideo(!(saveDataEnabled || prefersReducedMotion || isSmallScreen));
  }, []);

  useEffect(() => {
    if (!allowVideo) {
      setVideoReady(false);
      setUseImageFallback(true);
      setCanShowVideo(false);
      return undefined;
    }

    setVideoReady(false);
    setUseImageFallback(false);
    setCanShowVideo(false);

    const showVideoTimer = window.setTimeout(() => {
      setCanShowVideo(true);
    }, 3000);

    fallbackTimerRef.current = window.setTimeout(() => {
      setUseImageFallback(true);
    }, 10000);

    return () => {
      window.clearTimeout(showVideoTimer);
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [videoId, allowVideo]);

  return (
    <section className="hero-section">
      <div className={`fallback-background ${videoReady && canShowVideo && !useImageFallback ? 'fade-out' : ''}`}>
        <img
          src={fallbackImageSrc}
          alt="Campus background fallback"
          onError={(e) => {
            if (!e.currentTarget.src.includes('Distinguished_Leadership.webp')) {
              e.currentTarget.src = heroFallbackImage;
            }
          }}
        />
      </div>

      {/* Video Background */}
      {allowVideo && !useImageFallback && (
        <div className={`video-background ${videoReady && canShowVideo ? 'fade-in' : ''}`}>
          <iframe
            key={videoId}
            src={videoSrc}
            allow="autoplay"
            title="Hero Video"
            style={{ border: 'none' }}
            onLoad={() => {
              setVideoReady(true);
              if (fallbackTimerRef.current) {
                window.clearTimeout(fallbackTimerRef.current);
                fallbackTimerRef.current = null;
              }
            }}
            onError={() => setUseImageFallback(true)}
          />
        </div>
      )}

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
