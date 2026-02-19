import React, { useState, useEffect } from 'react';
import { getSectionContent } from '../services/api';
import './AboutSection.css';

function AboutSection() {
  const [content, setContent] = useState({
    title: 'Ignite the Intellect. Lead the Legacy.',
    description: 'Haridwar University is a multi-disciplinary, research-intensive, private university...',
    know_more_link: 'https://huroorkee.ac.in/about-us',
    stats: []
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('about');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-text">
            <h2>{content.title}</h2>
            <p>{content.description}</p>
            <a href={content.know_more_link} target="_blank" rel="noopener noreferrer" className="know-more-link">
              <span>↗</span> Know More
            </a>
          </div>
          <div className="stats-grid">
            {content.stats && content.stats.map((stat, index) => (
              <div key={index} className={`stat-card ${stat.image ? 'with-image' : 'dark'} ${stat.label === 'WORLD RECOGNIZED RESEARCH AND INNOVATION' ? 'innovation' : ''}`}>
                {stat.image && <img src={stat.image} alt={stat.label} />}
                <div className={stat.image ? 'stat-overlay' : ''}>
                  {stat.number && <div className="stat-number">{stat.number}</div>}
                  <div className={stat.number ? 'stat-label' : 'stat-label-main'}>{stat.label}</div>
                  {stat.icon && <div className={stat.number ? 'stat-icon' : 'stat-icon-bottom'}>{stat.icon}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
