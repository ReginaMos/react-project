import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Content from '../components/ContentComponent';
import type { ItemModel } from '../models/models';
import { MemoryRouter } from 'react-router-dom';
import favouritesReducer from '../store/favouritesReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const renderWithStore = (ui: React.ReactNode, preloadedState = {}) => {
  const testStore = configureStore({
    reducer: {
      favourites: favouritesReducer,
    },
    preloadedState,
  });

  return render(
    <MemoryRouter>
      <Provider store={testStore}>{ui}</Provider>
    </MemoryRouter>
  );
};

describe('Content Component', () => {
  it('shows empty message when items array is empty', () => {
    renderWithStore(<Content items={[]} />);

    expect(
      screen.getByText('There aren`t any elements by your request...')
    ).toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    const items: ItemModel[] = [
      {
        id: 1,
        name: 'Luke',
        description: 'Jedi',
        gender: 'male',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        height: '172',
        hair_color: 'blond',
      },
      {
        id: 2,
        name: 'Vader',
        description: 'Sith',
        gender: 'male',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
      },
      {
        id: 3,
        name: 'Yoda',
        description: 'Master',
        gender: 'male',
        skin_color: 'green',
        eye_color: 'brown',
        birth_year: '896BBY',
        height: '66',
        hair_color: 'white',
      },
    ];

    renderWithStore(<Content items={items} />);

    const itemTitles = screen.getAllByText(/(Luke|Vader|Yoda)/);
    expect(itemTitles).toHaveLength(3);
  });

  it('displays item data correctly', () => {
    const items: ItemModel[] = [
      {
        id: 1,
        name: 'Luke',
        description: 'Jedi',
        gender: 'male',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        height: '172',
        hair_color: 'blond',
      },
      {
        id: 2,
        name: 'Vader',
        description: 'Sith',
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
      },
    ];

    renderWithStore(<Content items={items} />);

    expect(screen.getByText('Luke')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Jedi')).toBeInTheDocument();

    expect(screen.getByText('Vader')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.getByText('Sith')).toBeInTheDocument();
  });

  it('handles items with missing values', () => {
    const items: ItemModel[] = [
      {
        id: 1,
        name: 'Obi-Wan',
        description: 'Jedi Master',
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
      },
      {
        id: 20,
        name: '',
        description: 'Mysterious character',
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
      },
      {
        id: 3,
        name: 'Chewbacca',
        description: '',
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
      },
      {
        name: '',
        description: 'Droid',
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
        id: 5,
      },
    ];

    renderWithStore(<Content items={items} />);

    const itemContainers = document.querySelectorAll('.item');
    expect(itemContainers).toHaveLength(items.length);

    expect(screen.getByText('Obi-Wan')).toBeInTheDocument();
    expect(screen.getByText('Jedi Master')).toBeInTheDocument();

    const allNameElements = document.querySelectorAll('.item-name');
    const allDescElements = document.querySelectorAll('.item-description');

    expect(allNameElements[1]).toBeEmptyDOMElement();
    expect(allDescElements[1]).toHaveTextContent('Mysterious character');

    expect(allNameElements[2]).toHaveTextContent('Chewbacca');
    expect(allDescElements[2]).toHaveTextContent('Info:');

    expect(allNameElements[3]).toHaveTextContent('');
    expect(allDescElements[3]).toHaveTextContent('Droid');
  });

  it('handles special characters and long strings', () => {
    const longName = 'A'.repeat(1000);
    const longDesc = 'B'.repeat(2000);

    const items: ItemModel[] = [
      {
        name: 'R2-D2 & C-3PO',
        description: 'Droids < > & @ # $ %',
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
        id: 5,
      },
      {
        name: longName,
        description: longDesc,
        gender: 'female',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        height: '202',
        hair_color: 'none',
        id: 5,
      },
    ];

    renderWithStore(<Content items={items} />);

    expect(screen.getByText('R2-D2 & C-3PO')).toBeInTheDocument();
    expect(screen.getByText('Droids < > & @ # $ %')).toBeInTheDocument();

    expect(screen.getByText(longName)).toBeInTheDocument();
    expect(screen.getByText(longDesc)).toBeInTheDocument();
  });
});
