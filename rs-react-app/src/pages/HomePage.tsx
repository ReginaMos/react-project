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
import { useEffect, useState } from 'react';
import '../styles/HomePage/HomePage.css';

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname() || '/en';
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );
  const [heroId, setHeroId] = useState<string | null>(null);

  const page = Number(searchParams?.get('page') ?? '1');
  // const heroId = searchParams?.get('hero') ?? null;
  const find = searchTerm;

  useEffect(() => {
    if (!searchParams?.get('page')) {
      router.replace(`${pathname}?page=1`);
    }
  }, [pathname, searchParams, router]);

  useEffect(() => {
    const h = searchParams?.get('hero');
    setHeroId(h);
  }, [searchParams]);

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
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: string) => {
    pushWithParams({ page: newPage, hero: null });
  };

  const handleSearch = (nextPage: string, value: string) => {
    setSearchTerm(value);
    pushWithParams({ page: nextPage, hero: null });
  };

  const openHero = (id: string | number) => {
    setHeroId(String(id));
    const params = new URLSearchParams(searchParams?.toString());
    params.set('hero', String(id));
    router.push(`${pathname}?${params.toString()}`); // URL обновился, но рендер HomePage не перезагружается
  };

  const closeHero = () => {
    setHeroId(null);
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('hero');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`home-page ${heroId ? 'with-details' : ''}`}>
      <Search onSearch={(p, v) => handleSearch(p, v)} onRefresh={refetch} />

      <div className={`content-layout ${heroId ? 'with-details' : ''}`}>
        <Content items={data?.items || []} onItemClick={openHero} />

        {heroId && selectedItem && (
          <DetailItem item={selectedItem} onClick={closeHero} />
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
