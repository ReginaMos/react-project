import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';

function renderWithProvider(ui: React.ReactNode) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe('Root App render', () => {
    it('renders without crashing', () => {
        renderWithProvider(<App />);
        expect(screen.getByText(/React Forms/i)).toBeInTheDocument();
        expect(screen.getByText(/Uncontrolled/i)).toBeInTheDocument();
        expect(screen.getByText(/Hook Form/i)).toBeInTheDocument();
    });

    it('renders buttons and headings correctly', () => {
        renderWithProvider(<App />);
        const uncontrolledBtn = screen.getByText(/Uncontrolled/i);
        const hookFormBtn = screen.getByText(/Hook Form/i);
        expect(uncontrolledBtn).toBeInTheDocument();
        expect(hookFormBtn).toBeInTheDocument();
    });
});
