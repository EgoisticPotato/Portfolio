import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs/lib/anime.es.js';

export function useTimelineAnimation() {
  const animatedBursts = useRef(new Set());

  const animateBurst = useCallback((sectionId) => {
    // Get all burst paths for this section
    const paths = document.querySelectorAll(`.burst-path-${sectionId}`);
    if (!paths.length) return;

    if (!animatedBursts.current.has(sectionId)) {
      // First visit: animate stroke-dashoffset
      animatedBursts.current.add(sectionId);

      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });

      anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(60),
      });
    }

    // Always pulse the node dot on visit
    const node = document.querySelector(`.node-dot-${sectionId}`);
    if (node) {
      anime({
        targets: node,
        scale: [1, 1.4, 1],
        duration: 300,
        easing: 'easeOutCubic',
      });
    }
  }, []);

  const animateTrunkTo = useCallback((sectionId) => {
    const trunk = document.querySelector('.timeline-trunk');
    if (!trunk) return;

    const sectionColors = {
      hero: '#7c3aed',
      career: '#10b981',
      projects: '#ec4899',
      hobbies: '#f59e0b',
    };

    anime({
      targets: trunk,
      stroke: sectionColors[sectionId] || '#7c3aed',
      duration: 400,
      easing: 'easeOutCubic',
    });
  }, []);

  return { animateBurst, animateTrunkTo };
}
