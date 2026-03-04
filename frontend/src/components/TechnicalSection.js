import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getSectionContent } from '../services/api';
import './TechnicalSection.css';
import labImage from '../assets/lab.JPG';
import guestLectureImage from '../assets/guest_lecture.jpg';
import hackImage from '../assets/hack.jpeg';

const defaultTechnicalContent = {
  title: 'Technical and Innovation Activities',
  activities: []
};

const isInnovationLab = (activity = {}) => {
  const title = (activity.title || '').toLowerCase();
  return title.includes('innovation lab');
};

const isTechTalkExperts = (activity = {}) => {
  const title = (activity.title || '').toLowerCase();
  const description = (activity.description || '').toLowerCase();
  const text = `${title} ${description}`;
  const hasTechTalk = text.includes('tech talk') || text.includes('tech talks');
  const hasExpertTalk = text.includes('talk') && text.includes('expert');
  const hasGuestLecture = text.includes('guest lecture') || text.includes('guest lectures');
  return hasTechTalk || hasExpertTalk || hasGuestLecture;
};

const isHackathon = (activity = {}) => {
  const title = (activity.title || '').toLowerCase();
  return title.includes('hackathon') || title.includes('hackathons');
};

const TechnicalSection = ({ refreshTrigger, initialContent }) => {
  const [content, setContent] = useState(initialContent || defaultTechnicalContent);

  useEffect(() => {
    if (initialContent != null) {
      setContent(initialContent);
      return;
    }
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('technical');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching technical content:', error);
      }
    };
    fetchContent();
    const handleStorageChange = (e) => {
      if (e.key === 'section_updated_technical') fetchContent();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshTrigger, initialContent]);

  const getActivityImage = (activity) => (
    isHackathon(activity)
      ? hackImage
      : isInnovationLab(activity)
      ? labImage
      : isTechTalkExperts(activity)
      ? guestLectureImage
      : activity.image
  );

  const renderActivityCard = (activity, index) => (
    <div key={index} className="activity-card">
      <div className="activity-image">
        <img
          src={getActivityImage(activity)}
          alt={activity.title}
          loading="lazy"
        />
      </div>
      <div className="activity-content">
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
      </div>
    </div>
  );

  return (
    <section className="technical-section">
      <div className="technical-container">
        <h2>{content.title}</h2>
        
        <div className="activities-grid technical-desktop-grid">
          {content.activities && content.activities.map((activity, index) => renderActivityCard(activity, index))}
        </div>

        <div className="activities-swiper technical-mobile-swiper">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            pagination={{ clickable: true }}
            className="technical-swiper"
          >
            {content.activities && content.activities.map((activity, index) => (
              <SwiperSlide key={`mobile-${index}`}>
                {renderActivityCard(activity, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSection;
