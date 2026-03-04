import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import './AddContent.css';

function EditGlimpse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    hashtags: '',
    image: null
  });
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchGlimpse = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${API_BASE_URL}/admin/glimpses/${id}`);
        const glimpse = response.data;

        setFormData({
          title: glimpse.title,
          description: glimpse.description,
          video_url: glimpse.video_url,
          hashtags: glimpse.hashtags || '',
          image: null
        });
        setCurrentImage(glimpse.image_path);
      } catch (err) {
        setError('Failed to load glimpse data');
      } finally {
        setLoading(false);
      }
    };

    fetchGlimpse();
  }, [id]);

  const convertToEmbedUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    const patterns = [
      /youtu\.be\/([a-zA-Z0-9_-]{11})/i,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
      /youtube\.com\/watch\?.*?[?&]v=([a-zA-Z0-9_-]{11})/i,
      /m\.youtube\.com\/watch\?.*?[?&]v=([a-zA-Z0-9_-]{11})/i,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/i,
      /[?&]v=([a-zA-Z0-9_-]{11})/i
    ];

    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match?.[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    return trimmed;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'video_url') {
      setFormData((prev) => ({ ...prev, [name]: convertToEmbedUrl(value) }));
      return;
    }
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
    setSubmitting(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('video_url', formData.video_url);
      payload.append('hashtags', formData.hashtags);
      if (formData.image) payload.append('image', formData.image);

      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.put(`${API_BASE_URL}/admin/glimpses/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Glimpse updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update glimpse. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-content-page">
        <div className="add-content-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-content-page">
      <div className="add-content-container">
        <div className="page-header">
          <AdminNavbar title="Edit Event Glimpse" />
        </div>

        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Caption/Description *</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video_url">YouTube Video URL *</label>
            <input id="video_url" name="video_url" type="url" value={formData.video_url} onChange={handleChange} required />
            <small style={{ color: '#6b7280', marginTop: '5px', display: 'block' }}>
              Paste any YouTube URL (watch, short, share, embed). It will auto-convert.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="hashtags">Hashtags (optional)</label>
            <input id="hashtags" name="hashtags" type="text" value={formData.hashtags} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="image">Event Image (optional; leave empty to keep current)</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="New preview" />
              </div>
            ) : currentImage ? (
              <div className="image-preview">
                <img src={`/${currentImage}`} alt="Current" />
              </div>
            ) : null}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? 'Updating...' : 'Update Glimpse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGlimpse;
