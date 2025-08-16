import { notFound } from 'next/navigation';
import HomePage from '../../pages/HomePage';

type PageProps = {
  params: { locale: string };
  searchParams: { page?: string; hero?: string; find?: string };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default function Page({ params: { locale }, searchParams }: PageProps) {
  const pageStr = searchParams.page ?? '1';
  const heroStr = searchParams.hero ?? null;
  const find = searchParams.find ?? '';

  const page = Number(pageStr);
  const hero = heroStr;

  if (!/^\d+$/.test(pageStr) || page < 1) notFound();
  if (hero !== null && !/^\d+$/.test(hero)) notFound();

  return (
    <HomePage
      initialPage={page}
      initialHeroId={hero}
      initialFind={find}
      locale={locale}
    />
  );
}
