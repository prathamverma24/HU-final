import React from 'react';
import './AccreditationsSection.css';

function AccreditationsSection() {
  return (
    <section className="accreditations-section">
      <div className="accreditations-container">
        <div className="accreditations-grid">
          <div className="accreditations-left">
            <h2>Haridwar University</h2>
            <h3>Uttarakhand</h3>
            <div className="title-underline"></div>
            <p className="tagline">Enlightening Minds, Empowering Futures</p>
            <p className="description">
              Welcome to Haridwar University, the epitome of academic excellence nestled in the serene landscapes of Uttarakhand. As the premier educational institution in the region, we take pride in offering world-class education, innovative research opportunities, and a vibrant campus life.
            </p>
            <div className="rankings">
              <div className="ranking-card">
                <h4>Ranked 37th</h4>
                <p>in Top Placement Universities by TIMES OF INDIA Ranking Survey 2024</p>
              </div>
              <div className="ranking-card">
                <h4>Ranked 59th</h4>
                <p>in Top India's Best Universities by THE WEEK Ranking Survey 2025.</p>
              </div>
            </div>
            <a href="https://huroorkee.ac.in/about-us" target="_blank" rel="noopener noreferrer" className="know-more-btn">
              Know More →
            </a>
          </div>
          <div className="accreditations-right">
            <h3>Approvals & Accreditations</h3>
            <div className="accreditations-logos">
              <div className="logo-card">
                <img src="/images/ugc.png" alt="UGC" />
              </div>
              <div className="logo-card">
                <img src="/images/Aicte.jpeg" alt="AICTE" />
              </div>
              <div className="logo-card">
                <img src="/images/NBA.jpeg" alt="NBA" />
              </div>
              <div className="logo-card">
                <img src="/images/hulogo.jpeg" alt="HU Logo" />
              </div>
              <div className="logo-card">
                <img src="/images/CII.jpeg" alt="CII" />
              </div>
              <div className="logo-card">
                <img src="/images/Assocham.png" alt="ASSOCHAM" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccreditationsSection;
