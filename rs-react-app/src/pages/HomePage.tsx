import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/HomePage/HomePage.css';
import Content from '../components/ContentComponent';
import Loader from '../elements/LoaderElement';
import Chips from '../elements/ChipsElement';
import Search from '../elements/SearchElement';
import DetailItem from '../components/DetailItem';
import type { ItemModel } from '../models/models';
import { fetchPeople } from '../utils/fetchPeople';

export default function HomePage() {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isApiError, setApiError] = useState('');
  const { id } = useParams();
  const selectedItem = id ? items[+id - 1] : null;

  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const onSearch = async (find: string) => {
    setLoading(true);
    setApiError('');
    try {
      const data = await fetchPeople(find);
      if (Array.isArray(data)) {
        setItems(data);
        setSearchTerm(find);
      } else {
        setApiError(
          'API error: ' + (data instanceof Error ? data.message : String(data))
        );
      }
    } catch (err) {
      setApiError(
        'Unexpected error: ' +
          (err instanceof Error ? err.message : String(err))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    onSearch(searchTerm);
  }, []);

  return (
    <div className="home-page">
      <Search onSearch={onSearch} />
      <div className={`content-layout ${id ? 'with-details' : ''}`}>
        <Content items={items} />
        {id && selectedItem && <DetailItem item={selectedItem} />}
      </div>
      {isLoading && <Loader />}
      {isApiError && <Chips text={isApiError} />}
    </div>
  );
}
