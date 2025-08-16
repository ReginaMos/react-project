import ContentItem from './ContentItem';
import type { ItemsContextType } from '../models/models';
import '../styles/HomePage/Content.css';
import { useDispatch } from 'react-redux';
import { addItem, removeItemById } from '../store/favouritesReducer';

export default function Content({ items, onItemClick }: ItemsContextType) {
  const dispatch = useDispatch();

  const heroClick = (id: number) => {
    onItemClick(id);
  };

  const toggleContentItem = (id: number, inStore: boolean) => {
    const item = items.find((item) => item.id === id);
    if (inStore && item) {
      dispatch(addItem(item));
    } else {
      dispatch(removeItemById(id));
    }
  };

  return (
    <div className="content">
      {items.length === 0 && (
        <h3 className="empty-content">
          There aren`t any elements by your request...
        </h3>
      )}

      {items.length > 0 && (
        <>
          {items.map((item, index) => (
            <ContentItem
              name={item.name}
              description={item.description}
              gender={item.gender}
              key={index}
              id={item.id}
              onToggle={toggleContentItem}
              onItemClick={heroClick}
            />
          ))}
        </>
      )}
    </div>
  );
}
