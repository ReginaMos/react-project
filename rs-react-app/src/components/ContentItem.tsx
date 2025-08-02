import { useNavigate, useParams } from 'react-router-dom';
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
}: ShortItemModel) {
  const navigate = useNavigate();
  const params = useParams();
  const page = Number(params.pageNumber) || 1;

  const handleOpenDetails = () => {
    navigate(`/${page}/${id}`);
  };

  const inStore = useSelector((state: RootState) =>
    state.favourites.items.some((item) => item.id === id)
  );

  const toggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id, !inStore);
  };

  return (
    <div className="item" onClick={handleOpenDetails}>
      <div>
        <img
          src={planet}
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
