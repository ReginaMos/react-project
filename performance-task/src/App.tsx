import { Suspense, useState } from 'react';
import SearchBar from './components/controls/SearchBar';
import Select from './components/controls/Select';
import Modal from './components/Modal';
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
    const [year, setYear] = useState(2020);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

    return (
        <div>
            <div className="search-params">
                <SearchBar value={search} onChange={setSearch} />
                <Select
                    sort={sort}
                    year={year}
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
                    selectedColumns={selectedColumns}
                />
            </Suspense>

            {isModalOpen && (
                <Modal
                    selectedColumns={selectedColumns}
                    onClose={() => setIsModalOpen(false)}
                    onApply={setSelectedColumns}
                />
            )}
        </div>
    );
}
