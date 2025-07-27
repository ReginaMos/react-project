import '../styles/HomePage/Detail.css';
import closeIcon from '../assets/close-icon.svg';
import type { DetailsState } from '../models/models';

export default function DetailItem({ item, onClose }: DetailsState) {
  return (
    <div className="details">
      <div className="close-icon">
        <img src={closeIcon} alt="close-icon" onClick={onClose} />
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
