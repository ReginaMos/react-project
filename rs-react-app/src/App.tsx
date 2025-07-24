import { useState, createContext, useContext, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Loader from './elements/LoaderElement';
import Chips from './elements/ChipsElement';
import type {
  ItemModel,
  AppContextType
} from './models/models';
import { fetchPeople } from './utils/fetchPeople';
import useLocalStorage from './hooks/useLocalStorage';

const AppContext = createContext<AppContextType>({
  onSearch: () => {},
});

export const useAppContext = () => useContext(AppContext);

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
    <AppContext.Provider value={{ onSearch }}>
      <Header />
      <Main items={items} />
      {isLoading && <Loader />}
      {isApiError && <Chips text={isApiError} />}
    </AppContext.Provider>
  );
}
