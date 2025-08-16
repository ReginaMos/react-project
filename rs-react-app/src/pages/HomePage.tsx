'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useLocalStorage from '../hooks/useLocalStorage';
import Content from '../components/ContentComponent';
import Loader from '../elements/LoaderElement';
import Chips from '../elements/ChipsElement';
import Search from '../elements/SearchElement';
import Pagination from '../components/Pagination';
import StoreStateElement from '../elements/StoreStateElement';
import DetailItem from '../components/DetailItem';
import { useGetPeopleQuery } from '../store/peopleApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const page = Number(searchParams?.get('page') ?? '1');
  const heroId = searchParams?.get('hero') ?? null;
  const find = searchTerm;

  const inStore = useSelector(
    (state: RootState) => state.favourites.items.length
  );

  const { data, error, isLoading, isFetching, refetch } = useGetPeopleQuery({
    page: String(page),
    find,
  });

  const selectedItem =
    data?.items.find((it) => String(it.id) === heroId) ?? null;

  const pushWithParams = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === '') {
        params.delete(k);
      } else {
        params.set(k, v);
      }
    });
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  const handlePageChange = (newPage: number | string) => {
    const np = String(newPage);
    if (heroId && +heroId > +np * 10) {
      pushWithParams({ page: np, hero: heroId });
    } else {
      pushWithParams({ page: np, hero: null });
    }
  };

  const handleSearch = (nextPage: string, value: string) => {
    setSearchTerm(value);
    pushWithParams({ page: nextPage, hero: null });
  };

  const openHero = (id: string | number) => {
    pushWithParams({ hero: String(id) });
  };

  const closeHero = () => {
    pushWithParams({ hero: null });
  };

  return (
    <div className={`home-page ${heroId ? 'with-details' : ''}`}>
      <Search onSearch={(p, v) => handleSearch(p, v)} onRefresh={refetch} />

      <div className={`content-layout ${heroId ? 'with-details' : ''}`}>
        <Content items={data?.items || []} onItemClick={openHero} />

        {heroId && selectedItem && (
          <aside>
            <DetailItem item={selectedItem} />
            <button onClick={closeHero}>×</button>
          </aside>
        )}
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
      {error && <Chips text={`API Error: ${String(error)}`} />}
      {inStore > 0 && <StoreStateElement />}
    </div>
  );
}
