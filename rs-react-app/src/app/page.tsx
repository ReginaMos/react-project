import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default function RootPage() {
  redirect('/en');
}
