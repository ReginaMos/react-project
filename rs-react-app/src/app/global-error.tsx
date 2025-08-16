'use client';

import { useEffect } from 'react';
import '../styles/ErrorBoundary.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary:', error);
  }, [error]);

  return (
    <html>
      <body>
        <main>
          <h2>Ooops! Something went wrong globally!</h2>
          <button onClick={() => reset()} className="error-button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
