'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Content from '../components/ContentComponent';
import DetailItem from '../components/DetailItem';
import Search from '../elements/SearchElement';
import Pagination from '../components/Pagination';
import Loader from '../elements/LoaderElement';
import StoreStateElement from '../elements/StoreStateElement';
import { useSelector } from 'react-redux';
import { store, type RootState } from '../store/store';
import type { APIResponse } from '../models/models';
import '../styles/HomePage/HomePage.css';
import { api } from '../store/peopleApi';

type HomePageProps = {
  initialData: APIResponse;
  locale: string;
  initialPage: number;
  initialHeroId: string | null;
  searchTerm?: string;
};

export default function HomePage({
  initialData,
  locale,
  initialPage,
  initialHeroId,
  searchTerm: initialSearchTerm = '',
}: HomePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState(initialData);
  const [heroId, setHeroId] = useState<string | null>(initialHeroId);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams?.get('page') ?? initialPage);

  const inStore = useSelector(
    (state: RootState) => state.favourites.items.length
  );

  const selectedItem =
    data?.items.find((it) => String(it.id) === heroId) ?? null;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await store.dispatch(
        api.endpoints.getPeople.initiate(
          { page: String(page), find: searchTerm },
          { forceRefetch: true }
        )
      );
      if ('data' in result && result.data) setData(result.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => fetchData();

  const openHero = (id: string | number) => {
    setHeroId(String(id));
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('hero', String(id));
    router.push(`/${locale}?${params.toString()}`);
  };

  const closeHero = () => {
    setHeroId(null);
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('hero');
    router.push(`/${locale}?${params.toString()}`);
  };

  const handleSearch = (nextPage: string, value: string) => {
    setSearchTerm(value);
    router.push(
      `/${locale}?page=${nextPage}&find=${encodeURIComponent(value)}`
    );
  };

  const handlePageChange = (newPage: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', newPage);
    router.push(`/${locale}?${params.toString()}`);
  };

  return (
    <div className={`home-page ${heroId ? 'with-details' : ''}`}>
      <Search
        onSearch={(p, v) => handleSearch(p, v)}
        onRefresh={handleRefresh}
      />

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
      {inStore > 0 && <StoreStateElement />}
    </div>
  );
}
