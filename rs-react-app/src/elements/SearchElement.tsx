import React from 'react';
import Button from '../elements/ButtonElement';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/HomePage/Search.css';
import type { SearchContextType } from '../models/models';

export default function Search({ onSearch, onRefresh }: SearchContextType) {
  const [inputText, setInputText] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    onSearch('1', inputText);
  };

  return (
    <div className="search-element">
      <Button onAction={onRefresh} text="Refetch" class="find-btn" />

      <div className="search">
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          placeholder="Search"
        />
        <Button onAction={handleClick} text="Find" class="find-btn" />
      </div>
    </div>
  );
}
