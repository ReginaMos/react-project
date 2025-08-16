import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { clearFavourites } from '../store/favouritesReducer';
import '../styles/StoreState.css';
import { useTranslations } from 'next-intl';

export default function StoreStateElement() {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const count = favourites.length;

  const saveCSV = async () => {
    const response = await fetch('/api/download-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favourites }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${favourites.length}_favourites.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const t = useTranslations('Store');

  return (
    <div className="store-state">
      <div className="store-count">
        {count} {t('main-text')}
      </div>
      <div className="store-buttons">
        <button onClick={() => dispatch(clearFavourites())}>
          {t('clear')}
        </button>
        <button onClick={saveCSV}>{t('save')}</button>
      </div>
    </div>
  );
}
