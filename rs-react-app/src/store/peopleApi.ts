import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  APIResponse,
  ItemModel,
  PeopleFindListResponse,
  PeopleInfoResponse,
  PeopleShortListResponse,
  PersonFind,
  PersonShort,
} from '../models/models';

function deleteSpaces(str = '') {
  return str.replace(/\s+/g, '');
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api' }),
  tagTypes: ['People', 'Person'],
  endpoints: (builder) => ({
    getPeople: builder.query<APIResponse, { page: string; find?: string }>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const { page, find = '' } = arg;
          const searchTerm = deleteSpaces(find);
          const basePath = `/people?page=${page}&limit=10`;
          const url = searchTerm ? `${basePath}&name=${searchTerm}` : basePath;

          const res = await fetchWithBQ(url); 
          if (res.error) return { error: res.error };
          const data = res.data as PeopleFindListResponse;

          let detailedItems: ItemModel[] = [];
          let count = data.total_pages ?? 0;

          if (searchTerm) {
            const results: PersonFind[] = data.result || [];
            const firstItem = (+page - 1) * 10;
            detailedItems = results
              .map((item) => ({
                id: +item.uid,
                name: item.properties.name,
                description: item.description,
                gender: item.properties.gender,
                skin_color: item.properties.skin_color,
                eye_color: item.properties.eye_color,
                birth_year: item.properties.birth_year,
                height: item.properties.height,
                hair_color: item.properties.hair_color,
              }))
              .slice(firstItem, firstItem + 10);
            count = Math.ceil(results.length / 10);
          } else {
            const data = res.data as PeopleShortListResponse;
            const results: PersonShort[] = data.results || [];
            
            const details = await Promise.all(
              results.map(async (item) => {
                const r = await fetchWithBQ(item.url); 
                if (r.error) {
                  return {
                    id: +item.uid,
                    name: item.name,
                    description: 'Description unavailable',
                    gender: 'Gender unavailable',
                    skin_color: 'Skin color unavailable',
                    eye_color: 'Eye color unavailable',
                    birth_year: 'Birth year unavailable',
                    height: 'Height unavailable',
                    hair_color: 'Hair color unavailable',
                  };
                }

                const detailsData = r.data as PeopleInfoResponse;
                const person = detailsData.result;
                return {
                  id: +item.uid,
                  name: item.name,
                  description: person.description,
                  gender: person.properties.gender,
                  skin_color: person.properties.skin_color,
                  eye_color: person.properties.eye_color,
                  birth_year: person.properties.birth_year,
                  height: person.properties.height,
                  hair_color: person.properties.hair_color,
                };
              })
            );
            detailedItems = details;
          }

          return {
            data: {
              items: detailedItems,
              count,
            } as APIResponse,
          };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) }};
        }
      },

      providesTags: (result) =>
        result
          ? [
              { type: 'People', id: 'LIST' as const },
              ...result.items.map((item) => ({ type: 'Person' as const, id: item.id })),
            ]
          : [{ type: 'People', id: 'LIST' as const }],
    }),

    getPersonById: builder.query<ItemModel, string>({
      query: (id) => `/people/${id}`,
      transformResponse: (response: PeopleInfoResponse) => {
        const person: PersonFind = response.result;
        return {
          id: +person.uid,
          name: person.properties.name,
          description: person.description,
          gender: person.properties.gender,
          skin_color: person.properties.skin_color,
          eye_color: person.properties.eye_color,
          birth_year: person.properties.birth_year,
          height: person.properties.height,
          hair_color: person.properties.hair_color,
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Person', id }],
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery } = api;
