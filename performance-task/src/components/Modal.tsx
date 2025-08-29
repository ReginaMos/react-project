interface Props {
    selectedColumns: string[];
    onClose: () => void;
    onApply: (cols: string[]) => void;
}

const allExtraColumns = ['methane', 'oil_co2', 'temperature_change_from_co2'];

export default function Modal({ selectedColumns, onClose, onApply }: Props) {
    const toggleColumn = (col: string) => {
        if (selectedColumns.includes(col)) {
            onApply(selectedColumns.filter((c) => c !== col));
        } else {
            onApply([...selectedColumns, col]);
        }
    };

    return (
        <div>
            <div>
                <h2>Select Additional Columns</h2>
                <div>
                    {allExtraColumns.map((col) => (
                        <label key={col}>
                            <input
                                type="checkbox"
                                checked={selectedColumns.includes(col)}
                                onChange={() => toggleColumn(col)}
                            />
                            {col}
                        </label>
                    ))}
                </div>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
