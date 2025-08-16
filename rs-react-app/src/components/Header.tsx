'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isHomeOrDetail = /^\/(en|ru)$/.test(pathname || '');
  const localeMatch = pathname?.match(/^\/(en|ru)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  const { theme, changeTheme } = useContext(ThemeContext);
  const iconSrc = theme === 'light' ? '/icons/sun.svg' : '/icons/moon.svg';

  const t = useTranslations('Header');

  const switchLanguage = (newLocale: 'en' | 'ru') => {
    const pathWithoutLocale = pathname?.replace(/^\/(en|ru)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
    document.documentElement.lang = newLocale;
  };

  return (
    <header className={theme}>
      <div className="lang-switcher">
        <div
          onClick={() => switchLanguage('en')}
          className={locale === 'en' ? 'locale active' : 'locale'}
        >
          EN
        </div>
        <div
          onClick={() => switchLanguage('ru')}
          className={locale === 'ru' ? 'locale active' : 'locale'}
        >
          RU
        </div>
      </div>

      <nav className="nav">
        <Link
          href={`/${locale}?page=1`}
          className={isHomeOrDetail ? 'nav-link active' : 'nav-link'}
        >
          {t('home')}
        </Link>
        <Link
          href={`/${locale}/about`}
          className={
            pathname === `/${locale}/about` ? 'nav-link active' : 'nav-link'
          }
        >
          {t('about')}
        </Link>
      </nav>

      <Image
        src={iconSrc}
        width={50}
        height={50}
        alt="theme-icon"
        onClick={changeTheme}
        className="theme-icon"
      />
    </header>
  );
}
