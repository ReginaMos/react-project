import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';

function renderWithStore(ui: React.ReactNode) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe('App Component', () => {
    it('renders buttons and headings', () => {
        renderWithStore(<App />);
        expect(screen.getByText(/React Forms/i)).toBeInTheDocument();
        expect(screen.getByText(/Uncontrolled/i)).toBeInTheDocument();
        expect(screen.getByText(/Hook Form/i)).toBeInTheDocument();
        expect(screen.getByText(/Data from store:/i)).toBeInTheDocument();
    });

    it('opens HookForm modal on button click', () => {
        renderWithStore(<App />);
        const hookBtn = screen.getByText(/Hook Form/i);
        fireEvent.click(hookBtn);
        expect(screen.getByText(/Hook Form/i)).toBeInTheDocument();
    });

    it('closes modal on overlay click', () => {
        renderWithStore(<App />);
        const hookBtn = screen.getByText(/Hook Form/i);
        fireEvent.click(hookBtn);
        const overlay =
            screen.getByText(/Hook Form/i).parentElement?.parentElement;
        expect(overlay).toBeInTheDocument();

        if (overlay) fireEvent.click(overlay);
        expect(screen.queryByText(/React Hook Form/i)).not.toBeInTheDocument();
    });

    it('closes modal on ESC key press', () => {
        renderWithStore(<App />);
        const hookBtn = screen.getByText(/Hook Form/i);
        fireEvent.click(hookBtn);
        const overlay =
            screen.getByText(/Hook Form/i).parentElement?.parentElement;
        expect(overlay).toBeInTheDocument();

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(screen.queryByText(/React Hook Form/i)).not.toBeInTheDocument();
    });
});
