import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Chips from '../elements/ChipsElement';
import type { ChipsProps } from '../models/models';

describe('Chips Component', () => {
  it('renders text from props correctly', () => {
    const testProps: ChipsProps = {
      text: 'Test Chip',
    };

    render(<Chips {...testProps} />);

    const chipElement = screen.getByText('Test Chip');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement.tagName).toBe('P');
  });

  it('has correct DOM structure', () => {
    render(<Chips text="Test" />);

    const chipsContainer = document.querySelector('.chips');
    expect(chipsContainer).not.toBeNull();
    expect(chipsContainer?.children.length).toBe(1);
    expect(chipsContainer?.firstChild?.nodeName).toBe('P');
  });

  it('handles empty text prop', () => {
    render(<Chips text="" />);

    const pElement = document.querySelector('.chips p');
    expect(pElement).toBeInTheDocument();
    expect(pElement?.textContent).toBe('');
  });

  it('renders special characters correctly', () => {
    const specialText = 'Alert! 123 @#$%';
    render(<Chips text={specialText} />);

    expect(screen.getByText(specialText)).toBeInTheDocument();
  });

  it('handles long text content', () => {
    const longText = 'Very long chip text '.repeat(10);
    render(<Chips text={longText} />);

    const pElement = document.querySelector('.chips p');
    expect(pElement?.textContent).toBe(longText);
  });
});
