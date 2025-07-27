import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from '../pages/AboutPage';

vi.mock('../components/AuthorInfoComponent', () => ({
  default: () => <div>Mocked Author Info</div>,
}));

vi.mock('../components/RSSInfo', () => ({
  default: () => <div>Mocked RSS Info</div>,
}));

describe('AboutPage component', () => {
  it('renders AuthorInfo and RSSInfo inside .about-page container', () => {
    render(<AboutPage />);

    expect(screen.getByText('Mocked Author Info')).toBeInTheDocument();
    expect(screen.getByText('Mocked RSS Info')).toBeInTheDocument();
  });
});
