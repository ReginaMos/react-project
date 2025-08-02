import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import StoreStateElement from '../elements/StoreStateElement';
import favouritesReducer, { clearFavourites } from '../store/favouritesReducer';
import { describe, expect, it, vi } from 'vitest';

const createTestStore = (preloadedState = {}) => {
  const testStore = configureStore({
    reducer: {
      favourites: favouritesReducer,
    },
    preloadedState,
  });

  return testStore;
};

describe('StoreStateElement', () => {
  it('renders count of favourites', () => {
    const store = createTestStore({
      favourites: {
        items: [{ id: 1, name: 'Luke', description: 'Jedi',
        gender: 'male',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        height: '172',
        hair_color: 'blond' }, { id: 2, name: 'Leia', description: 'Jedi',
        gender: 'male',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        height: '172',
        hair_color: 'blond', }],
      },
    });

    render(
      <Provider store={store}>
        <StoreStateElement />
      </Provider>
    );

    expect(screen.getByText('2 elements selected')).toBeInTheDocument();
  });

  it('dispatches clearFavourites when "Clear all" is clicked', () => {
    const store = createTestStore({
      favourites: {
        items: [{ id: 1, name: 'Luke', description: 'Jedi',
        gender: 'male',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        height: '172',
        hair_color: 'blond', }],
      },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <StoreStateElement />
      </Provider>
    );

    fireEvent.click(screen.getByText('Clear all'));

    expect(dispatchSpy).toHaveBeenCalledWith(clearFavourites());
  });

  it('downloads a CSV when "Save" is clicked', () => {
    const store = createTestStore({
      favourites: {
        items: [
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
        ],
      },
    });

    const createObjectURLMock = vi.fn(() => 'blob:url');
    const revokeObjectURLMock = vi.fn();
    const clickMock = vi.fn();

    vi.stubGlobal('URL', {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    });

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
  if (tag === 'a') {
    return {
      href: '',
      download: '',
      click: clickMock,
      setAttribute: vi.fn(),
    } as unknown as HTMLAnchorElement;
  }
  return originalCreateElement(tag);
});

    render(
      <Provider store={store}>
        <StoreStateElement />
      </Provider>
    );

    fireEvent.click(screen.getByText('Save'));

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });
});
