import { useState, useRef, useCallback } from 'react';
import {
  education,
  experience,
  featuredProjects,
  publication,
  skills,
} from '../data/cvData';
import './ResumeExpand.css';

export default function ResumeExpand() {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div className="resume-expand">
      {/* Header */}
      <button className="resume-header" onClick={toggle} id="resume-toggle">
        <span className="resume-header-icon">📄</span>
        <span className="resume-header-title">Mehul Dinesh — Resume</span>
        <span className={`resume-header-arrow ${expanded ? 'open' : ''}`}>
          {expanded ? 'Close ↑' : 'Expand ↓'}
        </span>
      </button>

      {/* Expandable Content */}
      <div
        ref={contentRef}
        className={`resume-content ${expanded ? 'open' : ''}`}
      >
        <div className="resume-inner">
          {/* Education */}
          <div className="resume-block">
            <h4 className="resume-block-title">Education</h4>
            <p className="resume-text">
              <strong>{education.institution}</strong> — {education.degree}
            </p>
            <p className="resume-meta">{education.period} · {education.location}</p>
          </div>

          {/* Experience */}
          <div className="resume-block">
            <h4 className="resume-block-title">Experience</h4>
            {experience.map((exp, i) => (
              <div key={i}>
                <p className="resume-text">
                  <strong>{exp.role}</strong> — {exp.company}, {exp.location}
                </p>
                <p className="resume-meta">{exp.period}</p>
                <ul className="resume-bullets">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="resume-block">
            <h4 className="resume-block-title">Projects</h4>
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="resume-project">
                <p className="resume-text">
                  <strong>{proj.name}</strong> — {proj.description}
                </p>
                <ul className="resume-bullets">
                  {proj.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Publication */}
          <div className="resume-block">
            <h4 className="resume-block-title">Publication</h4>
            <p className="resume-text">
              <strong>{publication.title}</strong>, {publication.venue}
            </p>
            <p className="resume-meta">{publication.description}</p>
          </div>

          {/* Skills */}
          <div className="resume-block">
            <h4 className="resume-block-title">Skills</h4>
            <div className="resume-skills">
              {skills.map((skill) => (
                <span key={skill} className="resume-skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          {/* Download & Close */}
          <div className="resume-actions">
            <a
              href="/assets/MehulDinesh_CV.pdf"
              download
              className="resume-download"
            >
              ↓ Download PDF
            </a>
            <button className="resume-close" onClick={toggle}>
              Close ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
