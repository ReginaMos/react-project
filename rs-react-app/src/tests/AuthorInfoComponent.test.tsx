import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthorInfo from '../components/AuthorInfoComponent';

describe('AuthorInfo', () => {
  it('renders heading with author name', () => {
    render(<AuthorInfo />);
    expect(screen.getByText(/Hello, my name is/i)).toBeInTheDocument();
    expect(screen.getByText(/Regina/i)).toBeInTheDocument();
  });

  it('renders all description blocks', () => {
    render(<AuthorInfo />);
    const descriptions = screen.getAllByText((_, element) =>
      element ? element.classList.contains('description') : false
    );

    expect(descriptions).toHaveLength(2);
  });

  it('renders contact section heading', () => {
    render(<AuthorInfo />);
    expect(screen.getByText(/Contact with me:/i)).toBeInTheDocument();
  });

  it('renders LinkedIn and GitHub icons with correct alt text', () => {
    render(<AuthorInfo />);
    expect(screen.getByAltText('linkedin-logo')).toBeInTheDocument();
    expect(screen.getByAltText('github-logo')).toBeInTheDocument();
  });

  it('renders two contact links with target and rel attributes', () => {
    render(<AuthorInfo />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('href', 'http://');
    });
  });
});
