import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/HomePage/HomePage.css';
import Content from '../components/ContentComponent';
import Loader from '../elements/LoaderElement';
import Chips from '../elements/ChipsElement';
import Search from '../elements/SearchElement';
import Pagination from '../components/Pagination';
import type { ItemModel } from '../models/models';
import { fetchPeople } from '../utils/fetchPeople';
import NotFoundPage from './NotFoundPage';

export default function HomePage() {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isApiError, setApiError] = useState('');
  const [pagesCount, setPagesCount] = useState(0);
  const navigate = useNavigate();
  const params = useParams();

  const page = Number(params.pageNumber) || 1;
  const heroId = params.heroNumber || null;

  const selectedItem = items.find((item) => String(item.id) === heroId);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const handlePageChange = (newPage: string) => {
    if (heroId) {
      navigate(`/${newPage}/${heroId}`);
    } else {
      navigate(`/${newPage}`);
    }

    onSearch(newPage, searchTerm);
  };

  const onSearch = async (page: string, find: string) => {
    setLoading(true);
    setApiError('');
    try {
      const data = await fetchPeople(page, find);
      if (typeof data !== 'string') {
        setItems(data.items);
        setPagesCount(data.count);
        setSearchTerm(find);
      } else {
        setApiError('API error: ' + data);
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
    onSearch(String(page), searchTerm);
  }, [page, searchTerm]);

  if (
    !/^\d+$/.test(params.pageNumber || '') ||
    (params.heroNumber && !/^\d+$/.test(params.heroNumber || ''))
  ) {
    return <NotFoundPage />;
  }

  return (
    <div className="home-page">
      <Search onSearch={onSearch} />
      <div className={`content-layout ${heroId ? 'with-details' : ''}`}>
        <Content items={items} />
        <Outlet context={{ selectedItem }} />
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
