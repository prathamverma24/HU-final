import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './PlacementSection.css';

import placement1 from '../assets/1.avif';
import placement4 from '../assets/4.avif';
import placement8 from '../assets/8.avif';
import placementArghya from '../assets/arghya_kar.avif';
import placementJaiveer from '../assets/jaiveer_singh.avif';

const placementCards = [
  { id: 1, image: placement1, alt: 'Placement card 1', position: 'center 42%' },
  { id: 2, image: placement4, alt: 'Placement card 2', position: 'center 38%' },
  { id: 3, image: placement8, alt: 'Placement card 3', position: 'center 40%' },
  { id: 4, image: placementArghya, alt: 'Placement card 4', position: 'center 36%' },
  { id: 5, image: placementJaiveer, alt: 'Placement card 5', position: 'center 40%' }
];

function PlacementSection() {
  return (
    <section className="placement-section">
      <div className="placement-container">
        <div className="placement-header">
          <h2>Placements Overview</h2>
          <p>
            <strong>World&apos;s Leading Brands</strong> Hire Our Talented Students
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={26}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          loop
          speed={700}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2
            }
          }}
          className="placement-swiper"
        >
          {placementCards.map((card) => (
            <SwiperSlide key={card.id}>
              <article className="placement-card">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  style={{ objectPosition: card.position }}
                />
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default PlacementSection;
