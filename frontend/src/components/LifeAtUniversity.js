import React from 'react';
import './LifeAtUniversity.css';
import utk1Image from '../assets/utk1.jpg';
import utk2Image from '../assets/utk2.jpg';
import utk3Image from '../assets/utk3.jpg';
import jassiImage from '../assets/jassi.JPG';
import taekImage from '../assets/taek.JPG';
import tugwarImage from '../assets/tugwar.JPG';
import image2023 from '../assets/2023.JPG';
import poolImage from '../assets/pool.JPG';
import lab1Image from '../assets/lab1.JPG';
import basketballImage from '../assets/basketball.jpeg';
import utkarshGirlImage from '../assets/utkarshgirl.jpg';
import utkGirl2Image from '../assets/utkgirl2.JPG';
import sunandhaImage from '../assets/sunandha.PNG';
import hardySandhuImage from '../assets/2018 hardy sandhu.JPG';


const galleryItems = [
  { id: 1, type: 'image', size: 'tile-standard', image: '/images/utkarsh.jpeg', alt: 'Cultural performance' },
  { id: 2, type: 'image', size: 'tile-standard', image: utk2Image, alt: 'Honorable Chief Guest' },
  { id: 3, type: 'image', size: 'tile-featured', image: jassiImage, alt: 'Music Concert by Jassi Gill' },
  { id: 4, type: 'image', size: 'tile-featured', image: utkarshGirlImage, alt: 'Dance Performance On Utkarsh' },
  { id: 5, type: 'image', size: 'tile-standard', image: hardySandhuImage, alt: 'Music concert' },
  { id: 6, type: 'image', size: 'tile-standard', image: '/images/utt.jpeg', alt: 'Traditional drummers' },
  { id: 7, type: 'image', size: 'tile-featured', image: utk1Image, alt: 'Honorable Chairman CA SK Gupta Sir' },
  { id: 8, type: 'image', size: 'tile-standard', image: taekImage, alt: 'Solo performance' },
  {
    id: 9,
    type: 'image',
    size: 'tile-standard',
    image: sunandhaImage,
    alt: 'Grace, conidence, and passion in solo performance by Sunandha sharma',
  },
  { id: 10, type: 'image', size: 'tile-standard', image: tugwarImage, alt: 'Tug of war event' },
  { id: 11, type: 'image', size: 'tile-standard', image: poolImage, alt: '8Ball Pool Game ' },
  { id: 12, type: 'image', size: 'tile-tall', image: utkGirl2Image, alt: 'Cultural costume close-up' },
  { id: 13, type: 'image', size: 'tile-featured', image: utk3Image, alt: 'Festival parade' },
  { id: 14, type: 'image', size: 'tile-tall', image: basketballImage, alt: 'Basketball game in Krida2k23' },
  { id: 15, type: 'image', size: 'tile-standard', image: lab1Image, alt: 'Innovation lab' },
];

function LifeAtUniversity() {
  return (
    <section className="life-at-university">
      <div className="life-container">
        <h2 className="life-title">LIFE@ HARIDWAR UNIVERSITY</h2>

        <div className="life-gallery" role="list" aria-label="Life at university gallery">
          {galleryItems.map((item) => (
            <article
              key={item.id}
              className={`life-tile ${item.size} ${item.type === 'text' ? 'life-tile-text' : ''}`}
              role="listitem"
            >
              {item.type === 'image' ? (
                <>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/logo.jpeg';
                    }}
                  />
                  <div className="life-tile-overlay">
                    <h3>{item.title || item.alt}</h3>
                    <p>{item.description || 'Life at Haridwar University'}</p>
                  </div>
                </>
              ) : (
                <p>{item.title}</p>
              )}
            </article>
          ))}
        </div>

        <a className="life-view-more" href="/life-at-university">
          <span aria-hidden="true">↗</span>
          <span>View More</span>
        </a>
      </div>
    </section>
  );
}

export default LifeAtUniversity;
