import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGlimpses, deleteGlimpse } from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import './ManagementPage.css';

function GlimpsesManagement() {
  const [glimpses, setGlimpses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchGlimpses = useCallback(async () => {
    try {
      const data = await getGlimpses();
      setGlimpses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching glimpses:', error);
      setGlimpses([]);
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
    fetchGlimpses();
  }, [navigate, fetchGlimpses]);

  const handleDelete = async (glimpseId) => {
    if (window.confirm('Are you sure you want to delete this glimpse?')) {
      try {
        await deleteGlimpse(glimpseId);
        fetchGlimpses();
        alert('Glimpse deleted successfully!');
      } catch (error) {
        console.error('Error deleting glimpse:', error);
        alert('Failed to delete glimpse. Please try again.');
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
          title="Event Glimpses Management"
          primaryActionLabel="+ Add New Glimpse"
          onPrimaryAction={() => navigate('/admin/glimpses/add')}
        />
      </div>

      <div className="management-content">
        {glimpses.length > 0 ? (
          <div className="items-grid">
            {glimpses.map((glimpse) => (
              <div key={glimpse.id} className="item-card">
                {glimpse.image_path ? (
                  <img src={`/${glimpse.image_path}`} alt={glimpse.title} />
                ) : (
                  <div className="video-thumbnail">
                    <iframe
                      src={`${glimpse.video_url}?autoplay=0&mute=1`}
                      title={glimpse.title}
                      style={{ width: '100%', height: '200px', pointerEvents: 'none', border: 'none' }}
                    />
                  </div>
                )}
                <div className="item-info">
                  <h3>{glimpse.title}</h3>
                  <p>{glimpse.description.substring(0, 100)}...</p>
                  {glimpse.hashtags && <span className="item-hashtags">{glimpse.hashtags}</span>}
                </div>
                <div className="item-actions">
                  <button className="edit-btn" onClick={() => navigate(`/admin/glimpses/edit/${glimpse.id}`)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(glimpse.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No glimpses found. Add your first glimpse!</p>
            <button className="add-btn" onClick={() => navigate('/admin/glimpses/add')}>
              + Add Glimpse
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GlimpsesManagement;
