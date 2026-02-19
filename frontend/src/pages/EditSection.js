import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSectionContent, updateSectionContent } from '../services/api';
import './AddContent.css';

function EditSection() {
  const { sectionName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      if (isLoggedIn !== 'true') {
        navigate('/admin/login');
      }
    };
    checkAuth();
    fetchSectionContent();
  }, [navigate, sectionName]);

  const fetchSectionContent = async () => {
    try {
      const data = await getSectionContent(sectionName);
      setContent(data.content);
    } catch (error) {
      console.error('Error fetching section:', error);
      setError('Failed to load section content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateSectionContent(sectionName, content);
      alert('Section updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating section:', error);
      setError('Failed to update section. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    setContent(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setContent(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), defaultItem]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setContent(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName] || []).filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="add-content-page"><p>Loading...</p></div>;
  }

  const renderHeroEditor = () => (
    <>
      <div className="form-group">
        <label>Badge Text</label>
        <input
          type="text"
          value={content.badge_text || ''}
          onChange={(e) => updateField('badge_text', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Title (White Part)</label>
        <input
          type="text"
          value={content.title_white || ''}
          onChange={(e) => updateField('title_white', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Title (Green Part)</label>
        <input
          type="text"
          value={content.title_green || ''}
          onChange={(e) => updateField('title_green', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={content.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows="4"
          required
        />
      </div>
      <div className="form-group">
        <label>Apply Now Link</label>
        <input
          type="url"
          value={content.apply_now_link || ''}
          onChange={(e) => updateField('apply_now_link', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Campus Tour Link</label>
        <input
          type="url"
          value={content.campus_tour_link || ''}
          onChange={(e) => updateField('campus_tour_link', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Video URL (YouTube Embed)</label>
        <input
          type="url"
          value={content.video_url || ''}
          onChange={(e) => updateField('video_url', e.target.value)}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
        />
      </div>
    </>
  );

  const renderAboutEditor = () => (
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={content.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows="5"
          required
        />
      </div>
      <div className="form-group">
        <label>Know More Link</label>
        <input
          type="url"
          value={content.know_more_link || ''}
          onChange={(e) => updateField('know_more_link', e.target.value)}
          required
        />
      </div>
    </>
  );

  const renderWhyEditor = () => (
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={content.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows="5"
          required
        />
      </div>
      <div className="form-section">
        <h3>Reasons</h3>
        {(content.reasons || []).map((reason, index) => (
          <div key={index} className="array-item">
            <h4>Reason {index + 1}</h4>
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                value={reason.id || ''}
                onChange={(e) => updateArrayItem('reasons', index, 'id', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={reason.title || ''}
                onChange={(e) => updateArrayItem('reasons', index, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={reason.subtitle || ''}
                onChange={(e) => updateArrayItem('reasons', index, 'subtitle', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Image Path</label>
              <input
                type="text"
                value={reason.image || ''}
                onChange={(e) => updateArrayItem('reasons', index, 'image', e.target.value)}
              />
            </div>
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('reasons', index)}>
              Remove Reason
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addArrayItem('reasons', { id: '', title: '', subtitle: '', image: '' })}
        >
          + Add Reason
        </button>
      </div>
    </>
  );

  const renderUtkarshEditor = () => (
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Subtitle</label>
        <input
          type="text"
          value={content.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Background Video URL</label>
        <input
          type="url"
          value={content.background_video || ''}
          onChange={(e) => updateField('background_video', e.target.value)}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
        />
      </div>
      <div className="form-group">
        <label>Background Image Path</label>
        <input
          type="text"
          value={content.background_image || ''}
          onChange={(e) => updateField('background_image', e.target.value)}
        />
      </div>
      <div className="form-section">
        <h3>Fests</h3>
        {(content.fests || []).map((fest, index) => (
          <div key={index} className="array-item">
            <h4>Fest {index + 1}</h4>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={fest.name || ''}
                onChange={(e) => updateArrayItem('fests', index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={fest.category || ''}
                onChange={(e) => updateArrayItem('fests', index, 'category', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={fest.description || ''}
                onChange={(e) => updateArrayItem('fests', index, 'description', e.target.value)}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                value={fest.color || ''}
                onChange={(e) => updateArrayItem('fests', index, 'color', e.target.value)}
                placeholder="#FF6B6B"
              />
            </div>
            <div className="form-group">
              <label>Video ID (YouTube)</label>
              <input
                type="text"
                value={fest.video_id || ''}
                onChange={(e) => updateArrayItem('fests', index, 'video_id', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={fest.image_url || ''}
                onChange={(e) => updateArrayItem('fests', index, 'image_url', e.target.value)}
              />
            </div>
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('fests', index)}>
              Remove Fest
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addArrayItem('fests', { name: '', category: '', description: '', color: '#FF6B6B', video_id: null, image_url: null })}
        >
          + Add Fest
        </button>
      </div>
    </>
  );

  const renderTechnicalEditor = () => (
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          required
        />
      </div>
      <div className="form-section">
        <h3>Activities</h3>
        {(content.activities || []).map((activity, index) => (
          <div key={index} className="array-item">
            <h4>Activity {index + 1}</h4>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={activity.title || ''}
                onChange={(e) => updateArrayItem('activities', index, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={activity.description || ''}
                onChange={(e) => updateArrayItem('activities', index, 'description', e.target.value)}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Image Path</label>
              <input
                type="text"
                value={activity.image || ''}
                onChange={(e) => updateArrayItem('activities', index, 'image', e.target.value)}
              />
            </div>
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('activities', index)}>
              Remove Activity
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addArrayItem('activities', { title: '', description: '', image: '/images/placeholder.jpg' })}
        >
          + Add Activity
        </button>
      </div>
    </>
  );

  const renderEditor = () => {
    switch (sectionName) {
      case 'hero':
        return renderHeroEditor();
      case 'about':
        return renderAboutEditor();
      case 'why':
        return renderWhyEditor();
      case 'utkarsh':
        return renderUtkarshEditor();
      case 'technical':
        return renderTechnicalEditor();
      default:
        return <p>Unknown section type</p>;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      hero: 'Hero Section',
      about: 'About Section',
      why: 'Why Section',
      utkarsh: 'Utkarsh Section',
      technical: 'Technical Section'
    };
    return titles[sectionName] || 'Section';
  };

  return (
    <div className="add-content-page">
      <div className="add-content-header">
        <h1>Edit {getSectionTitle()}</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-content-form">
        {renderEditor()}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSection;
