import { useEffect, useRef, useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SECTION_COLORS } from '../data/timelineData';
import './HorizontalTimeline.css';

// ──────────────────────────────────────────────────
// Seeded PRNG for deterministic randomized paths
// ──────────────────────────────────────────────────
function createRng(seed) {
  let s = seed;
  return function rand() {
    s = (s * 16807 + 0) % 2147483647;
    return (s & 0x7fffffff) / 0x7fffffff;
  };
}

// ──────────────────────────────────────────────────
// Generate a randomized downward journey path along
// a specified side ('left' or 'right').
// ──────────────────────────────────────────────────
function generateJourneyPath(pageWidth, pageHeight, seed, side = 'left') {
  const SEGMENT_COUNT = 80;
  const points = [];

  // Left: 3–12% | Right: 88–97%
  const bandLeft  = side === 'left' ? pageWidth * 0.03 : pageWidth * 0.88;
  const bandRight = side === 'left' ? pageWidth * 0.12 : pageWidth * 0.97;
  const bandCenter = (bandLeft + bandRight) / 2;
  let x = bandCenter;
  const rand = createRng(seed);

  for (let i = 0; i <= SEGMENT_COUNT; i++) {
    const t = i / SEGMENT_COUNT;
    const y = 80 + t * (pageHeight - 80);

    if (i > 0 && i < SEGMENT_COUNT) {
      const maxDrift = (bandRight - bandLeft) * 0.6;
      const drift = (rand() - 0.5) * maxDrift;
      x += drift;
      x += (bandCenter - x) * 0.15;
      x = Math.max(bandLeft, Math.min(bandRight, x));
    }

    points.push({ x, y });
  }
  return points;
}

// Build SVG path "d" using smooth cubic bezier curves
function buildPathD(points) {
  if (points.length < 2) return '';
  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpY = (prev.y + curr.y) / 2;
    d += ` C${prev.x.toFixed(1)},${cpY.toFixed(1)} ${curr.x.toFixed(1)},${cpY.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
  }
  return d;
}

// Generate deviation/fork branches along the path
function generateDeviations(points, pageWidth, seed, side = 'left') {
  const deviations = [];
  const rand = createRng(seed + 7919);
  // Branches stay within their respective margin
  const minBranchX = side === 'left' ? 5                : pageWidth * 0.80;
  const maxBranchX = side === 'left' ? pageWidth * 0.20 : pageWidth - 5;

  for (let i = 4; i < points.length - 3; i += 2) {
    if (rand() > 0.45) continue;
    const pt = points[i];
    const prev = points[i - 1];
    const dx = pt.x - prev.x;
    const dy = pt.y - prev.y;
    const angle = Math.atan2(dy, dx);
    const branchAngle = angle + (rand() > 0.5 ? 1 : -1) * (0.5 + rand() * 1.0);
    const branchLen = 15 + rand() * 35;
    const rawEndX = pt.x + Math.cos(branchAngle) * branchLen;
    const endX = Math.max(minBranchX, Math.min(maxBranchX, rawEndX));
    const endY = pt.y + Math.sin(branchAngle) * branchLen;

    const subBranches = [];
    if (rand() > 0.55) {
      const subAngle = branchAngle + (rand() > 0.5 ? 0.4 : -0.4);
      const subLen = branchLen * 0.35;
      const midX = pt.x + Math.cos(branchAngle) * branchLen * 0.55;
      const midY = pt.y + Math.sin(branchAngle) * branchLen * 0.55;
      const rawSubEndX = midX + Math.cos(subAngle) * subLen;
      subBranches.push({
        x1: midX, y1: midY,
        x2: Math.max(minBranchX, Math.min(maxBranchX, rawSubEndX)),
        y2: midY + Math.sin(subAngle) * subLen,
      });
    }

    deviations.push({
      segmentIndex: i,
      x1: pt.x, y1: pt.y,
      x2: endX, y2: endY,
      opacity: 0.08 + rand() * 0.14,
      subBranches,
    });
  }
  return deviations;
}

export default function JourneyLine() {
  const { activeSection, breakpoint } = useApp();
  const leftPathRef = useRef(null);
  const rightPathRef = useRef(null);

  const [viewWidth, setViewWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );
  const [viewHeight, setViewHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 1080
  );
  const [pageHeight, setPageHeight] = useState(3000);
  const scrollProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track resize
  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track page height from <main> content only
  useEffect(() => {
    const measure = () => {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        const rect = mainEl.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const contentBottom = rect.bottom + scrollTop;
        setPageHeight(Math.max(contentBottom, viewHeight));
      } else {
        setPageHeight(viewHeight);
      }
    };
    measure();
    const t = setTimeout(measure, 300);
    return () => clearTimeout(t);
  }, [activeSection, viewHeight]);

  // Scroll tracking via rAF
  useEffect(() => {
    let animId;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, pageHeight - viewHeight);
      const progress = Math.min(1, scrollTop / maxScroll);
      scrollProgressRef.current = progress;
      setScrollProgress(progress);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [pageHeight, viewHeight]);

  // Deterministic seed per section
  const sectionSeed = useMemo(() => {
    const seeds = { hero: 42, career: 137, projects: 271, hobbies: 439 };
    return seeds[activeSection] || 42;
  }, [activeSection]);

  // ── Left side path ──
  const leftPoints = useMemo(
    () => generateJourneyPath(viewWidth, pageHeight, sectionSeed, 'left'),
    [viewWidth, pageHeight, sectionSeed]
  );
  const leftDeviations = useMemo(
    () => generateDeviations(leftPoints, viewWidth, sectionSeed, 'left'),
    [leftPoints, viewWidth, sectionSeed]
  );
  const leftPathD = useMemo(() => buildPathD(leftPoints), [leftPoints]);

  // ── Right side path (different seed for a unique shape) ──
  const rightPoints = useMemo(
    () => generateJourneyPath(viewWidth, pageHeight, sectionSeed + 500, 'right'),
    [viewWidth, pageHeight, sectionSeed]
  );
  const rightDeviations = useMemo(
    () => generateDeviations(rightPoints, viewWidth, sectionSeed + 500, 'right'),
    [rightPoints, viewWidth, sectionSeed]
  );
  const rightPathD = useMemo(() => buildPathD(rightPoints), [rightPoints]);

  // Measure total path lengths
  const [leftPathLength, setLeftPathLength] = useState(0);
  const [rightPathLength, setRightPathLength] = useState(0);

  useEffect(() => {
    if (leftPathRef.current) {
      try { setLeftPathLength(leftPathRef.current.getTotalLength()); }
      catch { setLeftPathLength(pageHeight * 1.3); }
    }
    if (rightPathRef.current) {
      try { setRightPathLength(rightPathRef.current.getTotalLength()); }
      catch { setRightPathLength(pageHeight * 1.3); }
    }
  }, [leftPathD, rightPathD, pageHeight]);

  const activeColor = SECTION_COLORS[activeSection] || '#7c3aed';

  if (breakpoint === 'mobile') return null;

  // Helper to render deviation branches
  const renderDeviations = (devs, keyPrefix) =>
    devs.map((dev, i) => {
      const devProgress = (dev.y1 - 80) / (pageHeight - 80);
      if (devProgress > scrollProgress + 0.03) return null;
      const revealFactor = Math.min(1, (scrollProgress - devProgress + 0.03) / 0.08);
      return (
        <g key={`${keyPrefix}-${i}`} opacity={dev.opacity * revealFactor}>
          <line
            x1={dev.x1} y1={dev.y1}
            x2={dev.x2} y2={dev.y2}
            stroke={activeColor}
            strokeWidth="1"
            strokeLinecap="round"
          />
          {dev.subBranches.map((sub, j) => (
            <line
              key={j}
              x1={sub.x1} y1={sub.y1}
              x2={sub.x2} y2={sub.y2}
              stroke={activeColor}
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.5"
            />
          ))}
        </g>
      );
    });

  // Helper to render a journey path
  const renderPath = (ref, d, pathLen) => {
    const visibleLen = pathLen * Math.max(0.015, scrollProgress);
    const offset = Math.max(0, pathLen - visibleLen);
    return (
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke={activeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={pathLen || 99999}
        strokeDashoffset={pathLen > 0 ? offset : 99999}
        filter="url(#journey-glow)"
        opacity="0.8"
        className="journey-line"
      />
    );
  };

  return (
    <svg
      className="journey-svg"
      viewBox={`0 0 ${viewWidth} ${pageHeight}`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="journey-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor={activeColor} floodOpacity="0.45" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glowColor" />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left side deviations + path */}
      {renderDeviations(leftDeviations, 'L')}
      {renderPath(leftPathRef, leftPathD, leftPathLength)}

      {/* Right side deviations + path */}
      {renderDeviations(rightDeviations, 'R')}
      {renderPath(rightPathRef, rightPathD, rightPathLength)}
    </svg>
  );
}
