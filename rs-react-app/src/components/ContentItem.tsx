import { useNavigate, useParams } from 'react-router-dom';
import type { ShortItemModel } from '../models/models';

export default function ContentItem({
  name,
  description,
  gender,
  id,
}: ShortItemModel) {
  const navigate = useNavigate();
  const params = useParams();
  const page = Number(params.pageNumber) || 1;

  const handleOpenDetails = () => {
    navigate(`/${page}/${id}`);
  };

  return (
    <div className="item" onClick={handleOpenDetails}>
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
