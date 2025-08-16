import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header/>
      <main>
       {children}
      </main>
    </NextIntlClientProvider>
  );
}
