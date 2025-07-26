import type { ItemModel, PersonFind, PersonShort } from '../models/models';

export function deleteSpaces(str: string) {
  return str.replace(/\s+/g, '');
}

async function getPersonInfo(url: string, name: string): Promise<ItemModel> {
  try {
    const res = await fetch(url);
    const details = await res.json();
    const person = details.result;

    return {
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

export async function fetchPeople(find: string) {
  const baseUrl = 'https://www.swapi.tech/api/people/'; //?page=1&limit=15
  const searchTerm = deleteSpaces(find);
  const url = searchTerm ? `${baseUrl}?name=${searchTerm}` : baseUrl;
  let detailedItems: ItemModel[] = [];

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (searchTerm) {
      const results = data.result || [];
      detailedItems = results.map((item: PersonFind) => ({
        name: item.properties.name,
        description: item.description,
      }));
    } else {
      const results = data.results || [];
      detailedItems = await Promise.all(
        results.map(
          async (item: PersonShort) => await getPersonInfo(item.url, item.name)
        )
      );
    }

    return detailedItems;
  } catch (err: unknown) {
    return err;
  }
}
