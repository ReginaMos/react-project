import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      }
    } catch (error) {
      console.warn('Error reading localStorage key “' + key + '”: ', error);
    }
  }, [key]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn('Error setting localStorage key “' + key + '”: ', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
