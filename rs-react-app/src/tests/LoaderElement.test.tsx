import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../elements/LoaderElement';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
    const loader = document.querySelector('.loader');
    expect(loader).toBeInTheDocument();
  });

  it('has correct DOM structure', () => {
    render(<Loader />);

    const loader = document.querySelector('.loader');
    expect(loader).not.toBeNull();

    const bubbles = document.querySelectorAll('.bubble');
    expect(bubbles.length).toBe(3);

    const overlay = document.querySelector('.overlay');
    expect(overlay).not.toBeNull();
  });
});
