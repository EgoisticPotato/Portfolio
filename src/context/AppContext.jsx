import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [visitedSections, setVisitedSections] = useState(new Set(['hero']));
  const [breakpoint, setBreakpoint] = useState('desktop');

  // Track window width for breakpoints
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 768) setBreakpoint('mobile');
      else if (w < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSection = useCallback((id) => {
    setActiveSection(id);
    setVisitedSections((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeSection,
        visitedSections,
        goToSection,
        breakpoint,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
