import { useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { featuredProjects } from '../data/cvData';
import './ProjectsSection.css';

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card-header">
        <span className="badge project-badge">{project.badge}</span>
        {project.emoji && <span className="project-emoji">{project.emoji}</span>}
      </div>

      <h3 className="project-name">
        {project.name}
        {project.emoji && <span className="project-trophy"> 🏆</span>}
      </h3>

      <p className="project-desc">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="project-tech-tag">{t}</span>
        ))}
      </div>

      <ul className="project-bullets">
        {project.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <div className="project-footer">
        <span className="project-featured">{project.footer}</span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { activeSection } = useApp();
  const isActive = activeSection === 'projects';

  return (
    <section id="projects" className={`section projects-section ${isActive ? 'active' : ''}`}>
      <div className="section-container">
        <p className="eyebrow">// what i've built</p>
        <h2 className="section-title" style={{ color: 'var(--projects-accent)' }}>
          Shipped.
        </h2>

        <div className="projects-grid">
          {featuredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
