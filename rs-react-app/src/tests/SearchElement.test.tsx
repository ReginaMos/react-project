import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Search from '../elements/SearchElement';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || ''),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render component correctly', () => {
    render(<Search onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Find')).toBeInTheDocument();
  });

  it('should update localStorage on input change', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search');
    await user.type(input, 'test value');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'search_ReginaMos',
      'test value'
    );

    expect(localStorage.setItem).toHaveBeenCalledTimes(10);
  });

  it('should call onSearch callback when button clicked', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search');
    await user.type(input, 'search query');
    await user.click(screen.getByText('Find'));

    expect(mockOnSearch).toHaveBeenCalledWith('search query');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should load initial value from localStorage', () => {
    window.localStorage.setItem('search_ReginaMos', 'saved value');
    render(<Search onSearch={mockOnSearch} />);

    expect(screen.getByDisplayValue('saved value')).toBeInTheDocument();
  });
});
