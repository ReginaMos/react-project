import * as React from 'react';
import type { ErrorProps, State } from '../models/models';

export default class ErrorBoundary extends React.Component<ErrorProps, State> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h2>Ooops! Something went wrong!</h2>
          <button onClick={() => window.location.reload()}>Reload page</button>
        </main>
      );
    }
    return this.props.children;
  }
}
