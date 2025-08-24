import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HookForm from '../components/HookForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../store/store';

const renderWithStore = (ui: React.ReactNode, { onClose = vi.fn() } = {}) => {
    const store = configureStore({
        reducer: { forms: formsReducer },
    });

    return render(
        <Provider store={store}>
            <HookForm onClose={onClose} />
        </Provider>
    );
};

vi.mock('../utils/convertToBse64', () => ({
    toBase64: vi.fn().mockResolvedValue('mocked-base64'),
}));

describe('HookForm Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders form with all required fields', () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);

        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat password:')).toBeInTheDocument();
        expect(screen.getByText('Gender:')).toBeInTheDocument();
        expect(
            screen.getByLabelText(/Accept Terms & Conditions/i)
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    });

    it('shows validation error when name is lowercase', async () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);

        const nameInput = screen.getByLabelText(/name/i);

        await userEvent.type(nameInput, 'john');
        await userEvent.tab();

        expect(
            await screen.findByText(/Name must start with uppercase/i)
        ).toBeInTheDocument();
    });

    it('shows validation error when age is negative', async () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);
        const ageInput = screen.getByLabelText(/age/i);
        await userEvent.clear(ageInput);
        await userEvent.type(ageInput, '-5');
        await userEvent.tab();
        expect(
            await screen.findByText(/Age must be non-negative/i)
        ).toBeInTheDocument();
    });

    it('shows validation error when password too short', async () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);
        const pwdInput = screen.getByLabelText('Password:');
        await userEvent.clear(pwdInput);
        await userEvent.type(pwdInput, '11');
        await userEvent.tab();
        expect(
            await screen.findByText(/Password too short/i)
        ).toBeInTheDocument();
    });

    it('shows validation error when email is not valid', async () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);
        const emailInput = screen.getByLabelText(/email/i);
        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, '11ewe');
        await userEvent.tab();
        expect(
            await screen.findByText(/Invalid email, use email@email.com/i)
        ).toBeInTheDocument();
    });

    it('shows password strength dynamically', async () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);
        const passwordInput = screen.getByLabelText('Password:');

        await userEvent.type(passwordInput, '123');
        expect(screen.getByText(/Weak/i)).toBeInTheDocument();

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, 'StrongP@ss1');
        expect(screen.getByText(/Very strong/i)).toBeInTheDocument();
    });

    it('form when all data is valid', async () => {
        const onClose = vi.fn();
        renderWithStore(<HookForm onClose={onClose} />);

        await userEvent.type(screen.getByLabelText(/name/i), 'John');
        await userEvent.type(screen.getByLabelText(/age/i), '25');
        await userEvent.type(screen.getByLabelText(/email/i), 'test@mail.com');
        await userEvent.type(screen.getByLabelText('Password:'), 'Secret123!');
        await userEvent.type(
            screen.getByLabelText('Repeat password:'),
            'Secret123!'
        );
        await userEvent.click(screen.getByLabelText(/terms/i));
        await userEvent.click(screen.getByRole('radio', { name: 'Male' }));
        await userEvent.selectOptions(
            screen.getByLabelText(/Country/i),
            'Canada'
        );

        const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });
        const input = screen.getByLabelText(/Picture/i) as HTMLInputElement;
        await userEvent.upload(input, file);

        await waitFor(() => {
            const submitButton = screen.getByRole('button', {
                name: /submit/i,
            });
            expect(submitButton).toBeEnabled();
        });
    });

    it('clears error when fixing invalid field', async () => {
        renderWithStore(<HookForm onClose={vi.fn()} />);

        const emailInput = screen.getByLabelText(/Email/i);

        await userEvent.type(emailInput, 'invalid');
        fireEvent.blur(emailInput);

        expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();

        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, 'valid@example.com');

        await waitFor(() => {
            expect(
                screen.queryByText(/invalid email/i)
            ).not.toBeInTheDocument();
        });
    });
});
