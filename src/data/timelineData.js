// ========================================
// HORIZONTAL TIMELINE DATA
// Node positions & burst path templates
// ========================================

// SVG viewBox is 2000 x 80
export const SVG_WIDTH = 2000;
export const SVG_HEIGHT = 80;
export const TRUNK_Y = 40;

// Section → node x positions (within viewBox 2000)
export const NODE_POSITIONS = {
  hero:     { x: 80,   label: 'MD.' },
  career:   { x: 600,  label: 'Career' },
  projects: { x: 1200, label: 'Projects' },
  hobbies:  { x: 1750, label: 'Hobbies' },
};

// Section order (for trunk drawing)
export const SECTION_ORDER = ['hero', 'career', 'projects', 'hobbies'];

// Section accent colors
export const SECTION_COLORS = {
  hero:     '#7c3aed',
  career:   '#10b981',
  projects: '#ec4899',
  hobbies:  '#f59e0b',
};

// Burst path templates — relative bezier curves radiating from each node
// Each path: { d: (nodeX, nodeY) => pathString, width, opacity }
function makeBursts(nx, ny) {
  return [
    // Primary branches (thicker, brighter)
    {
      d: `M${nx},${ny} Q${nx - 20},${ny - 15} ${nx - 40},${ny - 32}`,
      width: 1.5,
      opacity: 1.0,
    },
    {
      d: `M${nx},${ny} Q${nx + 20},${ny - 15} ${nx + 45},${ny - 32}`,
      width: 1.5,
      opacity: 0.9,
    },
    {
      d: `M${nx},${ny} Q${nx - 18},${ny + 15} ${nx - 35},${ny + 32}`,
      width: 1.5,
      opacity: 0.9,
    },
    {
      d: `M${nx},${ny} Q${nx + 18},${ny + 15} ${nx + 40},${ny + 32}`,
      width: 1.5,
      opacity: 1.0,
    },
    // Secondary branches (thinner, more transparent)
    {
      d: `M${nx},${ny} Q${nx - 5},${ny - 20} ${nx - 15},${ny - 38}`,
      width: 1.0,
      opacity: 0.6,
    },
    {
      d: `M${nx},${ny} Q${nx + 5},${ny + 20} ${nx + 15},${ny + 38}`,
      width: 0.6,
      opacity: 0.4,
    },
  ];
}

// Pre-compute bursts for each section node
export const BURSTS = {};
for (const [section, pos] of Object.entries(NODE_POSITIONS)) {
  BURSTS[section] = makeBursts(pos.x, TRUNK_Y);
}
