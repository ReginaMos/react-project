import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <>
            <h2>Ooops! Something went wrong!</h2>

            <button
                onClick={() =>  navigate('/')}
                className="error-button"
            >
                Back to Home Page
            </button>
        </>
    )
}