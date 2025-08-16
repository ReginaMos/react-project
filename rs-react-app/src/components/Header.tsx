'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const isHomeOrDetail = /^\/(\d+)(\/\d+)?$/.test(location.pathname);

  const { theme, changeTheme } = useContext(ThemeContext);
  const iconSrc = theme === 'light' ? '/icons/sun.svg' : '/icons/moon.svg';

  return (
    <header className={theme}>
      <nav className="nav">
        <Link
          href="/"
          className={isHomeOrDetail ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={pathname === '/about' ? 'nav-link active' : 'nav-link'}
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
