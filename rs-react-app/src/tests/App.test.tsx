import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

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
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => delete store[key]),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App Component', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('fetches value from localStorage on mount', async () => {
    localStorageMock.setItem('search_ReginaMos', 'luke');
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ results: [] }),
    });

    render(<App />);

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith('search_ReginaMos');
      expect(fetchMock).toHaveBeenCalledWith(
        'https://www.swapi.tech/api/people/?name=luke'
      );
    });
  });

  it('uses empty string when localStorage value is missing', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ results: [] }),
    });

    render(<App />);
    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith('search_ReginaMos');
      expect(fetchMock).toHaveBeenCalledWith(
        'https://www.swapi.tech/api/people'
      );
    });
  });

  it('displays Chips on API error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('API failed'));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Chips: API error: Error: API failed')
      ).toBeInTheDocument();
    });
  });

  it('shows Loader during API request', async () => {
    fetchMock.mockImplementationOnce(() => new Promise(() => {}));

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Loader')).toBeInTheDocument();
    });
  });

  it('calls API with correct parameters', async () => {
    localStorageMock.setItem('search_ReginaMos', 'r2');
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ result: [] }),
    });

    render(<App />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://www.swapi.tech/api/people/?name=r2'
      );
    });
  });

  it('displays list of people from API (empty search)', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          results: [
            { name: 'Luke Skywalker', url: 'url/luke' },
            { name: 'Leia Organa', url: 'url/leia' },
          ],
        }),
    });

    fetchMock.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          result: { description: 'Jedi Knight' },
        }),
    });
    fetchMock.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          result: { description: 'Princess' },
        }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Main')).toBeInTheDocument();
    });
  });

  it('displays detailed items when searching by name', async () => {
    localStorageMock.setItem('search_ReginaMos', 'luke');

    fetchMock.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          result: [
            {
              properties: { name: 'Luke Skywalker' },
              description: 'A Jedi Knight',
            },
          ],
        }),
    });

    render(<App />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://www.swapi.tech/api/people/?name=luke'
      );
      expect(screen.getByText('Main')).toBeInTheDocument();
    });
  });

  it('displays error text when API throws on 4xx or 5xx', async () => {
    fetchMock.mockRejectedValueOnce(new Error('404'));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Chips: API error: Error: 404')
      ).toBeInTheDocument();
    });

    fetchMock.mockRejectedValueOnce(new Error('500'));

    render(<App />);

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

    render(<App />);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteSpaces function', () => {
    it('correctly removes spaces from strings', () => {
      const appInstance = new App({});

      expect(appInstance.deleteSpaces('hello world')).toBe('helloworld');
      expect(appInstance.deleteSpaces('  test  ')).toBe('test');
      expect(appInstance.deleteSpaces('a b c d')).toBe('abcd');
      expect(appInstance.deleteSpaces('no-spaces')).toBe('no-spaces');
      expect(appInstance.deleteSpaces('   ')).toBe('');
      expect(appInstance.deleteSpaces('special !@#$ chars')).toBe(
        'special!@#$chars'
      );
    });
  });
});
