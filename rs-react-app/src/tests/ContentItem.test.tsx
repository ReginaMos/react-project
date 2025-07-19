import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentItem from '../components/ContentItem';
import type { ItemModel } from '../models/models';

describe('ContentItem Component', () => {
  it('renders name and description correctly', () => {
    const testItem: ItemModel = {
      name: 'Luke Skywalker',
      description: 'Jedi Knight from Tatooine',
    };

    render(<ContentItem {...testItem} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Jedi Knight from Tatooine')).toBeInTheDocument();

    const container = document.querySelector('.item') as HTMLElement;
    const nameElement = container.querySelector('.item-name');
    const descElement = container.querySelector('.item-description');

    expect(nameElement).toHaveTextContent('Luke Skywalker');
    expect(descElement).toHaveTextContent('Jedi Knight from Tatooine');
  });

  it('handles missing name and description', () => {
    render(<ContentItem name={''} description={''} />);

    const container = document.querySelector('.item') as HTMLElement;
    const nameElement = container.querySelector('.item-name');
    const descElement = container.querySelector('.item-description');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent('');

    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveTextContent('');
  });

  it('handles partially missing data', () => {
    const { rerender } = render(
      <ContentItem name="Darth Vader" description={''} />
    );

    expect(screen.getByText('Darth Vader')).toBeInTheDocument();

    let container = document.querySelector('.item') as HTMLElement;
    const descElement = container.querySelector('.item-description');
    expect(descElement).toHaveTextContent('');

    rerender(<ContentItem name={''} description="Sith Lord" />);

    container = document.querySelector('.item') as HTMLElement;
    const nameElement = container.querySelector('.item-name');
    expect(nameElement).toHaveTextContent('');
    expect(screen.getByText('Sith Lord')).toBeInTheDocument();
  });

  it('handles empty strings', () => {
    render(<ContentItem name="" description="" />);

    const container = document.querySelector('.item') as HTMLElement;
    const nameElement = container.querySelector('.item-name');
    const descElement = container.querySelector('.item-description');

    expect(nameElement).toHaveTextContent('');
    expect(descElement).toHaveTextContent('');
  });

  it('handles special characters', () => {
    render(
      <ContentItem name="R2-D2 & C-3PO" description="Droids < > & @ # $ %" />
    );

    expect(screen.getByText('R2-D2 & C-3PO')).toBeInTheDocument();
    expect(screen.getByText('Droids < > & @ # $ %')).toBeInTheDocument();
  });
});
