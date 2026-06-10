import { useApp } from '../context/AppContext';

export function useSectionNav() {
  const { activeSection, visitedSections, goToSection, breakpoint } = useApp();

  const sections = ['hero', 'career', 'projects', 'hobbies'];

  const isActive = (id) => activeSection === id;
  const isVisited = (id) => visitedSections.has(id);

  const nextSection = () => {
    const idx = sections.indexOf(activeSection);
    if (idx < sections.length - 1) {
      goToSection(sections[idx + 1]);
    }
  };

  const prevSection = () => {
    const idx = sections.indexOf(activeSection);
    if (idx > 0) {
      goToSection(sections[idx - 1]);
    }
  };

  return {
    activeSection,
    visitedSections,
    goToSection,
    isActive,
    isVisited,
    nextSection,
    prevSection,
    breakpoint,
    sections,
  };
}
