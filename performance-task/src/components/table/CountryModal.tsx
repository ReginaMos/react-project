import type { CountryData } from '../../models/models';
import MultiSelect from '../controls/MultiSelect';
import '../../styles/Modal.css';
import { useState } from 'react';
import { allFields } from '../../utils/createDataResource';

interface Props {
    country: CountryData;
    onClose: () => void;
}

export default function CountryModal({ country, onClose }: Props) {
    const [selectedColumns, changeSelectedColumns] = useState<string[]>([]);
    const info = country.data;
    const requiredColumns = [
        'year',
        'population',
        'cement_co2',
        'cement_co2_per_capita',
    ];

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-heading">
                    <div className="country-heading">{country.name}</div>
                    <MultiSelect
                        onChange={changeSelectedColumns}
                        options={allFields}
                        selected={selectedColumns}
                    />
                </div>

                <table>
                    <thead>
                        <tr>
                            {requiredColumns.map((column) => (
                                <th key={column}>{column}</th>
                            ))}

                            {selectedColumns &&
                                selectedColumns.map((column) => (
                                    <th key={column}>{column}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {info.map((row, i) => (
                            <tr key={i}>
                                {requiredColumns.map((col) => (
                                    <td key={col}>{row[col] ?? 'N/A'}</td>
                                ))}
                                {selectedColumns.map((col) => (
                                    <td key={col}>{row[col] ?? 'N/A'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
