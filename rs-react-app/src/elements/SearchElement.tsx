import React from 'react';
import Button from '../elements/ButtonElement';
import { useSearchContext } from '../App';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/Header.css';

export default function Search() {
  const { onSearch } = useSearchContext();
  const [inputText, setInputText] = useLocalStorage<string>('search_ReginaMos', '');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    onSearch(inputText);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputText}
        onChange={handleInput}
        placeholder="Search"
      />
      <Button onAction={handleClick} text="Find" class="find-btn" />
    </div>
  );
}
