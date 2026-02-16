import React from 'react';
import './SportsGallery.css';

const sports = [
  { name: 'University Basketball Court', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80' },
  { name: 'Annual Cricket Tournament', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&q=80' },
  { name: 'Football Field', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80' },
  { name: 'Sports Carnival 2023', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=500&q=80' },
  { name: 'Indoor Table Tennis Facility', image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=500&q=80' },
  { name: 'Modern Gymnasium', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80' },
  { name: 'Volleyball Tournament', image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&q=80' },
  { name: 'Indoor Badminton Court', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&q=80' },
];

function SportsGallery() {
  return (
    <section className="sports-gallery">
      <div className="sports-container">
        <h2>Sports Gallery</h2>
        <div className="sports-grid">
          {sports.map((sport, index) => (
            <div key={index} className="sport-card">
              <img src={sport.image} alt={sport.name} />
              <p>{sport.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SportsGallery;
