import type { ItemModel } from '../models/models';

export default function ContentItem({name, description}: ItemModel) {
  return (
    <div className="item">
      <div className="item-name">{name}</div>
      <div className="item-description">{description}</div>
    </div>
  );
}
