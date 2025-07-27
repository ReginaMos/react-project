import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFoundPage', () => {
  it('renders the error message and button', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByText('Ooops! Something went wrong!')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /back to home page/i })
    ).toBeInTheDocument();
  });

  it('calls navigate with "/" when button is clicked', () => {
    render(<NotFoundPage />);
    const button = screen.getByRole('button', { name: /back to home page/i });

    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
