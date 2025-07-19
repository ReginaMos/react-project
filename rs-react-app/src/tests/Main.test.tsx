import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../components/Main';
import type { ItemModel } from '../models/models';

describe('Main Component', () => {
  const mockItems: ItemModel[] = [
    { name: 'Luke', description: 'Jedi master' },
    { name: 'Vader', description: 'Sith lord' },
  ];

  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('renders content correctly', () => {
    render(<Main items={mockItems} />);

    expect(screen.getByText('Crash App')).toBeInTheDocument();
  });

  it('throws error when crash button is clicked', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    let caughtError = false;
    try {
      render(<Main items={mockItems} />);
      fireEvent.click(screen.getByText('Crash App'));
    } catch (error) {
      caughtError = true;
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Oooops! Something went wrong!');
    }

    expect(caughtError).toBe(true);
    consoleErrorMock.mockRestore();
  });

  it('does not throw error without button click', () => {
    render(<Main items={mockItems} />);
    expect(screen.getByText('Crash App')).toBeInTheDocument();
  });
});
