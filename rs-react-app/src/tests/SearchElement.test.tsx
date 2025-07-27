import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Search from '../elements/SearchElement';
import { MemoryRouter } from 'react-router-dom';

const localStorageMock = (() => {
  let store: Record<string, string | undefined> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || ''),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      store[key] = undefined;
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
    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Find')).toBeInTheDocument();
  });

  it('should update localStorage on input change using hook', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search');
    await user.type(input, 'test value');

    await waitFor(() => {
      expect(window.localStorage.getItem('search_ReginaMos')).toBe(
        '"test value"'
      );
    });
  });

  it('should call onSearch callback when button clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search');
    await user.type(input, 'search query');
    await user.click(screen.getByText('Find'));
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('1', 'search query');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
  });

  it('should load initial value from localStorage using hook', () => {
    window.localStorage.setItem(
      'search_ReginaMos',
      JSON.stringify('saved value')
    );
    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue('saved value')).toBeInTheDocument();
  });
});
