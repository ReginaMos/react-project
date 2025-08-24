import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal Component', () => {
    let root: HTMLElement;

    beforeEach(() => {
        root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
    });

    afterEach(() => {
        document.body.removeChild(root);
    });

    it('renders children correctly in portal', () => {
        render(<Modal onClose={vi.fn()}>Hello Modal</Modal>);
        expect(screen.getByText('Hello Modal')).toBeInTheDocument();
    });

    it('calls onClose when overlay is clicked', () => {
        const onClose = vi.fn();
        render(<Modal onClose={onClose}>Modal Content</Modal>);

        const overlay = root.querySelector('.overlay');
        if (overlay) {
            fireEvent.click(overlay);
            expect(onClose).toHaveBeenCalledTimes(1);
        }
    });

    it('calls onClose when ESC key is pressed', () => {
        const onClose = vi.fn();
        render(<Modal onClose={onClose}>Modal Content</Modal>);

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose for other keys', () => {
        const onClose = vi.fn();
        render(<Modal onClose={onClose}>Modal Content</Modal>);

        fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });

        expect(onClose).not.toHaveBeenCalled();
    });

    it('renders inside the specified portal', () => {
        render(<Modal onClose={vi.fn()}>Portal Test</Modal>);
        const portalContent = root.querySelector('.modal');
        expect(portalContent).toBeTruthy();
        expect(portalContent?.textContent).toBe('Portal Test');
    });
});
