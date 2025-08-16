'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const isHomeOrDetail = /^\/(en|ru)\/(\d+)(\/\d+)?$/.test(pathname || '');
  const localeMatch = pathname?.match(/^\/(en|ru)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  const { theme, changeTheme } = useContext(ThemeContext);
  const iconSrc = theme === 'light' ? '/icons/sun.svg' : '/icons/moon.svg';

  return (
    <header className={theme}>
      <nav className="nav">
        <Link
          href={`/${locale}`}
          className={isHomeOrDetail ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
        <Link
           href={`/${locale}/about`}
          className={pathname === `/${locale}/about` ? 'nav-link active' : 'nav-link'}
        >
          About
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
