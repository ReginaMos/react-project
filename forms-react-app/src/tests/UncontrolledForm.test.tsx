import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../store/store';
import UncontrolledForm from '../components/UncontrolledForm';

vi.mock('../utils/convertToBse64', () => ({
    toBase64: vi.fn().mockResolvedValue('mocked-base64'),
}));

const renderWithStore = (ui: React.ReactNode, onClose = vi.fn()) => {
    const store = configureStore({
        reducer: { forms: formsReducer },
    });

    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
        onClose,
    };
};

describe('UncontrolledForm Component', () => {
    let onClose: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();
        onClose = vi.fn();
    });

    it('renders all fields', () => {
        renderWithStore(<UncontrolledForm onClose={onClose} />);
        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat password:')).toBeInTheDocument();
        expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    });

    it('shows validation error when name is lowercase', async () => {
        renderWithStore(<UncontrolledForm onClose={vi.fn()} />);

        const nameInput = screen.getByLabelText(/name/i);
        await userEvent.type(nameInput, 'john');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/Name must start with uppercase/i)
            ).toBeInTheDocument();
        });
    });

    it('shows validation error when age is negative', async () => {
        renderWithStore(<UncontrolledForm onClose={vi.fn()} />);
        const ageInput = screen.getByLabelText(/age/i);
        await userEvent.clear(ageInput);
        await userEvent.type(ageInput, '-5');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/Age must be non-negative/i)
            ).toBeInTheDocument();
        });
    });

    it('shows validation error when password too short', async () => {
        renderWithStore(<UncontrolledForm onClose={vi.fn()} />);
        const pwdInput = screen.getByLabelText('Password:');
        await userEvent.clear(pwdInput);
        await userEvent.type(pwdInput, '11');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Password too short/i)).toBeInTheDocument();
        });
    });

    it('shows validation errors when fields are invalid', async () => {
        renderWithStore(<UncontrolledForm onClose={onClose} />);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Required/i)).toBeInTheDocument();
            expect(onClose).not.toHaveBeenCalled();
        });
    });
});
