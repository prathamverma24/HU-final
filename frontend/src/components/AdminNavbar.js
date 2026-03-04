import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function AdminNavbar({
  title,
  showPreview = true,
  showBack = true,
  backPath = '/admin/dashboard',
  backLabel = 'Back to Dashboard',
  primaryActionLabel,
  onPrimaryAction
}) {
  const navigate = useNavigate();

  return (
    <div className="admin-page-navbar">
      <h1 className="admin-page-navbar-title">{title}</h1>

      <div className="admin-page-navbar-actions">
        {showPreview && (
          <button className="admin-page-btn admin-page-btn-preview" onClick={() => window.open('/', '_blank')}>
            <EyeIcon />
            Live Preview
          </button>
        )}

        {primaryActionLabel && onPrimaryAction && (
          <button className="admin-page-btn admin-page-btn-primary" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </button>
        )}

        {showBack && (
          <button className="admin-page-btn admin-page-btn-back" onClick={() => navigate(backPath)}>
            ← {backLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;
