import { useState } from 'react';
import Modal from './components/Modal';
import './App.css';
import UncontrolledForm from './components/UncontrolledForm';
import HookForm from './components/HookForm';

function App() {
    const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);

    const openHookForm = () => {
        setModal('hook');
    };

    const openUncontrolledForm = () => {
        setModal('uncontrolled');
    };
    return (
        <main>
            <div className="heading">React Forms</div>

            <div className="buttons-part">
                <button onClick={openUncontrolledForm}>Unccontrolled</button>
                <button onClick={openHookForm}>Hook Form</button>
            </div>

            {modal && (
                <Modal onClose={() => setModal(null)}>
                    {modal === 'hook' ? (
                        <HookForm onClose={() => setModal(null)} />
                    ) : (
                        <UncontrolledForm onClose={() => setModal(null)} />
                    )}
                </Modal>
            )}

            <div className="forms-data"></div>
        </main>
    );
}

export default App;
