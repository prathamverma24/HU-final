import React from 'react';
import SplitText from './SplitText';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      {/* Video Background */}
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/blzl5ee5GSU?autoplay=1&mute=1&loop=1&playlist=blzl5ee5GSU&controls=0&modestbranding=1&fs=0"
          allow="autoplay; muted"
          title="Hero Video"
        />
      </div>

      {/* Logo */}
      <div className="hero-logo">
        <img src="/images/logo.jpeg" alt="Haridwar University Logo" />
      </div>

      {/* Top Right Buttons */}
      <div className="hero-nav-buttons">
        <a href="#about" className="nav-btn">About Us</a>
        <a href="#programs" className="nav-btn">Programs</a>
        <a href="https://huroorkee.ac.in/apply-now" target="_blank" rel="noopener noreferrer" className="nav-btn primary">
          Register Now
        </a>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-title-wrapper">
            <SplitText
              text="ADMISSIONS"
              tag="h1"
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="left"
              className="hero-title-line"
            />
            <SplitText
              text="2026 OPEN"
              tag="h1"
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="left"
              className="hero-title-line"
            />
          </div>
          <SplitText
            text="Join Haridwar University's programs, where innovation, technology, and values unite to shape a better tomorrow for all."
            tag="p"
            splitType="words"
            delay={20}
            duration={0.6}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px"
            textAlign="left"
          />
          <a href="https://huroorkee.ac.in/apply-now" target="_blank" rel="noopener noreferrer" className="apply-btn">
            <span>+</span> Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
