import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHappening, updateHappening } from '../services/api';
import AdminNavbar from '../components/AdminNavbar';
import './AddContent.css';

function EditHappening() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchHappening = async () => {
      try {
        const happening = await getHappening(id);
        setFormData({
          title: happening.title,
          description: happening.description,
          image: null
        });
        setCurrentImage(happening.image_path);
      } catch (err) {
        setError('Failed to load happening data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchHappening();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      if (formData.image) payload.append('image', formData.image);
      await updateHappening(id, payload);
      alert('Happening updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update happening. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="add-content-page">
        <div className="add-content-container">
          <p>Loading happening data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-content-page">
      <div className="add-content-container">
        <div className="page-header">
          <AdminNavbar title="Edit Happening" />
        </div>

        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="title">Happening Title *</label>
            <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Happening Description *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Happening Image (leave empty to keep current)</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            {preview ? (
              <div className="image-preview">
                <p>New Image:</p>
                <img src={preview} alt="Preview" />
              </div>
            ) : currentImage ? (
              <div className="image-preview">
                <p>Current Image:</p>
                <img src={`/${currentImage}`} alt="Current" />
              </div>
            ) : null}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Updating...' : 'Update Happening'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHappening;
