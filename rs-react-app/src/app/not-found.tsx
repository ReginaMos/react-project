import '../styles/NotFoundPage.css';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <main>
      <h2>{t('main-text')}</h2>

      <a href="/en" className="error-button">
        {t('button-text')}
      </a>
    </main>
  );
}
