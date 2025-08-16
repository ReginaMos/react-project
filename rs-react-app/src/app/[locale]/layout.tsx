import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  let messages;

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
