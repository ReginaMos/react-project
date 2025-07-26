import type { ItemModel } from '../models/models';
import '../styles/HomePage/Detail.css';

export default function DetailItem({ item }: { item: ItemModel }) {
  return (
    <div className="details">
      <div className="item-name">
        Detail of <b>{item.name}</b>
      </div>
      <div className="item-info">
        <div className="item-gender">
          <b>Gender:</b> {item.gender}
        </div>

        <div className="item-description">
          <b>Info:</b> {item.description}
        </div>
      </div>
    </div>
  );
}
