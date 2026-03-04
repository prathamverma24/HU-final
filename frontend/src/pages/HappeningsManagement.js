import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHappenings, deleteHappening } from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import './ManagementPage.css';

function HappeningsManagement() {
  const [happenings, setHappenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHappenings = useCallback(async () => {
    try {
      const data = await getHappenings();
      setHappenings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching happenings:', error);
      setHappenings([]);
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
    fetchHappenings();
  }, [navigate, fetchHappenings]);

  const handleDelete = async (happeningId) => {
    if (window.confirm('Are you sure you want to delete this happening?')) {
      try {
        await deleteHappening(happeningId);
        fetchHappenings();
        alert('Happening deleted successfully!');
      } catch (error) {
        console.error('Error deleting happening:', error);
        alert('Failed to delete happening. Please try again.');
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
          title="Happenings Management"
          primaryActionLabel="+ Add New Happening"
          onPrimaryAction={() => navigate('/admin/happenings/add')}
        />
      </div>

      <div className="management-content">
        {happenings.length > 0 ? (
          <div className="items-grid">
            {happenings.map((happening) => (
              <div key={happening.id} className="item-card">
                <img src={`/${happening.image_path}`} alt={happening.title} />
                <div className="item-info">
                  <h3>{happening.title}</h3>
                  <p>{happening.description.substring(0, 100)}...</p>
                </div>
                <div className="item-actions">
                  <button className="edit-btn" onClick={() => navigate(`/admin/happenings/edit/${happening.id}`)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(happening.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No happenings found. Add your first happening!</p>
            <button className="add-btn" onClick={() => navigate('/admin/happenings/add')}>
              + Add Happening
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HappeningsManagement;
