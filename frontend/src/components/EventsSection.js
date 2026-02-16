import React from 'react';
import './EventsSection.css';

function EventsSection({ events }) {
  return (
    <section className="events-section">
      <div className="events-container">
        <h2>UPCOMING EVENTS</h2>
        {events && events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <img src={`/${event.image_path}`} alt={event.title} />
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p className="event-date">{new Date(event.event_date).toLocaleDateString()}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming events at the moment.</p>
        )}
      </div>
    </section>
  );
}

export default EventsSection;
