import CountryRow from './CountryRow';
import type { CountryData } from '../../models/models';

interface Props {
    resource: { read: () => CountryData[] };
    search: string;
    sort: 'name-asc' | 'name-desc' | 'population-asc' | 'population-desc';
    year: number;
    selectedColumns: string[];
}

export default function CountryTable({
    resource,
    search,
    sort,
    year,
    selectedColumns,
}: Props) {
    const countries = resource.read();
    console.log(search, sort);
    // let filtered = countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

    // filtered.sort((a, b) => {
    //   if (sort.startsWith("name")) {
    //     return sort === "name-asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    //   }
    //   if (sort.startsWith("population")) {
    //     const popA = a.data.find((r: any) => r.year === year)?.population || 0;
    //     const popB = b.data.find((r: any) => r.year === year)?.population || 0;
    //     return sort === "population-asc" ? popA - popB : popB - popA;
    //   }
    //   return 0;
    // });

    return (
        <table>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>ISO</th>
                    <th>Population</th>
                    <th>Year</th>
                    <th>CO₂</th>
                    <th>CO₂ per Capita</th>
                    {selectedColumns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <CountryRow
                        key={country.isoCode || country.name}
                        country={country}
                        year={year}
                        selectedColumns={selectedColumns}
                    />
                ))}
            </tbody>
        </table>
    );
}
