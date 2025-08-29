import type { CountryData, CountryRow } from '../models/models';

interface RawEntry {
    iso_code?: string;
    data: CountryRow[];
}

function wrapPromise<T>(promise: Promise<T>) {
    let status = 'pending';
    let result: T;
    const suspender = promise.then(
        (r) => {
            status = 'success';
            result = r;
        },
        (e) => {
            status = 'error';
            result = e;
        }
    );
    return {
        read(): T {
            if (status === 'pending') throw suspender;
            if (status === 'error') throw result;
            return result;
        },
    };
}

export function transformRaw(raw: Record<string, RawEntry>): CountryData[] {
    return Object.entries(raw).map(([countryName, entry]) => ({
        name: countryName,
        isoCode: entry.iso_code || undefined,
        data: entry.data.map((r) => {
            const row: CountryRow = { year: r.year };

            for (const key of Object.keys(r)) {
                if (key !== 'year') {
                    const value = r[key];
                    if (typeof value === 'number') {
                        row[key] = value;
                    }
                }
            }

            row.population = r.population;
            row.co2 = r.co2;
            row.co2_per_capita = r.co2_per_capita;

            return row;
        }),
    }));
}

async function fetchAndParse(): Promise<CountryData[]> {
    const res = await fetch(
        'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
    const raw = await res.json();

    const countries: CountryData[] = transformRaw(raw);

    return countries;
}

let resource: { read: () => CountryData[] } | null = null;

export function getDataResource() {
    if (!resource) {
        resource = wrapPromise(fetchAndParse());
    }
    return resource;
}
