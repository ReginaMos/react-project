import type { CountryData, CountryRow } from '../../models/models';

interface Props {
    country: CountryData;
    year: number;
    selectedColumns: string[];
}

export default function CountryRow({ country, year, selectedColumns }: Props) {
    const row = country.data.find((r: CountryRow) => r.year === year);

    return (
        <tr>
            <td>{country.name}</td>
            <td>{country.isoCode || 'N/A'}</td>
            <td>{row?.population ?? 'N/A'}</td>
            <td>{year}</td>
            <td>{row?.co2 ?? 'N/A'}</td>
            <td>{row?.co2_per_capita ?? 'N/A'}</td>
            {selectedColumns.map((col) => (
                <td key={col}>{row?.[col] ?? 'N/A'}</td>
            ))}
        </tr>
    );
}
