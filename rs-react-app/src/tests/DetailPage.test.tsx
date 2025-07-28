import { describe, it, expect, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import type { ItemModel } from '../models/models';

type OutletContextType = {
  selectedItem: ItemModel | undefined;
};

vi.mock('../components/DetailItem', () => ({
  default: ({ item }: { item: ItemModel }) => (
    <div>Mock DetailItem: {item.name}</div>
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useOutletContext: vi.fn() as () => OutletContextType,
  };
});

describe('DetailPage', () => {
  it('does not render anything when selectedItem is undefined', () => {
    (useOutletContext as Mock).mockReturnValue({ selectedItem: undefined });

    const { container } = render(<DetailPage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders DetailItem when selectedItem is present', () => {
    const mockItem = { name: 'Test Hero', id: 1 };
    (useOutletContext as Mock).mockReturnValue({ selectedItem: mockItem });

    render(<DetailPage />);
    expect(screen.getByText(/Mock DetailItem: Test Hero/)).toBeInTheDocument();
  });
});
