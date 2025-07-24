import type { ChipsProps } from '../models/models';
import '../styles/Chips.css';

export default function Chips({text}: ChipsProps) {
  return (
    <div className="chips">
      <p>{text}</p>
    </div>
  );
}
