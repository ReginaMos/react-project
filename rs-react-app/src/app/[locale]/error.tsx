'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Caught by error.tsx:', error);
  }, [error]);

  return (
    <main>
      <h2>Ooops! Something went wrong!</h2>
      <button onClick={() => reset()} className="error-button">
        Reload page
      </button>
    </main>
  );
}
