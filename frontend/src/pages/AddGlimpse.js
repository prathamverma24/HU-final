import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    // Handle different YouTube URL formats and convert to embed
    if (!url) return '';
    
    // Already embed format
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Extract video ID from different formats
    let videoId = '';
    
    // Format: https://youtu.be/VIDEO_ID
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    }
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    // Format: https://m.youtube.com/watch?v=VIDEO_ID
    else if (url.includes('m.youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    // Format: https://youtube.com/watch?v=VIDEO_ID
    else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    
    // If we found a video ID, return embed URL
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Return original if we couldn't parse it
    return url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-convert video URL to embed format
    if (name === 'video_url') {
      const embedUrl = convertToEmbedUrl(value);
      setFormData(prev => ({
        ...prev,
        [name]: embedUrl
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
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
          'Content-Type': 'multipart/form-data',
        },
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
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>🎉 Add Event Glimpse</h1>
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
            <small style={{color: '#6b7280', marginTop: '5px', display: 'block'}}>
              Use embed format: https://www.youtube.com/embed/VIDEO_ID
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
            <small style={{color: '#6b7280', marginTop: '5px', display: 'block'}}>
              Separate hashtags with spaces
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="image">Event Image *</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
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
