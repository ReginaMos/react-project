import type { ShortItemModel } from '../models/models';

export default function ContentItem({
  name,
  description,
  gender,
}: ShortItemModel) {
  return (
    <div className="item">
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
