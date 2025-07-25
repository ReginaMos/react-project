import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteSpaces, fetchPeople } from '../utils/fetchPeople';

const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

beforeEach(() => {
  fetchMock.mockReset();
});

describe('fetchPeople', () => {
  it('calls correct API with search term and return results', async () => {
    fetchMock.mockResolvedValueOnce({
      json: async () => ({
        result: [
          {
            properties: { name: 'Luke Skywalker' },
            description: 'A Jedi Knight',
          },
        ],
      }),
    });

    const result = await fetchPeople('Luke');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://www.swapi.tech/api/people/?name=Luke'
    );
    expect(result).toEqual([
      {
        name: 'Luke Skywalker',
        description: 'A Jedi Knight',
      },
    ]);
  });

  it('calls empty search and returns full information', async () => {
    fetchMock.mockResolvedValueOnce({
      json: async () => ({
        results: [
          {
            name: 'Leia Organa',
            url: 'https://swapi.tech/api/people/2',
          },
        ],
      }),
    });

    fetchMock.mockResolvedValueOnce({
      json: async () => ({
        result: {
          description: 'Princess of Alderaan',
        },
      }),
    });

    const result = await fetchPeople('');

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://www.swapi.tech/api/people/'
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://swapi.tech/api/people/2'
    );

    expect(result).toEqual([
      {
        name: 'Leia Organa',
        description: 'Princess of Alderaan',
      },
    ]);
  });

  it('return error if request failed', async () => {
    const error = new Error('Main fetch failed');
    fetchMock.mockRejectedValueOnce(error);

    const result = await fetchPeople('Obi-Wan');

    expect(result).toBe(error);
  });
});

describe('deleteSpaces function', () => {
  it('correctly removes spaces from strings', () => {
    expect(deleteSpaces('hello world')).toBe('helloworld');
    expect(deleteSpaces('  test  ')).toBe('test');
    expect(deleteSpaces('a b c d')).toBe('abcd');
    expect(deleteSpaces('no-spaces')).toBe('no-spaces');
    expect(deleteSpaces('   ')).toBe('');
    expect(deleteSpaces('special !@#$ chars')).toBe('special!@#$chars');
  });
});
