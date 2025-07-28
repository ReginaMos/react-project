import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RSSInfo from '../components/RSSInfo';

describe('RSSInfo', () => {
  it('renders the descriptive text', () => {
    render(<RSSInfo />);
    expect(
      screen.getByText(/My journey in React began in/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rolling Scopes School/i)).toBeInTheDocument();
  });

  it('renders the link to RS School React course', () => {
    render(<RSSInfo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the logo image with correct alt text', () => {
    render(<RSSInfo />);
    const img = screen.getByAltText('rss-logo');
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });
});
