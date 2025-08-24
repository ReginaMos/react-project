import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormItem from '../components/FormItem';
import type { FormData } from '../models/models';

describe('FormItem Component', () => {
    const mockItem: FormData = {
        name: 'John',
        age: 25,
        email: 'john@mail.com',
        password: 'Secret123!',
        confirmPassword: 'Secret123!',
        gender: 'male',
        terms: true,
        country: 'Canada',
        picture: 'avatar.png',
    };

    it('renders all form fields correctly', () => {
        render(<FormItem item={mockItem} isLast={false} />);

        expect(screen.getByText(/Name: John/i)).toBeInTheDocument();
        expect(screen.getByText(/Age: 25/i)).toBeInTheDocument();
        expect(screen.getByText(/E-mail: john@mail.com/i)).toBeInTheDocument();
        expect(screen.getByText('Password: Secret123!')).toBeInTheDocument();
        expect(
            screen.getByText('Confirmed password: Secret123!')
        ).toBeInTheDocument();
        expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
        expect(screen.getByText(/Terms: Yes/i)).toBeInTheDocument();
        expect(screen.getByText(/Country: Canada/i)).toBeInTheDocument();

        const img = screen.getByAltText('item-picture') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain('avatar.png');
    });

    it('shows "No" for terms when false', () => {
        render(
            <FormItem item={{ ...mockItem, terms: false }} isLast={false} />
        );
        expect(screen.getByText(/Terms: No/i)).toBeInTheDocument();
    });

    it('applies lastChild class when isLast is true', () => {
        const { container } = render(
            <FormItem item={mockItem} isLast={true} />
        );
        const div = container.firstChild as HTMLElement;
        expect(div.classList.contains('lastChild')).toBe(true);
    });

    it('does not apply lastChild class when isLast is false', () => {
        const { container } = render(
            <FormItem item={mockItem} isLast={false} />
        );
        const div = container.firstChild as HTMLElement;
        expect(div.classList.contains('lastChild')).toBe(false);
    });
});
