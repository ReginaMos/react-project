interface Props {
    onClick: () => void;
}

export default function Button({ onClick }: Props) {
    return <button onClick={onClick}>Select Columns</button>;
}
