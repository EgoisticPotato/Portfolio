import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { careerTimeline, skills } from '../data/cvData';
import ResumeExpand from './ResumeExpand';
import './CareerSection.css';

export default function CareerSection() {
  const { activeSection } = useApp();
  const isActive = activeSection === 'career';
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="career" className={`section career-section ${isActive ? 'active' : ''}`}>
      <div className="section-container">
        <p className="eyebrow">// professional journey</p>
        <h2 className="section-title" style={{ color: 'var(--career-accent)' }}>
          Building Things That Matter
        </h2>

        {/* Career Timeline */}
        <div className="career-timeline">
          <div className="career-timeline-line" />
          {careerTimeline.map((item, i) => (
            <div
              key={item.id}
              className={`career-item ${i % 2 === 0 ? 'left' : 'right'}`}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              {/* Left side: date & org */}
              <div className="career-item-meta">
                <span className="career-period">{item.period}</span>
                <span className="career-org">{item.org}</span>
                <span className="career-location">{item.location}</span>
              </div>

              {/* Center dot */}
              <div className="career-dot" />

              {/* Right side: role & bullets */}
              <div className="career-item-content">
                <h3 className="career-role">{item.role}</h3>
                {item.bullets.length > 0 && (
                  <ul className="career-bullets">
                    {item.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-section">
          <h3 className="skills-heading">Tech Stack</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Expand */}
        <ResumeExpand />
      </div>
    </section>
  );
}
