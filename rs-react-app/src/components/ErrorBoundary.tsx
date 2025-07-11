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
      
    console.log('Error yes')
      return (
        <>
            <h1>Произошла ошибка</h1>
        </>
      )
    }
    console.log('Error no')
    return this.props.children;
  }
}