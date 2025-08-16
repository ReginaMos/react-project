'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import Sun from '@/assets/sun.svg';
import Moon from '@/assets/moon.svg';

export default function Header() {
  const pathname = usePathname();
  const isHomeOrDetail = /^\/(\d+)(\/\d+)?$/.test(location.pathname);

  const { theme, changeTheme } = useContext(ThemeContext);
  const iconSrc = theme === 'light' ? Sun : Moon;

  return (
    <header>
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

      <img
        src={iconSrc}
        alt="theme-icon"
        onClick={changeTheme}
        className="theme-icon"
      />
    </header>
  );
}
