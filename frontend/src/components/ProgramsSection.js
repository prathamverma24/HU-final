import React from 'react';
import './ProgramsSection.css';

const programs = [
  { name: 'Roorkee College of Engineering', image: '/images/Why_Roorkee_College_of_Engineering.avif', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
  { name: 'Roorkee College of Smart Computing', image: '/images/Roorkee-College-of-Smart-Computing.avif', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
  { name: 'Roorkee College of Business Studies', image: '/images/business_studies1.avif', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
  { name: 'Roorkee College of Allied Health Sciences', image: '/images/SmartComputing.avif', link: 'https://huroorkee.ac.in/academics/guidelines-and-policy/ug-pg-program' },
];

function ProgramsSection() {
  return (
    <section id="programs" className="programs-section">
      <div className="programs-container">
        <h2>OUR PROGRAMS</h2>
        <div className="programs-grid">
          {programs.map((program, index) => (
            <a key={index} href={program.link} target="_blank" rel="noopener noreferrer" className="program-card">
              <img src={program.image} alt={program.name} />
              <div className="program-content">
                <h3>{program.name}</h3>
                <button className="visit-btn">Visit Department</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
