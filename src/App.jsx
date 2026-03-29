import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import About from './pages/About';
import Contact from './pages/Contact';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Cursor />
      <Nav theme={theme} onToggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<ProjectPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
