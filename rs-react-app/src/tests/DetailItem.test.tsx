import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailItem from '../components/DetailItem';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

const mockNavigate = vi.fn();
const mockUseParams = useParams as unknown as Mock;
const mockUseNavigate = useNavigate as unknown as Mock;

describe('DetailItem component', () => {
  const mockItem = {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    height: '172',
    skin_color: 'fair',
    eye_color: 'blue',
    hair_color: 'blond',
    description: 'A brave Jedi Knight.',
    id: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseParams.mockReturnValue({ pageNumber: '3' });
  });

  it('renders all item details', () => {
    render(<DetailItem item={mockItem} />, { wrapper: MemoryRouter });

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `Details of ${mockItem.name}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Birth year: ${mockItem.birth_year}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `Height: ${mockItem.height}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Skin color: ${mockItem.skin_color}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Eye color: ${mockItem.eye_color}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Hair color: ${mockItem.hair_color}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `Info: ${mockItem.description}`
      )
    ).toBeInTheDocument();
  });

  it('calls navigate with correct path on close-icon click', () => {
    render(<DetailItem item={mockItem} />, { wrapper: MemoryRouter });

    const closeIcon = screen.getByAltText('close-icon');
    fireEvent.click(closeIcon);

    expect(mockNavigate).toHaveBeenCalledWith('/3');
  });
});
