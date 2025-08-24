import { useState } from 'react';
import Modal from './components/Modal';
import './App.css';
import UncontrolledForm from './components/UncontrolledForm';
import HookForm from './components/HookForm';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import FormItem from './components/FormItem';

export default function App() {
    const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);
    const forms = useSelector((state: RootState) => state.forms.forms);

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
                <button onClick={openUncontrolledForm}>Uncontrolled</button>
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

            <div className="heading">Data from store:</div>

            <div className="forms-data">
                {forms.map((item, index) => (
                    <FormItem
                        key={item.id}
                        item={item}
                        isLast={index === forms.length - 1}
                    />
                ))}
            </div>
        </main>
    );
}
