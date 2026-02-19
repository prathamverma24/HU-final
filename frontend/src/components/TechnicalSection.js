import React, { useState, useEffect } from 'react';
import { getSectionContent } from '../services/api';
import './TechnicalSection.css';

const TechnicalSection = () => {
  const [content, setContent] = useState({
    title: 'Technical and Innovation Activities',
    activities: []
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('technical');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching technical content:', error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="technical-section">
      <div className="technical-container">
        <h2>{content.title}</h2>
        
        <div className="activities-grid">
          {content.activities && content.activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-image">
                <img src={activity.image} alt={activity.title} />
              </div>
              <div className="activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSection;
