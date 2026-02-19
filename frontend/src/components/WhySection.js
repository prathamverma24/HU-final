import React, { useState, useEffect } from 'react';
import { getSectionContent } from '../services/api';
import './WhySection.css';

function WhySection() {
  const [content, setContent] = useState({
    title: 'Why Haridwar University?',
    description: '',
    reasons: []
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('why');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching why content:', error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="why-section">
      <div className="why-container">
        <h2>Why <strong>{content.title.replace('Why ', '')}</strong></h2>
        <p className="why-description">
          {content.description}
        </p>
        <div className="why-grid">
          {content.reasons && content.reasons.map((reason) => (
            <div 
              key={reason.id} 
              className="why-card" 
              style={{ 
                '--card-color': '#1e3a8a',
                '--title-color': '#10b981'
              }}
            >
              <img src={reason.image} alt={reason.title} />
              <div className="why-overlay">
                <span className="why-number">{reason.id}</span>
                <h3 className="why-title">{reason.title}</h3>
                {reason.subtitle && <p className="why-subtitle">{reason.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySection;
