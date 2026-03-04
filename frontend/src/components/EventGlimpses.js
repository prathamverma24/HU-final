import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { getGlimpses } from '../services/api';
import './EventGlimpses.css';

function EventGlimpses() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [glimpses, setGlimpses] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  // Hardcoded fallback glimpses to ensure content is always visible
  const defaultGlimpses = [
    {
      id: 'glimpse-1',
      title: 'Alumni Meet',
      description: 'A heartwarming reunion of HU family members sharing memories and celebrating success stories',
      image_path: 'images/logo.jpeg',
      video_url: 'https://www.youtube.com/embed/tCmR4YyQGQE',
      hashtags: '#AlumniMeet #HUFamily #Reunion'
    },
    {
      id: 'glimpse-2',
      title: 'DJ Night 2026',
      description: 'An electrifying night of music, dance, and celebration with the HU family',
      image_path: 'images/djnight.jpeg',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      hashtags: '#DJNight #HUEvents #Party'
    },
    {
      id: 'glimpse-3',
      title: 'Campus Festival',
      description: 'Vibrant campus life with diverse activities, cultural performances, and student showcases',
      image_path: 'images/campus.jpeg',
      video_url: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      hashtags: '#CampusFestival #HUFamily #StudentLife'
    },
    {
      id: 'glimpse-4',
      title: 'Sports Championship',
      description: 'Showcase of athletic excellence and team spirit in various sports competitions',
      image_path: 'images/sports.jpeg',
      video_url: 'https://www.youtube.com/embed/9bZkp7q19f0',
      hashtags: '#Sports #Championship #Haridwar'
    }
  ];

  useEffect(() => {
    const fetchGlimpses = async () => {
      try {
        const glimpsesData = await getGlimpses();

        // Validate that glimpsesData is an array
        const apiGlimpses = Array.isArray(glimpsesData) && glimpsesData.length > 0 ? glimpsesData : defaultGlimpses;
        setGlimpses(apiGlimpses);
      } catch (error) {
        console.error('Error fetching glimpses:', error);

        // On error, always show hardcoded default glimpses
        setGlimpses(defaultGlimpses);
      } finally {
        setLoading(false);
      }
    };

    fetchGlimpses();
  }, []);

  const getYoutubeVideoId = (url = '') => {
    if (!url) return '';

    const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/i);
    if (embedMatch?.[1]) return embedMatch[1];

    const shortMatch = url.match(/youtu\.be\/([^?&/]+)/i);
    if (shortMatch?.[1]) return shortMatch[1];

    const watchMatch = url.match(/[?&]v=([^?&/]+)/i);
    if (watchMatch?.[1]) return watchMatch[1];

    return '';
  };

  const buildEmbedSrc = (url, { autoplay = 1, mute = 1, controls = 0, loop = 1 } = {}) => {
    const videoId = getYoutubeVideoId(url);

    if (videoId) {
      const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
      embedUrl.searchParams.set('autoplay', String(autoplay));
      embedUrl.searchParams.set('mute', String(mute));
      embedUrl.searchParams.set('controls', String(controls));
      embedUrl.searchParams.set('modestbranding', '1');
      embedUrl.searchParams.set('rel', '0');
      embedUrl.searchParams.set('playsinline', '1');
      if (loop) {
        embedUrl.searchParams.set('loop', '1');
        embedUrl.searchParams.set('playlist', videoId);
      } else {
        embedUrl.searchParams.set('loop', '0');
      }
      return embedUrl.toString();
    }

    // Fallback for non-YouTube/unknown URLs with pre-existing query params.
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=${autoplay}&mute=${mute}&controls=${controls}&modestbranding=1&rel=0&playsinline=1`;
  };

  const openVideo = (videoUrl) => {
    setSelectedVideo(buildEmbedSrc(videoUrl, { autoplay: 1, mute: 0, controls: 1, loop: 0 }));
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (!selectedVideo) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeVideo();
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedVideo]);

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
        <div className="glimpses-swiper-wrapper">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.glimpses-button-next',
              prevEl: '.glimpses-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={glimpses.length > 1}
            speed={800}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1440: {
                slidesPerView: 4,
              },
            }}
            className="glimpses-swiper"
          >
            {glimpses.map((glimpse) => (
              <SwiperSlide key={glimpse.id}>
                <div
                  className="glimpse-card"
                  onClick={() => glimpse.video_url && openVideo(glimpse.video_url)}
                >
                  <div className="glimpse-image-wrapper">
                    {glimpse.video_url ? (
                      <>
                        <iframe
                          src={buildEmbedSrc(glimpse.video_url, { autoplay: 1, mute: 1, controls: 0, loop: 1 })}
                          title={glimpse.title}
                          frameBorder="0"
                          allow="autoplay; muted"
                          className="glimpse-video-bg"
                        />
                        <div className="video-overlay"></div>
                      </>
                    ) : glimpse.image_path ? (
                      <img src={`/${glimpse.image_path}`} alt={glimpse.title} loading="lazy" />
                    ) : (
                      <div className="no-media-placeholder">
                        <span>??</span>
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="glimpses-navigation">
            <button className="glimpses-button-prev" aria-label="Previous glimpse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="glimpses-button-next" aria-label="Next glimpse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && typeof document !== 'undefined' && createPortal(
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeVideo} aria-label="Close large video">
              &times;
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
        </div>,
        document.body
      )}
    </section>
  );
}

export default EventGlimpses;
