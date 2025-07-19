import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders content correctly', () => {
    const mockOnSearch = vi.fn();
    render(<Header onSearch={mockOnSearch} />);

    expect(screen.getByText('Find')).toBeInTheDocument();
  });
});
