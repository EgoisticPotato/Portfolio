import { useState } from 'react';
import { useApp } from '../context/AppContext';
import NavTimeline from './NavTimeline';
import { SECTION_COLORS } from '../data/timelineData';
import './NavBar.css';

const NAV_LINKS = [
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
  { id: 'hobbies', label: 'Hobbies' },
];

export default function NavBar() {
  const { activeSection, goToSection, breakpoint } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (id) => {
    goToSection(id);
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="navbar" id="navbar">
        {/* Timeline SVG background */}
        <NavTimeline />

        {/* Navbar content (holds hamburger for mobile) */}
        <div className="navbar-content">
          {/* Mobile hamburger */}
          {breakpoint === 'mobile' && (
            <button
              className={`hamburger ${drawerOpen ? 'open' : ''}`}
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {breakpoint === 'mobile' && (
        <div className={`nav-drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="nav-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="nav-drawer-panel">
            <button
              className="nav-drawer-link"
              onClick={() => handleNav('hero')}
              style={{ '--link-accent': SECTION_COLORS.hero }}
            >
              MD.
            </button>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`nav-drawer-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => handleNav(link.id)}
                style={{ '--link-accent': SECTION_COLORS[link.id] }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
