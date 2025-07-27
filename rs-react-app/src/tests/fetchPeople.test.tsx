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
            uid: '1',
            properties: {
              name: 'Luke Skywalker',
              gender: 'male',
              skin_color: 'fair',
              eye_color: 'blue',
              birth_year: '19BBY',
              height: '172',
              hair_color: 'blond',
            },
            description: 'A Jedi Knight',
          },
        ],
        total_pages: 1,
      }),
    });

    const result = await fetchPeople('1', 'Luke');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://www.swapi.tech/api/people?page=1&limit=10&name=Luke'
    );
    expect(result).toEqual({
      items: [
        {
          id: 1,
          name: 'Luke Skywalker',
          description: 'A Jedi Knight',
          gender: 'male',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          height: '172',
          hair_color: 'blond',
        },
      ],
      count: 1,
    });
  });

  it('calls empty search and returns full information', async () => {
    fetchMock.mockResolvedValueOnce({
      json: async () => ({
        results: [
          {
            name: 'Leia Organa',
            url: 'https://swapi.tech/api/people/2',
            uid: '2',
          },
        ],
        total_pages: 1,
      }),
    });

    fetchMock.mockResolvedValueOnce({
      json: async () => ({
        result: {
          description: 'Princess of Alderaan',
          properties: {
            gender: 'female',
            skin_color: 'light',
            eye_color: 'brown',
            birth_year: '19BBY',
            height: '150',
            hair_color: 'brown',
          },
        },
      }),
    });

    const result = await fetchPeople('1', '');

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://www.swapi.tech/api/people?page=1&limit=10'
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://swapi.tech/api/people/2'
    );

    expect(result).toEqual({
      items: [
        {
          id: 2,
          name: 'Leia Organa',
          description: 'Princess of Alderaan',
          gender: 'female',
          skin_color: 'light',
          eye_color: 'brown',
          birth_year: '19BBY',
          height: '150',
          hair_color: 'brown',
        },
      ],
      count: 1,
    });
  });

  it('return error if request failed', async () => {
    const error = new Error('Main fetch failed');
    fetchMock.mockRejectedValueOnce(error);

    const result = await fetchPeople('1', 'Obi-Wan');

    expect(result).toBe(String(error));
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
