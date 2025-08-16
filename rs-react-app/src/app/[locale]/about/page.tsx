import AboutPage from '../../../pages/AboutPage';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function About({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!['en', 'ru'].includes(locale)) notFound();
  return <AboutPage />;
}
