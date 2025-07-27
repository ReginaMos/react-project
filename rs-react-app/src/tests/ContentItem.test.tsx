import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentItem from '../components/ContentItem';
import type { ShortItemModel } from '../models/models';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as ReactRouterDom from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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
    };

    render(
      <MemoryRouter>
        <ContentItem {...testItem} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();
    expect(screen.getByText('Jedi Knight from Tatooine')).toBeInTheDocument();
  });

  it('renders empty strings when props are missing', () => {
    render(
      <MemoryRouter>
        <ContentItem name="" description="" gender="" id={0} />
      </MemoryRouter>
    );

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();

    const nameElement = screen.getByText('', { selector: '.item-name' });
    expect(nameElement).toBeInTheDocument();
  });

  it('handles partially missing data', () => {
    const { rerender } = render(
      <MemoryRouter>
        <ContentItem name="Darth Vader" description="" gender="male" id={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <ContentItem
          name="Dart Veyder"
          description="Sith Lord"
          gender="male"
          id={2}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Sith Lord')).toBeInTheDocument();
  });

  it('handles special characters', () => {
    render(
      <MemoryRouter>
        <ContentItem
          name="R2-D2 & C-3PO"
          description="Droids < > & @ # $ %"
          gender="robot"
          id={1}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('R2-D2 & C-3PO')).toBeInTheDocument();
    expect(screen.getByText('robot')).toBeInTheDocument();
    expect(screen.getByText('Droids < > & @ # $ %')).toBeInTheDocument();
  });

  it('navigates to correct path when clicked', () => {
    render(
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
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const container = screen.getByText('Leia Organa').closest('.item');
    if (container) fireEvent.click(container);

    expect(mockNavigate).toHaveBeenCalledWith('/1/1');
  });
});
