import '../styles/HomePage/Detail.css';
import type { ItemModel } from '../models/models';
import Image from 'next/image';

interface DetailsProps {
  item: ItemModel;
  onClick: () => void 
 }

export default function DetailItem({ item, onClick }: DetailsProps) {
  const handleCloseDetails = () => {
    onClick();
  };

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
        Details of <b>{item.name}</b>
      </div>
      <div className="item-info">
        <div className="item-detail">
          <b>Gender:</b> {item.gender}
        </div>

        <div className="item-detail">
          <b>Birth year:</b> {item.birth_year}
        </div>

        <div className="item-detail">
          <b>Height:</b> {item.height}
        </div>

        <div className="item-detail">
          <b>Skin color:</b> {item.skin_color}
        </div>

        <div className="item-detail">
          <b>Eye color:</b> {item.eye_color}
        </div>

        <div className="item-detail">
          <b>Hair color:</b> {item.hair_color}
        </div>

        <div className="item-detail">
          <b>Info:</b> {item.description}
        </div>
      </div>
    </div>
  );
}
