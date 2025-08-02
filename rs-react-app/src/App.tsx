import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import DetailPage from './pages/DetailPage';
import { ThemeContext } from './theme/ThemeContext';
import { useContext } from 'react';
import Sun from './assets/sun.svg';
import Moon from './assets/moon.svg';

export default function App() {
  const location = useLocation();
  const isHomeOrDetail = /^\/(\d+)(\/\d+)?$/.test(location.pathname);

  const { theme, changeTheme } = useContext(ThemeContext);
  const iconSrc = theme === 'light' ? Sun : Moon;

  return (
    <>
      <header>
        <nav className="nav">
          <NavLink
            to="/"
            className={() => (isHomeOrDetail ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            About
          </NavLink>
        </nav>

        <img
          src={iconSrc}
          alt="theme-icon"
          onClick={changeTheme}
          className="theme-icon"
        />
      </header>

      <main className={theme}>
        <Routes>
          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path=":pageNumber" element={<HomePage />}>
            <Route path=":heroNumber" element={<DetailPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
