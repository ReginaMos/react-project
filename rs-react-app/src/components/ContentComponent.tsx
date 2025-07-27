import ContentItem from './ContentItem';
import type { ItemsContextType } from '../models/models';
import '../styles/HomePage/Content.css';

export default function Content({ items: items }: ItemsContextType) {
  return (
    <div className="content">
      {items.length === 0 && (
        <h3 className="empty-content">There aren`t any elements by your request...</h3>
      )}

      {items.length > 0 && (
        <>
          {items.map((item, index) => (
            <ContentItem
              name={item.name}
              description={item.description}
              gender={item.gender}
              id={item.id}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
}
