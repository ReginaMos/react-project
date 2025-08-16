import HomePage from '../../pages/HomePage';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function Page() {
  return <HomePage />;
}
