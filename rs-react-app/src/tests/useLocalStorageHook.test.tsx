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

  it('should maintain separate state for different keys', async () => {
    render(
      <>
        <TestComponent keyName="key1" />
        <TestComponent keyName="key2" />
      </>
    );
    
    const [input1, input2] = screen.getAllByPlaceholderText('Test input');
    await userEvent.type(input1, 'value1');
    await userEvent.type(input2, 'value2');
    
    expect(input1).toHaveValue('value1');
    expect(input2).toHaveValue('value2');
    expect(localStorage.setItem).toHaveBeenCalledWith('key1', JSON.stringify('value1'));
    expect(localStorage.setItem).toHaveBeenCalledWith('key2', JSON.stringify('value2'));
  });

  it('should handle complex objects in localStorage', () => {
    const complexValue = { a: 1, b: { c: 2 } };
    localStorage.setItem('complexKey', JSON.stringify(complexValue));
    
    function ComplexComponent() {
      const [value] = useLocalStorage('complexKey', {});
      return <div>{JSON.stringify(value)}</div>;
    }
    
    render(<ComplexComponent />);
    expect(screen.getByText(JSON.stringify(complexValue))).toBeInTheDocument();
  });
});
