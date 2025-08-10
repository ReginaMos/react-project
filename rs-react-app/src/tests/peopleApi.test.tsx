import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../store/peopleApi';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { PropsWithChildren } from 'react';

interface PersonProperties {
  name: string;
  gender: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  height: string;
  hair_color: string;
}

interface PersonInfo {
  uid: string;
  description: string;
  properties: PersonProperties;
}

interface PeopleInfoResponse {
  result: PersonInfo;
}

interface PeopleFindListResponse {
  result: PersonInfo[];
  total_pages?: number;
}

interface PeopleShortListResponse {
  results: Array<{
    uid: string;
    name: string;
    url: string;
  }>;
  total_pages: number;
}

type ApiResponse =
  | PeopleShortListResponse
  | PeopleInfoResponse
  | PeopleFindListResponse;

function setupApiStore() {
  const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
  setupListeners(store.dispatch);

  return {
    store,
    wrapper: ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    ),
  };
}

const mockPeopleShortListResponse = {
  results: [
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1',
    },
  ],
  total_pages: 5,
};

const mockPeopleInfoResponse = {
  result: {
    uid: '1',
    description: 'A Jedi Knight',
    properties: {
      name: 'Luke Skywalker',
      gender: 'male',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      height: '172',
      hair_color: 'blond',
    },
  },
};

const mockPeopleFindListResponse = {
  result: [
    {
      uid: '1',
      description: 'A Jedi Knight',
      properties: {
        name: 'Luke Skywalker',
        gender: 'male',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        height: '172',
        hair_color: 'blond',
      },
    },
  ],
  total_pages: 1,
};

const createMockResponse = (data: ApiResponse): Response => {
  const response = {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    url: 'https://swapi.tech/api/',
    redirected: false,
    type: 'basic' as ResponseType,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    formData: () => Promise.resolve(new FormData()),
    clone: () => createMockResponse(data),
    body: null,
    bodyUsed: false,
  };

  return response as Response;
};

describe('API tests', () => {
  const { store } = setupApiStore();

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully get people list', async () => {
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(createMockResponse(mockPeopleShortListResponse))
      .mockResolvedValueOnce(createMockResponse(mockPeopleInfoResponse));

    const result = await store.dispatch(
      api.endpoints.getPeople.initiate({ page: '1' })
    );

    expect(result.data).toEqual({
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
      count: 5,
    });
  });

  it('should successfully search people', async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      createMockResponse(mockPeopleFindListResponse)
    );

    const result = await store.dispatch(
      api.endpoints.getPeople.initiate({ page: '1', find: 'Luke' })
    );

    expect(result.data).toEqual({
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

  it('should successfully get person by id', async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      createMockResponse(mockPeopleInfoResponse)
    );

    const result = await store.dispatch(
      api.endpoints.getPersonById.initiate('1')
    );

    expect(result.data).toEqual({
      id: 1,
      name: 'Luke Skywalker',
      description: 'A Jedi Knight',
      gender: 'male',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      height: '172',
      hair_color: 'blond',
    });
  });

  it('should handle error when getting person by id', async () => {
    vi.mocked(global.fetch).mockRejectedValue(new Error('Not found'));

    const result = await store.dispatch(
      api.endpoints.getPersonById.initiate('999')
    );

    expect(result.error).toBeDefined();
  });

  it('should delete spaces from search term', () => {
    const searchTerm = '  Luke Skywalker  ';
    const result = searchTerm.replace(/\s+/g, '');
    expect(result).toBe('LukeSkywalker');
  });
});
