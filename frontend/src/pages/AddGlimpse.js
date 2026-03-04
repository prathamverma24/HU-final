import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import './AddContent.css';

function AddGlimpse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    hashtags: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

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
      const embedUrl = convertToEmbedUrl(value);
      setFormData((prev) => ({
        ...prev,
        [name]: embedUrl
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('video_url', formData.video_url);
      formDataToSend.append('hashtags', formData.hashtags);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.post(`${API_BASE_URL}/admin/glimpses`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Glimpse added successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add glimpse. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-content-page">
      <div className="add-content-container">
        <div className="page-header">
          <AdminNavbar title="Add Event Glimpse" />
        </div>

        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Caption/Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event caption or description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video_url">YouTube Video URL *</label>
            <input
              type="url"
              id="video_url"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              required
            />
            <small style={{ color: '#6b7280', marginTop: '5px', display: 'block' }}>
              Paste any YouTube URL (watch, short, share, embed). It will auto-convert.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="hashtags">Hashtags (optional)</label>
            <input
              type="text"
              id="hashtags"
              name="hashtags"
              value={formData.hashtags}
              onChange={handleChange}
              placeholder="#HaridwarUniversity #Events #HUFamily"
            />
            <small style={{ color: '#6b7280', marginTop: '5px', display: 'block' }}>
              Separate hashtags with spaces
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="image">Event Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Adding...' : 'Add Glimpse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGlimpse;
