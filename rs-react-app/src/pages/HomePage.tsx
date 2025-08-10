import { Outlet, useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/HomePage/HomePage.css';
import Content from '../components/ContentComponent';
import Loader from '../elements/LoaderElement';
import Chips from '../elements/ChipsElement';
import Search from '../elements/SearchElement';
import Pagination from '../components/Pagination';
import StoreStateElement from '../elements/StoreStateElement';
import { useGetPeopleQuery } from '../store/peopleApi';
import NotFoundPage from './NotFoundPage';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function HomePage() {
  const navigate = useNavigate();
  const params = useParams();
  const inStore = useSelector(
    (state: RootState) => state.favourites.items.length
  );

  const page = Number(params.pageNumber) || 1;
  const heroId = params.heroNumber || null;
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const { data, error, isLoading, isFetching, refetch } = useGetPeopleQuery({
    page: String(page),
    find: searchTerm,
  });

  const selectedItem = data?.items.find((item) => String(item.id) === heroId);

  const handlePageChange = (newPage: string) => {
    if (heroId && +heroId > +newPage * 10) {
      navigate(`/${newPage}/${heroId}`);
    } else {
      navigate(`/${newPage}`);
    }
  };

  const handleSearch = (page: string, find: string) => {
    setSearchTerm(find);
    navigate(`/${page}`);
  };

  if (
    !/^\d+$/.test(params.pageNumber || '') ||
    (params.heroNumber && !/^\d+$/.test(params.heroNumber || ''))
  ) {
    return <NotFoundPage />;
  }

  return (
    <div className="home-page">
      <Search onSearch={handleSearch} onRefresh={refetch} />

      {/* <div style={{ marginBottom: 8 }}>
        <button onClick={() => refetch()}>Refresh (refetch)</button>
      </div> */}

      <div className={`content-layout ${heroId ? 'with-details' : ''}`}>
        <Content items={data?.items || []} />
        <Outlet context={{ selectedItem }} />
      </div>

      {data && (
        <Pagination
          currentPage={page}
          pagesCount={data.count}
          onPageChange={handlePageChange}
        />
      )}

      {isLoading && <Loader />}
      {isFetching && !isLoading && <Loader />}
      {error && <Chips text={`Ошибка: ${String(error || error)}`} />}
      {inStore > 0 && <StoreStateElement />}
    </div>
  );
}
