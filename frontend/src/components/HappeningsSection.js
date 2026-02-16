import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './HappeningsSection.css';

function HappeningsSection({ happenings }) {
  const swiperRef = useRef(null);

  return (
    <section className="happenings-section">
      <div className="happenings-container">
        <h2>HAPPENINGS AT HARIDWAR UNIVERSITY</h2>
        {happenings && happenings.length > 0 ? (
          <>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="happenings-swiper"
            >
              {happenings.map((happening) => (
                <SwiperSlide key={happening.id}>
                  <div className="happening-card">
                    <img src={`/${happening.image_path}`} alt={happening.title} />
                    <div className="happening-content">
                      <h3>{happening.title}</h3>
                      <p>{happening.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-navigation">
              <button onClick={() => swiperRef.current?.swiper.slidePrev()}>←</button>
              <button onClick={() => swiperRef.current?.swiper.slideNext()}>→</button>
            </div>
          </>
        ) : (
          <p>No happenings available at the moment.</p>
        )}
      </div>
    </section>
  );
}

export default HappeningsSection;
