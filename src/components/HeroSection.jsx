import { useApp } from '../context/AppContext';
import { personalInfo } from '../data/cvData';
import './HeroSection.css';

export default function HeroSection() {
  const { activeSection, goToSection } = useApp();
  const isActive = activeSection === 'hero';

  return (
    <section id="hero" className={`section hero-section ${isActive ? 'active' : ''}`}>
      <div className="hero-content">
        {/* Rotating Iris SVG — white monochrome */}
        <div className="iris-container">
          <svg
            className="iris-svg"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="irisGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e0e0e8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#c8c8d8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="irisGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d8d8e8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
              <filter id="irisGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Outer ring */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="url(#irisGrad1)" strokeWidth="0.5" opacity="0.4" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="url(#irisGrad2)" strokeWidth="0.5" opacity="0.3" />
            {/* Mandala petals */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const x1 = 200 + Math.cos(angle) * 60;
              const y1 = 200 + Math.sin(angle) * 60;
              const x2 = 200 + Math.cos(angle) * 160;
              const y2 = 200 + Math.sin(angle) * 160;
              const cx1 = 200 + Math.cos(angle + 0.3) * 120;
              const cy1 = 200 + Math.sin(angle + 0.3) * 120;
              const cx2 = 200 + Math.cos(angle - 0.3) * 120;
              const cy2 = 200 + Math.sin(angle - 0.3) * 120;
              return (
                <g key={i} filter="url(#irisGlow)">
                  <path
                    d={`M${x1},${y1} Q${cx1},${cy1} ${x2},${y2}`}
                    fill="none"
                    stroke="url(#irisGrad1)"
                    strokeWidth="1"
                    opacity={0.5 + (i % 3) * 0.15}
                  />
                  <path
                    d={`M${x1},${y1} Q${cx2},${cy2} ${x2},${y2}`}
                    fill="none"
                    stroke="url(#irisGrad2)"
                    strokeWidth="0.8"
                    opacity={0.3 + (i % 2) * 0.2}
                  />
                </g>
              );
            })}
            {/* Inner eye circle */}
            <circle cx="200" cy="200" r="40" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" filter="url(#irisGlow)" />
            <circle cx="200" cy="200" r="20" fill="rgba(255,255,255,0.1)" stroke="#d8d8e8" strokeWidth="1" opacity="0.8" />
            <circle cx="200" cy="200" r="8" fill="#ffffff" opacity="0.9" filter="url(#irisGlow)" />
            {/* Outer arcs */}
            {Array.from({ length: 6 }).map((_, i) => {
              const startAngle = i * 60;
              const endAngle = startAngle + 40;
              const r = 145;
              const x1 = 200 + r * Math.cos(startAngle * Math.PI / 180);
              const y1 = 200 + r * Math.sin(startAngle * Math.PI / 180);
              const x2 = 200 + r * Math.cos(endAngle * Math.PI / 180);
              const y2 = 200 + r * Math.sin(endAngle * Math.PI / 180);
              return (
                <path
                  key={`arc-${i}`}
                  d={`M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2}`}
                  fill="none"
                  stroke="#d8d8e8"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
              );
            })}
          </svg>
        </div>

        {/* Name */}
        <h1 className="hero-name">
          <span className="hero-name-text">MEHUL DINESH</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Software Developer · AI Enthusiast · Debater · Gamer
        </p>

        {/* Social Links Row */}
        <div className="hero-socials">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hero-social-link"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            <span>Mail</span>
          </a>
          <a
            href="/assets/MehulDinesh_CV.pdf"
            download
            className="hero-social-link hero-resume-link"
            aria-label="Download Resume"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Resume</span>
          </a>
        </div>

        {/* Explore CTA */}
        <button
          className="hero-explore"
          onClick={() => goToSection('career')}
          aria-label="Explore portfolio"
        >
          <span className="hero-explore-text">explore</span>
          <svg
            className="hero-chevron"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
