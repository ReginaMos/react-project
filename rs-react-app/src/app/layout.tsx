import type { Metadata } from 'next';
import './globals.css';
import { Orbitron, Russo_One } from 'next/font/google';
import { Providers } from './providers';
import { getLocale } from 'next-intl/server';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const russoOne = Russo_One({
  subsets: ['cyrillic', 'latin'],
  weight: '400',
  variable: '--font-russo',
});

export const metadata: Metadata = {
  title: 'Star Wars API',
  icons: ['/favicon.ico'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${orbitron.variable} ${russoOne.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
