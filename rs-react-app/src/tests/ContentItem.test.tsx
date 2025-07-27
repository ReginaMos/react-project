import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentItem from '../components/ContentItem';
import type { ShortItemModel } from '../models/models';

describe('ContentItem Component', () => {
  it('renders name, gender, and description correctly', () => {
    const testItem: ShortItemModel = {
      name: 'Luke Skywalker',
      description: 'Jedi Knight from Tatooine',
      gender: 'male',
      onClick: vi.fn(),
    };

    render(<ContentItem {...testItem} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();
    expect(screen.getByText('Jedi Knight from Tatooine')).toBeInTheDocument();
  });

  it('renders empty strings when props are missing', () => {
    render(<ContentItem name="" description="" gender="" onClick={() => {}} />);

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();

    const nameElement = screen.getByText('', { selector: '.item-name' });
    expect(nameElement).toBeInTheDocument();
  });

  it('handles partially missing data', () => {
    const { rerender } = render(
      <ContentItem
        name="Darth Vader"
        description=""
        gender="male"
        onClick={() => {}}
      />
    );

    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Info:')).toBeInTheDocument();

    rerender(
      <ContentItem
        name="Dart Veyder"
        description="Sith Lord"
        gender="male"
        onClick={() => {}}
      />
    );

    expect(screen.getByText('Sith Lord')).toBeInTheDocument();
  });

  it('handles special characters', () => {
    render(
      <ContentItem
        name="R2-D2 & C-3PO"
        description="Droids < > & @ # $ %"
        gender="robot"
        onClick={() => {}}
      />
    );

    expect(screen.getByText('R2-D2 & C-3PO')).toBeInTheDocument();
    expect(screen.getByText('robot')).toBeInTheDocument();
    expect(screen.getByText('Droids < > & @ # $ %')).toBeInTheDocument();
  });

  it('calls onClick when item is clicked', () => {
    const handleClick = vi.fn();

    render(
      <ContentItem
        name="Leia Organa"
        description="Princess"
        gender="female"
        onClick={handleClick}
      />
    );

    const container = screen.getByText('Leia Organa').closest('.item');
    if (container) fireEvent.click(container);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
