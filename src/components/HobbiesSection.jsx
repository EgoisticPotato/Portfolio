import { useApp } from '../context/AppContext';
import { hobbies, munData } from '../data/cvData';
import './HobbiesSection.css';

export default function HobbiesSection() {
  const { activeSection } = useApp();
  const isActive = activeSection === 'hobbies';

  return (
    <section id="hobbies" className={`section hobbies-section ${isActive ? 'active' : ''}`}>
      <div className="section-container">
        {/* ── Part 1: Hobbies Grid ── */}
        <p className="eyebrow">// when i&apos;m not coding</p>
        <h2 className="section-title" style={{ color: 'var(--hobbies-accent)' }}>
          Beyond the Terminal
        </h2>

        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <div key={hobby.name} className="hobby-card glass-card">
              <span className="hobby-emoji">{hobby.emoji}</span>
              <h3 className="hobby-name">{hobby.name}</h3>
              <p className="hobby-desc">{hobby.description}</p>
            </div>
          ))}
        </div>

        {/* ── MUN Divider ── */}
        <div className="mun-divider">
          <div className="mun-divider-line" />
          <div className="mun-divider-badge">
            <span className="mun-divider-icon">🌐</span>
            Model United Nations (MUN)
          </div>
          <div className="mun-divider-line" />
        </div>

        {/* ── Part 2: MUN Subsection ── */}
        <div className="mun-section">
          <div className="mun-header">
            <h3 className="mun-title">The Art of Argument</h3>
          </div>

          {/* Quote */}
          <blockquote className="mun-quote">
            &ldquo;Some people just want to watch the world burn.&rdquo;
          </blockquote>

          {/* Debate Skills */}
          <div className="mun-skills">
            {munData.debateSkills.map((skill) => (
              <span key={skill} className="mun-skill-badge">{skill}</span>
            ))}
          </div>

          {/* Perspective Cards */}
          <div className="mun-perspectives">
            {munData.perspectives.map((p) => (
              <div key={p.title} className="mun-perspective-card glass-card">
                <h4 className="mun-perspective-title">{p.title}</h4>
                <p className="mun-perspective-desc">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Awards & Executive Board */}
          <div className="mun-awards-section">
            <div className="mun-awards-col">
              <h4 className="mun-col-title">
                <span className="mun-col-icon">🏅</span>
                Awards & Participation
              </h4>
              <div className="mun-awards-list">
                {munData.awards.map((award, i) => (
                  <div key={i} className="mun-award-item">
                    <div className="mun-award-dot" />
                    <div className="mun-award-content">
                      <span className="mun-award-conference">
                        {award.conference}
                        {award.committee && <span className="mun-award-committee"> — {award.committee}</span>}
                      </span>
                      <span className={`mun-award-badge ${award.award.toLowerCase().replace(/\s/g, '-')}`}>
                        {award.award}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mun-awards-col">
              <h4 className="mun-col-title">
                <span className="mun-col-icon">⚖️</span>
                Executive Board
              </h4>
              <div className="mun-awards-list">
                {munData.executiveBoard.map((eb, i) => (
                  <div key={i} className="mun-award-item exec">
                    <div className="mun-award-dot exec-dot" />
                    <div className="mun-award-content">
                      <span className="mun-award-conference">
                        {eb.conference} — {eb.committee}
                      </span>
                      <span className="mun-award-badge exec-badge">{eb.role}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Focus Areas */}
              <div className="mun-focus">
                <h5 className="mun-focus-title">Focus Areas</h5>
                <div className="mun-focus-tags">
                  {munData.focusAreas.map((area) => (
                    <span key={area} className="mun-focus-tag">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="mun-profile-summary">
            <p>{munData.profile}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
