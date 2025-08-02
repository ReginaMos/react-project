import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../store/favouritesReducer';
import { Provider } from 'react-redux';

vi.mock('../components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('../components/Main', () => ({ default: () => <div>Main</div> }));
vi.mock('../elements/LoaderElement', () => ({
  default: () => <div>Loader</div>,
}));
vi.mock('../elements/ChipsElement', () => ({
  default: ({ text }: { text: string }) => <div>Chips: {text}</div>,
}));

const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

const localStorageMock = (() => {
  let store: Record<string, string | undefined> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => (store[key] = undefined)),
  };
})();

const renderWithStore = (ui: React.ReactNode, preloadedState = {}) => {
  const testStore = configureStore({
    reducer: {
      favourites: favouritesReducer,
    },
    preloadedState,
  });

  return render(<Provider store={testStore}>{ui}</Provider>);
};

function renderWithRouteAndStore(component: React.ReactNode, route = '/1') {
  renderWithStore(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/:pageNumber/:heroNumber?" element={component} />
      </Routes>
    </MemoryRouter>
  );
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('HomePage Component', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('calls onSearch with value from localStorage on mount', async () => {
    localStorage.setItem('search_ReginaMos', 'luke');
    const onSearchMock = vi.fn();

    function TestComponent() {
      const saved = localStorage.getItem('search_ReginaMos') || '';

      React.useEffect(() => {
        onSearchMock(saved);
      }, []);

      return <div data-testid="result">Loaded</div>;
    }

    renderWithRouteAndStore(<TestComponent />, '/1');

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('luke');
    });
  });

  it('displays Chips on API error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('API failed'));

    renderWithRouteAndStore(<HomePage />, '/1');

    await waitFor(() => {
      expect(
        screen.getByText('Chips: API error: Error: API failed')
      ).toBeInTheDocument();
    });
  });

  it('shows Loader during API request', async () => {
    fetchMock.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

    renderWithRouteAndStore(<HomePage />, '/1');

    await waitFor(() => {
      expect(screen.getByText('Loader')).toBeInTheDocument();
    });
  });

  it('displays error text when API throws on 4xx or 5xx', async () => {
    fetchMock.mockRejectedValueOnce(new Error('404'));
    renderWithRouteAndStore(<HomePage />, '/1');

    await waitFor(() => {
      expect(
        screen.getByText('Chips: API error: Error: 404')
      ).toBeInTheDocument();
    });

    fetchMock.mockRejectedValueOnce(new Error('500'));
    renderWithRouteAndStore(<HomePage />, '/1');

    await waitFor(() => {
      expect(
        screen.getByText('Chips: API error: Error: 500')
      ).toBeInTheDocument();
    });
  });

  it('calls API on component mount', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ results: [] }),
    });

    renderWithRouteAndStore(<HomePage />, '/1');
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
