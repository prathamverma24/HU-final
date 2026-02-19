import React, { useEffect, useRef, useState } from 'react';
import { getSectionContent } from '../services/api';
import './UtkarshSection.css';

const UtkarshSection = () => {
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const [content, setContent] = useState({
    title: 'The biggest festival for HUians',
    subtitle: 'Celebrating excellence, passion, and innovation through our flagship events',
    background_video: 'https://www.youtube.com/embed/FvFEYVSantk',
    background_image: '/images/cultural.jpeg',
    fests: []
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getSectionContent('utkarsh');
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching utkarsh content:', error);
      }
    };
    fetchContent();

    // Try to play video after component mounts
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="utkarsh-section">
      <div className="fallback-background">
        <img src={content.background_image} alt="Cultural Background" />
      </div>
      <div className="video-background">
        <iframe
          ref={iframeRef}
          src={`${content.background_video}?autoplay=1&mute=1&loop=1&playlist=${content.background_video.split('/').pop()}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          title="Utkarsh Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
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
          {content.fests && content.fests.map((fest, index) => (
            <div key={index} className="fest-card" style={{ '--fest-color': fest.color }}>
              {fest.video_id ? (
                <div className="fest-split-layout">
                  <div className="fest-video-section">
                    <iframe
                      src={`https://www.youtube.com/embed/${fest.video_id}?autoplay=1&mute=1&loop=1&playlist=${fest.video_id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title={`${fest.name} Video`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                    ></iframe>
                  </div>
                  <div className="fest-content-section">
                    <h3 className="fest-name">{fest.name}</h3>
                    <p className="fest-category">{fest.category}</p>
                    <p className="fest-description">{fest.description}</p>
                  </div>
                </div>
              ) : (
                <div className="fest-content">
                  <h3 className="fest-name">{fest.name}</h3>
                  <p className="fest-category">{fest.category}</p>
                  <p className="fest-description">{fest.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UtkarshSection;
