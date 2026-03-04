import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    try {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      const email = localStorage.getItem('adminEmail');
      
      if (isLoggedIn === 'true' && email) {
        // User is authenticated
      } else {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminEmail');
      
      adminLogout().catch(() => {});
      
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin/login');
    }
  };

  if (loading) {
    return <div className="admin-dashboard"><p>Loading...</p></div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Blue Header */}
      <div className="dashboard-top-header">
        <div className="header-left">
          <h1>HARIDWAR UNIVERSITY</h1>
          <p>Content Management System</p>
        </div>
        <div className="header-right">
          <button className="preview-website-btn" onClick={() => window.open('/', '_blank')} title="View Live Website">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Live Preview
          </button>
          <span className="welcome-text">Welcome, admin</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main-content">
        {/* Page Title */}
        <div className="page-title-section">
          <h2>Admin Dashboard</h2>
          <p>Manage your website content section by section</p>
        </div>

        {/* Section Cards Grid */}
        <div className="sections-grid">
          {/* Hero Section Card */}
          <div className="section-card hero-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Hero Section</h3>
              <p>Edit main banner, title, subtitle, and CTA buttons</p>
            </div>
            <button className="card-btn hero-btn" onClick={() => navigate('/admin/sections/edit/hero')}>
              Edit Section
            </button>
          </div>

          {/* Placement Stats Card */}
          <div className="section-card placement-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>About Section</h3>
              <p>Update university information and description</p>
            </div>
            <button className="card-btn placement-btn" onClick={() => navigate('/admin/sections/edit/about')}>
              Edit Section
            </button>
          </div>

          {/* Trust Ribbon Card */}
          <div className="section-card trust-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Trust Ribbon</h3>
              <p>Manage recognition and accreditation badges</p>
            </div>
            <button className="card-btn trust-btn" onClick={() => navigate('/admin/sections/edit/why')}>
              Edit Section
            </button>
          </div>

          {/* Events Management Card */}
          <div className="section-card events-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Events Management</h3>
              <p>Add, edit, and manage university events</p>
            </div>
            <button className="card-btn events-btn" onClick={() => navigate('/admin/events/manage')}>
              Manage Events
            </button>
          </div>

          {/* Happenings Management Card */}
          <div className="section-card happenings-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H9L11 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13H15M12 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Happenings</h3>
              <p>Manage latest news and campus happenings</p>
            </div>
            <button className="card-btn happenings-btn" onClick={() => navigate('/admin/happenings/manage')}>
              Manage Happenings
            </button>
          </div>

          {/* Glimpses Management Card */}
          <div className="section-card glimpses-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 10L19.553 7.724C20.1174 7.44193 20.7762 7.90421 20.7762 8.5547V15.4453C20.7762 16.0958 20.1174 16.5581 19.553 16.276L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Event Glimpses</h3>
              <p>Add video glimpses and event highlights</p>
            </div>
            <button className="card-btn glimpses-btn" onClick={() => navigate('/admin/glimpses/manage')}>
              Manage Glimpses
            </button>
          </div>
        </div>

        {/* More Sections Placeholder */}
        <div className="more-sections-card">
          <h3>More Sections</h3>
          <p>Coming soon...</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Sections</p>
            <p className="stat-value">12</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Last Updated</p>
            <p className="stat-value">Today</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Cache Status</p>
            <p className="stat-value active">Active</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">API Status</p>
            <p className="stat-value online">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
