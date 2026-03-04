import React, { useEffect, useRef, useState } from 'react';
import { getSectionContent } from '../services/api';
import './UtkarshSection.css';

const defaultUtkarshContent = {
  title: 'The biggest festival for HUians',
  subtitle: 'Celebrating excellence, passion, and innovation through our flagship events',
  background_video: 'https://www.youtube.com/embed/FvFEYVSantk',
  background_image: '',
  fests: []
};

const UtkarshSection = ({ refreshTrigger, initialContent }) => {
  const iframeRef = useRef(null);
  const [content, setContent] = useState(initialContent || defaultUtkarshContent);
  const [expandedCard, setExpandedCard] = useState(null);
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] = useState(false);

  useEffect(() => {
    if (initialContent != null) {
      setContent(initialContent);
      return;
    }
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('utkarsh');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching utkarsh content:', error);
      }
    };
    fetchContent();
    const handleStorageChange = (e) => {
      if (e.key === 'section_updated_utkarsh') fetchContent();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshTrigger, initialContent]);

  // Extract video ID from URL
  const getVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handleCardClick = (index, fest) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const getBackgroundVideoUrl = () => {
    const videoId = getVideoId(content.background_video);
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0`;
  };

  return (
    <section className="utkarsh-section">
      <div className="fallback-background">
        {content.background_image && (
          <img src={content.background_image} alt="Cultural Background" loading="lazy" />
        )}
      </div>
      <div className="video-background">
        <iframe
          ref={iframeRef}
          src={getBackgroundVideoUrl()}
          title="Utkarsh Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          onLoad={() => setBackgroundVideoLoaded(true)}
          className="background-iframe"
        ></iframe>
      </div>
      <div className="utkarsh-container">
        <div className="utkarsh-header">
          <h2 className="utkarsh-title">{content.title}</h2>
          <p className="utkarsh-subtitle">
            {content.subtitle}
          </p>
        </div>

        <div className="fests-grid">
          {content.fests && content.fests.map((fest, index) => {
            const isExpanded = expandedCard === index;
            const videoId = fest.video_id || getVideoId(fest.video_url);
            
            return (
              <div 
                key={index} 
                className={`fest-card ${isExpanded ? 'expanded' : ''}`}
                style={{ '--fest-color': fest.color }}
                onClick={() => handleCardClick(index, fest)}
              >
                {/* Header - shown for all cards */}
                <div className="fest-header">
                  <h3 className="fest-name">{fest.name}</h3>
                  <p className="fest-category">{fest.category}</p>
                  {!isExpanded && videoId && (
                    <div className="play-indicator">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)" />
                        <path d="M9 7L17 12L9 17V7Z" fill="var(--fest-color)" />
                      </svg>
                    </div>
                  )}
                  {!isExpanded && !videoId && (
                    <div className="expand-indicator">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 9L12 16L5 9" stroke="var(--fest-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Expanded content - shown when card is expanded */}
                {isExpanded && (
                  <div className="fest-expanded-content">
                    <button 
                      className="close-video-button" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setExpandedCard(null); 
                      }}
                      aria-label="Close"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {videoId ? (
                      <>
                        <div className="fest-video-wrapper">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&disablekb=0&fs=1&iv_load_policy=3`}
                            title={`${fest.name} Video`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            className="fest-video-iframe"
                          ></iframe>
                        </div>
                        <div className="fest-content-section">
                          <p className="fest-description">{fest.description}</p>
                        </div>
                      </>
                    ) : (
                      <div className="fest-content-section">
                        {fest.image_url && (
                          <div className="fest-image-wrapper">
                            <img src={fest.image_url} alt={fest.name} loading="lazy" />
                          </div>
                        )}
                        <p className="fest-description">{fest.description}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UtkarshSection;
