import React, { useState, useEffect, useRef } from 'react';
import { getSectionContent } from '../services/api';
import './AboutSection.css';

const defaultAboutContent = {
  title: 'Ignite the Intellect. Lead the Legacy.',
  description: 'Haridwar University is a multi-disciplinary, research-intensive, private university...',
  know_more_link: 'https://huroorkee.ac.in/about-us',
  stats: [
    { number: '28+', label: 'Research Projects', image: '/images/gueston14.jpeg' },
    { number: '250+', label: 'Research papers', image: '/images/toy.avif' },
    { number: '15+', label: 'Patents', image: '/images/Distinguished_Leadership.avif' },
    { label: 'World Recognized Research and Innovation', image: '/images/logo.jpeg' }
  ]
};

function AboutSection({ refreshTrigger, initialContent }) {
  const [content, setContent] = useState(initialContent || defaultAboutContent);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (initialContent != null) {
      setContent(initialContent);
      return;
    }
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('about');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };
    fetchContent();
    const handleStorageChange = (e) => {
      if (e.key === 'section_updated_about') fetchContent();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshTrigger, initialContent]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const stats = content.stats && content.stats.length > 0 ? content.stats : defaultAboutContent.stats;

  return (
    <section ref={sectionRef} id="about" className={`about-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="about-container">
        <div className="about-grid">
          <div className="about-text">
            <span className="about-kicker">About Haridwar University</span>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
            <a href={content.know_more_link} target="_blank" rel="noopener noreferrer" className="know-more-link">
              <span>?</span> Know More
            </a>
          </div>
          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="about-stat-card"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="about-stat-media">
                  <img
                    src={stat.image || '/images/logo.jpeg'}
                    alt={stat.label || 'About highlight'}
                    loading="lazy"
                    onError={(e) => {
                      if (!e.currentTarget.src.includes('/images/logo.jpeg')) {
                        e.currentTarget.src = '/images/logo.jpeg';
                      }
                    }}
                  />
                </div>
                <div className="about-stat-content">
                  {stat.number && <div className="about-stat-number">{stat.number}</div>}
                  <div className="about-stat-label">{stat.label}</div>
                  {stat.icon && <div className="about-stat-icon">{stat.icon}</div>}
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
