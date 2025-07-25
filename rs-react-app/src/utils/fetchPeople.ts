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
    };
  } catch (error) {
    console.error(`Error fetching description for ${name}`, error);

    return {
      name: name,
      description: 'Description unavailable',
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
