import React from 'react';
import './AccreditationsSection.css';

function AccreditationsSection() {
  return (
    <section className="accreditations-section">
      <div className="accreditations-container">
        <div className="accreditations-grid">
          <div className="accreditations-info">
            <h2>University Info & Accreditations</h2>
            <p>Haridwar University is recognized by UGC and accredited by leading bodies.</p>
          </div>
          <div className="accreditations-logos">
            <img src="/images/ugc.png" alt="UGC" />
            <img src="/images/Aicte.jpeg" alt="AICTE" />
            <img src="/images/NBA.jpeg" alt="NBA" />
            <img src="/images/CII.jpeg" alt="CII" />
            <img src="/images/Assocham.png" alt="ASSOCHAM" />
            <img src="/images/hulogo.jpeg" alt="HU Logo" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccreditationsSection;
