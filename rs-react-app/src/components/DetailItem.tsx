import '../styles/HomePage/Detail.css';
import type { ItemModel } from '../models/models';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface DetailsProps {
  item: ItemModel;
  onClick: () => void;
}

export default function DetailItem({ item, onClick }: DetailsProps) {
  const handleCloseDetails = () => {
    onClick();
  };

  const t = useTranslations('Content');

  return (
    <div className="details">
      <div className="close-icon">
        <Image
          src="/icons/close-icon.svg"
          width={25}
          height={25}
          alt="close-icon"
          onClick={handleCloseDetails}
        />
      </div>
      <div className="item-name">
        {t('details')} <b>{item.name}</b>
      </div>
      <div className="item-info">
        <div className="item-detail">
          <b>{t('gender')}</b> {item.gender}
        </div>

        <div className="item-detail">
          <b>{t('birth-year')}</b> {item.birth_year}
        </div>

        <div className="item-detail">
          <b>{t('height')}</b> {item.height}
        </div>

        <div className="item-detail">
          <b>{t('skin-color')}</b> {item.skin_color}
        </div>

        <div className="item-detail">
          <b>{t('eye-color')}</b> {item.eye_color}
        </div>

        <div className="item-detail">
          <b>{t('hair-color')}</b> {item.hair_color}
        </div>

        <div className="item-detail">
          <b>{t('info')}</b> {item.description}
        </div>
      </div>
    </div>
  );
}
