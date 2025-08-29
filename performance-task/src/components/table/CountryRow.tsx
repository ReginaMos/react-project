import { useEffect, useState } from 'react';
import type { CountryData, CountryRow } from '../../models/models';
import React from 'react';

interface Props {
    country: CountryData;
    year: number;
    onClick: (country: CountryData) => void;
}

function CountryRow({ country, year, onClick }: Props) {
    const row = country.data.find((r: CountryRow) => r.year === year);

    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 3000);
        return () => clearTimeout(timeout);
    }, [year]);

    return (
        <tr
            onClick={() => onClick(country)}
            className={highlight ? 'highlight' : ''}
        >
            <td>{country.name}</td>
            <td>{country.isoCode || 'N/A'}</td>
            <td>{row?.population ?? 'N/A'}</td>
            <td>{year}</td>
        </tr>
    );
}

export default React.memo(CountryRow, (prevProps, nextProps) => {
    return (
        prevProps.year === nextProps.year &&
        prevProps.country === nextProps.country &&
        prevProps.onClick === nextProps.onClick
    );
});
