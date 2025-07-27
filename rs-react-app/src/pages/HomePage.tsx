import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/HomePage/HomePage.css';
import Content from '../components/ContentComponent';
import Loader from '../elements/LoaderElement';
import Chips from '../elements/ChipsElement';
import Search from '../elements/SearchElement';
import DetailItem from '../components/DetailItem';
import Pagination from '../components/Pagination';
import type { ItemModel } from '../models/models';
import { fetchPeople } from '../utils/fetchPeople';

export default function HomePage() {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isApiError, setApiError] = useState('');
  const [pagesCount, setPagesCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const heroId = searchParams.get('hero');

  const selectedItem = heroId ? items[+heroId - 1] : null;
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const handlePageChange = (newPage: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', newPage);
      return params;
    });

    onSearch(newPage, searchTerm);
  };

  const handleOpenDetails = (id: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('hero', id);
      return params;
    });
  };

  const handleCloseDetails = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete('hero');
      return params;
    });
  };

  const onSearch = async (page: string, find: string) => {
    setLoading(true);
    setApiError('');
    try {
      const data = await fetchPeople(page, find);
      if (typeof data !== 'string') {
        setItems(data.items);
        setPagesCount(data.count);
        console.log(pagesCount);
        setSearchTerm(find);
      } else {
        setApiError(
          'API error: ' + data //(data instanceof Error ? data.message : String(data))
        );
      }
    } catch (err) {
      setApiError(
        'Unexpected error: ' +
          (err instanceof Error ? err.message : String(err))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    onSearch('1', searchTerm);
  }, []);

  return (
    <div className="home-page">
      <Search onSearch={onSearch} />
      <div className={`content-layout ${heroId ? 'with-details' : ''}`}>
        <Content items={items} onClick={handleOpenDetails} />
        {heroId && selectedItem && (
          <DetailItem item={selectedItem} onClose={handleCloseDetails} />
        )}
      </div>

      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        onPageChange={handlePageChange}
      />

      {isLoading && <Loader />}
      {isApiError && <Chips text={isApiError} />}
    </div>
  );
}
