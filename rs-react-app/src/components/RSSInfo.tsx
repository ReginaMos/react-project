'use client';

import { useTranslations } from 'next-intl';
import '../styles/AboutPage/RSSInfo.css';
import Image from 'next/image';

export default function RSSInfo() {
  const t = useTranslations('AboutPage');

  return (
    <div className="rss-info">
      <div className="rss-text">
        {t.rich('rss', {
          bold: (message: React.ReactNode) => <b>{message}</b>,
        })}
      </div>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icons/rs.png"
          width={50}
          height={50}
          className="logo"
          alt="rss-logo"
        />
      </a>
    </div>
  );
}
