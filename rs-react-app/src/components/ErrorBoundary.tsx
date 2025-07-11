import * as React from 'react';
import type { Props, State } from '../models/models';

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
     this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
            <h1>Произошла ошибка</h1>
        </>
      )
    }

    return this.props.children;
  }
}