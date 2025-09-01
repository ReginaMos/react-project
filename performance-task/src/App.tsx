import { Suspense, useState } from 'react';
import SearchBar from './components/controls/SearchBar';
import Select from './components/controls/Select';
import CountryTable from './components/table/CountryTable';
import Loader from './components/Loader';
import { getDataResource } from './utils/createDataResource';
import './App.css';

const resource = getDataResource();

export default function App() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<
        'name-asc' | 'name-desc' | 'population-asc' | 'population-desc'
    >('name-asc');
    const [years, setYears] = useState<number[]>([]);
    const [year, setYear] = useState<number>(0);

    const handleYearsReady = (yrs: number[], last: number) => {
        setYears(yrs);
        if (year === 0) setYear(last);
    };

    return (
        <div>
            <div className="search-params">
                <SearchBar value={search} onChange={setSearch} />
                <Select
                    sort={sort}
                    year={year}
                    years={years}
                    onSortChange={setSort}
                    onYearChange={setYear}
                />
            </div>

            <Suspense fallback={<Loader />}>
                <CountryTable
                    resource={resource}
                    search={search}
                    sort={sort}
                    year={year}
                    onYearsReady={handleYearsReady}
                />
            </Suspense>
        </div>
    );
}
