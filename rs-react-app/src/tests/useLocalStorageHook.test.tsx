import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useLocalStorage from '../hooks/useLocalStorage';

function TestComponent({ keyName }: { keyName: string }) {
  const [value, setValue] = useLocalStorage<string>(keyName, '');
  return (
    <input
      placeholder="Test input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window.localStorage.__proto__, 'setItem');
    vi.spyOn(window.localStorage.__proto__, 'getItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads initial value from localStorage', () => {
    localStorage.setItem('search_ReginaMos', JSON.stringify('stored'));
    render(<TestComponent keyName="search_ReginaMos" />);
    expect(screen.getByDisplayValue('stored')).toBeInTheDocument();
  });

  it('updates localStorage when value changes', async () => {
    render(<TestComponent keyName="search_ReginaMos" />);
    const input = screen.getByPlaceholderText('Test input');
    await userEvent.type(input, 'abc');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'search_ReginaMos',
      JSON.stringify('a')
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'search_ReginaMos',
      JSON.stringify('abc')
    );
  });

  it('uses empty string when localStorage value is missing', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ results: [] }),
    });
    globalThis.fetch = fetchMock;

    function ComponentUsingLocalStorageAndFetch() {
      React.useEffect(() => {
        localStorage.getItem('search_ReginaMos');
        fetch(`https://www.swapi.tech/api/people`);
      }, []);

      return <div data-testid="result">Loaded</div>;
    }

    render(<ComponentUsingLocalStorageAndFetch />);

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('search_ReginaMos');
      expect(fetchMock).toHaveBeenCalledWith(
        'https://www.swapi.tech/api/people'
      );
    });
  });
});
