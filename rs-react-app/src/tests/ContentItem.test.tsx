import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentItem from '../components/ContentItem';
import type { ShortItemModel } from '../models/models';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as ReactRouterDom from 'react-router-dom';
import favouritesReducer from '../store/favouritesReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithStore = (ui: React.ReactNode, { preloadedState = {} } = {}) => {
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

describe('ContentItem Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders name, gender, and description correctly', () => {
    const testItem: ShortItemModel = {
      name: 'Luke Skywalker',
      description: 'Jedi Knight from Tatooine',
      gender: 'male',
      id: 1,
      onToggle: () => vi.fn(),
    };

    renderWithStore(<ContentItem {...testItem} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();
    expect(screen.getByText('Jedi Knight from Tatooine')).toBeInTheDocument();
  });

  it('renders empty strings when props are missing', () => {
    renderWithStore(
      <ContentItem
        name=""
        description=""
        gender=""
        id={0}
        onToggle={() => vi.fn()}
      />
    );

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();

    const nameElement = screen.getByText('', { selector: '.item-name' });
    expect(nameElement).toBeInTheDocument();
  });

  it('handles partially missing data', () => {
    renderWithStore(
      <ContentItem
        name="Darth Vader"
        description=""
        gender="male"
        id={1}
        onToggle={() => vi.fn()}
      />
    );

    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();

    renderWithStore(
      <ContentItem
        name="Dart Veyder"
        description="Sith Lord"
        gender="male"
        id={2}
        onToggle={() => vi.fn()}
      />
    );

    expect(screen.getByText('Sith Lord')).toBeInTheDocument();
  });

  it('handles special characters', () => {
    renderWithStore(
      <ContentItem
        name="R2-D2 & C-3PO"
        description="Droids < > & @ # $ %"
        gender="robot"
        id={2}
        onToggle={() => vi.fn()}
      />
    );

    expect(screen.getByText('R2-D2 & C-3PO')).toBeInTheDocument();
    expect(screen.getByText('robot')).toBeInTheDocument();
    expect(screen.getByText('Droids < > & @ # $ %')).toBeInTheDocument();
  });

  it('navigates to correct path when clicked', () => {
    const store = configureStore({
      reducer: {
        favourites: favouritesReducer,
      },
      preloadedState: {
        favourites: {
          items: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route
              path="/:pageNumber"
              element={
                <ContentItem
                  name="Leia Organa"
                  description="Princess"
                  gender="female"
                  id={1}
                  onToggle={() => vi.fn()}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const container = screen.getByText('Leia Organa').closest('.item');
    if (container) fireEvent.click(container);

    expect(mockNavigate).toHaveBeenCalledWith('/1/1');
  });

  it('adds in-store class when item is in favourites', () => {
    const testItem: ShortItemModel = {
      name: 'Han Solo',
      description: 'Smuggler',
      gender: 'male',
      id: 7,
      onToggle: () => vi.fn(),
    };

    renderWithStore(<ContentItem {...testItem} />, {
      preloadedState: {
        favourites: {
          items: [{ id: 7, name: '', description: '', gender: '' }],
        },
      },
    });

    const img = screen.getByAltText('planet-icon');
    expect(img).toHaveClass('planet-icon in-store');
  });

  it('adds not-in-store class when item is not in favourites', () => {
    const testItem: ShortItemModel = {
      name: 'Chewbacca',
      description: 'Wookiee',
      gender: 'male',
      id: 8,
      onToggle: () => vi.fn(),
    };

    renderWithStore(<ContentItem {...testItem} />, {
      preloadedState: {
        favourites: {
          items: [],
        },
      },
    });

    const img = screen.getByAltText('planet-icon');
    expect(img).toHaveClass('planet-icon not-in-store');
  });

  it('calls onToggle with correct args when icon clicked', () => {
    const onToggleMock = vi.fn();

    const testItem: ShortItemModel = {
      name: 'Yoda',
      description: 'Jedi Master',
      gender: 'male',
      id: 5,
      onToggle: onToggleMock,
    };

    renderWithStore(<ContentItem {...testItem} />, {
      preloadedState: {
        favourites: {
          items: [],
        },
      },
    });

    const img = screen.getByAltText('planet-icon');
    fireEvent.click(img);

    expect(onToggleMock).toHaveBeenCalledWith(5, true);
  });
});
