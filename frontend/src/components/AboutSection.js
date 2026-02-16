import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-text">
            <h2>Ignite the Intellect. Lead the Legacy.</h2>
            <p>Haridwar University is a multi-disciplinary, research-intensive, private university, educating a vibrant and innovative student and very strong supportive faculty members. Haridwar University offers UG and PG programs across various disciplines, including Engineering, Management, Medical Sciences, Life Sciences, Agricultural Sciences.</p>
            <a href="#programs" className="know-more-link">
              <span>↗</span> Know More
            </a>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <img src="/images/herosection.webp" alt="Research Projects" />
              <div className="stat-overlay">
                <div className="stat-number">50+</div>
                <div className="stat-label">Research Projects</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">140+</div>
              <div className="stat-label">Publications</div>
            </div>
            <div className="stat-card">
              <img src="/images/toy.avif" alt="Patents" />
              <div className="stat-overlay">
                <div className="stat-number">25+</div>
                <div className="stat-label">Patents</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
