import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Content from '../components/ContentComponent';
import type { ItemModel } from '../models/models';

describe('Content Component', () => {
  it('shows empty message when items array is empty', () => {
    render(<Content items={[]} />);

    expect(
      screen.getByText('There aren`t any elements by your request...')
    ).toBeInTheDocument();

    expect(screen.queryByText('Results:')).not.toBeInTheDocument();
    expect(screen.queryByText('Item Name')).not.toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    const items: ItemModel[] = [
      { name: 'Luke', description: 'Jedi' },
      { name: 'Vader', description: 'Sith' },
      { name: 'Yoda', description: 'Master' },
    ];

    render(<Content items={items} />);

    expect(screen.getByText('Results:')).toBeInTheDocument();

    const itemContainers = document.querySelectorAll('.item:not(.main)');
    expect(itemContainers).toHaveLength(items.length);

    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.getByText('Item Description')).toBeInTheDocument();
  });

  it('displays item data correctly', () => {
    const items: ItemModel[] = [
      { name: 'Han Solo', description: 'Smuggler' },
      { name: 'Leia', description: 'Princess' },
    ];

    render(<Content items={items} />);

    expect(screen.getByText('Han Solo')).toBeInTheDocument();
    expect(screen.getByText('Smuggler')).toBeInTheDocument();

    expect(screen.getByText('Leia')).toBeInTheDocument();
    expect(screen.getByText('Princess')).toBeInTheDocument();
  });

  it('handles items with missing values', () => {
    const items: ItemModel[] = [
      { name: 'Obi-Wan', description: 'Jedi Master' },
      { name: '', description: 'Mysterious character' },
      { name: 'Chewbacca', description: '' },
      { name: '', description: 'Droid' },
    ];

    render(<Content items={items} />);

    const itemContainers = document.querySelectorAll('.item:not(.main)');
    expect(itemContainers).toHaveLength(items.length);

    expect(screen.getByText('Obi-Wan')).toBeInTheDocument();
    expect(screen.getByText('Jedi Master')).toBeInTheDocument();

    const allNameElements = document.querySelectorAll('.item-name');
    const allDescElements = document.querySelectorAll('.item-description');

    expect(allNameElements[2]).toBeEmptyDOMElement();
    expect(allDescElements[2]).toHaveTextContent('Mysterious character');

    expect(allNameElements[3]).toHaveTextContent('Chewbacca');
    expect(allDescElements[3]).toBeEmptyDOMElement();

    expect(allNameElements[4]).toHaveTextContent('');
    expect(allDescElements[4]).toHaveTextContent('Droid');
  });

  it('handles special characters and long strings', () => {
    const longName = 'A'.repeat(1000);
    const longDesc = 'B'.repeat(2000);

    const items: ItemModel[] = [
      {
        name: 'R2-D2 & C-3PO',
        description: 'Droids < > & @ # $ %',
      },
      {
        name: longName,
        description: longDesc,
      },
    ];

    render(<Content items={items} />);

    expect(screen.getByText('R2-D2 & C-3PO')).toBeInTheDocument();
    expect(screen.getByText('Droids < > & @ # $ %')).toBeInTheDocument();

    expect(screen.getByText(longName)).toBeInTheDocument();
    expect(screen.getByText(longDesc)).toBeInTheDocument();
  });
});
