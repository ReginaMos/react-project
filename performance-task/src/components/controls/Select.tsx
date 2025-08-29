import '../../styles/Select.css';

interface Props {
    sort: 'name-asc' | 'name-desc' | 'population-asc' | 'population-desc';
    year: number;
    onSortChange: (val: Props['sort']) => void;
    onYearChange: (val: number) => void;
}

export default function Select({
    sort,
    year,
    onSortChange,
    onYearChange,
}: Props) {
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
                <option value={2018}>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
            </select>
        </div>
    );
}
