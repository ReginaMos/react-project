'use client';

import '../styles/AboutPage/AuthorInfo.css';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AuthorInfo() {
  const t = useTranslations('AboutPage');

  return (
    <>
      <div className="author-heading">
         {t.rich('intro', {
          bold: (message: React.ReactNode) => <b>{message}</b>,
        })}
      </div>

      <div className="description">
        {t('description-1')}
      </div>

      <div className="description">
       {t('description-2')}
      </div>

      <div className="contacts">
        <div className="contacts-heading">{t('contacts')}</div>

        <a
          href="https://www.linkedin.com/in/regina-moiseeva-158821284/"
          target="_blank"
          rel="noopener noreferrer"
        >
           <Image
              src='/icons/linkedin.webp'
              width={50}
              height={50}
              alt="linkedin-logo" className="logo"
            />
        </a>

        <a
          href="https://github.com/ReginaMos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src='/icons/GitHub.png'
            width={50}
            height={50}
            alt="github-logo" className="logo"
          />
        </a>
      </div>
    </>
  );
}
