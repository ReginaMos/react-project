import { useState, createContext, useContext, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Loader from './elements/LoaderElement';
import Chips from './elements/ChipsElement';
import type {
  ItemModel,
  SearchContextType,
  ItemsContextType
} from './models/models';
import { fetchPeople } from './utils/fetchPeople';
import useLocalStorage from './hooks/useLocalStorage';

const SearchContext = createContext<SearchContextType>({
  onSearch: () => {},
});

const ItemsContext = createContext<ItemsContextType>({
  items: []
});

export const useSearchContext = () => useContext(SearchContext);
export const useItemsContext = () => useContext(ItemsContext);

export default function App() {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isApiError, setApiError] = useState('');

  const [searchTerm, setSearchTerm] = useLocalStorage<string>('search_ReginaMos', '');

  const onSearch = async (find: string) => {
    setLoading(true);
    setApiError('');
    try {
      const data = await fetchPeople(find);
      if (Array.isArray(data)) {
        setItems(data);
        setSearchTerm(find);
      } else {
        setApiError('API error: ' + (data instanceof Error ? data.message : String(data)));
      }
    } catch (err) {
      setApiError('Unexpected error: ' + (err instanceof Error ? err.message : String(err)));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  }, []);

  return (
    <>
      <SearchContext.Provider value={{ onSearch }}>
        <Header />
      </SearchContext.Provider>
      <ItemsContext.Provider value={{ items }}>
        <Main />
      </ItemsContext.Provider>

      {isLoading && <Loader />}
      {isApiError && <Chips text={isApiError} />}
    </>
   
  );
}
