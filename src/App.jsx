import { AppProvider } from './context/AppContext';
import StarField from './components/StarField';
import NavBar from './components/NavBar';
import JourneyLine from './components/HorizontalTimeline';
import HeroSection from './components/HeroSection';
import CareerSection from './components/CareerSection';
import ProjectsSection from './components/ProjectsSection';
import HobbiesSection from './components/HobbiesSection';

function MainApp() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <StarField />
      <NavBar />
      <JourneyLine />
      <main>
        <HeroSection />
        <CareerSection />
        <ProjectsSection />
        <HobbiesSection />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
