import { useState } from 'react';
import '../../styles/MultiSelect.css';

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

export default function MultiSelect({
    options,
    selected,
    onChange,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter((o) => o !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <div>
            <button type="button" onClick={() => setOpen(!open)}>
                Select columns
            </button>

            {open && (
                <div className="multiselect-items">
                    {options.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
