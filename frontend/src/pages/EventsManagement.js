import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import './ManagementPage.css';

function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    fetchEvents();
  }, [navigate, fetchEvents]);

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
        fetchEvents();
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="management-page"><p>Loading...</p></div>;
  }

  return (
    <div className="management-page">
      <div className="management-header">
        <AdminNavbar
          title="Events Management"
          primaryActionLabel="+ Add New Event"
          onPrimaryAction={() => navigate('/admin/events/add')}
        />
      </div>

      <div className="management-content">
        {events.length > 0 ? (
          <div className="items-grid">
            {events.map((event) => (
              <div key={event.id} className="item-card">
                <img src={`/${event.image_path}`} alt={event.title} />
                <div className="item-info">
                  <h3>{event.title}</h3>
                  <p>{event.description.substring(0, 100)}...</p>
                  <span className="item-date">{event.event_date}</span>
                </div>
                <div className="item-actions">
                  <button className="edit-btn" onClick={() => navigate(`/admin/events/edit/${event.id}`)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No events found. Add your first event!</p>
            <button className="add-btn" onClick={() => navigate('/admin/events/add')}>
              + Add Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsManagement;
