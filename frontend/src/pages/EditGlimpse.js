import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlimpse();
  }, [id]);

  const convertToEmbedUrl = (url) => {
    if (!url) return '';
    
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    let videoId = '';
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (url.includes('m.youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
    setSubmitting(true);
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
      await axios.put(`${API_BASE_URL}/admin/glimpses/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Glimpse updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update glimpse. Please try again.');
      console.error('Error:', err);
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
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>✏️ Edit Event Glimpse</h1>
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
              placeholder="Paste any YouTube video URL"
              required
            />
            <small style={{color: '#10b981', marginTop: '5px', display: 'block', fontWeight: '500'}}>
              ✓ Paste any YouTube URL - it will be converted automatically!
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
          </div>

          <div className="form-group">
            <label htmlFor="image">Event Image (optional - leave empty to keep current)</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="New preview" />
                <p style={{marginTop: '10px', color: '#10b981', fontWeight: '500'}}>New image selected</p>
              </div>
            ) : currentImage && (
              <div className="image-preview">
                <img src={`/${currentImage}`} alt="Current" />
                <p style={{marginTop: '10px', color: '#6b7280'}}>Current image</p>
              </div>
            )}
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
