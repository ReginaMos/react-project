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

export default function App() {
  const location = useLocation();
  const isHomeOrDetail = /^\/(\d+)(\/\d+)?$/.test(location.pathname);

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
      </header>

      <main>
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
