import type { ShortItemModel } from '../models/models';
import planet from '../assets/planet-icon.png';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function ContentItem({
  name,
  description,
  gender,
  id,
  onToggle,
  onItemClick,
}: ShortItemModel) {
  const inStore = useSelector((state: RootState) =>
    state.favourites.items.some((item) => item.id === id)
  );

  const toggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id, !inStore);
  };

  const heroClick = () => {
    onItemClick(id);
  };

  return (
    <div className="item" onClick={heroClick}>
      <div>
        <img
          src={planet.src}
          alt="planet-icon"
          className={`planet-icon ${inStore ? 'in-store' : 'not-in-store'}`}
          onClick={toggleStatus}
        />
      </div>
      <div className="item-name">{name}</div>
      <div className="item-info">
        <div className="item-gender">
          <b>Gender:</b> {gender}
        </div>
        <div className="item-description">
          <b>Info:</b> {description}
        </div>
      </div>
    </div>
  );
}
