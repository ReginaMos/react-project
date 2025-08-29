import React from 'react';
import '../../styles/Select.css';
import { allYears } from '../../utils/createDataResource';

interface Props {
    sort: 'name-asc' | 'name-desc' | 'population-asc' | 'population-desc';
    year: number;
    onSortChange: (val: Props['sort']) => void;
    onYearChange: (val: number) => void;
}

function SelectComponent({ sort, year, onSortChange, onYearChange }: Props) {
    return (
        <div className="select-items">
            <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value as Props['sort'])}
            >
                <option value="name-asc">Name ↑</option>
                <option value="name-desc">Name ↓</option>
                <option value="population-asc">Population ↑</option>
                <option value="population-desc">Population ↓</option>
            </select>

            <select
                value={year}
                onChange={(e) => onYearChange(Number(e.target.value))}
            >
                {allYears.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.memo(SelectComponent);
