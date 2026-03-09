import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const footerColumns = {
  about: [
    { label: 'Rankings', href: 'https://huroorkee.ac.in' },
    { label: 'Accreditation', href: 'https://huroorkee.ac.in' },
    { label: 'Leadership', href: 'https://huroorkee.ac.in' },
    { label: 'Press Media', href: 'https://huroorkee.ac.in' },
    { label: 'Governance', href: 'https://huroorkee.ac.in' }
  ],
  interest: [
    { label: 'Agriculture', href: '/#programs' },
    { label: 'Commerce', href: '/#programs' },
    { label: 'Architecture', href: '/#programs' },
    { label: 'Artificial Intelligence', href: '/#programs' },
    { label: 'AI and Data Science', href: '/#programs' },
    { label: 'Allied Health Sciences', href: '/#programs' },
    { label: 'Cyber Security', href: '/#programs' },
    { label: 'Business', href: '/#programs' },
    { label: 'Computing', href: '/#programs' },
    { label: 'Engineering', href: '/#programs' },
    { label: 'Medicine', href: '/#programs' },
    { label: 'Nursing', href: '/#programs' },
    { label: 'Pharmacy', href: '/#programs' }
  ],
  research: [
    { label: 'Centers', href: 'https://huroorkee.ac.in' },
    { label: 'Google Scholar', href: 'https://scholar.google.com' },
    { label: 'News', href: 'https://huroorkee.ac.in' },
    { label: 'Patents', href: 'https://huroorkee.ac.in' },
    { label: 'Projects', href: 'https://huroorkee.ac.in' },
    { label: 'Publications', href: 'https://huroorkee.ac.in' }
  ],
  quickLinks: [
    { label: 'Apply Now', href: 'https://huroorkee.ac.in/apply-now' },
    { label: 'Maps & Direction', href: 'https://maps.google.com/?q=Haridwar+University+Roorkee' },
    { label: 'Anti Ragging', href: 'https://huroorkee.ac.in' },
    { label: 'Outreach', href: 'https://huroorkee.ac.in' },
    { label: 'News', href: 'https://huroorkee.ac.in' },
    { label: 'Events', href: '/#events' },
    { label: 'Jobs', href: 'https://huroorkee.ac.in' },
    { label: 'Contact', href: '/contact' }
  ],
  programs: [
    { label: 'Undergraduate', href: '/#programs' },
    { label: 'Postgraduate', href: '/#programs' },
    { label: 'International', href: '/#programs' },
    { label: 'Certificate Courses', href: '/#programs' }
  ],
  legal: [
    { label: 'Privacy Policy', href: 'https://huroorkee.ac.in' },
    { label: 'Terms & Conditions', href: 'https://huroorkee.ac.in' },
    { label: 'Sitemap', href: 'https://huroorkee.ac.in/sitemap_index.xml' }
  ]
};

function FooterList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        const isExternal = item.href.startsWith('http');
        return (
          <li key={item.label}>
            <a
              href={item.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

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
            <FooterList items={footerColumns.about} />
          </div>

          {/* Interest Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>INTEREST</h4>
            <FooterList items={footerColumns.interest} />
          </div>

          {/* Research Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>RESEARCH</h4>
            <FooterList items={footerColumns.research} />
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>QUICK LINKS</h4>
            <FooterList items={footerColumns.quickLinks} />
          </div>

          {/* Programs Column */}
          <div className="footer-column">
            <h4><span className="accent-bar"></span>PROGRAMS</h4>
            <FooterList items={footerColumns.programs} />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>&copy; 2026 Haridwar University. All rights reserved.</p>
          <div className="footer-links">
            {footerColumns.legal.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ))}
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
