import CountryRow from './CountryRow';
import type { CountryData } from '../../models/models';
import { useState } from 'react';
import CountryModal from './CountryModal';
import '../../styles/CountryTable.css';

interface Props {
    resource: { read: () => CountryData[] };
    search: string;
    sort: 'name-asc' | 'name-desc' | 'population-asc' | 'population-desc';
    year: number;
}

export default function CountryTable({ resource, search, sort, year }: Props) {
    const countries = resource.read();
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
        null
    );

    const filtered = countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
        if (sort.startsWith('name')) {
            return sort === 'name-asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        if (sort.startsWith('population')) {
            const popA = a.data.find((r) => r.year === year)?.population || 0;
            const popB = b.data.find((r) => r.year === year)?.population || 0;
            return sort === 'population-asc' ? popA - popB : popB - popA;
        }
        return 0;
    });

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>ISO</th>
                        <th>Population</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((country) => (
                        <CountryRow
                            key={country.isoCode || country.name}
                            country={country}
                            year={year}
                            onClick={() => setSelectedCountry(country)}
                        />
                    ))}
                </tbody>
            </table>

            {selectedCountry && (
                <CountryModal
                    country={selectedCountry}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
        </>
    );
}
