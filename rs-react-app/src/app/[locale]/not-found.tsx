'use client';

import { useRouter } from 'next/navigation';
import '../../styles/NotFoundPage.css';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations('NotFoundPage');

  return (
    <>
      <h2>{t('main-text')}</h2>

      <button onClick={() => router.push('/')} className="error-button">
        {t('button-text')}
      </button>
    </>
  );
}
