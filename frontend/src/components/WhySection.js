import React from 'react';
import './WhySection.css';

function WhySection() {
  const reasons = [
    {
      id: '01',
      title: 'National Ranking',
      subtitle: 'Ranked 92nd in Best Universities of India by TIMES OF INDIA Ranking Survey 2025.',
      image: '/images/Roorkee-College-of-Smart-Computing.avif',
      color: '#1e3a8a',
      titleColor: '#10b981'
    },
    {
      id: '02',
      title: 'TOP India University Ranking',
      subtitle: '',
      image: '/images/Why_Roorkee_College_of_Engineering.avif',
      color: '#10b981',
      titleColor: '#ffffff'
    },
    {
      id: '03',
      title: 'Placement Success',
      subtitle: '',
      image: '/images/business_studies1.avif',
      color: '#1e40af',
      titleColor: '#10b981'
    },
    {
      id: '04',
      title: 'Engineering Excellence',
      subtitle: '',
      image: '/images/SmartComputing.avif',
      color: '#1e3a8a',
      titleColor: '#10b981'
    },
    {
      id: '05',
      title: 'Best University Ranking',
      subtitle: '',
      image: '/images/young-asian-indian-college-students-2025-03-14-03-09-58-utc.avif',
      color: '#1e40af',
      titleColor: '#10b981'
    }
  ];

  return (
    <section className="why-section">
      <div className="why-container">
        <h2>Why <strong>Haridwar University?</strong></h2>
        <p className="why-description">
          Discover Haridwar University, where endless opportunities await. With a commitment to excellence, we nurture talent, empower minds, and shape futures. Choose us for a brighter tomorrow. Our consistent rankings in various categories by TIMES OF INDIA Ranking Survey demonstrate our dedication to providing quality education and ensuring successful careers for our students. Join us to be part of an institution that stands among the top engineering institutes in India.
        </p>
        <div className="why-grid">
          {reasons.map((reason) => (
            <div 
              key={reason.id} 
              className="why-card" 
              style={{ 
                '--card-color': reason.color,
                '--title-color': reason.titleColor
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
