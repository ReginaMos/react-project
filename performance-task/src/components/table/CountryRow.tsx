import type { CountryData, CountryRow } from '../../models/models';

interface Props {
    country: CountryData;
    year: number;
    selectedColumns: string[];
    onClick: (country: CountryData) => void;
}

export default function CountryRow({
    country,
    year,
    selectedColumns,
    onClick,
}: Props) {
    const row = country.data.find((r: CountryRow) => r.year === year);

    return (
        <tr onClick={() => onClick(country)}>
            <td>{country.name}</td>
            <td>{country.isoCode || 'N/A'}</td>
            <td>{row?.population ?? 'N/A'}</td>
            <td>{year}</td>
            {selectedColumns.map((col) => (
                <td key={col}>{row?.[col] ?? 'N/A'}</td>
            ))}
        </tr>
    );
}
