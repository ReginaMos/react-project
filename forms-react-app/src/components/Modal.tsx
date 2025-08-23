import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    const modalRoot = document.getElementById('root');

    useEffect(() => {
        if (!modalRoot) {
            console.error("The element with ID 'root' was not found.");
            return;
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const modalContent = (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

    if (!modalRoot) return;

    return ReactDOM.createPortal(modalContent, modalRoot);
}
