import React, { useState, useEffect } from 'react';
import { getGlimpses } from '../services/api';
import './EventGlimpses.css';

function EventGlimpses() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [glimpses, setGlimpses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlimpses = async () => {
      try {
        console.log('Fetching glimpses from API...');
        const glimpsesData = await getGlimpses();
        console.log('Glimpses received:', glimpsesData);
        
        // Always include Alumni Meet as first item
        const alumniMeet = {
          id: 'alumni-meet-static',
          title: "Alumni Meet",
          description: "A heartwarming reunion of HU family members sharing memories and celebrating success stories",
          image_path: "images/logo.jpeg",
          video_url: "https://www.youtube.com/embed/tCmR4YyQGQE",
          hashtags: "#AlumniMeet #HUFamily #Reunion"
        };
        
        // Validate that glimpsesData is an array
        const apiGlimpses = Array.isArray(glimpsesData) ? glimpsesData : [];
        const hasAlumniMeet = apiGlimpses.some(g => g.title === "Alumni Meet");
        
        if (hasAlumniMeet) {
          setGlimpses(apiGlimpses);
        } else {
          setGlimpses([alumniMeet, ...apiGlimpses]);
        }
      } catch (error) {
        console.error('Error fetching glimpses:', error);
        console.error('Error details:', error.response || error.message);
        
        // On error, show Alumni Meet as fallback
        const alumniMeet = {
          id: 'alumni-meet-static',
          title: "Alumni Meet",
          description: "A heartwarming reunion of HU family members sharing memories and celebrating success stories",
          image_path: "images/logo.jpeg",
          video_url: "https://www.youtube.com/embed/tCmR4YyQGQE",
          hashtags: "#AlumniMeet #HUFamily #Reunion"
        };
        setGlimpses([alumniMeet]);
      } finally {
        setLoading(false);
      }
    };

    fetchGlimpses();
  }, []);

  const openVideo = (videoUrl) => {
    // Add autoplay parameter to the video URL
    const autoplayUrl = videoUrl.includes('?') 
      ? `${videoUrl}&autoplay=1` 
      : `${videoUrl}?autoplay=1`;
    setSelectedVideo(autoplayUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <section className="event-glimpses">
        <div className="glimpses-container">
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading event glimpses...
          </p>
        </div>
      </section>
    );
  }

  // Always show section (Alumni Meet is always included as fallback)
  return (
    <section className="event-glimpses">
      <div className="glimpses-container">
        <div className="glimpses-header">
          <h2 className="glimpses-title">
            <span className="title-icon">🎉</span>
            Enjoy the Events with HU Family
          </h2>
          <p className="glimpses-subtitle">Relive the memorable moments from our past events</p>
        </div>

        <div className="glimpses-grid">
          {glimpses.map((glimpse) => (
            <div 
              key={glimpse.id} 
              className="glimpse-card"
              onClick={() => glimpse.video_url && openVideo(glimpse.video_url)}
            >
              <div className="glimpse-image-wrapper">
                {glimpse.video_url ? (
                  <>
                    <iframe
                      src={`${glimpse.video_url}?autoplay=1&mute=1&loop=1&playlist=${glimpse.video_url.split('/').pop()}&controls=0&modestbranding=1&rel=0`}
                      title={glimpse.title}
                      frameBorder="0"
                      allow="autoplay; muted"
                      className="glimpse-video-bg"
                    />
                    <div className="video-overlay"></div>
                  </>
                ) : glimpse.image_path ? (
                  <img src={`/${glimpse.image_path}`} alt={glimpse.title} />
                ) : (
                  <div className="no-media-placeholder">
                    <span>🎬</span>
                  </div>
                )}
                {glimpse.video_url && (
                  <div className="play-overlay">
                    <div className="play-button">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
                        <path d="M24 18L42 30L24 42V18Z" fill="#ef4444" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="glimpse-content">
                <h3 className="glimpse-title">{glimpse.title}</h3>
                <p className="glimpse-caption">{glimpse.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeVideo}>
              ×
            </button>
            <div className="video-wrapper">
              <iframe
                src={selectedVideo}
                title="Event Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventGlimpses;
