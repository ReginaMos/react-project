import { useNavigate } from 'react-router-dom';
import type { ShortItemModel } from '../models/models';

export default function ContentItem({
  name,
  description,
  gender,
  id,
}: ShortItemModel) {
  const navigator = useNavigate();

  const handleClick = (id: number) => {
    navigator(`/${id}`);
  };

  return (
    <div className="item" onClick={() => handleClick(id)}>
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
