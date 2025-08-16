import React from 'react';
import Button from '../elements/ButtonElement';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/HomePage/Search.css';
import type { SearchContextType } from '../models/models';
import { useTranslations } from 'next-intl';

export default function Search({ onSearch, onRefresh }: SearchContextType) {
  const [inputText, setInputText] = useLocalStorage<string>(
    'search_ReginaMos',
    ''
  );

  const t = useTranslations('Search');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    onSearch('1', inputText);
  };

  return (
    <div className="search-element">
      <Button onAction={onRefresh} text={t('refetch')} class="find-btn" />

      <div className="search">
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          placeholder={t('search')}
          className="search-input"
        />
        <Button onAction={handleClick} text={t('find')} class="find-btn" />
      </div>
    </div>
  );
}
