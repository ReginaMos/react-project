import type {
  APIResponse,
  ItemModel,
  PersonFind,
  PersonShort,
} from '../models/models';

export function deleteSpaces(str: string) {
  return str.replace(/\s+/g, '');
}

async function getPersonInfo(
  url: string,
  name: string,
  id: string
): Promise<ItemModel> {
  try {
    const res = await fetch(url);
    const details = await res.json();
    const person = details.result;

    return {
      id: +id,
      name: name,
      description: person.description,
      gender: person.properties.gender,
      skin_color: person.properties.skin_color,
      eye_color: person.properties.eye_color,
      birth_year: person.properties.birth_year,
      height: person.properties.height,
      hair_color: person.properties.hair_color,
    };
  } catch (error) {
    console.error(`Error fetching description for ${name}`, error);

    return {
      id: +id,
      name: name,
      description: 'Description unavailable',
      gender: 'Gender unavailable',
      skin_color: 'Skin color unavailable',
      eye_color: 'Eye color unavailable',
      birth_year: 'Birth year unavailable',
      height: 'Height unavailable',
      hair_color: 'Hair color unavailable',
    };
  }
}

export async function fetchPeople(
  page: string,
  find: string
): Promise<APIResponse | string> {
  const baseUrl = `https://www.swapi.tech/api/people?page=${page}&limit=10`;
  const searchTerm = deleteSpaces(find);
  const url = searchTerm ? `${baseUrl}&name=${searchTerm}` : baseUrl;
  let detailedItems: ItemModel[] = [];

  try {
    const response = await fetch(url);
    const data = await response.json();
    let count = data.total_pages;
    if (searchTerm) {
      const results = data.result || [];
      const firstItem = (+page - 1) * 10;
      detailedItems = results.map((item: PersonFind) => ({
        id: +item.uid,
        name: item.properties.name,
        description: item.description,
        gender: item.properties.gender,
        skin_color: item.properties.skin_color,
        eye_color: item.properties.eye_color,
        birth_year: item.properties.birth_year,
        height: item.properties.height,
        hair_color: item.properties.hair_color,
      })).slice(firstItem, firstItem + 10);
      count = Math.ceil(results.length / 10);
    } else {
      const results = data.results || [];
      detailedItems = await Promise.all(
        results.map(
          async (item: PersonShort) =>
            await getPersonInfo(item.url, item.name, item.uid)
        )
      );
    }

    return {
      items: detailedItems,
      count: count,
    };
  } catch (err) {
    return String(err);
  }
}
