import React, { useState } from 'react';
import './ProgramsSection.css';

const programsData = {
  'Smart Computing': [
    { name: 'B.Tech. Hons. CSE', duration: '4 Years (8 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech Hons. Data Science', duration: '4 Years (8 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program', highlight: true },
    { name: 'BCA', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'BCA Cyber Security', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Tech. CS', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech Hons. AI & ML', duration: '4 Years (8 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech LE – CSE', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'BCA AI & ML', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Sc. Computer Science (Data Science)', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Tech. CSE', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech Hons. Cyber Security', duration: '4 Years (8 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech LE – AI & ML', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'BCA Data Science', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'MCA With AI', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' }
  ],
  'Engineering': [
    { name: 'B.Tech. Hons. ECE with AI (VLSI Certification from IIT/NIT)', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech. Hons. ME with AI', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Tech. CE', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech. Hons. CE with AI', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech. Hons. LE - ECE', duration: '3 Years (6 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Tech. ME', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Tech. Hons. EEE with AI', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Tech. ECE', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Tech. EEE', duration: '2 Years (4 Semesters)', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' }
  ],
  'Business Studies': [
    { name: 'BBA with AI', duration: '3 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'MBA with AI (with IIM/IIT/NIT Certification – Finance/HR/Marketing)', duration: '2 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Com with AI', duration: '3 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' }
  ],
  'Allied Health Sciences': [
    { name: 'B.Sc. Nursing (with AI)', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'D.Pharm (with AI)', duration: '2 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Pharm (with AI)', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Pharm Pharmaceutics', duration: '2 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'B.Pharm LE (with AI)', duration: '3 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' }
  ],
  'Agricultural Sciences': [
    { name: 'B.Sc. Agriculture Hons. with AI (ICAR Certification)', duration: '4 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
    { name: 'M.Sc. Agriculture (Agronomy)', duration: '2 Years', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' }
  ]
};

function ProgramsSection() {
  const [activeTab, setActiveTab] = useState('Smart Computing');
  const tabs = Object.keys(programsData);

  return (
    <section id="programs" className="find-program-section">
      <div className="find-program-container">
        <h2>Find a <strong>Program</strong></h2>
        
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              Roorkee College of {tab}
              {activeTab === tab && <span className="tab-indicator">●</span>}
            </button>
          ))}
        </div>

        <div className="programs-list">
          {programsData[activeTab].map((program, index) => (
            <a
              key={index}
              href={program.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`program-item ${program.highlight ? 'highlight' : ''}`}
            >
              <div className="program-info">
                <h3>{program.name}</h3>
                <p>{program.duration}</p>
              </div>
              <span className="program-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
