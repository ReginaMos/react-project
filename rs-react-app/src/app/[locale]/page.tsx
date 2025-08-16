import HomePage from '../../pages/HomePage';
import { api } from '../../store/peopleApi';
import { notFound } from 'next/navigation';
import { store } from '../../store/store';
import { APIResponse } from '../../models/models';

type PageProps = {
  params: { locale: string };
  searchParams: { page?: string; find?: string; hero?: string };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function Page(props: PageProps) {
  const { params, searchParams } = props;
  const locale = params.locale;

  const pageStr = searchParams.page ?? '1';
  const find = searchParams.find ?? '';
  const hero = searchParams.hero ?? null;

  const page = Number(pageStr);
  if (!/^\d+$/.test(pageStr) || page < 1) notFound();

  const serverStore = store;

  const result = await serverStore.dispatch(
    api.endpoints.getPeople.initiate({ page: String(page), find })
  );
  const initialData =
    'data' in result ? (result.data as APIResponse) : { items: [], count: 0 };

  return (
    <HomePage
      initialData={initialData}
      locale={locale}
      initialPage={page}
      initialHeroId={hero}
      searchTerm={find}
    />
  );
}
