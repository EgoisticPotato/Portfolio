import { useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useTimelineAnimation } from '../hooks/useTimelineAnimation';
import {
  SECTION_ORDER,
  SECTION_COLORS,
} from '../data/timelineData';
import './NavTimeline.css';

const SVG_WIDTH = 2000;
const SVG_HEIGHT = 80;
const TRUNK_Y = 40;

// Radiant bezier curves from each node
function makeBursts(nx, ny) {
  return [
    { d: `M${nx},${ny} Q${nx - 20},${ny - 15} ${nx - 40},${ny - 32}`, width: 1.5, opacity: 1.0 },
    { d: `M${nx},${ny} Q${nx + 20},${ny - 15} ${nx + 45},${ny - 32}`, width: 1.5, opacity: 0.9 },
    { d: `M${nx},${ny} Q${nx - 18},${ny + 15} ${nx - 35},${ny + 32}`, width: 1.5, opacity: 0.9 },
    { d: `M${nx},${ny} Q${nx + 18},${ny + 15} ${nx + 40},${ny + 32}`, width: 1.5, opacity: 1.0 },
    { d: `M${nx},${ny} Q${nx - 5},${ny - 20} ${nx - 15},${ny - 38}`, width: 1.0, opacity: 0.6 },
    { d: `M${nx},${ny} Q${nx + 5},${ny + 20} ${nx + 15},${ny + 38}`, width: 0.6, opacity: 0.4 },
  ];
}

const NODE_POSITIONS = {
  hero:     { x: 80,   label: 'MD.' },
  career:   { x: 600,  label: 'Career' },
  projects: { x: 1200, label: 'Projects' },
  hobbies:  { x: 1750, label: 'Hobbies' },
};

export default function NavTimeline() {
  const { activeSection, visitedSections, goToSection } = useApp();
  const { animateBurst, animateTrunkTo } = useTimelineAnimation();

  const burstsData = useMemo(() => {
    const data = {};
    for (const [section, pos] of Object.entries(NODE_POSITIONS)) {
      data[section] = makeBursts(pos.x, TRUNK_Y);
    }
    return data;
  }, []);

  useEffect(() => {
    animateBurst(activeSection);
    animateTrunkTo(activeSection);
  }, [activeSection, animateBurst, animateTrunkTo]);

  const activeColor = SECTION_COLORS[activeSection] || '#7c3aed';

  return (
    <svg
      className="nav-timeline"
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      preserveAspectRatio="none"
    >
      <defs>
        {Object.entries(SECTION_COLORS).map(([section, color]) => (
          <filter key={section} id={`glow-${section}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={color} floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glowColor" />
            <feMerge>
              <feMergeNode in="glowColor" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {/* Main trunk line */}
      <line
        className="timeline-trunk"
        x1="0"
        y1={TRUNK_Y}
        x2={SVG_WIDTH}
        y2={TRUNK_Y}
        stroke={activeColor}
        strokeWidth="2"
        opacity="0.3"
        filter={`url(#glow-${activeSection})`}
      />

      {/* Section nodes */}
      {SECTION_ORDER.map((section) => {
        const pos = NODE_POSITIONS[section];
        // Hero node is white; other nodes use their section accent color
        const color = section === 'hero' ? '#ffffff' : SECTION_COLORS[section];
        const isVisited = visitedSections.has(section);
        const isActive = activeSection === section;
        const bursts = burstsData[section];

        return (
          <g key={section}>
            {/* Burst paths */}
            {isVisited &&
              bursts.map((burst, i) => (
                <path
                  key={i}
                  className={`burst-path-${section}`}
                  d={burst.d}
                  fill="none"
                  stroke={color}
                  strokeWidth={burst.width}
                  opacity={isActive ? burst.opacity : burst.opacity * 0.5}
                  strokeLinecap="round"
                  filter={section === 'hero' ? undefined : `url(#glow-${section})`}
                />
              ))}

            {/* Node dot */}
            <circle
              className={`node-dot node-dot-${section}`}
              cx={pos.x}
              cy={TRUNK_Y}
              r={isActive ? 7 : 6}
              fill={isVisited ? color : 'transparent'}
              stroke={isVisited ? '#fff' : 'rgba(255,255,255,0.3)'}
              strokeWidth={1}
              style={{
                cursor: 'pointer',
                filter: (isActive && section !== 'hero') ? `url(#glow-${section})` : 'none',
                opacity: isActive ? 1 : isVisited ? 0.7 : 0.4,
                transformOrigin: `${pos.x}px ${TRUNK_Y}px`,
              }}
              onClick={() => goToSection(section)}
            />

            {/* Node label */}
            <text
              x={pos.x}
              y={TRUNK_Y + 24}
              textAnchor="middle"
              fill={section === 'hero' ? '#ffffff' : (isActive ? color : isVisited ? color : 'rgba(255,255,255,0.3)')}
              fontSize="28"
              fontFamily="'JetBrains Mono', monospace"
              opacity={section === 'hero' ? 1.0 : (isActive ? 1 : 0.6)}
              style={{ cursor: 'pointer' }}
              onClick={() => goToSection(section)}
            >
              {pos.label}
            </text>
          </g>
        );
      })}

      {/* Arrow at end */}
      <path
        d={`M${SVG_WIDTH - 30},${TRUNK_Y - 6} L${SVG_WIDTH - 10},${TRUNK_Y} L${SVG_WIDTH - 30},${TRUNK_Y + 6}`}
        fill="none"
        stroke={activeColor}
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
