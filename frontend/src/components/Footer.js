import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Logo and About Section */}
          <div className="footer-column">
            <div className="footer-logo">
              <img src="/images/logo.jpeg" alt="Haridwar University" />
            </div>
            <h4>ABOUT Haridwar University</h4>
            <ul>
              <li>Rankings</li>
              <li>Accreditation</li>
              <li>Leadership</li>
              <li>Press Media</li>
              <li>Governance</li>
            </ul>
          </div>

          {/* Interest Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>INTEREST</h4>
            <ul>
              <li>Agriculture</li>
              <li>Commerce</li>
              <li>Architecture</li>
              <li>Artificial Intelligence</li>
              <li>AI and Data Science</li>
              <li>Allied Health Sciences</li>
              <li>Ayurveda</li>
              <li>Cyber Security</li>
              <li>Business</li>
              <li>Computing</li>
              <li>Engineering</li>
              <li>Medicine</li>
              <li>Nursing</li>
              <li>Pharmacy</li>
            </ul>
          </div>

          {/* Research Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>RESEARCH</h4>
            <ul>
              <li>Centers</li>
              <li>Google Scholar</li>
              <li>News</li>
              <li>Patents</li>
              <li>Projects</li>
              <li>Publications</li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>QUICK LINKS</h4>
            <ul>
              <li>Apply Now</li>
              <li>Maps & Direction</li>
              <li>Anti Ragging</li>
              <li>Outreach</li>
              <li>News</li>
              <li>Events</li>
              <li>Jobs</li>
              <li>Contact</li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>PROGRAMS</h4>
            <ul>
              <li>Undergraduate</li>
              <li>Postgraduate</li>
              <li>International</li>
              <li>Certificate Courses</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>&copy; 2026 Haridwar University. All rights reserved.</p>
          <div className="footer-links">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Sitemap</span>
          </div>
          <Link to="/admin/login" className="admin-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
