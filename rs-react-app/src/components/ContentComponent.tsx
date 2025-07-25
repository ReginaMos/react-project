import ContentItem from './ContentItem';
import type {ItemsContextType } from '../models/models';

export default function Content({items: items}: ItemsContextType) {
  return (
    <div>
      {items.length === 0 && (
        <h3>There aren`t any elements by your request...</h3>
      )}

      {items.length > 0 && (
        <>
          <h2>Results:</h2>

          <div className="item main">
            <div className="item-name">Item Name</div>
            <div className="item-description">Item Description</div>
          </div>

          {items.map((item, index) => (
            <ContentItem
              name={item.name}
              description={item.description}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
}
