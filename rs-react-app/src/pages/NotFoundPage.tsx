import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h2>Ooops! Something went wrong!</h2>

      <button onClick={() => navigate('/')} className="error-button">
        Back to Home Page
      </button>
    </main>
  );
}
