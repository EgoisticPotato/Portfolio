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
  const isMobile = breakpoint === 'mobile';

  const handleNav = (id) => {
    goToSection(id);
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="navbar" id="navbar">
        {/* Timeline SVG background - hide on mobile */}
        {!isMobile && <NavTimeline />}

        {/* Navbar content */}
        <div className="navbar-content">
          {isMobile ? (
            <div className="mobile-navbar-layout">
              {/* Spacer on the left to balance the hamburger width */}
              <div className="mobile-navbar-spacer" />

              {/* Logo in the center */}
              <button
                className="mobile-navbar-logo"
                onClick={() => handleNav('hero')}
              >
                MD.
              </button>

              {/* Hamburger on the right */}
              <button
                className={`hamburger ${drawerOpen ? 'open' : ''}`}
                onClick={() => setDrawerOpen((v) => !v)}
                aria-label="Toggle navigation"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobile && (
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
